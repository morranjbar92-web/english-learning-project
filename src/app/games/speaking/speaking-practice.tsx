"use client";
import { awardActivity } from "../../../lib/linguapro-rewards";

// LINGUAPRO_SPEAKING_PRACTICE_COMPONENT_V1

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Grade = 7 | 8 | 9;
type Prompt = {
  id: string;
  grade: Grade;
  title: string;
  titleFa: string;
  prompt: string;
  guiding: string[];
  challenge: string;
  seconds: number;
  level: string;
};

type ProgressItem = { score: number; at: string; seconds: number; words: number };

// Prompt-only design: no model answer, sentence template, or script is provided.
const PROMPTS: Prompt[] = [
  { id: "g7-daily-life", grade: 7, title: "A Day in My Life", titleFa: "یک روز از زندگی من", prompt: "Describe a usual school day in your life. Speak in your own words.", guiding: ["morning and getting ready", "school and favourite subject", "after-school activities", "one thing you would like to change"], challenge: "Compare a school day with a weekend.", seconds: 45, level: "متوسط" },
  { id: "g7-family", grade: 7, title: "People in My Family", titleFa: "آدم‌های خانوادهٔ من", prompt: "Talk about people in your family and what makes each person special.", guiding: ["people you want to describe", "one activity you do together", "a quality you admire", "how you help each other"], challenge: "Explain how your family spends time together when everyone is busy.", seconds: 45, level: "متوسط" },
  { id: "g7-free-time", grade: 7, title: "How I Spend My Free Time", titleFa: "اوقات فراغت من", prompt: "Talk about the activities you enjoy in your free time and why you like them.", guiding: ["one or two activities", "when and where you do them", "who joins you", "what you learn from them"], challenge: "Compare an indoor activity with an outdoor activity.", seconds: 45, level: "متوسط" },
  { id: "g7-favourite-place", grade: 7, title: "A Favourite Place", titleFa: "مکان موردعلاقهٔ من", prompt: "Describe a place where you like to spend time. Do not read a prepared text.", guiding: ["where it is", "what it looks and feels like", "what you do there", "why you choose this place"], challenge: "Imagine this place changes. What would you miss most?", seconds: 45, level: "متوسط" },
  { id: "g7-food", grade: 7, title: "Food I Enjoy", titleFa: "غذایی که دوست دارم", prompt: "Talk about food you enjoy and how people in your home prepare or share it.", guiding: ["a favourite meal", "ingredients or taste", "when you eat it", "a food you would like to try"], challenge: "Explain why people in different places may eat different foods.", seconds: 45, level: "متوسط" },
  { id: "g7-school", grade: 7, title: "My School", titleFa: "مدرسهٔ من", prompt: "Describe your school experience and what helps students learn well.", guiding: ["a place at school", "a subject or activity", "teachers and classmates", "one improvement you suggest"], challenge: "Choose one school rule you would keep and explain why.", seconds: 60, level: "متوسط رو به سخت" },
  { id: "g7-weekend", grade: 7, title: "My Ideal Weekend", titleFa: "آخر هفتهٔ ایده‌آل من", prompt: "Describe an ideal weekend from the beginning to the end.", guiding: ["where you would go", "who would be with you", "what you would do", "how you would feel afterwards"], challenge: "Your plans are cancelled because of rain. What would you do instead?", seconds: 60, level: "متوسط رو به سخت" },
  { id: "g7-new-skill", grade: 7, title: "A Skill I Want to Learn", titleFa: "مهارتی که می‌خواهم یاد بگیرم", prompt: "Talk about a skill you want to learn and how you could practise it.", guiding: ["the skill", "why it interests you", "what equipment or help you need", "how you could measure progress"], challenge: "Explain what might be difficult at the beginning.", seconds: 60, level: "متوسط رو به سخت" },
  { id: "g8-problem", grade: 8, title: "A Problem I Solved", titleFa: "مشکلی که حل کردم", prompt: "Describe a problem you faced and explain how you tried to solve it.", guiding: ["what the problem was", "the choices you considered", "what you did first", "the result and what you learned"], challenge: "Would you make the same decision again? Give a reason.", seconds: 60, level: "سخت" },
  { id: "g8-teamwork", grade: 8, title: "Working as a Team", titleFa: "کار گروهی", prompt: "Explain what makes a team work well, using an example from school, sport, or daily life.", guiding: ["a shared goal", "different roles", "how the group communicates", "how disagreement can be solved"], challenge: "What should a team do when one member does not help?", seconds: 60, level: "سخت" },
  { id: "g8-technology", grade: 8, title: "Technology in My Life", titleFa: "فناوری در زندگی من", prompt: "Discuss how technology helps you and when it can become a problem.", guiding: ["one useful tool", "a task it makes easier", "a possible distraction or risk", "a rule for using it wisely"], challenge: "Would you prefer one day without a phone or one day without the internet? Explain.", seconds: 60, level: "سخت" },
  { id: "g8-book-film", grade: 8, title: "A Story I Remember", titleFa: "داستانی که به یاد دارم", prompt: "Talk about a book, film, game story, or real event that stayed in your memory.", guiding: ["what it was", "the main person or event", "the part you remember most", "the idea or feeling it left with you"], challenge: "Would you change the ending or outcome? Why?", seconds: 60, level: "سخت" },
  { id: "g8-environment", grade: 8, title: "Helping the Environment", titleFa: "کمک به محیط زیست", prompt: "Explain a few practical ways students can reduce harm to the environment.", guiding: ["a local problem", "actions at home or school", "what needs cooperation", "which action should happen first"], challenge: "Convince a friend that a small action can still matter.", seconds: 60, level: "سخت" },
  { id: "g8-travel", grade: 8, title: "A Place I Would Like to Visit", titleFa: "جایی که دوست دارم ببینم", prompt: "Describe a place you would like to visit and plan what you would do there.", guiding: ["location and reasons", "what you want to see", "how you would prepare", "what could be challenging"], challenge: "Your budget is limited. Explain how you would choose your priorities.", seconds: 60, level: "سخت" },
  { id: "g8-fairness", grade: 8, title: "What Makes Something Fair?", titleFa: "چه چیزی منصفانه است؟", prompt: "Describe a situation in which people might disagree about what is fair.", guiding: ["the situation", "two different points of view", "what information is important", "a fair way to decide"], challenge: "Can treating everyone the same sometimes be unfair? Explain your view.", seconds: 75, level: "سخت" },
  { id: "g8-habit", grade: 8, title: "A Habit Worth Changing", titleFa: "عادتی که ارزش تغییر دارد", prompt: "Talk about a habit people may want to change and suggest a realistic plan.", guiding: ["the habit and its effect", "why change is difficult", "a small first step", "how to stay motivated"], challenge: "What could someone do after making a mistake or missing a day?", seconds: 75, level: "سخت" },
  { id: "g9-ai", grade: 9, title: "Technology and Learning", titleFa: "فناوری و یادگیری", prompt: "Evaluate how digital tools can improve learning and where they may fall short.", guiding: ["two benefits", "one limitation or risk", "the role of teachers and students", "a balanced approach"], challenge: "Defend your view against one reasonable counterargument.", seconds: 75, level: "پیشرفته" },
  { id: "g9-decision", grade: 9, title: "A Decision That Changed My Mind", titleFa: "تصمیمی که نظرم را تغییر داد", prompt: "Describe a decision or experience that changed your opinion about something.", guiding: ["your original opinion", "new information or experience", "how you reconsidered it", "what you think now"], challenge: "How can people change their minds without feeling embarrassed?", seconds: 75, level: "پیشرفته" },
  { id: "g9-environment-policy", grade: 9, title: "Who Should Protect the Environment?", titleFa: "مسئولیت حفاظت از محیط زیست", prompt: "Discuss how responsibility for environmental problems should be shared.", guiding: ["individual choices", "schools and local communities", "businesses or governments", "a practical priority"], challenge: "Respond to the argument that individual actions are too small to matter.", seconds: 90, level: "پیشرفته" },
  { id: "g9-social-media", grade: 9, title: "Social Media: Connection or Pressure?", titleFa: "شبکه‌های اجتماعی؛ ارتباط یا فشار؟", prompt: "Give a balanced view of the effects of social media on teenagers.", guiding: ["one positive effect", "one negative effect", "influence on time or confidence", "healthy boundaries"], challenge: "Suggest how a school could teach responsible use without banning it.", seconds: 90, level: "پیشرفته" },
  { id: "g9-failure", grade: 9, title: "Learning from Failure", titleFa: "یادگرفتن از شکست", prompt: "Argue whether failure can be useful and explain when it may or may not help.", guiding: ["a type of failure", "what can be learned", "the importance of feedback", "how to try again differently"], challenge: "Explain why repeating the same action is not always learning from a mistake.", seconds: 90, level: "پیشرفته" },
  { id: "g9-future", grade: 9, title: "A Future I Hope to Build", titleFa: "آینده‌ای که می‌خواهم بسازم", prompt: "Describe a future goal and evaluate the steps needed to move towards it.", guiding: ["your goal and why it matters", "skills or knowledge needed", "possible obstacles", "a plan for the next month"], challenge: "How might your plan change if your first choice becomes impossible?", seconds: 90, level: "پیشرفته" },
  { id: "g9-community", grade: 9, title: "Improving My Community", titleFa: "بهتر کردن جامعهٔ اطرافم", prompt: "Identify one issue in a school or neighbourhood and propose a realistic improvement.", guiding: ["the issue and who it affects", "possible causes", "a practical proposal", "who needs to cooperate"], challenge: "Explain how you would know whether your idea had worked.", seconds: 90, level: "پیشرفته" },
  { id: "g9-opinion", grade: 9, title: "Defend an Opinion", titleFa: "دفاع از یک نظر", prompt: "Choose an opinion you hold about school life and defend it with clear reasons.", guiding: ["your main claim", "two reasons or examples", "a different point of view", "your final conclusion"], challenge: "Give the strongest counterargument you can think of, then respond to it.", seconds: 90, level: "پیشرفته" },
];

