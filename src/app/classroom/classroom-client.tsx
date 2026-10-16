"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  VideoConference,
  useLocalParticipant,
  useParticipants,
  useRoomContext,
} from "@livekit/components-react";
import { RoomEvent } from "livekit-client";
import "@livekit/components-styles";
import "./classroom.css";

const CLASSROOM_API_BASE_URL =
  typeof window !== "undefined" &&
  window.location.hostname === "morranjbar92-web.github.io"
    ? "https://english-learning-project.onrender.com"
    : "";
type Connection = {
  token: string;
  url: string;
  role: "teacher" | "student";
  roomName: string;
  participantName: string;
  teacherCode: string;
  inviteUrl: string;
};

type HandState = Record<string, boolean>;

function ClassroomControls({
  connection,
  onLeave,
}: {
  connection: Connection;
  onLeave: () => void;
}) {
  const room = useRoomContext();
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();

  const [handRaised, setHandRaised] = useState(false);
  const [raisedHands, setRaisedHands] = useState<HandState>({});
  const [busyIdentity, setBusyIdentity] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    function onDataReceived(
      payload: Uint8Array,
      participant?: { identity: string }
    ) {
      if (!participant) return;

      try {
        const message = JSON.parse(
          new TextDecoder().decode(payload)
        ) as { type?: string; raised?: boolean };

        if (message.type === "classroom-hand") {
          setRaisedHands((previous) => ({
            ...previous,
            [participant.identity]: Boolean(message.raised),
          }));
        }
      } catch {
        // بسته‌های داده نامعتبر نادیده گرفته می‌شوند.
      }
    }

    room.on(RoomEvent.DataReceived, onDataReceived);

    return () => {
      room.off(RoomEvent.DataReceived, onDataReceived);
    };
  }, [room]);

  async function toggleHand() {
    const next = !handRaised;

    try {
      const payload = new TextEncoder().encode(
        JSON.stringify({
          type: "classroom-hand",
          raised: next,
        })
      );

      await room.localParticipant.publishData(payload, {
        reliable: true,
        topic: "classroom-hand",
      });

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

  async function moderate(
    participantIdentity: string,
    action: "allow-mic" | "block-mic" | "kick"
  ) {
    const messages = {
      "allow-mic": "اجازه میکروفون صادر شد.",
      "block-mic": "محدودیت میکروفون ثبت شد.",
      kick: "درخواست اخراج ارسال شد.",
    };

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

      setNotice(messages[action]);

      if (action === "kick") {
        setRaisedHands((previous) => {
          const next = { ...previous };
          delete next[participantIdentity];
          return next;
        });
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

  const remoteParticipants = participants.filter(
    (participant) =>
      participant.identity !== localParticipant.identity
  );

  return (
    <div className="classroom-room-layout" dir="rtl">
      <section className="conference-area">
        <div className="classroom-action-bar" dir="rtl">
          {connection.role === "student" && (
            <button
              type="button"
              className={handRaised ? "hand-button raised" : "hand-button"}
              onClick={toggleHand}
            >
              {handRaised ? "✋ پایین آوردن دست" : "✋ درخواست صحبت"}
            </button>
          )}

          <span className="participant-count">
            {participants.length} نفر در کلاس
          </span>
        </div>

        <div className="conference-video" dir="ltr">
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

            const isHandRaised = Boolean(
              raisedHands[participant.identity]
            );
            const isBusy = busyIdentity === participant.identity;
            const isTeacher = participantRole === "معلم";

            return (
              <article
                className="roster-person"
                key={participant.identity}
              >
                <div className="roster-avatar">
                  {(participant.name || "?").slice(0, 1)}
                </div>

                <div className="roster-person-info">
                  <strong>{participant.name || "شرکت‌کننده"}</strong>
                  <span>
                    {isHandRaised ? "✋ درخواست صحبت" : participantRole}
                  </span>
                  <span>
                    {participant.isMicrophoneEnabled
                      ? "میکروفون روشن"
                      : "میکروفون خاموش"}
                  </span>
                </div>

                {connection.role === "teacher" && !isTeacher && (
                  <div className="roster-actions">
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() =>
                        moderate(
                          participant.identity,
                          participant.isMicrophoneEnabled
                            ? "block-mic"
                            : "allow-mic"
                        )
                      }
                    >
                      {isBusy
                        ? "..."
                        : participant.isMicrophoneEnabled
                          ? "قطع میکروفون"
                          : "اجازه میکروفون"}
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
                          void moderate(participant.identity, "kick");
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
    </div>
  );
}

export default function ClassroomClient() {
  const [roomName, setRoomName] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [inviteLinkInput, setInviteLinkInput] = useState("");
  const [entryMode, setEntryMode] = useState<"teacher" | "student" | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    const candidate = new URLSearchParams(window.location.search).get("room");

    if (candidate && /^[a-zA-Z0-9_-]{3,50}$/.test(candidate)) {
      setRoomName(candidate);
      setEntryMode("student");
    }
  }, []);

  function applyInviteLink() {
    try {
      const parsed = new URL(inviteLinkInput.trim(), window.location.origin);
      const candidate = parsed.searchParams.get("room") || "";

      if (
        !parsed.pathname.includes("/classroom") ||
        !/^[a-zA-Z0-9_-]{3,50}$/.test(candidate)
      ) {
        throw new Error("این لینک دعوت معتبر نیست.");
      }

      setRoomName(candidate);
      setError("");

      const currentUrl = new URL(window.location.href);
      currentUrl.search = "";
      currentUrl.searchParams.set("room", candidate);
      window.history.replaceState({}, "", currentUrl.toString());
    } catch {
      setError("لینک کامل کلاس را بررسی کن و دوباره وارد کن.");
    }
  }

  async function joinClass(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyMessage("");

    if (!entryMode) {
      setError("ابتدا مشخص کن معلم هستی یا دانش‌آموز.");
      return;
    }

    const cleanedName = participantName.trim();

    if (cleanedName.length < 2) {
      setError("نام باید حداقل دو نویسه داشته باشد.");
      return;
    }

    if (entryMode === "teacher" && !teacherCode.trim()) {
      setError("برای ساخت کلاس، کد معلم را وارد کن.");
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

        selectedRoomName = `class-${randomPart}`;
        setRoomName(selectedRoomName);
      }
    } else if (!/^[a-zA-Z0-9_-]{3,50}$/.test(selectedRoomName)) {
      setError("ابتدا لینک دعوت کلاس را از معلم بگیر و وارد کن.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${CLASSROOM_API_BASE_URL}/api/classroom/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: selectedRoomName,
          participantName: cleanedName,
          teacherCode:
            entryMode === "teacher" ? teacherCode.trim() : undefined,
        }),
      });

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
          `پاسخ سرور JSON نیست (HTTP ${response.status}). سرور کلاس را بررسی کن.`
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

      if (entryMode === "teacher" && data.role !== "teacher") {
        throw new Error("کد معلم معتبر نیست؛ کد را بررسی کن.");
      }

      if (entryMode === "student" && data.role !== "student") {
        throw new Error("ورود دانش‌آموز تأیید نشد.");
      }

      const inviteUrl = new URL(window.location.href);
      inviteUrl.search = "";
      inviteUrl.hash = "";
      inviteUrl.searchParams.set("room", data.roomName);

      setConnection({
        token: data.token,
        url: data.url,
        role: data.role,
        roomName: data.roomName,
        participantName: data.participantName,
        teacherCode: data.role === "teacher" ? teacherCode.trim() : "",
        inviteUrl: inviteUrl.toString(),
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "خطای ناشناخته رخ داد."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyInviteLink(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setCopyMessage("لینک دعوت کپی شد؛ آن را برای دانش‌آموزان بفرست.");
    } catch {
      window.prompt("این لینک را کپی و برای دانش‌آموزان ارسال کن:", link);
      setCopyMessage("در صورت بازشدن پنجره، لینک را از آن کپی کن.");
    }
  }

  if (connection) {
    return (
      <main className="classroom-live">
        <header className="live-header">
          <div>
            <strong>LinguaPro | کلاس آنلاین</strong>
            <span>
              {connection.role === "teacher"
                ? "معلم · لینک دعوت اختصاصی آماده است"
                : "دانش‌آموز · ورود از طریق دعوت‌نامه"}
            </span>
          </div>

          {connection.role === "teacher" && (
            <div className="classroom-invite-tools">
              <input
                aria-label="لینک دعوت کلاس"
                value={connection.inviteUrl}
                readOnly
              />
              <button
                type="button"
                onClick={() => void copyInviteLink(connection.inviteUrl)}
              >
                کپی لینک دعوت
              </button>
              {copyMessage && (
                <span className="classroom-copy-notice" role="status">
                  {copyMessage}
                </span>
              )}
            </div>
          )}
        </header>

        <div className="live-content">
          <LiveKitRoom
            video={true}
            audio={true}
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
            ? "کلاس اختصاصی خودت را بساز و لینک دعوت را برای دانش‌آموزان بفرست."
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
                setRoomName("");
                setTeacherCode("");
                setEntryMode("teacher");
                setError("");
              }}
            >
              <strong>ساخت کلاس جدید</strong>
              <span>
                برای معلم‌ها؛ ساخت اتاق اختصاصی و دریافت لینک دعوت
              </span>
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
              <span>
                لینک کلاس معلم را باز کن یا در کادر زیر وارد کن
              </span>
            </button>
          </div>
        )}

        {entryMode && (
          <>
            <button
              type="button"
              className="mode-back-button"
              onClick={() => {
                setEntryMode(null);
                setRoomName("");
                setInviteLinkInput("");
                setTeacherCode("");
                setError("");
                setCopyMessage("");
              }}
            >
              تغییر حالت ورود
            </button>

            <form onSubmit={joinClass} className="join-form">
              <label htmlFor="participantName">نام شما</label>
              <input
                id="participantName"
                value={participantName}
                onChange={(event) => setParticipantName(event.target.value)}
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
                    onChange={(event) => setInviteLinkInput(event.target.value)}
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
                  لینک دعوت شناسایی شد؛ پس از ورود به همان کلاس متصل می‌شوی.
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
                    ? "ساخت کلاس و ورود"
                    : "ورود به کلاس"}
              </button>
            </form>
          </>
        )}

        <p className="privacy-note">
          برای استفاده از دوربین و میکروفون، اجازه مرورگر لازم است.
        </p>
      </section>
    </main>
  );
}
