import { AccessToken, TrackSource } from "livekit-server-sdk";
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

    const { roomName, participantName, teacherCode } = body as {
      roomName?: unknown;
      participantName?: unknown;
      teacherCode?: unknown;
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
      typeof roomName !== "string" ||
      !/^[a-zA-Z0-9_-]{3,50}$/.test(roomName)
    ) {
      return corsJson(request,
        { error: "شناسه کلاس معتبر نیست." },
        { status: 400 }
      );
    }

    if (
      typeof participantName !== "string" ||
      participantName.trim().length < 2 ||
      participantName.trim().length > 60
    ) {
      return corsJson(request,
        { error: "نام باید بین ۲ تا ۶۰ حرف باشد." },
        { status: 400 }
      );
    }

    const isTeacher =
      typeof teacherCode === "string" &&
      teacherCode.length > 0 &&
      teacherCode === configuredTeacherCode;

    const identity = crypto.randomUUID();

    const token = new AccessToken(apiKey, apiSecret, {
      identity,
      name: participantName.trim(),
      ttl: "1h",
      metadata: JSON.stringify({
        role: isTeacher ? "teacher" : "student",
      }),
    });

    token.addGrant({
      roomJoin: true,
      room: roomName,
      canSubscribe: true,
      canPublish: true,
      canPublishData: true,
      ...(isTeacher
        ? {}
        : {
            canPublishSources: [TrackSource.CAMERA],
          }),
    });

    return corsJson(request, {
      token: await token.toJwt(),
      url,
      role: isTeacher ? "teacher" : "student",
      roomName,
      participantName: participantName.trim(),
    });
  } catch {
    return corsJson(request,
      { error: "در ساخت توکن کلاس خطایی رخ داد." },
      { status: 400 }
    );
  }
}

