import { RoomServiceClient, TrackSource } from "livekit-server-sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
const CLASSROOM_ALLOWED_ORIGINS = new Set<string>([
  "https://morranjbar92-web.github.io",
  "https://english-learning-project.onrender.com",
  "http://localhost:3000",
  "http://localhost:3002",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3002",
]);

function withClassroomCors(
  request: Request,
  response: NextResponse
): NextResponse {
  const origin = request.headers.get("origin");

  if (origin && CLASSROOM_ALLOWED_ORIGINS.has(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  response.headers.set("Vary", "Origin");
  return response;
}

function corsJson(
  request: Request,
  body: unknown,
  init?: ResponseInit
): NextResponse {
  return withClassroomCors(request, NextResponse.json(body, init));
}

export async function OPTIONS(request: Request) {
  return withClassroomCors(
    request,
    new NextResponse(null, { status: 204 })
  );
}

export async function GET(request: Request) {
  return corsJson(request, { ok: true, service: "classroom-api" });
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return corsJson(request,
        { error: "درخواست نامعتبر است." },
        { status: 400 }
      );
    }

    const { teacherCode, roomName, participantIdentity, action } =
      body as {
        teacherCode?: unknown;
        roomName?: unknown;
        participantIdentity?: unknown;
        action?: unknown;
      };

    const url = process.env.LIVEKIT_URL;
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const configuredTeacherCode = process.env.CLASSROOM_TEACHER_CODE;

    if (!url || !apiKey || !apiSecret || !configuredTeacherCode) {
      return corsJson(request,
        { error: "تنظیمات کلاس آنلاین کامل نیست." },
        { status: 503 }
      );
    }

    if (
      typeof teacherCode !== "string" ||
      teacherCode !== configuredTeacherCode
    ) {
      return corsJson(request,
        { error: "دسترسی معلم تأیید نشد." },
        { status: 403 }
      );
    }

    if (
      typeof roomName !== "string" ||
      !/^[a-zA-Z0-9_-]{3,50}$/.test(roomName) ||
      typeof participantIdentity !== "string" ||
      participantIdentity.length < 1 ||
      participantIdentity.length > 128
    ) {
      return corsJson(request,
        { error: "اطلاعات کلاس یا شرکت‌کننده معتبر نیست." },
        { status: 400 }
      );
    }

    if (!["allow-mic", "block-mic", "kick"].includes(String(action))) {
      return corsJson(request,
        { error: "عملیات درخواستی معتبر نیست." },
        { status: 400 }
      );
    }

    const roomService = new RoomServiceClient(url, apiKey, apiSecret);
    const participants = await roomService.listParticipants(roomName);
    const target = participants.find(
      (participant) => participant.identity === participantIdentity
    );

    if (!target) {
      return corsJson(request,
        { error: "شرکت‌کننده در این کلاس پیدا نشد." },
        { status: 404 }
      );
    }

    let targetRole = "student";

    try {
      const metadata = JSON.parse(target.metadata || "{}") as {
        role?: string;
      };
      targetRole = metadata.role || "student";
    } catch {
      targetRole = "student";
    }

    if (targetRole === "teacher") {
      return corsJson(request,
        { error: "این عملیات روی حساب معلم مجاز نیست." },
        { status: 403 }
      );
    }

    if (action === "kick") {
      await roomService.removeParticipant(roomName, participantIdentity);
    } else {
      const canUseMicrophone = action === "allow-mic";

      await roomService.updateParticipant(roomName, participantIdentity, {
        permission: {
          canSubscribe: true,
          canPublish: true,
          canPublishData: true,
          canPublishSources: canUseMicrophone
            ? [TrackSource.CAMERA, TrackSource.MICROPHONE]
            : [TrackSource.CAMERA],
        },
      });
    }

    return corsJson(request, {
      success: true,
      action,
      participantIdentity,
    });
  } catch {
    return corsJson(request,
      { error: "اجرای دستور کنترل کلاس ناموفق بود." },
      { status: 500 }
    );
  }
}
