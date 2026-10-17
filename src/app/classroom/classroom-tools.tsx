"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent } from "react";
import { useChat, useLocalParticipant, useRoomContext } from "@livekit/components-react";
import { RoomEvent } from "livekit-client";

type Role = "teacher" | "student";
type Point = { x: number; y: number };
type Tool = "pen" | "eraser";
type Segment = {
  id: string;
  points: Point[];
  color: string;
  width: number;
  tool: Tool;
  identity: string;
};
type BoardRequest = { identity: string; name: string };
type SharedFile = {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  url: string;
  sender: string;
};
type ParticipantMeta = { identity: string; name?: string; metadata?: string };
const BOARD_CONTROL_TOPIC = "classroom-board-control";
const BOARD_DATA_TOPIC = "classroom-board-data";
const FILE_TOPIC = "classroom-shared-files";
const MAX_FILE_SIZE = 15 * 1024 * 1024;

function participantRole(participant?: { metadata?: string }): Role | null {
  try {
    const data = JSON.parse(participant?.metadata || "{}") as { role?: string };
    return data.role === "teacher" ? "teacher" : data.role === "student" ? "student" : null;
  } catch {
    return null;
  }
}

function drawSegment(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, segment: Segment) {
  if (!segment.points.length) return;
  ctx.save();
  ctx.globalCompositeOperation = segment.tool === "eraser" ? "destination-out" : "source-over";
  ctx.strokeStyle = segment.color;
  ctx.fillStyle = segment.color;
  ctx.lineWidth = Math.max(2, segment.width * canvas.width);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (segment.points.length === 1) {
    const point = segment.points[0];
    ctx.beginPath();
    ctx.arc(point.x * canvas.width, point.y * canvas.height, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(segment.points[0].x * canvas.width, segment.points[0].y * canvas.height);
    for (let i = 1; i < segment.points.length; i++) {
      ctx.lineTo(segment.points[i].x * canvas.width, segment.points[i].y * canvas.height);
    }
    ctx.stroke();
  }
  ctx.restore();
}

export default function ClassroomTools({ role }: { role: Role }) {
  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const [panelOpen, setPanelOpen] = useState(false);
  const [tab, setTab] = useState<"board" | "files" | "chat">("board");
  const { chatMessages, send, isSending } = useChat();
  const [chatEnabled, setChatEnabled] = useState(true);
  const [chatDraft, setChatDraft] = useState("");
  const [boardAllowed, setBoardAllowed] = useState(role === "teacher");
  const [requestSent, setRequestSent] = useState(false);
  const [requests, setRequests] = useState<BoardRequest[]>([]);
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const permissionsRef = useRef<Record<string, boolean>>({});
  const [segments, setSegments] = useState<Segment[]>([]);
  const segmentsRef = useRef<Segment[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeStroke = useRef<{ id: string; points: Point[]; chunk: number } | null>(null);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState("#243a7a");
  const [brushSize, setBrushSize] = useState(4);
  const [files, setFiles] = useState<SharedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notice, setNotice] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrls = useRef<string[]>([]);

  useEffect(() => { permissionsRef.current = permissions; }, [permissions]);
  useEffect(() => { segmentsRef.current = segments; }, [segments]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const segment of segmentsRef.current) drawSegment(ctx, canvas, segment);
  }, []);

  useEffect(() => { redraw(); }, [segments, redraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      redraw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return () => observer.disconnect();
  }, [panelOpen, tab, redraw]);

  useEffect(() => {
    const onData = (
      payload: Uint8Array,
      participant?: ParticipantMeta,
      _kind?: unknown,
      topic?: string
    ) => {
      if (!participant) return;
      try {
        const message = JSON.parse(new TextDecoder().decode(payload)) as {
          type?: string;
          identity?: string;
          allowed?: boolean;
          segment?: Segment;
          enabled?: boolean;
        };
        const senderRole = participantRole(participant);

        if (topic === "classroom-chat-control" && message.type === "chat-status" && senderRole === "teacher" && typeof message.enabled === "boolean") {
          setChatEnabled(message.enabled);
          if (!message.enabled) setTab("board");
        }

        if (topic === BOARD_CONTROL_TOPIC && message.type === "board-request" && role === "teacher" && senderRole !== "teacher") {
          setRequests((old) => old.some((item) => item.identity === participant.identity)
            ? old
            : [...old, { identity: participant.identity, name: participant.name || "دانش‌آموز" }]);
        }

        if (topic === BOARD_CONTROL_TOPIC && message.type === "board-permission" && senderRole === "teacher" && typeof message.identity === "string") {
          const allowed = Boolean(message.allowed);
          setPermissions((old) => ({ ...old, [message.identity as string]: allowed }));
          if (message.identity === localParticipant.identity) {
            setBoardAllowed(allowed);
            setRequestSent(false);
            setNotice(allowed ? "معلم اجازهٔ نوشتن روی تخته را داد." : "اجازهٔ نوشتن روی تخته صادر نشد یا لغو شد.");
          }
        }

        if (topic === BOARD_DATA_TOPIC && message.type === "board-segment" && message.segment) {
          const allowedSender = senderRole === "teacher" || permissionsRef.current[participant.identity] === true;
          if (!allowedSender) return;
          setSegments((old) => [...old.slice(-2499), message.segment as Segment]);
        }

        if (topic === BOARD_DATA_TOPIC && message.type === "board-clear" && senderRole === "teacher") {
          setSegments([]);
        }
      } catch {
        // Ignore invalid or oversized control messages.
      }
    };

    room.on(RoomEvent.DataReceived, onData);
    const broadcastChatStatus = () => {
      if (role !== "teacher") return;
      const status = new TextEncoder().encode(JSON.stringify({ type: "chat-status", enabled: chatEnabled }));
      void room.localParticipant.publishData(status, { reliable: true, topic: "classroom-chat-control" }).catch(() => undefined);
    };
    room.on(RoomEvent.ParticipantConnected, broadcastChatStatus);
    broadcastChatStatus();

    room.registerByteStreamHandler(FILE_TOPIC, async (reader, participantInfo) => {
      const info = reader.info;
      const sender = room.getParticipantByIdentity(participantInfo.identity);
      if (participantRole(sender) !== "teacher") {
        for await (const _chunk of reader) { /* drain rejected sender stream */ }
        return;
      }

      const chunks: Uint8Array[] = [];
      try {
        for await (const chunk of reader) chunks.push(chunk);
      } catch {
        setNotice("دریافت فایل کامل نشد؛ از معلم بخواه دوباره ارسال کند.");
        return;
      }

      const safeBlobParts: BlobPart[] = chunks.map((chunk) => {
        const copy = new Uint8Array(chunk.byteLength);
        copy.set(chunk);
        return copy.buffer;
      });
      const blob = new Blob(safeBlobParts, {
        type: info.mimeType || "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      objectUrls.current.push(url);
      setFiles((old) => [...old.slice(-19), {
        id: info.id,
        name: info.name || "فایل کلاس",
        size: blob.size,
        mimeType: blob.type,
        url,
        sender: sender?.name || "معلم",
      }]);
      setNotice(`فایل «${info.name || "فایل کلاس"}» دریافت شد.`);
    });

    return () => {
      room.off(RoomEvent.DataReceived, onData);
      room.off(RoomEvent.ParticipantConnected, broadcastChatStatus);
      room.unregisterByteStreamHandler(FILE_TOPIC);
    };
  }, [room, role, localParticipant.identity, chatEnabled]);

  useEffect(() => () => {
    for (const url of objectUrls.current) URL.revokeObjectURL(url);
  }, []);

  async function sendControl(message: Record<string, unknown>) {
    const payload = new TextEncoder().encode(JSON.stringify(message));
    await room.localParticipant.publishData(payload, {
      reliable: true,
      topic: BOARD_CONTROL_TOPIC,
    });
  }

  async function toggleChatAvailability() {
    if (role !== "teacher") return;
    const next = !chatEnabled;
    try {
      const payload = new TextEncoder().encode(JSON.stringify({ type: "chat-status", enabled: next }));
      await room.localParticipant.publishData(payload, { reliable: true, topic: "classroom-chat-control" });
      setChatEnabled(next);
      if (!next) setTab("board");
      setNotice(next ? "چت برای اعضای کلاس باز شد." : "چت برای اعضای کلاس بسته شد.");
    } catch {
      setNotice("تغییر وضعیت چت ارسال نشد.");
    }
  }

  async function submitChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!chatEnabled || !chatDraft.trim() || isSending) return;
    try {
      await send(chatDraft.trim());
      setChatDraft("");
    } catch {
      setNotice("ارسال پیام چت ناموفق بود.");
    }
  }

  async function requestBoard() {
    try {
      await sendControl({ type: "board-request" });
      setRequestSent(true);
      setNotice("درخواست نوشتن روی تخته برای معلم ارسال شد.");
    } catch {
      setNotice("ارسال درخواست تخته ناموفق بود.");
    }
  }

  async function decideBoardPermission(identity: string, allowed: boolean) {
    try {
      await sendControl({ type: "board-permission", identity, allowed });
      setPermissions((old) => ({ ...old, [identity]: allowed }));
      setRequests((old) => old.filter((item) => item.identity !== identity));
      setNotice(allowed ? "اجازهٔ نوشتن صادر شد." : "درخواست رد شد.");
    } catch {
      setNotice("ارسال تصمیم معلم ناموفق بود.");
    }
  }

  function canvasPoint(event: PointerEvent<HTMLCanvasElement>): Point {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
    };
  }

  async function publishSegment(id: string, points: Point[], chunk: number) {
    if (!points.length) return;
    const segment: Segment = {
      id: `${id}-${chunk}`,
      points,
      color,
      width: brushSize / Math.max(1, canvasRef.current?.clientWidth || 800),
      tool,
      identity: localParticipant.identity,
    };
    setSegments((old) => [...old.slice(-2499), segment]);
    try {
      const payload = new TextEncoder().encode(JSON.stringify({ type: "board-segment", segment }));
      await room.localParticipant.publishData(payload, {
        reliable: true,
        topic: BOARD_DATA_TOPIC,
      });
    } catch {
      setNotice("ارتباط تخته کند است؛ بخشی از خط ممکن است ارسال نشده باشد.");
    }
  }

  function startDrawing(event: PointerEvent<HTMLCanvasElement>) {
    if (!boardAllowed) {
      setNotice("برای نوشتن، ابتدا از معلم اجازه بگیر.");
      return;
    }
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    activeStroke.current = {
      id: typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      points: [canvasPoint(event)],
      chunk: 0,
    };
  }

  function continueDrawing(event: PointerEvent<HTMLCanvasElement>) {
    const active = activeStroke.current;
    if (!active || !boardAllowed) return;
    active.points.push(canvasPoint(event));
    if (active.points.length >= 9) {
      const batch = active.points.slice();
      const last = batch[batch.length - 1];
      const strokeId = active.id;
      const chunk = active.chunk++;
      active.points = [last];
      void publishSegment(strokeId, batch, chunk);
    }
  }

  function stopDrawing(event: PointerEvent<HTMLCanvasElement>) {
    const active = activeStroke.current;
    if (!active) return;
    const points = active.points.slice();
    const id = active.id;
    const chunk = active.chunk;
    activeStroke.current = null;
    if (points.length) void publishSegment(id, points, chunk);
    try { event.currentTarget.releasePointerCapture(event.pointerId); } catch { /* pointer already released */ }
  }

  async function clearBoard() {
    if (role !== "teacher") return;
    setSegments([]);
    try {
      const payload = new TextEncoder().encode(JSON.stringify({ type: "board-clear" }));
      await room.localParticipant.publishData(payload, {
        reliable: true,
        topic: BOARD_DATA_TOPIC,
      });
    } catch {
      setNotice("پاک‌کردن تخته به همهٔ اعضا ارسال نشد.");
    }
  }

  async function uploadFile(file?: File) {
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setNotice("حجم فایل نباید بیشتر از ۱۵ مگابایت باشد.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setNotice("در حال ارسال فایل برای اعضای حاضر در کلاس...");
    try {
      await room.localParticipant.sendFile(file, {
        topic: FILE_TOPIC,
        onProgress: (progress) => setUploadProgress(Math.min(100, Math.round(progress * 100))),
      });
      const url = URL.createObjectURL(file);
      objectUrls.current.push(url);
      setFiles((old) => [...old.slice(-19), {
        id: `local-${Date.now()}`,
        name: file.name,
        size: file.size,
        mimeType: file.type || "application/octet-stream",
        url,
        sender: "شما (معلم)",
      }]);
      setNotice("فایل برای اعضای متصل ارسال شد.");
    } catch {
      setNotice("ارسال فایل ناموفق بود. اینترنت یا حجم فایل را بررسی کن.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  const formatSize = (bytes: number) => bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} کیلوبایت`
    : `${(bytes / (1024 * 1024)).toFixed(1)} مگابایت`;

  return (
    <div className="classroom-tools-root" dir="rtl">
      <button className="classroom-tools-launcher" type="button" onClick={() => setPanelOpen((v) => !v)}>
        {panelOpen ? "بستن ابزارها" : "✏️ تخته و فایل‌های کلاس"}
      </button>

      {panelOpen && (
        <section className="classroom-tools-panel" aria-label="ابزارهای کلاس">
          <header className="classroom-tools-heading">
            <strong>ابزارهای کلاس</strong>
            <button type="button" aria-label="بستن ابزارها" onClick={() => setPanelOpen(false)}>✕</button>
          </header>

          <nav className="classroom-tools-tabs">
            <button type="button" className={tab === "board" ? "active" : ""} onClick={() => setTab("board")}>تختهٔ مشترک</button>
            <button type="button" className={tab === "files" ? "active" : ""} onClick={() => setTab("files")}>فایل‌های کلاس ({files.length})</button>
            <button type="button" className={tab === "chat" ? "active" : ""} onClick={() => setTab("chat")}>گفت‌وگو {chatEnabled ? "" : "(بسته)"}</button>
            {role === "teacher" && <button type="button" className="classroom-chat-admin" onClick={() => void toggleChatAvailability()}>{chatEnabled ? "بستن چت برای همه" : "بازکردن چت برای همه"}</button>}
          </nav>

          {tab === "board" && (
            <div className="classroom-board-content">
              <div className="classroom-board-toolbar">
                {role === "student" && !boardAllowed && (
                  <button type="button" disabled={requestSent} onClick={() => void requestBoard()}>
                    {requestSent ? "در انتظار اجازهٔ معلم" : "درخواست اجازهٔ نوشتن"}
                  </button>
                )}
                {boardAllowed && (
                  <>
                    <button type="button" className={tool === "pen" ? "active" : ""} onClick={() => setTool("pen")}>✏️ قلم</button>
                    <button type="button" className={tool === "eraser" ? "active" : ""} onClick={() => setTool("eraser")}>🧽 پاک‌کن</button>
                    <label className="board-color-label">رنگ <input aria-label="رنگ قلم" type="color" value={color} onChange={(event) => setColor(event.target.value)} disabled={tool === "eraser"} /></label>
                    <label className="board-size-label">ضخامت <input aria-label="ضخامت قلم" type="range" min="2" max="14" value={brushSize} onChange={(event) => setBrushSize(Number(event.target.value))} /></label>
                    {role === "teacher" && <button type="button" className="board-clear-button" onClick={() => void clearBoard()}>پاک‌کردن تخته</button>}
                  </>
                )}
              </div>

              {role === "teacher" && requests.length > 0 && (
                <div className="classroom-board-requests">
                  <strong>درخواست نوشتن دانش‌آموزان</strong>
                  {requests.map((request) => (
                    <div className="classroom-board-request" key={request.identity}>
                      <span>{request.name}</span>
                      <button type="button" onClick={() => void decideBoardPermission(request.identity, true)}>اجازه</button>
                      <button type="button" className="reject" onClick={() => void decideBoardPermission(request.identity, false)}>رد</button>
                    </div>
                  ))}
                </div>
              )}

              <div className={`classroom-board-canvas-wrap ${!boardAllowed ? "read-only" : ""}`}>
                <canvas
                  ref={canvasRef}
                  className="classroom-board-canvas"
                  aria-label="تختهٔ مشترک کلاس"
                  onPointerDown={startDrawing}
                  onPointerMove={continueDrawing}
                  onPointerUp={stopDrawing}
                  onPointerCancel={stopDrawing}
                />
                {!boardAllowed && <span className="classroom-board-readonly-note">برای نوشتن باید معلم اجازه بدهد.</span>}
              </div>
            </div>
          )}

          {tab === "files" && (
            <div className="classroom-files-content">
              {role === "teacher" && (
                <div className="classroom-file-uploader">
                  <input ref={fileInputRef} type="file" onChange={(event) => void uploadFile(event.target.files?.[0])} disabled={uploading} />
                  <p>فایل تا ۱۵ مگابایت برای اعضای حاضر در کلاس ارسال می‌شود.</p>
                  {uploading && <progress max={100} value={uploadProgress}>{uploadProgress}%</progress>}
                  {uploading && <span>{uploadProgress}%</span>}
                </div>
              )}

              {files.length === 0 ? (
                <p className="classroom-files-empty">هنوز فایلی در این جلسه دریافت نشده است.</p>
              ) : (
                <div className="classroom-file-list">
                  {files.map((file) => (
                    <article className="classroom-file-item" key={file.id}>
                      <div className="classroom-file-icon">📎</div>
                      <div className="classroom-file-info">
                        <strong>{file.name}</strong>
                        <span>{formatSize(file.size)} · {file.sender}</span>
                      </div>
                      <a href={file.url} download={file.name}>دریافت</a>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "chat" && (
            <div className="classroom-chat-content">
              {!chatEnabled ? (
                <p className="classroom-files-empty">معلم گفت‌وگوی کلاس را بسته است.</p>
              ) : (
                <>
                  <div className="classroom-chat-list" aria-live="polite">
                    {chatMessages.length === 0 && <p className="classroom-files-empty">هنوز پیامی ارسال نشده است.</p>}
                    {chatMessages.map((message, index) => (
                      <article className="classroom-chat-message" key={message.id ?? `${message.timestamp}-${index}`}>
                        <strong>{message.from?.name || message.from?.identity || "شرکت‌کننده"}</strong>
                        <p>{message.message}</p>
                      </article>
                    ))}
                  </div>
                  <form className="classroom-chat-form" onSubmit={submitChat}>
                    <input value={chatDraft} onChange={(event) => setChatDraft(event.target.value)} maxLength={1000} placeholder="پیام خود را بنویس..." />
                    <button type="submit" disabled={isSending || !chatDraft.trim()}>ارسال</button>
                  </form>
                </>
              )}
            </div>
          )}

          {notice && <p className="classroom-tools-notice" role="status">{notice}</p>}
        </section>
      )}
    </div>
  );
}