const RUBRIC = [
  "به موضوع و همهٔ بخش‌های سؤال پاسخ دادم",
  "جزئیات، دلیل یا مثال کافی آوردم",
  "ایده‌ها را منظم و مرتبط بیان کردم",
  "از واژگان و جمله‌های متنوع استفاده کردم",
  "صدایم قابل فهم بود و متن آماده نخواندم",
];

const STORAGE_KEY = "linguapro-speaking-practice-v1";

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

export default function SpeakingPractice({ backHref }: { backHref: string }) {
  const [grade, setGrade] = useState<Grade>(7);
  const [selectedId, setSelectedId] = useState("g7-daily-life");
  const [limit, setLimit] = useState(60);
  const [elapsed, setElapsed] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [recordingError, setRecordingError] = useState("");
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [transcribe, setTranscribe] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioName, setAudioName] = useState("");
  const [rubric, setRubric] = useState<Record<number, number>>({});
  const [progress, setProgress] = useState<Record<string, ProgressItem>>({});
  const [progressReady, setProgressReady] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const recognitionRef = useRef<any>(null);
  const recordingActiveRef = useRef(false);
  const progressCount = Object.keys(progress).length;

  const gradePrompts = useMemo(() => PROMPTS.filter((item) => item.grade === grade), [grade]);
  const activePrompt = useMemo(() => PROMPTS.find((item) => item.id === selectedId) ?? gradePrompts[0] ?? PROMPTS[0], [selectedId, gradePrompts]);
  const transcriptWords = useMemo(() => transcript.trim() ? transcript.trim().split(/\s+/).filter(Boolean).length : 0, [transcript]);
  const estimatedWpm = elapsed > 0 ? Math.round((transcriptWords / elapsed) * 60) : 0;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") setProgress(parsed);
      }
    } catch {
      // Progress persistence is optional; the practice itself continues.
    } finally {
      setProgressReady(true);
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setRecognitionSupported(Boolean(SR));
  }, []);

  useEffect(() => {
    if (!progressReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Private browsing may disable storage; do not block the lesson.
    }
  }, [progress, progressReady]);

  useEffect(() => {
    if (!isRecording) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isRecording]);

  const stopRecognition = useCallback(() => {
    recordingActiveRef.current = false;
    try { recognitionRef.current?.stop(); } catch { /* Recognition may already be stopped. */ }
    recognitionRef.current = null;
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    stopRecognition();
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      try { recorder.stop(); } catch { /* Ignore duplicate stop. */ }
    } else {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, [stopRecognition]);

  useEffect(() => {
    if (isRecording && elapsed >= limit) stopRecording();
  }, [elapsed, isRecording, limit, stopRecording]);

  useEffect(() => () => {
    stopRecognition();
    try {
      if (recorderRef.current && recorderRef.current.state !== "inactive") recorderRef.current.stop();
    } catch { /* Unmount cleanup. */ }
    streamRef.current?.getTracks().forEach((track) => track.stop());
  }, [stopRecognition]);

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  function chooseGrade(nextGrade: Grade) {
    if (isRecording) return;
    setGrade(nextGrade);
    const first = PROMPTS.find((item) => item.grade === nextGrade);
    if (first) resetForPrompt(first.id);
  }

  function resetForPrompt(nextId: string) {
    if (isRecording) stopRecording();
    setSelectedId(nextId);
    setElapsed(0);
    setTranscript("");
    setInterimTranscript("");
    setRecordingError("");
    setRubric({});
    setShowChallenge(false);
    setAudioName("");
    setAudioUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return "";
    });
  }

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setRecordingError("این مرورگر ضبط صدا را پشتیبانی نمی‌کند. از نسخهٔ به‌روز Chrome یا Edge استفاده کن؛ موضوع و چک‌لیست تمرین همچنان قابل استفاده‌اند.");
      return;
    }
    try {
      setRecordingError("");
      setTranscript("");
      setInterimTranscript("");
      setElapsed(0);
      setAudioName("");
      setAudioUrl((previous) => {
        if (previous) URL.revokeObjectURL(previous);
        return "";
      });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (blob.size > 0) {
          const url = URL.createObjectURL(blob);
          setAudioUrl((previous) => {
            if (previous) URL.revokeObjectURL(previous);
            return url;
          });
          setAudioName(`linguapro-speaking-${activePrompt.id}-${new Date().toISOString().slice(0, 10)}.webm`);
        }
        stream.getTracks().forEach((track) => track.stop());
        if (streamRef.current === stream) streamRef.current = null;
      };
      recorder.onerror = () => setRecordingError("ضبط صدا دچار خطا شد. اجازهٔ میکروفن و اتصال دستگاه را بررسی کن.");
      recorderRef.current = recorder;
      recorder.start(250);
      recordingActiveRef.current = true;
      setIsRecording(true);

      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (transcribe && SR) {
        try {
          const recognition = new SR();
          recognition.lang = "en-US";
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.onresult = (event: any) => {
            const finalParts: string[] = [];
            let interim = "";
            for (let index = event.resultIndex; index < event.results.length; index += 1) {
              const result = event.results[index];
              const heard = result?.[0]?.transcript ?? "";
              if (result?.isFinal) finalParts.push(heard.trim());
              else interim += heard;
            }
            if (finalParts.length) setTranscript((previous) => [previous, ...finalParts].filter(Boolean).join(" ").trim());
            setInterimTranscript(interim.trim());
          };
          recognition.onerror = (event: any) => {
            if (event?.error !== "no-speech" && event?.error !== "aborted") {
              setRecordingError("ضبط صدا ادامه دارد، اما تشخیص خودکار گفتار در این مرورگر در دسترس نیست. فایل صدا همچنان ذخیره می‌شود.");
            }
          };
          recognition.onend = () => setInterimTranscript("");
          recognitionRef.current = recognition;
          recognition.start();
        } catch {
          setRecordingError("ضبط صدا فعال است؛ تشخیص خودکار گفتار شروع نشد. می‌توانی صدایت را ضبط کنی و بعد گوش بدهی.");
        }
      } else if (transcribe && !SR) {
        setRecordingError("ضبط صدا فعال است؛ این مرورگر تبدیل گفتار به متن را پشتیبانی نمی‌کند.");
      }
    } catch (error) {
      const name = error instanceof Error ? error.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") setRecordingError("دسترسی میکروفن رد شد. کنار نوار آدرس مرورگر روی آیکون قفل بزن و اجازهٔ Microphone را فعال کن.");
      else setRecordingError("میکروفن در دسترس نیست. اتصال میکروفن و تنظیمات صدای ویندوز را بررسی کن.");
    }
  }

  function saveSelfAssessment() {
    const values = RUBRIC.map((_, index) => rubric[index]);
    if (values.some((value) => value === undefined)) {
      setRecordingError("برای ثبت ارزیابی، هر پنج معیار را از صفر تا دو انتخاب کن.");
      return;
    }
    const score = values.reduce((sum, value) => sum + Number(value), 0);
    setProgress((previous) => ({ ...previous, [activePrompt.id]: { score, at: new Date().toISOString(), seconds: elapsed, words: transcriptWords } }));
    void awardActivity("speaking_completed", activePrompt.id);
    setRecordingError("");
  }

  const currentProgress = progress[activePrompt.id];

  return (
    <main className="spk-page" dir="rtl">
      <div className="spk-shell">
        <a className="spk-back" href={backHref}>← بازگشت به آزمون‌های دست‌گرمی</a>
        <header className="spk-hero">
          <div className="spk-hero-badge">LINGUAPRO · SPEAKING LAB</div>
          <h1>🎙️ تمرین واقعی اسپیکینگ</h1>
          <p>متن آماده‌ای وجود ندارد. موضوع را بخوان، فکر کن و با کلمات خودت انگلیسی صحبت کن.</p>
          <div className="spk-hero-note"><span>🎯</span><span>هدف تمرین: بیان آزاد، توضیح دلیل‌ها و مثال‌ها، و صحبت پیوسته — نه روخوانی.</span></div>
          <div className="spk-hero-stats">
            <div><strong>۲۴</strong><span>موضوع گفتاری</span></div>
            <div><strong>۳</strong><span>پایهٔ تحصیلی</span></div>
            <div><strong>{progressCount}</strong><span>موضوع ارزیابی‌شده</span></div>
          </div>
        </header>

        <section className="spk-grade-panel" aria-label="انتخاب پایه">
          <div className="spk-section-title"><span>۱</span><div><h2>پایه و موضوع را انتخاب کن</h2><p>موضوع‌ها سخت‌تر می‌شوند؛ پاسخ آماده یا نمونه‌متن نمایش داده نمی‌شود.</p></div></div>
          <div className="spk-grade-switch">
            {([7, 8, 9] as Grade[]).map((value) => (
              <button type="button" key={value} disabled={isRecording} onClick={() => chooseGrade(value)} className={grade === value ? "active" : ""}>پایهٔ {value}</button>
            ))}
          </div>
          <div className="spk-topic-grid">
            {gradePrompts.map((item, index) => {
              const result = progress[item.id];
              return <button type="button" disabled={isRecording} key={item.id} className={`spk-topic-card ${selectedId === item.id ? "selected" : ""}`} onClick={() => resetForPrompt(item.id)}>
                <span className="spk-topic-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="spk-topic-level">{item.level}</span>
                <strong>{item.titleFa}</strong>
                <small>{item.seconds} ثانیه · {result ? `ارزیابی ${result.score}/10` : "تمرین جدید"}</small>
              </button>;
            })}
          </div>
        </section>

        <section className="spk-session" aria-label="تمرین گفتاری">
          <div className="spk-section-title"><span>۲</span><div><h2>حالا خودت صحبت کن</h2><p>فقط موضوع و نکته‌های راهنما را می‌بینی؛ جمله‌سازی با خودت است.</p></div></div>
          <div className="spk-prompt-card">
            <div className="spk-prompt-meta"><span>پایهٔ {activePrompt.grade}</span><span>{activePrompt.level}</span><span>زمان پیشنهادی: {activePrompt.seconds} ثانیه</span></div>
            <h2>{activePrompt.titleFa}</h2>
            <p className="spk-prompt-en" lang="en" dir="ltr">{activePrompt.prompt}</p>
            <div className="spk-guiding">
              <h3>برای ایده‌پردازی به این نکته‌ها فکر کن</h3>
              <ul>{activePrompt.guiding.map((point) => <li key={point}>{point}</li>)}</ul>
              <p>این‌ها فقط سرنخ‌اند، نه جمله‌های آماده؛ لازم نیست همه را به همین ترتیب بگویی.</p>
            </div>
            <button className="spk-challenge-toggle" type="button" onClick={() => setShowChallenge((previous) => !previous)}>{showChallenge ? "پنهان‌کردن چالش اضافه" : "نمایش چالش اضافه (اختیاری)"}</button>
            {showChallenge && <div className="spk-challenge" lang="en" dir="ltr">{activePrompt.challenge}</div>}
            <div className="spk-limit-row"><label htmlFor="spk-limit">مدت ضبط</label><select id="spk-limit" disabled={isRecording} value={limit} onChange={(event) => setLimit(Number(event.target.value))}><option value={45}>۴۵ ثانیه</option><option value={60}>۶۰ ثانیه</option><option value={90}>۹۰ ثانیه</option><option value={120}>۲ دقیقه</option></select><button type="button" className="spk-read-prompt" onClick={() => { if ("speechSynthesis" in window) { window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(activePrompt.prompt); utterance.lang = "en-US"; utterance.rate = 0.82; window.speechSynthesis.speak(utterance); } else setRecordingError("پخش صوتی پرسش در این مرورگر پشتیبانی نمی‌شود."); }}>🔊 شنیدن پرسش انگلیسی</button></div>
          </div>

          <div className="spk-recorder-card">
            <div className={`spk-record-indicator ${isRecording ? "live" : ""}`}><span />{isRecording ? "در حال ضبط صدای تو" : "آمادهٔ ضبط"}</div>
            <div className="spk-timer" aria-live="polite">{formatTime(elapsed)}<small> / {formatTime(limit)}</small></div>
            <p className="spk-record-instruction">وقتی آماده‌ای شروع کن؛ لازم نیست پاسخ را از قبل بنویسی یا حفظ کنی.</p>
            <label className="spk-transcribe-option"><input type="checkbox" checked={transcribe} disabled={isRecording} onChange={(event) => setTranscribe(event.target.checked)} /><span><strong>تبدیل اختیاری گفتار به متن</strong><small>با روشن‌کردن این گزینه، قابلیت تشخیص گفتار مرورگر فعال می‌شود و ممکن است گفتار توسط سرویس آن پردازش شود.</small></span></label>
            <div className="spk-record-actions">
              {!isRecording ? <button type="button" className="spk-start" onClick={startRecording}>● شروع صحبت و ضبط</button> : <button type="button" className="spk-stop" onClick={stopRecording}>■ پایان ضبط</button>}
              {isRecording && <span className="spk-live-hint">آزادانه صحبت کن؛ می‌توانی مکث کوتاه داشته باشی.</span>}
            </div>
            {recordingError && <div className="spk-error" role="status">{recordingError}</div>}
            {!recognitionSupported && <div className="spk-browser-note">مرورگر این دستگاه ممکن است تبدیل گفتار به متن را پشتیبانی نکند؛ ضبط و بازپخش صدا جداگانه کار می‌کند.</div>}
            {audioUrl && <div className="spk-audio-review"><h3>به صحبت خودت گوش بده</h3><audio controls src={audioUrl}>مرورگر شما پخش صوت را پشتیبانی نمی‌کند.</audio><a href={audioUrl} download={audioName || "linguapro-speaking.webm"}>⬇ دانلود فایل صدای من</a><p>فایل فقط در همین مرورگر ساخته می‌شود؛ به سرور ارسال نمی‌شود.</p></div>}
          </div>

          <div className="spk-transcript-card">
            <div className="spk-transcript-head"><div><h3>متنی که مرورگر از صدایت تشخیص داد</h3><p>این متن فقط برای بازبینی حرف‌های خودت است؛ پاسخ نمونه یا متن پیشنهادی نیست.</p></div><span className="spk-word-count">{transcriptWords} کلمه</span></div>
            <div className="spk-transcript" lang="en" dir="ltr">{transcript || interimTranscript ? <>{transcript}{transcript && interimTranscript ? " " : ""}<span>{interimTranscript}</span></> : <span className="placeholder">{transcribe ? "بعد از صحبت، اگر مرورگر پشتیبانی کند، گفتارت اینجا نمایش داده می‌شود." : "برای نمایش متن گفتارت، گزینهٔ تبدیل گفتار به متن را روشن کن؛ این گزینه اختیاری است."}</span>}</div>
            {transcriptWords > 0 && <div className="spk-transcript-stats"><span>تعداد کلمات: {transcriptWords}</span><span>سرعت تقریبی گفتار: {estimatedWpm} کلمه در دقیقه</span></div>}
            <p className="spk-disclaimer">تشخیص گفتار ممکن است کلمات را اشتباه ثبت کند و اگر گزینهٔ تبدیل متن روشن باشد، ممکن است سرویس مرورگر گفتار را پردازش کند. فایل ضبط‌شده به سرور LinguaPro ارسال نمی‌شود. این ابزار تلفظ را به‌صورت تخصصی نمره‌دهی نمی‌کند.</p>
          </div>
        </section>

        <section className="spk-review-panel">
          <div className="spk-section-title"><span>۳</span><div><h2>ارزیابی اجرای خودت</h2><p>به هر معیار از ۰ تا ۲ امتیاز بده؛ این نمره خودارزیابی است، نه نمرهٔ هوش مصنوعی.</p></div></div>
          <div className="spk-rubric-list">
            {RUBRIC.map((criterion, index) => <div className="spk-rubric-row" key={criterion}><p>{criterion}</p><div role="group" aria-label={criterion}>{([0, 1, 2] as number[]).map((value) => <button type="button" key={value} aria-pressed={rubric[index] === value} className={rubric[index] === value ? "selected" : ""} onClick={() => setRubric((previous) => ({ ...previous, [index]: value }))}>{value === 0 ? "هنوز نه" : value === 1 ? "تاحدی" : "خوب"}<small>{value}</small></button>)}</div></div>)}
          </div>
          <div className="spk-score-row"><button type="button" className="spk-save-score" onClick={saveSelfAssessment}>ثبت ارزیابی من</button>{currentProgress && <div className="spk-score-result"><strong>{currentProgress.score} از ۱۰</strong><span>آخرین ارزیابی این موضوع · {currentProgress.words} کلمهٔ تشخیص‌داده‌شده</span></div>}</div>
          <div className="spk-next-tip"><strong>برای دور بعد:</strong> سعی کن به‌جای جواب کوتاه، یک دلیل و یک مثال اضافه کنی و در پایان نتیجه‌گیری کنی؛ اما پاسخ را با زبان خودت بساز.</div>
        </section>
        <footer className="spk-footer">تمرین اسپیکینگ LinguaPro · صدای ضبط‌شده در مرورگر می‌ماند و بدون اقدام خودت جایی بارگذاری نمی‌شود.</footer>
      </div>
    </main>
  );
}
