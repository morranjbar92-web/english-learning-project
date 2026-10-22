"use client";

import { useEffect, useMemo, useState } from "react";
import type { WritingLesson } from "./writing-data";
import { writingLessons } from "./writing-data";
import { writingTeaching } from "./writing-teaching";

type Props = { lesson: WritingLesson; root: string };
const STORAGE_KEY = "linguapro-writing-completed-v1";
const DRAFT_KEY = "linguapro-writing-drafts-v1";
const faNum = (n: number) => n.toLocaleString("fa-IR");
const wordCount = (text: string) => text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
const hasCapital = (text: string) => /^[\s\"'“‘(]*[A-Z]/.test(text.trim());
const hasEnding = (text: string) => /[.!?\"'”’)]\s*$/.test(text.trim());
const sentenceCount = (text: string) => (text.match(/[.!?]+(?=\s|$)/g) || []).length;

export default function WritingLessonClient({ lesson, root }: Props) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [selfChecks, setSelfChecks] = useState<boolean[]>([false, false, false]);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(c)) setCompleted(c.filter((x): x is string => typeof x === "string"));
      const allDrafts = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
      if (allDrafts && typeof allDrafts[lesson.slug] === "string") setDraft(allDrafts[lesson.slug]);
    } catch { /* storage is optional */ }
  }, [lesson.slug]);

  const teaching = writingTeaching[lesson.slug];
  const sameGrade = useMemo(() => writingLessons.filter(l => l.grade === lesson.grade), [lesson.grade]);
  const currentIndex = sameGrade.findIndex(l => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? sameGrade[currentIndex - 1] : null;
  const nextLesson = sameGrade[(currentIndex + 1) % sameGrade.length];
  const isComplete = completed.includes(lesson.slug);
  const score = lesson.questions.reduce((n,q,i)=>n+(answers[i]===q.answerIndex?1:0),0);
  const words = wordCount(draft);
  const checks = [
    {label:`حداقل ${faNum(lesson.minWords)} واژه نوشته‌ام`,ok:words>=lesson.minWords,detail:`${faNum(words)} واژه`},
    {label:"جمله‌ها را با حرف بزرگ شروع کرده‌ام",ok:hasCapital(draft),detail:hasCapital(draft)?"بررسی شد":"حرف اول جمله را بررسی کن"},
    {label:"در پایان جمله‌ها نشانه‌گذاری گذاشته‌ام",ok:hasEnding(draft)&&sentenceCount(draft)>=2,detail:`${faNum(sentenceCount(draft))} جملهٔ نشانه‌گذاری‌شده`},
  ];
  const writingReady = checks.every(x=>x.ok) && selfChecks.every(Boolean);
  const canFinish = checked && score >= 2 && writingReady;

  function updateDraft(value:string) {
    setDraft(value);setChecked(false);setSavedMessage("");
    try { const old=JSON.parse(localStorage.getItem(DRAFT_KEY)||"{}");old[lesson.slug]=value;localStorage.setItem(DRAFT_KEY,JSON.stringify(old));setSavedMessage("پیش‌نویس ذخیره شد."); } catch { setSavedMessage("ذخیرهٔ خودکار در این مرورگر در دسترس نیست."); }
  }
  function evaluate() { setChecked(true); }
  function finish() {
    if(!canFinish)return;
    const next=Array.from(new Set([...completed,lesson.slug]));setCompleted(next);
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}catch{}
  }

  return <main className="writing-page" dir="rtl"><div className="writing-shell writing-lesson-shell">
    <header className="writing-topbar"><a className="writing-brand" href={root+"/writing/"}><span className="writing-brand-icon">✍</span><span><strong>LinguaPro</strong><small>آزمایشگاه مهارت نوشتن</small></span></a><span className="writing-grade-badge">پایهٔ {lesson.grade===7?"هفتم":lesson.grade===8?"هشتم":"نهم"}</span></header>
    <a className="writing-back-link" href={root+"/writing/"}>← بازگشت به دسته‌بندی‌ها</a>
    <section className="writing-lesson-hero"><span className="writing-eyebrow">WRITING LESSON · {lesson.level.toUpperCase()}</span><h1>{lesson.title}</h1><p>{lesson.goal}</p><div className="writing-lesson-meta"><span>🧭 راهنمای مرحله‌ای</span><span>📘 {faNum(lesson.vocabulary.length)} واژهٔ کلیدی</span><span>✅ تمرین پایانی اجباری</span></div></section>

    {teaching && <section className="writing-card writing-teaching-panel">
      <div className="writing-section-head writing-card-head"><div><span className="writing-kicker">LEARN BEFORE YOU WRITE</span><h2>آموزش این درس</h2><p>اول الگوها را یاد بگیر؛ بعد با کلمات خودت یک متن تازه بساز.</p></div><span className="writing-teaching-badge">🎓 آموزش کاربردی</span></div>
      <p className="writing-teaching-intro">{teaching.intro}</p>
      <div className="writing-teaching-block"><h3>۱. چطور متن را بسازم؟</h3><div className="writing-teach-steps">{teaching.steps.map((step,i)=><article className="writing-teach-step" key={step.title}><span className="writing-teach-number">{faNum(i+1)}</span><div><h4>{step.title}</h4><p>{step.detail}</p></div></article>)}</div></div>
      <div className="writing-teaching-block"><h3>۲. الگوهای جمله‌سازی</h3><div className="writing-teach-frames">{teaching.frames.map((frame,i)=><article className="writing-teach-frame" key={frame.en}><div className="writing-teach-frame-top"><span>{frame.note}</span><b>{faNum(i+1)}</b></div><p className="writing-teach-en" dir="ltr">{frame.en}</p><p className="writing-teach-fa">{frame.fa}</p></article>)}</div></div>
      <div className="writing-teaching-bottom-grid">
        <div className="writing-teaching-block"><h3>۳. عبارت‌های پیونددهنده</h3><div className="writing-teach-connectors">{teaching.connectors.map(item=><div className="writing-teach-connector" key={item.en}><b dir="ltr">{item.en}</b><span>{item.fa}</span></div>)}</div></div>
        <div className="writing-teaching-block"><h3>۴. اشتباه‌های رایج</h3><div className="writing-teach-mistakes">{teaching.mistakes.map(item=><article className="writing-teach-mistake" key={item.wrong}><div className="writing-teach-wrong"><span>نادرست</span><b dir="ltr">{item.wrong}</b></div><div className="writing-teach-right"><span>درست</span><b dir="ltr">{item.right}</b></div><p>{item.reason}</p></article>)}</div></div>
      </div>
    </section>}

    <section className="writing-card"><div className="writing-section-head writing-card-head"><div><span className="writing-kicker">YOUR WRITING TASK</span><h2>موضوع نوشته</h2></div><span className="writing-grade-badge">حداقل {faNum(lesson.minWords)} واژه</span></div><p className="writing-prompt">{lesson.prompt}</p><div className="writing-steps"><h3>مراحل پیشنهادی</h3><ol>{lesson.steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div></section>

    <section className="writing-card"><div className="writing-section-head writing-card-head"><div><span className="writing-kicker">MODEL TEXT</span><h2>نمونهٔ راهنما</h2><p>نمونه را برای یادگیری ساختار بخوان؛ نوشتهٔ خودت را با کپی‌کردن آن جایگزین نکن.</p></div><button className="writing-secondary-button" type="button" onClick={()=>setShowModel(v=>!v)}>{showModel?"پنهان کردن نمونه":"نمایش نمونه"}</button></div>{showModel&&<div className="writing-model"><h3>{lesson.faTitle}</h3><p className="writing-model-en" dir="ltr">{lesson.modelEn}</p><button className="writing-small-action" type="button" onClick={()=>setShowTranslation(v=>!v)}>{showTranslation?"پنهان کردن ترجمه":"نمایش ترجمهٔ فارسی"}</button>{showTranslation&&<p className="writing-model-fa">{lesson.modelFa}</p>}</div>}</section>

    <section className="writing-card"><div className="writing-section-head writing-card-head"><div><span className="writing-kicker">USEFUL WORDS</span><h2>واژه‌های کاربردی</h2></div></div><div className="writing-vocab-grid">{lesson.vocabulary.map(v=><article className="writing-vocab-card" key={v.word}><b dir="ltr">{v.word}</b><span>{v.meaning}</span></article>)}</div></section>

    <section className="writing-card"><div className="writing-section-head writing-card-head"><div><span className="writing-kicker">YOUR TURN</span><h2>نوشتهٔ خودت را بساز</h2><p>به انگلیسی بنویس. متن به‌صورت محلی در مرورگر ذخیره می‌شود.</p></div><span className="writing-word-count">{faNum(words)} واژه</span></div><textarea className="writing-draft-area" value={draft} onChange={e=>updateDraft(e.target.value)} dir="ltr" spellCheck placeholder="Start writing here…" aria-label="نوشتهٔ انگلیسی شما"/><div className="writing-draft-toolbar"><span>{savedMessage||"پیش‌نویس به صورت خودکار ذخیره می‌شود."}</span><button className="writing-secondary-button" type="button" onClick={()=>{updateDraft("");setSelfChecks([false,false,false]);}}>پاک کردن پیش‌نویس</button></div>
      <div className="writing-self-check"><h3>چک‌لیست بازبینی نوشته</h3><p>پیش از بررسی نهایی، این موارد را شخصاً کنترل کن.</p>{lesson.checklist.map((item,i)=><label key={item} className="writing-self-check-item"><input type="checkbox" checked={selfChecks[i]||false} onChange={e=>{const next=[...selfChecks];next[i]=e.target.checked;setSelfChecks(next);setChecked(false);}}/><span>{item}</span></label>)}</div>
      <div className="writing-mechanical-checks"><h3>بررسی اولیهٔ نوشته</h3>{checks.map(c=><div className={`writing-check-row ${c.ok?"is-ok":"is-pending"}`} key={c.label}><span>{c.ok?"✓":"○"}</span><b>{c.label}</b><small>{c.detail}</small></div>)}<p className="writing-note">این بررسی خودکار، طول متن و چند قاعدهٔ ظاهری را بررسی می‌کند؛ درستی کامل دستور زبان، معنا و کیفیت متن را مثل معلم ارزیابی نمی‌کند.</p></div>
    </section>

    <section className="writing-card writing-quiz"><div className="writing-section-head writing-card-head"><div><span className="writing-kicker">FINAL PRACTICE</span><h2>تمرین پایانی درس</h2><p>به سه پرسش پاسخ بده؛ برای ثبت تکمیل درس دست‌کم دو پاسخ درست و نوشتهٔ کامل لازم است.</p></div></div><div className="writing-questions">{lesson.questions.map((q,i)=><fieldset className="writing-question" key={i}><legend><span>سؤال {faNum(i+1)}</span>{q.q}</legend><div className="writing-options">{q.options.map((opt,j)=><label className={`writing-option ${checked&&j===q.answerIndex?"is-correct":checked&&answers[i]===j&&j!==q.answerIndex?"is-wrong":""}`} key={opt}><input type="radio" name={`writing-question-${i}`} checked={answers[i]===j} onChange={()=>{setAnswers(prev=>({...prev,[i]:j}));setChecked(false);}}/>{opt}</label>)}</div></fieldset>)}</div><div className="writing-quiz-actions"><button className="writing-primary-button" type="button" onClick={evaluate} disabled={Object.keys(answers).length!==lesson.questions.length}>بررسی پاسخ‌ها و نوشته</button>{checked&&<div className={`writing-feedback ${score>=2&&writingReady?"success":"retry"}`}><strong>{score>=2&&writingReady?"آفرین! شرایط تکمیل این درس را داری.":"درس هنوز کامل نشده؛ موارد ناتمام را بررسی و دوباره امتحان کن."}</strong><span>امتیاز پرسش‌ها: {faNum(score)} از {faNum(lesson.questions.length)} · بررسی قواعد نگارش: {writingReady?"تکمیل":"نیازمند بازبینی"}</span></div>}{checked&&canFinish&&!isComplete&&<button className="writing-finish-button" type="button" onClick={finish}>✓ ثبت تکمیل درس</button>}{isComplete&&<p className="writing-completed-note">✓ این درس قبلاً تکمیل شده است.</p>}</div></section>

    <nav className="writing-bottom-nav">{prevLesson?<a className="writing-secondary-button" href={root+"/writing/"+prevLesson.slug+"/"}>→ درس قبلی: {prevLesson.title}</a>:<a className="writing-secondary-button" href={root+"/writing/"}>فهرست درس‌ها</a>}<a className="writing-primary-button" href={root+"/writing/"+nextLesson.slug+"/"}>درس بعدی: {nextLesson.title} ←</a></nav>
    <footer className="writing-footnote">پیش‌نویس و پیشرفت در مرورگر همین دستگاه ذخیره می‌شوند. برای ارزیابی کامل معنی و کیفیت، بازخوانی یا بازخورد معلم همچنان مهم است.</footer>
  </div></main>;
}
