import { RoomServiceClient, TrackSource } from "livekit-server-sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
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
      return NextResponse.json(
        { error: "تنظیمات کلاس آنلاین کامل نیست." },
        { status: 503 }
      );
    }

    if (
      typeof teacherCode !== "string" ||
      teacherCode !== configuredTeacherCode
    ) {
      return NextResponse.json(
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
      return NextResponse.json(
        { error: "اطلاعات کلاس یا شرکت‌کننده معتبر نیست." },
        { status: 400 }
      );
    }

    if (!["allow-mic", "block-mic", "kick"].includes(String(action))) {
      return NextResponse.json(
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
      return NextResponse.json(
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
      return NextResponse.json(
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

    return NextResponse.json({
      success: true,
      action,
      participantIdentity,
    });
  } catch {
    return NextResponse.json(
      { error: "اجرای دستور کنترل کلاس ناموفق بود." },
      { status: 500 }
    );
  }
}
