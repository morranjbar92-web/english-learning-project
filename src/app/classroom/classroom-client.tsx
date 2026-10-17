"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import type { FormEvent } from "react";
import {
  LiveKitRoom, VideoConference, useLocalParticipant, useParticipants, useRoomContext, useChat, useTracks } from "@livekit/components-react";
import { RoomEvent, AudioPresets, VideoPresets, Track } from "livekit-client";
import { useKrispNoiseFilter } from "@livekit/components-react/krisp";
import "@livekit/components-styles";
import "./classroom.css";
import ClassroomTools from "./classroom-tools";

const CLASSROOM_API_BASE_URL =
  typeof window !== "undefined" &&
  window.location.hostname === "morranjbar92-web.github.io"
    ? "https://english-learning-project.onrender.com"
    : "";

const AUDIO_CAPTURE_OPTIONS = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
  channelCount: 1,
  voiceIsolation: false,
};

const VIDEO_CAPTURE_OPTIONS = {
  facingMode: "user" as const,
  frameRate: 24,
  resolution: { width: 1280, height: 720, frameRate: 24 },
};

type Connection = {
  token: string;
  url: string;
  role: "teacher" | "student";
  roomName: string;
  participantName: string;
  teacherCode: string;
  inviteUrl: string;
  teacherReturnUrl: string;
};

type BooleanMap = Record<string, boolean>;

function makeRoomLink(roomName: string, teacherReturn = false) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("room", roomName);

  if (teacherReturn) {
    url.searchParams.set("resume", "teacher");
  }

  return url.toString();
}

