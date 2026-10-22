"use client";

import { useEffect, useMemo, useState } from "react";
import type { ListeningLesson } from "./listening-data";
import { listeningLessons } from "./listening-data";

type Props = { lesson: ListeningLesson; root: string };
const STORAGE_KEY = "linguapro-listening-completed-v1";
const norm = (s: string) => s.toLowerCase().normalize("NFKC").replace(/[’‘]/g, "'").replace(/[^a-z0-9\s']/g, " ").replace(/\s+/g, " ").trim();
const faNum = (n: number) => n.toLocaleString("fa-IR");

export default function ListeningLessonClient({ lesson, root }: Props) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [rate, setRate] = useState(0.82);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [phraseAnswer, setPhraseAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [audioStatus, setAudioStatus] = useState("آمادهٔ پخش");

  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); if (Array.isArray(saved)) setCompleted(saved.filter((x): x is string => typeof x === "string")); } catch { /* no local progress */ }
    return () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  }, []);

  const allInGrade = useMemo(() => listeningLessons.filter(l => l.grade === lesson.grade), [lesson.grade]);
  const nextLesson = allInGrade[(allInGrade.findIndex(l => l.slug === lesson.slug) + 1) % allInGrade.length];
  const isComplete = completed.includes(lesson.slug);
  const score = lesson.questions.reduce((n, q, i) => n + (answers[i] === q.answerIndex ? 1 : 0), 0);
  const phraseCorrect = norm(phraseAnswer) === norm(lesson.keyPhrase);
  const canFinish = checked && score >= 2 && phraseCorrect;

  function speak(rateValue: number) {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setAudioStatus("این مرورگر از پخش گفتار پشتیبانی نمی‌کند."); return;
    }
    const synth = window.speechSynthesis;
    synth.cancel(); setAudioStarted(true); setAudioStatus("در حال آماده‌سازی صدا…");
    const voices = synth.getVoices();
    const voice = voices.find(v => /^en-US/i.test(v.lang)) || voices.find(v => /^en-GB/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
    let idx = 0;
    const playNext = () => {
      if (idx >= lesson.turns.length) { setAudioStatus("پخش تمام شد؛ حالا به پرسش‌ها پاسخ بده."); return; }
      const turn = lesson.turns[idx++];
      const utterance = new SpeechSynthesisUtterance(turn.en);
      utterance.lang = voice?.lang || "en-US"; utterance.rate = rateValue; utterance.pitch = 1; if (voice) utterance.voice = voice;
      utterance.onstart = () => setAudioStatus(`در حال شنیدن بخش ${faNum(idx)} از ${faNum(lesson.turns.length)}`);
      utterance.onerror = () => setAudioStatus("پخش صدا متوقف شد؛ دوباره تلاش کن.");
      utterance.onend = () => window.setTimeout(playNext, 350);
      synth.speak(utterance);
    };
    playNext();
  }
  function stopAudio() { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); setAudioStatus("پخش متوقف شد."); }
  function showTranscript() { stopAudio(); setRevealed(true); }
  function checkAnswers() { setChecked(true); }
  function completeLesson() {
    if (!canFinish) return;
    const next = Array.from(new Set([...completed, lesson.slug]));
    setCompleted(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* local progress is optional */ }
  }

  return <main className="listening-page" dir="rtl"><div className="listening-shell listening-lesson-shell">
    <header className="listening-topbar"><a className="listening-brand" href={root + "/listening/"}><span className="listening-brand-icon">♫</span><span><strong>LinguaPro</strong><small>آزمایشگاه شنیداری</small></span></a><span className="listening-grade-badge">پایهٔ {lesson.grade === 7 ? "هفتم" : lesson.grade === 8 ? "هشتم" : "نهم"}</span></header>
    <a className="listening-back-link" href={root + "/listening/"}>← بازگشت به دسته‌بندی‌ها</a>
    <section className="listening-lesson-hero"><span className="listening-eyebrow">LISTENING LESSON · {lesson.level.toUpperCase()}</span><h1>{lesson.title}</h1><p>ابتدا مکالمه را بدون نگاه‌کردن به متن گوش کن. سپس معنی‌ها را مرور کن و تمرین پایانی را انجام بده.</p><div className="listening-lesson-meta"><span>🎧 شنیدن فعال</span><span>📘 {faNum(lesson.vocabulary.length)} واژه</span><span>✅ تمرین اجباری</span></div></section>

    <section className="listening-audio-card"><div className="listening-audio-visual"><span>♫</span><div><strong>گوش دادن به مکالمه</strong><small>متن تا زمان بازکردن دستی نمایش داده نمی‌شود.</small></div></div><div className="listening-audio-controls"><button className="listening-primary-button" type="button" onClick={() => speak(rate)}>▶ پخش مکالمه</button><button className="listening-secondary-button" type="button" onClick={() => speak(0.68)}>🐢 آهسته</button><button className="listening-secondary-button" type="button" onClick={stopAudio}>■ توقف</button><label className="listening-rate-control">سرعت<select value={rate} onChange={e => setRate(Number(e.target.value))}><option value={0.68}>خیلی آهسته</option><option value={0.82}>آهسته</option><option value={1}>عادی</option></select></label></div><p className="listening-audio-status" aria-live="polite">{audioStatus}</p><div className="listening-transcript-action"><button className="listening-text-toggle" type="button" onClick={() => revealed ? setRevealed(false) : showTranscript()}>{revealed ? "پنهان کردن متن و ترجمه" : "نمایش متن و ترجمهٔ فارسی"}</button></div></section>

    {revealed && <section className="listening-transcript"><div className="listening-section-head"><div><span className="listening-kicker">TRANSCRIPT</span><h2>متن مکالمه و ترجمه</h2></div><button type="button" className="listening-small-action" onClick={() => speak(rate)}>▶ شنیدن دوباره</button></div>{lesson.turns.map((t,i)=><article className="listening-turn" key={i}><div className="listening-turn-head"><b>{t.speaker}</b><button type="button" onClick={()=>{ if (!("speechSynthesis" in window)) return; window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(t.en); u.lang="en-US";u.rate=rate;window.speechSynthesis.speak(u); }}>🔊 شنیدن جمله</button></div><p className="listening-english-line" dir="ltr">{t.en}</p><p className="listening-persian-line">{t.fa}</p></article>)}</section>}

    <section className="listening-vocabulary"><div className="listening-section-head"><div><span className="listening-kicker">KEY WORDS</span><h2>واژه‌های مهم</h2></div><span className="listening-muted">با تلفظ</span></div><div className="listening-vocab-grid">{lesson.vocabulary.map(v=><article className="listening-vocab-card" key={v.word}><b dir="ltr">{v.word}</b><span>{v.meaning}</span><button type="button" onClick={()=>{if (!("speechSynthesis" in window)) return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(v.word);u.lang="en-US";u.rate=0.82;window.speechSynthesis.speak(u);}} aria-label={`شنیدن ${v.word}`}>🔊</button></article>)}</div></section>

    <section className="listening-quiz"><div className="listening-section-head"><div><span className="listening-kicker">FINAL PRACTICE</span><h2>تمرین پایانی درس</h2><p>برای تکمیل درس، دست‌کم ۲ پاسخ از ۳ سؤال را درست بده و عبارت شنیده‌شده را بنویس.</p></div></div><div className="listening-questions">{lesson.questions.map((q,i)=><fieldset className="listening-question" key={i}><legend><span>سؤال {faNum(i+1)}</span>{q.q}</legend><div className="listening-options">{q.options.map((opt,j)=><label className={`listening-option ${checked && j===q.answerIndex ? "is-correct" : checked && answers[i]===j && j!==q.answerIndex ? "is-wrong" : ""}`} key={opt}><input type="radio" name={`question-${i}`} checked={answers[i]===j} onChange={()=>{setAnswers(prev=>({...prev,[i]:j}));setChecked(false)}} />{opt}</label>)}</div></fieldset>)}</div><div className="listening-phrase-task"><label htmlFor="listening-phrase">عبارت شنیده‌شده را بنویس:</label><p>به صدا گوش کن و عبارت هدف را بدون نگاه‌کردن به متن وارد کن.</p><div className="listening-phrase-row"><button type="button" className="listening-secondary-button" onClick={()=>{if(!("speechSynthesis" in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(lesson.keyPhrase);u.lang="en-US";u.rate=rate;window.speechSynthesis.speak(u);}}>🔊 شنیدن عبارت</button><input id="listening-phrase" value={phraseAnswer} onChange={e=>{setPhraseAnswer(e.target.value);setChecked(false)}} placeholder="عبارت انگلیسی را اینجا بنویس" dir="ltr" disabled={checked && canFinish} /></div></div><div className="listening-quiz-actions"><button className="listening-primary-button" type="button" onClick={checkAnswers} disabled={Object.keys(answers).length!==lesson.questions.length || !phraseAnswer.trim()}>بررسی پاسخ‌ها</button>{checked && <div className={`listening-feedback ${score>=2 && phraseCorrect ? "success" : "retry"}`}><strong>{score>=2 && phraseCorrect ? "آفرین! درس را با موفقیت گذراندی." : "هنوز درس کامل نشده؛ پاسخ‌ها را مرور کن و دوباره تلاش کن."}</strong><span>امتیاز: {faNum(score)} از {faNum(lesson.questions.length)} · عبارت {phraseCorrect ? "درست" : "نیازمند اصلاح"}</span>{!phraseCorrect && <button type="button" className="listening-text-toggle" onClick={showTranscript}>نمایش متن برای مرور</button>}</div>}{checked && score>=2 && phraseCorrect && !isComplete && <button className="listening-finish-button" type="button" onClick={completeLesson}>✓ ثبت تکمیل درس</button>}{isComplete && <p className="listening-completed-note">✓ این درس قبلاً تکمیل شده است.</p>}</div></section>

    <nav className="listening-bottom-nav"><a className="listening-secondary-button" href={root+"/listening/"}>فهرست درس‌ها</a><a className="listening-primary-button" href={root+"/listening/"+nextLesson.slug+"/"}>درس بعدی: {nextLesson.title} ←</a></nav>
    <footer className="listening-footnote">پیشرفت این درس در مرورگر همین دستگاه ذخیره می‌شود. صدای گفتار را مرورگر تولید می‌کند؛ برای کیفیت بهتر، از مرورگر و صدای انگلیسی پشتیبانی‌شده استفاده کن.</footer>
  </div></main>;
}
