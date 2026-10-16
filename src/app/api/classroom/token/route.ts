import { AccessToken, TrackSource } from "livekit-server-sdk";
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
      return NextResponse.json(
        { error: "تنظیمات کلاس آنلاین کامل نیست." },
        { status: 503 }
      );
    }

    if (
      typeof roomName !== "string" ||
      !/^[a-zA-Z0-9_-]{3,50}$/.test(roomName)
    ) {
      return NextResponse.json(
        { error: "شناسه کلاس معتبر نیست." },
        { status: 400 }
      );
    }

    if (
      typeof participantName !== "string" ||
      participantName.trim().length < 2 ||
      participantName.trim().length > 60
    ) {
      return NextResponse.json(
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
            canPublishSources: [
              TrackSource.CAMERA,
              TrackSource.MICROPHONE,
            ],
          }),
    });

    return NextResponse.json({
      token: await token.toJwt(),
      url,
      role: isTeacher ? "teacher" : "student",
      roomName,
      participantName: participantName.trim(),
    });
  } catch {
    return NextResponse.json(
      { error: "در ساخت توکن کلاس خطایی رخ داد." },
      { status: 400 }
    );
  }
}