function ClassroomControls({
  connection,
  onLeave,
}: {
  connection: Connection;
  onLeave: () => void;
}) {
  const room = useRoomContext();
  const participants = useParticipants();
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const krisp = useKrispNoiseFilter();
  const krispAutoAttempted = useRef(false);
  const screenShareTracks = useTracks(
    [{ source: Track.Source.ScreenShare, withPlaceholder: false }],
    { onlySubscribed: false }
  );
  const isScreenSharing = screenShareTracks.length > 0;
  const { chatMessages, send, isSending } = useChat();

  const [handRaised, setHandRaised] = useState(false);
  const [raisedHands, setRaisedHands] = useState<BooleanMap>({});
  const [micRequests, setMicRequests] = useState<BooleanMap>({});
  const [allowedMics, setAllowedMics] = useState<BooleanMap>({});
  const [micAllowed, setMicAllowed] = useState(
    connection.role === "teacher"
  );
  const [micRequestSent, setMicRequestSent] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [busyIdentity, setBusyIdentity] = useState("");
  const [notice, setNotice] = useState("");

  // Try enhanced speech denoising when this participant actually turns on a microphone.
  // The hook gracefully falls back to the browser's standard WebRTC audio processing when unsupported.
  useEffect(() => {
    if (!isMicrophoneEnabled || krispAutoAttempted.current || krisp.isNoiseFilterPending) return;
    krispAutoAttempted.current = true;
    void krisp.setNoiseFilterEnabled(true).catch(() => {
      setNotice("بهبود صدای پیشرفته در این مرورگر فعال نشد؛ کاهش نویز معمول مرورگر همچنان فعال است.");
    });
  }, [isMicrophoneEnabled, krisp.isNoiseFilterPending, krisp.setNoiseFilterEnabled]);

  const publishControl = useCallback(
    async (message: Record<string, unknown>, topic: string) => {
      const payload = new TextEncoder().encode(JSON.stringify(message));

      await room.localParticipant.publishData(payload, {
        reliable: true,
        topic,
      });
    },
    [room]
  );

  useEffect(() => {
    function isTeacherSender(participant?: { metadata?: string }) {
      try {
        const metadata = JSON.parse(participant?.metadata || "{}") as {
          role?: string;
        };

        return metadata.role === "teacher";
      } catch {
        return false;
      }
    }

    function onDataReceived(
      payload: Uint8Array,
      participant?: { identity: string; metadata?: string }
    ) {
      if (!participant) return;

      try {
        const message = JSON.parse(
          new TextDecoder().decode(payload)
        ) as {
          type?: string;
          raised?: boolean;
          identity?: string;
          allowed?: boolean;
          enabled?: boolean;
        };

        if (message.type === "classroom-hand") {
          setRaisedHands((previous) => ({
            ...previous,
            [participant.identity]: Boolean(message.raised),
          }));
        }

        if (
          message.type === "classroom-mic-request" &&
          connection.role === "teacher"
        ) {
          setMicRequests((previous) => ({
            ...previous,
            [participant.identity]: true,
          }));
        }

        if (
          message.type === "classroom-mic-control" &&
          isTeacherSender(participant) &&
          message.identity === localParticipant.identity
        ) {
          setMicAllowed(Boolean(message.allowed));
          setMicRequestSent(false);
          setNotice(
            message.allowed
              ? "معلم اجازهٔ استفاده از میکروفون را داد."
              : "اجازهٔ میکروفون شما لغو شد."
          );
        }

        if (
          message.type === "classroom-chat-control" &&
          isTeacherSender(participant) &&
          typeof message.enabled === "boolean"
        ) {
          setChatEnabled(message.enabled);

          if (!message.enabled) {
            setChatOpen(false);
          }
        }
      } catch {
        // پیام‌های نامعتبر نادیده گرفته می‌شوند.
      }
    }

    function onParticipantConnected() {
      if (connection.role === "teacher") {
        void publishControl(
          { type: "classroom-chat-control", enabled: chatEnabled },
          "classroom-chat-control"
        ).catch(() => {
          setNotice("ارسال وضعیت چت برای عضو جدید ناموفق بود.");
        });
      }
    }


    room.on(RoomEvent.DataReceived, onDataReceived);
    room.on(RoomEvent.ParticipantConnected, onParticipantConnected);

    return () => {
      room.off(RoomEvent.DataReceived, onDataReceived);
      room.off(RoomEvent.ParticipantConnected, onParticipantConnected);
    };
  }, [
    room,
    connection.role,
    localParticipant.identity,
    chatEnabled,
    publishControl,
  ]);

  async function toggleHand() {
    const next = !handRaised;

    try {
      await publishControl(
        { type: "classroom-hand", raised: next },
        "classroom-hand"
      );

      setHandRaised(next);
      setRaisedHands((previous) => ({
        ...previous,
        [localParticipant.identity]: next,
      }));

      setNotice(next ? "درخواست صحبت ارسال شد." : "دست شما پایین آمد.");
    } catch {
      setNotice("ارسال درخواست صحبت ناموفق بود.");
    }
  }

  async function requestMicrophone() {
    if (connection.role !== "student" || micAllowed || micRequestSent) {
      return;
    }

    try {
      await publishControl(
        { type: "classroom-mic-request" },
        "classroom-mic-request"
      );

      setMicRequestSent(true);
      setNotice("درخواست میکروفون ارسال شد؛ منتظر اجازهٔ معلم بمان.");
    } catch {
      setNotice("ارسال درخواست میکروفون ناموفق بود.");
    }
  }

  async function toggleChatAvailability() {
    if (connection.role !== "teacher") return;

    const enabled = !chatEnabled;
    setChatEnabled(enabled);

    if (!enabled) {
      setChatOpen(false);
    }

    try {
      await publishControl(
        { type: "classroom-chat-control", enabled },
        "classroom-chat-control"
      );

      setNotice(
        enabled
          ? "چت برای شرکت‌کنندگان باز شد."
          : "چت برای شرکت‌کنندگان بسته شد."
      );
    } catch {
      setChatEnabled(!enabled);
      setNotice("ارسال وضعیت چت ناموفق بود.");
    }
  }

  async function moderate(
    participantIdentity: string,
    action: "allow-mic" | "block-mic" | "kick"
  ) {
    setBusyIdentity(participantIdentity);
    setNotice("");

    try {
      const response = await fetch(
        `${CLASSROOM_API_BASE_URL}/api/classroom/moderate/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teacherCode: connection.teacherCode,
            roomName: connection.roomName,
            participantIdentity,
            action,
          }),
        }
      );

      const result = (await response.json()) as {
        error?: string;
        success?: boolean;
      };

      if (!response.ok) {
        throw new Error(result.error || "اجرای دستور ناموفق بود.");
      }

      if (action === "allow-mic" || action === "block-mic") {
        const allowed = action === "allow-mic";

        setAllowedMics((previous) => ({
          ...previous,
          [participantIdentity]: allowed,
        }));

        setMicRequests((previous) => ({
          ...previous,
          [participantIdentity]: false,
        }));

        try {
          await publishControl(
            {
              type: "classroom-mic-control",
              identity: participantIdentity,
              allowed,
            },
            "classroom-mic-control"
          );
        } catch {
          // تغییر مجوز سرور انجام شده است؛ وضعیت مجوز نیز از رویداد سرور همگام می‌شود.
        }

        setNotice(
          allowed
            ? "اجازهٔ میکروفون صادر شد."
            : "میکروفون دانش‌آموز قطع شد."
        );
      } else {
        setRaisedHands((previous) => {
          const next = { ...previous };
          delete next[participantIdentity];
          return next;
        });

        setMicRequests((previous) => {
          const next = { ...previous };
          delete next[participantIdentity];
          return next;
        });

        setAllowedMics((previous) => {
          const next = { ...previous };
          delete next[participantIdentity];
          return next;
        });

        setNotice("درخواست اخراج ارسال شد.");
      }
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "ارتباط با سرور برقرار نشد."
      );
    } finally {
      setBusyIdentity("");
    }
  }

  async function submitChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!chatEnabled) {
      setNotice("معلم چت را بسته است.");
      return;
    }

    const text = draft.trim();
    if (!text || isSending) return;

    try {
      await send(text);
      setDraft("");
    } catch {
      setNotice("ارسال پیام چت ناموفق بود.");
    }
  }

  const remoteParticipants = participants.filter(
    (participant) =>
      participant.identity !== localParticipant.identity
  );

  return (
    <div
      className={`classroom-room-layout ${
        connection.role === "teacher" ? "teacher-role" : "student-role"
      }`}
      dir="rtl"
    >
      <section className="conference-area">
        <div className="classroom-action-bar" dir="rtl">
          {connection.role === "student" && (
            <button
              type="button"
              className={handRaised ? "hand-button raised" : "hand-button"}
              onClick={() => void toggleHand()}
            >
              {handRaised ? "✋ پایین آوردن دست" : "✋ درخواست صحبت"}
            </button>
          )}

          {connection.role === "student" && !micAllowed && (
            <button
              type="button"
              className="mic-request-button"
              onClick={() => void requestMicrophone()}
              disabled={micRequestSent}
            >
              {micRequestSent
                ? "درخواست میکروفون ارسال شد"
                : "درخواست اجازهٔ میکروفون"}
            </button>
          )}

          {connection.role === "student" && micAllowed && (
            <span className="mic-permission-note">
              اجازهٔ میکروفون صادر شده؛ از نوار کنترل آن را روشن کن.
            </span>
          )}

          <button
            type="button"
            className="classroom-chat-toggle"
            onClick={() => setChatOpen((value) => !value)}
            disabled={!chatEnabled}
          >
            {chatEnabled ? "💬 گفت‌وگو" : "💬 چت بسته است"}
          </button>

          {connection.role === "teacher" && (
            <button
              type="button"
              className="classroom-chat-admin"
              onClick={() => void toggleChatAvailability()}
            >
              {chatEnabled ? "بستن چت برای همه" : "بازکردن چت برای همه"}
            </button>
          )}

          <button
            type="button"
            className="classroom-audio-enhancer"
            disabled={!isMicrophoneEnabled || krisp.isNoiseFilterPending}
            onClick={() => {
              void krisp.setNoiseFilterEnabled(!krisp.isNoiseFilterEnabled).catch(() => {
                setNotice("بهبود صدای پیشرفته در این مرورگر قابل فعال‌سازی نیست.");
              });
            }}
            title="کاهش نویز پیشرفته برای صدای میکروفون ارسالی"
          >
            {krisp.isNoiseFilterPending
              ? "در حال آماده‌سازی صدا..."
              : krisp.isNoiseFilterEnabled
                ? "وضوح صدای بهتر: روشن"
                : "فعال‌کردن بهبود صدا"}
          </button>          <span className="participant-count">
            {participants.length} نفر در کلاس
          </span>
        </div>

        <div
          className={["conference-video", isScreenSharing ? "has-screen-share" : "",
            connection.role === "student" ? "student-role" : "teacher-role",
            connection.role === "student" && !micAllowed
              ? "student-mic-locked"
              : "",
          ].join(" ")}
          dir="ltr"
        >
          <VideoConference />
        </div>
      </section>

      <aside className="classroom-roster">
        <h2>شرکت‌کنندگان</h2>
        <p className="roster-subtitle">
          {connection.role === "teacher"
            ? "مدیریت دانش‌آموزان کلاس"
            : "اعضای حاضر در کلاس"}
        </p>

        <div className="roster-list">
          <article className="roster-person">
            <div className="roster-avatar">
              {connection.participantName.slice(0, 1)}
            </div>
            <div className="roster-person-info">
              <strong>{connection.participantName} (شما)</strong>
              <span>
                {connection.role === "teacher" ? "معلم" : "دانش‌آموز"}
              </span>
            </div>
            {handRaised && <span title="دست بالا است">✋</span>}
          </article>

          {remoteParticipants.map((participant) => {
            let participantRole = "دانش‌آموز";

            try {
              const metadata = JSON.parse(participant.metadata || "{}") as {
                role?: string;
              };

              if (metadata.role === "teacher") {
                participantRole = "معلم";
              }
            } catch {
              // نقش پیش‌فرض دانش‌آموز است.
            }

            const identity = participant.identity;
            const isHandRaised = Boolean(raisedHands[identity]);
            const hasRequestedMic = Boolean(micRequests[identity]);
            const micIsAllowed = Boolean(allowedMics[identity]);
            const isBusy = busyIdentity === identity;
            const isTeacher = participantRole === "معلم";

            return (
              <article className="roster-person" key={identity}>
                <div className="roster-avatar">
                  {(participant.name || "?").slice(0, 1)}
                </div>

                <div className="roster-person-info">
                  <strong>{participant.name || "شرکت‌کننده"}</strong>
                  <span>
                    {isHandRaised ? "✋ درخواست صحبت" : participantRole}
                  </span>
                  <span>
                    {micIsAllowed
                      ? "اجازهٔ میکروفون صادر شده"
                      : hasRequestedMic
                        ? "درخواست میکروفون"
                        : "میکروفون نیازمند اجازه"}
                  </span>
                </div>

                {connection.role === "teacher" && !isTeacher && (
                  <div className="roster-actions">
                    <button
                      type="button"
                      disabled={
                        isBusy || (!hasRequestedMic && !micIsAllowed)
                      }
                      onClick={() =>
                        void moderate(
                          identity,
                          micIsAllowed ? "block-mic" : "allow-mic"
                        )
                      }
                    >
                      {isBusy
                        ? "..."
                        : micIsAllowed
                          ? "قطع میکروفون"
                          : hasRequestedMic
                            ? "اجازه میکروفون"
                            : "منتظر درخواست"}
                    </button>

                    <button
                      type="button"
                      className="kick-button"
                      disabled={isBusy}
                      onClick={() => {
                        if (
                          window.confirm(
                            `آیا از اخراج ${participant.name || "این دانش‌آموز"} مطمئن هستید؟`
                          )
                        ) {
                          void moderate(identity, "kick");
                        }
                      }}
                    >
                      اخراج
                    </button>
                  </div>
                )}
              </article>
            );
          })}

          {remoteParticipants.length === 0 && (
            <p className="roster-empty">
              هنوز شخص دیگری وارد این کلاس نشده است.
            </p>
          )}
        </div>

        {notice && (
          <p className="classroom-notice" role="status">
            {notice}
          </p>
        )}

        <button type="button" className="roster-leave" onClick={onLeave}>
          خروج از کلاس
        </button>
      </aside>

      {chatOpen && chatEnabled && (
        <aside className="classroom-chat-panel" dir="rtl">
          <header className="classroom-chat-header">
            <strong>گفت‌وگوی کلاس</strong>
            <button
              type="button"
              aria-label="بستن پنجره چت"
              onClick={() => setChatOpen(false)}
            >
              ✕
            </button>
          </header>

          <div className="classroom-chat-messages" aria-live="polite">
            {chatMessages.length === 0 && (
              <p className="classroom-chat-empty">هنوز پیامی ارسال نشده است.</p>
            )}

            {chatMessages.map((message, index) => (
              <article
                className="classroom-chat-message"
                key={message.id ?? `${message.timestamp}-${index}`}
              >
                <strong>
                  {message.from?.name ||
                    message.from?.identity ||
                    "شرکت‌کننده"}
                </strong>
                <p>{message.message}</p>
              </article>
            ))}
          </div>

          <form className="classroom-chat-form" onSubmit={submitChat}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={
                chatEnabled ? "پیام خود را بنویس..." : "چت بسته است"
              }
              maxLength={1000}
              disabled={!chatEnabled || isSending}
            />
            <button
              type="submit"
              disabled={!chatEnabled || isSending || !draft.trim()}
            >
              ارسال
            </button>
          </form>
        </aside>
      )}

      {connection.role === "student" && !chatEnabled && (
        <p className="classroom-chat-closed" role="status">
          معلم گفت‌وگوی کلاس را بسته است.
        </p>
      )}
    </div>
  );
}

export default function ClassroomClient() {
  const [roomName, setRoomName] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [inviteLinkInput, setInviteLinkInput] = useState("");
  const [entryMode, setEntryMode] = useState<
    "teacher" | "student" | null
  >(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const candidate = params.get("room") || "";
    const resumeAsTeacher = params.get("resume") === "teacher";

    if (/^[a-zA-Z0-9_-]{3,50}$/.test(candidate)) {
      setRoomName(candidate);
      setEntryMode(resumeAsTeacher ? "teacher" : "student");
    }
  }, []);

  function applyInviteLink() {
    try {
      const parsed = new URL(
        inviteLinkInput.trim(),
        window.location.origin
      );
      const candidate = parsed.searchParams.get("room") || "";

      if (
        !parsed.pathname.includes("/classroom") ||
        !/^[a-zA-Z0-9_-]{3,50}$/.test(candidate)
      ) {
        throw new Error("این لینک دعوت معتبر نیست.");
      }

      setRoomName(candidate);
      setError("");

      const clean = new URL(window.location.href);
      clean.search = "";
      clean.hash = "";
      clean.searchParams.set("room", candidate);
      window.history.replaceState({}, "", clean.toString());
    } catch {
      setError("لینک کامل کلاس را بررسی کن و دوباره وارد کن.");
    }
  }

  async function joinClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setCopyMessage("");

    if (!entryMode) {
      setLoading(false);
      setError("ابتدا مشخص کن معلم هستی یا دانش‌آموز.");
      return;
    }

    const cleanedName = participantName.trim();

    if (cleanedName.length < 2 || cleanedName.length > 60) {
      setLoading(false);
      setError("نام باید بین ۲ تا ۶۰ نویسه باشد.");
      return;
    }

    if (entryMode === "teacher" && !teacherCode.trim()) {
      setLoading(false);
      setError("برای ورود معلم، کد معلم را وارد کن.");
      return;
    }

    let selectedRoomName = roomName;

    if (entryMode === "teacher") {
      if (!/^[a-zA-Z0-9_-]{3,50}$/.test(selectedRoomName)) {
        const randomPart =
          typeof crypto !== "undefined" &&
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID().replace(/-/g, "").slice(0, 16)
            : Math.random().toString(36).slice(2, 14);

        selectedRoomName = `lesson-${randomPart}`;
        setRoomName(selectedRoomName);
      }
    } else if (!/^[a-zA-Z0-9_-]{3,50}$/.test(selectedRoomName)) {
      setLoading(false);
      setError("لینک دعوت کلاس را از معلم بگیر و وارد کن.");
      return;
    }

    try {
      const response = await fetch(
        `${CLASSROOM_API_BASE_URL}/api/classroom/token/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomName: selectedRoomName,
            participantName: cleanedName,
            teacherCode:
              entryMode === "teacher" ? teacherCode.trim() : undefined,
          }),
        }
      );

      const responseText = await response.text();

      let data: {
        error?: string;
        token?: string;
        url?: string;
        role?: string;
        roomName?: string;
        participantName?: string;
      };

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `پاسخ سرور JSON نیست (HTTP ${response.status}). اتصال سرور کلاس را بررسی کن.`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "ورود به کلاس ناموفق بود.");
      }

      if (
        !data.token ||
        !data.url ||
        (data.role !== "teacher" && data.role !== "student") ||
        !data.roomName ||
        !data.participantName
      ) {
        throw new Error("اطلاعات اتصال کلاس از سرور کامل نیست.");
      }

      if (data.role !== entryMode) {
        throw new Error(
          entryMode === "teacher"
            ? "کد معلم معتبر نیست؛ کد را بررسی کن."
            : "ورود دانش‌آموز تأیید نشد."
        );
      }

      const inviteUrl = makeRoomLink(data.roomName, false);
      const teacherReturnUrl = makeRoomLink(data.roomName, true);

      window.history.replaceState(
        {},
        "",
        data.role === "teacher" ? teacherReturnUrl : inviteUrl
      );

      setConnection({
        token: data.token,
        url: data.url,
        role: data.role,
        roomName: data.roomName,
        participantName: data.participantName,
        teacherCode: data.role === "teacher" ? teacherCode.trim() : "",
        inviteUrl,
        teacherReturnUrl,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "خطای ناشناخته رخ داد."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyLink(link: string, label: string) {
    try {
      await navigator.clipboard.writeText(link);
      setCopyMessage(`${label} کپی شد.`);
    } catch {
      window.prompt(`${label} را کپی کن:`, link);
      setCopyMessage(`برای کپی ${label} از پنجرهٔ بازشده استفاده کن.`);
    }
  }

  if (connection) {
    return (
      <main className="classroom-live">
        <header className="live-header">
          <div className="live-header-title">
            <strong>LinguaPro | کلاس آنلاین</strong>
            <span>
              {connection.role === "teacher"
                ? "معلم · کلاس اختصاصی"
                : "دانش‌آموز · کلاس آنلاین"}
            </span>
          </div>

          {connection.role === "teacher" && (
            <div className="classroom-invite-tools" dir="rtl">
              <div className="classroom-link-row">
                <label>لینک ورود دانش‌آموز</label>
                <input value={connection.inviteUrl} readOnly dir="ltr" />
                <button
                  type="button"
                  onClick={() =>
                    void copyLink(
                      connection.inviteUrl,
                      "لینک ورود دانش‌آموز"
                    )
                  }
                >
                  کپی لینک دانش‌آموز
                </button>
              </div>

              <div className="classroom-link-row teacher-return-row">
                <label>لینک بازگشت معلم</label>
                <input
                  value={connection.teacherReturnUrl}
                  readOnly
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() =>
                    void copyLink(
                      connection.teacherReturnUrl,
                      "لینک بازگشت معلم"
                    )
                  }
                >
                  کپی لینک معلم
                </button>
              </div>

              {copyMessage && (
                <p className="classroom-copy-notice" role="status">
                  {copyMessage}
                </p>
              )}
            </div>
          )}
        </header>

        <div className="live-content">
          <LiveKitRoom
            video={VIDEO_CAPTURE_OPTIONS}
            audio={
              connection.role === "teacher"
                ? AUDIO_CAPTURE_OPTIONS
                : false
            }
            options={{
              adaptiveStream: true,
              dynacast: true,
              audioCaptureDefaults: AUDIO_CAPTURE_OPTIONS,
              videoCaptureDefaults: VIDEO_CAPTURE_OPTIONS,
              publishDefaults: {
                audioPreset: AudioPresets.speech,
                red: true,
                dtx: true,
                forceStereo: false,
                simulcast: true,
                videoSimulcastLayers: [
                  VideoPresets.h180,
                  VideoPresets.h360,
                  VideoPresets.h720,
                ],
              },
            }}
            token={connection.token}
            serverUrl={connection.url}
            connect={true}
            onDisconnected={() => setConnection(null)}
            onError={(event) => setError(event.message)}
            data-lk-theme="default"
          >
            <ClassroomControls
              connection={connection}
              onLeave={() => setConnection(null)}
            />
            <ClassroomTools role={connection.role} />
          </LiveKitRoom>
        </div>

        {error && <p className="classroom-error">{error}</p>}
      </main>
    );
  }

  return (
    <main className="classroom-page" dir="rtl">
      <section className="join-card">
        <div className="classroom-logo">L</div>
        <p className="eyebrow">LINGUAPRO LIVE</p>
        <h1>کلاس آنلاین زبان انگلیسی</h1>

        <p className="join-description">
          {entryMode === "teacher"
            ? roomName
              ? "با کد معلم به همان کلاس قبلی برگرد."
              : "کلاس اختصاصی بساز و لینک دعوت را برای دانش‌آموزان بفرست."
            : entryMode === "student"
              ? "با لینک دعوت وارد کلاس شو و یادگیری را آغاز کن."
              : "برای ادامه، نقش خودت را انتخاب کن."}
        </p>

        {!entryMode && (
          <div className="entry-mode-options">
            <button
              type="button"
              className="entry-mode-card"
              onClick={() => {
                const linkedRoom =
                  new URLSearchParams(window.location.search).get("room") ||
                  "";
                setRoomName(
                  /^[a-zA-Z0-9_-]{3,50}$/.test(linkedRoom)
                    ? linkedRoom
                    : ""
                );
                setTeacherCode("");
                setEntryMode("teacher");
                setError("");
              }}
            >
              <strong>ساخت کلاس جدید</strong>
              <span>کلاس اختصاصی بساز و لینک دعوت دریافت کن.</span>
            </button>

            <button
              type="button"
              className="entry-mode-card"
              onClick={() => {
                setEntryMode("student");
                setError("");
              }}
            >
              <strong>ورود دانش‌آموز</strong>
              <span>با لینک معلم وارد کلاس شو.</span>
            </button>
          </div>
        )}

        {entryMode && (
          <>
            <button
              type="button"
              className="mode-back-button"
              onClick={() => {
                const linkedRoom =
                  new URLSearchParams(window.location.search).get("room") ||
                  "";
                setEntryMode(null);
                setRoomName(
                  /^[a-zA-Z0-9_-]{3,50}$/.test(linkedRoom)
                    ? linkedRoom
                    : ""
                );
                setInviteLinkInput("");
                setTeacherCode("");
                setError("");
              }}
            >
              تغییر حالت ورود
            </button>

            <form onSubmit={joinClass} className="join-form">
              <label htmlFor="participantName">نام شما</label>
              <input
                id="participantName"
                value={participantName}
                onChange={(event) =>
                  setParticipantName(event.target.value)
                }
                placeholder="مثلاً محمدرضا"
                minLength={2}
                maxLength={60}
                autoComplete="name"
                required
              />

              {entryMode === "teacher" && (
                <>
                  <label htmlFor="teacherCode">کد معلم</label>
                  <input
                    id="teacherCode"
                    type="password"
                    autoComplete="off"
                    value={teacherCode}
                    onChange={(event) => setTeacherCode(event.target.value)}
                    placeholder="کد اختصاصی معلم"
                    required
                  />
                </>
              )}

              {entryMode === "student" && !roomName && (
                <div className="invite-link-field">
                  <label htmlFor="inviteLinkInput">لینک دعوت کلاس</label>
                  <input
                    id="inviteLinkInput"
                    type="url"
                    value={inviteLinkInput}
                    onChange={(event) =>
                      setInviteLinkInput(event.target.value)
                    }
                    placeholder="لینکی که معلم برایت فرستاده"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    className="apply-invite-button"
                    onClick={applyInviteLink}
                  >
                    شناسایی لینک دعوت
                  </button>
                </div>
              )}

              {entryMode === "student" && roomName && (
                <div className="invite-recognized" role="status">
                  لینک دعوت شناسایی شد؛ وارد همان کلاس می‌شوی.
                </div>
              )}

              {error && (
                <p className="classroom-error" role="alert">
                  {error}
                </p>
              )}

              <button
                className="join-button"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "در حال اتصال..."
                  : entryMode === "teacher"
                    ? /^[a-zA-Z0-9_-]{3,50}$/.test(roomName)
                      ? "بازگشت معلم به کلاس"
                      : "ساخت کلاس و ورود"
                    : "ورود به کلاس"}
              </button>
            </form>
          </>
        )}

        <p className="privacy-note">
          برای دوربین و میکروفون، اجازهٔ مرورگر لازم است.
        </p>
      </section>
    </main>
  );
}



