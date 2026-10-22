"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { readingLessons, type ReadingLesson } from "./reading-data";
import "./reading.css";

type RecognitionAlternative = { transcript: string; confidence?: number };
type RecognitionResult = ArrayLike<RecognitionAlternative>;
type RecognitionEvent = { results: ArrayLike<RecognitionResult> };
type RecognitionError = { error?: string };
type RecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionError) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type RecognitionWindow = Window & {
  SpeechRecognition?: new () => RecognitionInstance;
  webkitSpeechRecognition?: new () => RecognitionInstance;
};

const PROGRESS_KEY = "linguapro-reading-practice-progress-v1";
const faNumber = (value: number) => value.toLocaleString("fa-IR");
const words = (value: string) => value.toLowerCase().replace(/[^a-z'\s]/g, " ").split(/\s+/).filter(Boolean);

function matchPercent(expected: string, spoken: string) {
  const left = words(expected);
  const right = words(spoken);
  if (!left.length || !right.length) return 0;
  let previous = new Array<number>(right.length + 1).fill(0);
  for (const targetWord of left) {
    const current = new Array<number>(right.length + 1).fill(0);
    for (let index = 0; index < right.length; index += 1) {
      current[index + 1] = targetWord === right[index]
        ? previous[index] + 1
        : Math.max(previous[index + 1], current[index]);
    }
    previous = current;
  }
  return Math.round((previous[right.length] / left.length) * 100);
}

function sentencesOf(text: string) {
  return text.match(/[^.!?]+[.!?]*/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [text];
}

export default function ReadingPractice({ root }: { root: string }) {
  const [grade, setGrade] = useState<7 | 8 | 9>(7);
  const [selectedId, setSelectedId] = useState("g7-school-morning");
  const [showTranslation, setShowTranslation] = useState(false);
  const [rate, setRate] = useState(0.78);
  const [completed, setCompleted] = useState<string[]>([]);
  const [progressReady, setProgressReady] = useState(false);
  const [speechStatus, setSpeechStatus] = useState("برای شروع، یک متن انتخاب کن.");
  const [recognizing, setRecognizing] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [selectedSentence, setSelectedSentence] = useState<number | null>(null);
  const recognitionRef = useRef<RecognitionInstance | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");
      if (Array.isArray(stored)) setCompleted(stored.filter((item): item is string => typeof item === "string"));
    } catch { /* progress is optional */ }
    setProgressReady(true);
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      recognitionRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!progressReady) return;
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed)); } catch { /* private browsing may block storage */ }
  }, [completed, progressReady]);

  const gradeLessons = useMemo(() => readingLessons.filter((lesson) => lesson.grade === grade), [grade]);
  const lesson: ReadingLesson = readingLessons.find((item) => item.id === selectedId && item.grade === grade) ?? gradeLessons[0] ?? readingLessons.find((item) => item.id === "g7-school-morning")!;
  const sentences = useMemo(() => sentencesOf(lesson.text), [lesson.text]);
  const completedInGrade = gradeLessons.filter((item) => completed.includes(item.id)).length;
  const readingScore = recognizedText ? matchPercent(lesson.text, recognizedText) : null;

  function chooseGrade(value: string) {
    const nextGrade = Number(value) as 7 | 8 | 9;
    setGrade(nextGrade);
    const first = readingLessons.find((item) => item.grade === nextGrade);
    if (first) setSelectedId(first.id);
    setShowTranslation(false);
    setRecognizedText("");
    setSpeechStatus("یک متن انتخاب کن و با صدای بلند بخوان.");
    setSelectedSentence(null);
  }

  function speak(text: string, speed = rate) {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setSpeechStatus("پخش گفتار در این مرورگر در دسترس نیست. متن را می‌توانی به‌صورت معمول بلند بخوانی.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((item) => /^en-US/i.test(item.lang)) || voices.find((item) => /^en-GB/i.test(item.lang)) || voices.find((item) => /^en/i.test(item.lang));
    utterance.lang = voice?.lang || "en-US";
    utterance.rate = speed;
    utterance.pitch = 1;
    if (voice) utterance.voice = voice;
    utterance.onstart = () => setSpeechStatus("در حال پخش نمونهٔ خواندن انگلیسی…");
    utterance.onend = () => setSpeechStatus("حالا خودت متن را با صدای بلند بخوان.");
    utterance.onerror = () => setSpeechStatus("پخش صدا متوقف شد؛ دوباره تلاش کن.");
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeechStatus("پخش متوقف شد.");
  }

  function startReadingCheck() {
    const host = window as RecognitionWindow;
    const Constructor = host.SpeechRecognition || host.webkitSpeechRecognition;
    if (!Constructor) {
      setSpeechStatus("این مرورگر ارزیابی خودکار بلندخوانی را پشتیبانی نمی‌کند. در Microsoft Edge یا Google Chrome امتحان کن؛ پخش نمونه و خواندن دستی همچنان قابل استفاده است.");
      return;
    }
    recognitionRef.current?.abort();
    setRecognizedText("");
    setSpeechStatus("میکروفن را اجازه بده و متن را با صدای بلند بخوان. برای پایان، دکمهٔ توقف را بزن.");
    const recognition = new Constructor();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const parts: string[] = [];
      for (let index = 0; index < event.results.length; index += 1) {
        const result = event.results[index];
        if (result?.[0]?.transcript) parts.push(result[0].transcript);
      }
      setRecognizedText(parts.join(" ").trim());
    };
    recognition.onerror = (event) => {
      setRecognizing(false);
      const message = event.error === "not-allowed" ? "اجازهٔ دسترسی به میکروفن داده نشد." : event.error === "no-speech" ? "صدایی تشخیص داده نشد؛ دوباره تلاش کن." : "تشخیص گفتار متوقف شد. دوباره تلاش کن.";
      setSpeechStatus(message);
    };
    recognition.onend = () => {
      setRecognizing(false);
      setSpeechStatus("بلندخوانی تمام شد. نتیجه، میزان تطبیق متن تشخیص‌داده‌شده با متن اصلی را نشان می‌دهد؛ این نمرهٔ دقیق تلفظ نیست.");
    };
    recognitionRef.current = recognition;
    try { recognition.start(); setRecognizing(true); }
    catch { setRecognizing(false); setSpeechStatus("میکروفن در دسترس نیست یا اجازه داده نشده است. تنظیمات مرورگر را بررسی کن."); }
  }

  function stopReadingCheck() {
    recognitionRef.current?.stop();
    setRecognizing(false);
  }

  function markCompleted() {
    setCompleted((current) => current.includes(lesson.id) ? current : [...current, lesson.id]);
  }

  function selectLesson(item: ReadingLesson) {
    if (recognizing) recognitionRef.current?.stop();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSelectedId(item.id);
    setShowTranslation(false);
    setRecognizedText("");
    setSpeechStatus("برای شروع، نمونه را گوش کن یا خودت متن را بخوان.");
    setSelectedSentence(null);
  }

  return (
    <main className="reading-practice-page" dir="rtl">
      <div className="reading-practice-shell">
        <a className="rp-back-link" href={root + "/games/"}>← بازگشت به آزمون‌های دست‌گرمی</a>

        <header className="rp-hero">
          <div className="rp-hero-copy">
            <span className="rp-eyebrow">LINGUAPRO · READ ALOUD LAB</span>
            <h1>تمرین ریدینگ و بلندخوانی</h1>
            <p>متن را گوش کن، جمله‌به‌جمله بخوان و در صورت پشتیبانی مرورگر، بلندخوانی خودت را بررسی کن.</p>
            <div className="rp-hero-tags"><span>🔊 تلفظ نمونه</span><span>📖 متن‌های پایهٔ ۷ تا ۹</span><span>🎙️ تمرین با میکروفن</span></div>
          </div>
          <div className="rp-hero-mark" aria-hidden="true">Aa<span>↗</span></div>
        </header>

        <section className="rp-control-strip" aria-label="انتخاب پایه و پیشرفت">
          <label className="rp-grade-picker">پایهٔ تحصیلی
            <select value={grade} onChange={(event) => chooseGrade(event.target.value)}>
              <option value="7">هفتم</option><option value="8">هشتم</option><option value="9">نهم</option>
            </select>
          </label>
          <div className="rp-progress-box"><div className="rp-progress-copy"><span>پیشرفت پایهٔ {grade === 7 ? "هفتم" : grade === 8 ? "هشتم" : "نهم"}</span><strong>{faNumber(completedInGrade)} از {faNumber(gradeLessons.length)} متن</strong></div><div className="rp-progress-track"><span style={{ width: `${gradeLessons.length ? completedInGrade / gradeLessons.length * 100 : 0}%` }} /></div></div>
          <span className="rp-mini-note">خواندن با صدای بلند، نه آزمون درک مطلب</span>
        </section>

        <div className="rp-workspace">
          <aside className="rp-list-panel">
            <div className="rp-list-title"><div><span className="rp-section-kicker">READING SET</span><h2>متن‌های این پایه</h2></div><span className="rp-count">{faNumber(gradeLessons.length)} متن</span></div>
            <div className="rp-lesson-list">
              {gradeLessons.map((item, index) => (
                <button type="button" className={`rp-lesson-item ${item.id === lesson.id ? "active" : ""}`} key={item.id} onClick={() => selectLesson(item)}>
                  <span className="rp-lesson-number">{completed.includes(item.id) ? "✓" : faNumber(index + 1)}</span>
                  <span className="rp-lesson-info"><strong>{item.title}</strong><small>{item.topic} · {item.level}</small></span>
                  <span className="rp-lesson-arrow">{item.id === lesson.id ? "●" : "‹"}</span>
                </button>
              ))}
            </div>
          </aside>

          <section className="rp-reading-panel" aria-live="polite">
            <div className="rp-reading-head"><div><span className="rp-section-kicker">READING {String(grade)}</span><h2>{lesson.title}</h2><p>{lesson.topic} <span>•</span> {lesson.level}</p></div><span className="rp-reading-icon">📖</span></div>

            <section className="rp-model-card">
              <div className="rp-model-label"><span className="rp-sound-badge">♫</span><div><strong>۱. اول به نمونه گوش کن</strong><small>به صدای کلمه‌ها و مکث بین جمله‌ها توجه کن.</small></div></div>
              <div className="rp-model-controls"><button type="button" className="rp-primary-button" onClick={() => speak(lesson.text)}>▶ پخش متن</button><button type="button" className="rp-secondary-button" onClick={() => speak(lesson.text, 0.62)}>🐢 خیلی آهسته</button><button type="button" className="rp-secondary-button" onClick={stopSpeech}>■ توقف</button><label>سرعت<select value={rate} onChange={(event) => setRate(Number(event.target.value))}><option value={0.62}>خیلی آهسته</option><option value={0.78}>آهسته</option><option value={1}>عادی</option></select></label></div>
              <p className="rp-status" role="status">{speechStatus}</p>
            </section>

            <section className="rp-text-card">
              <div className="rp-text-card-head"><div><strong>۲. خودت بخوان</strong><small>برای شنیدن و تمرین یک جمله، روی همان جمله بزن.</small></div><button type="button" className="rp-text-toggle" onClick={() => setShowTranslation((value) => !value)}>{showTranslation ? "پنهان کردن ترجمه" : "نمایش ترجمهٔ فارسی"}</button></div>
              <div className="rp-sentences" dir="ltr">
                {sentences.map((sentence, index) => <button key={`${lesson.id}-${index}`} type="button" className={`rp-sentence ${selectedSentence === index ? "selected" : ""}`} onClick={() => { setSelectedSentence(index); speak(sentence); }}><span>{index + 1}</span>{sentence}<b aria-hidden="true">🔊</b></button>)}
              </div>
              {showTranslation && <div className="rp-translation"><strong>ترجمهٔ متن</strong><p>{lesson.translation}</p></div>}
            </section>

            <section className="rp-vocab-section"><div className="rp-subsection-head"><div><span className="rp-section-kicker">USEFUL WORDS</span><h3>واژه‌های کمک‌کننده</h3></div><small>برای شنیدن تلفظ، روی بلندگو بزن.</small></div><div className="rp-vocabulary-grid">{lesson.vocabulary.map((item) => <button type="button" className="rp-vocab-chip" key={item.word} onClick={() => speak(item.word, 0.72)}><span dir="ltr">{item.word}</span><small>{item.meaning}</small><b>🔊</b></button>)}</div></section>

            <section className="rp-check-section"><div className="rp-check-header"><div><span className="rp-section-kicker">YOUR TURN</span><h3>۳. بلندخوانی خودت را بررسی کن</h3><p>روی شروع بزن، اجازهٔ میکروفن را بده و متن انگلیسی را با صدای بلند بخوان.</p></div><span className="rp-mic-icon">🎙️</span></div><div className="rp-check-actions">{!recognizing ? <button type="button" className="rp-primary-button" onClick={startReadingCheck}>🎙️ شروع بلندخوانی</button> : <button type="button" className="rp-stop-button" onClick={stopReadingCheck}>■ پایان بلندخوانی</button>}<button type="button" className="rp-secondary-button" onClick={() => { setRecognizedText(""); setSpeechStatus("نتیجه پاک شد؛ می‌توانی دوباره بخوانی."); }}>پاک‌کردن نتیجه</button></div>
              {recognizedText && <div className="rp-recognition-result"><div className="rp-score-ring"><strong>{faNumber(readingScore ?? 0)}٪</strong><small>تطبیق متن</small></div><div className="rp-transcript-result"><strong>آنچه مرورگر شنیده است</strong><p dir="ltr">{recognizedText}</p><small>این درصد فقط شباهت واژه‌های تشخیص‌داده‌شده به متن اصلی است و نمرهٔ دقیق تلفظ یا لهجه نیست.</small></div></div>}
              <div className="rp-check-tip">نکته: اگر میکروفن یا ارزیابی خودکار در دسترس نبود، نمونه را گوش کن و هر جمله را چند بار با صدای بلند تکرار کن.</div>
            </section>

            <footer className="rp-reading-footer"><span>{completed.includes(lesson.id) ? "✓ این متن را تمرین کرده‌ای." : "پس از خواندن متن، تمرین را ثبت کن."}</span><button type="button" className={completed.includes(lesson.id) ? "rp-completed-button" : "rp-primary-button"} onClick={markCompleted} disabled={completed.includes(lesson.id)}>{completed.includes(lesson.id) ? "✓ ثبت شده" : "✓ ثبت تمرین"}</button></footer>
          </section>
        </div>
        <footer className="rp-site-footer"><a href={root + "/games/"}>← آزمون‌های دست‌گرمی</a><a href={root + "/"}>صفحهٔ اصلی LinguaPro</a></footer>
      </div>
    </main>
  );
}
