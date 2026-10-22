"use client";

import { useEffect, useMemo, useState } from "react";
import { writingCategories, writingLessons } from "./writing-data";

type Props = { root: string };
const STORAGE_KEY = "linguapro-writing-completed-v1";
const GRADE_KEY = "linguapro-writing-grade-v1";
const faNum = (n: number) => n.toLocaleString("fa-IR");

export default function WritingHome({ root }: Props) {
  const [grade, setGrade] = useState("7");
  const [category, setCategory] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const savedGrade = localStorage.getItem(GRADE_KEY);
      if (savedGrade && ["7", "8", "9"].includes(savedGrade)) setGrade(savedGrade);
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setCompleted(saved.filter((x): x is string => typeof x === "string"));
    } catch { /* progress is optional */ }
  }, []);

  const gradeLessons = useMemo(() => writingLessons.filter(l => String(l.grade) === grade), [grade]);
  const shownLessons = useMemo(() => gradeLessons.filter(l =>
    (!category || l.category === category) &&
    (l.title + " " + l.faTitle + " " + l.goal).toLowerCase().includes(search.trim().toLowerCase())
  ), [gradeLessons, category, search]);
  const gradeComplete = gradeLessons.filter(l => completed.includes(l.slug)).length;

  function changeGrade(value: string) {
    setGrade(value); setCategory(null); setSearch("");
    try { localStorage.setItem(GRADE_KEY, value); } catch { /* local storage is optional */ }
  }

  return <main className="writing-page" dir="rtl"><div className="writing-shell">
    <header className="writing-topbar">
      <a className="writing-brand" href={root + "/"} aria-label="بازگشت به صفحهٔ اصلی"><span className="writing-brand-icon">✍</span><span><strong>LinguaPro</strong><small>آزمایشگاه مهارت نوشتن</small></span></a>
      <div className="writing-grade-picker"><label htmlFor="writing-grade">پایه</label><select id="writing-grade" value={grade} onChange={e => changeGrade(e.target.value)}><option value="7">هفتم</option><option value="8">هشتم</option><option value="9">نهم</option></select></div>
    </header>
    <section className="writing-hero"><div className="writing-hero-copy"><span className="writing-eyebrow">PLAN · WRITE · IMPROVE</span><h1>از جمله تا نوشتهٔ قوی ✍️</h1><p>مهارت نوشتن را قدم‌به‌قدم یاد بگیر؛ نمونه را بررسی کن، راهنما را دنبال کن و نوشتهٔ خودت را بساز.</p><div className="writing-hero-stats"><span><strong>{faNum(gradeLessons.length)}</strong> درس</span><span><strong>{faNum(gradeComplete)}</strong> تکمیل‌شده</span><span><strong>{faNum(Math.round(gradeComplete / Math.max(1, gradeLessons.length) * 100))}٪</strong> پیشرفت</span></div></div><div className="writing-hero-art" aria-hidden="true"><span>✍️</span><i>ABC</i><b>✦</b></div></section>
    {!category ? <>
      <div className="writing-section-head"><div><span className="writing-kicker">WRITING PATH</span><h2>از کدام موضوع شروع کنیم؟</h2><p>پایهٔ {grade === "7" ? "هفتم" : grade === "8" ? "هشتم" : "نهم"} · هر درس همراه نمونه، راهنمای مرحله‌ای و تمرین پایانی است.</p></div><span className="writing-muted">۵ دستهٔ موضوعی</span></div>
      <section className="writing-category-grid">{writingCategories.map(c => {const count=gradeLessons.filter(l=>l.category===c.id).length;return <button type="button" className="writing-category-card" key={c.id} onClick={()=>setCategory(c.id)}><span className="writing-category-icon">{c.icon}</span><strong>{c.title}</strong><small>{c.description}</small><span className="writing-category-bottom">{faNum(count)} درس <b>←</b></span></button>;})}</section>
    </> : <>
      <div className="writing-section-head writing-topic-head"><div><span className="writing-kicker">LESSON LIBRARY</span><h2>{writingCategories.find(c=>c.id===category)?.title}</h2><p>برای ورود به درس، کارت آن را انتخاب کن.</p></div><button className="writing-back-button" type="button" onClick={()=>{setCategory(null);setSearch("")}}>← همهٔ دسته‌ها</button></div>
      <label className="writing-search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="جست‌وجوی موضوع یا درس…" /></label>
      {shownLessons.length ? <section className="writing-lesson-grid">{shownLessons.map((lesson,i)=>{const done=completed.includes(lesson.slug);return <a key={lesson.slug} className={`writing-lesson-card ${done?"is-complete":""}`} href={`${root}/writing/${lesson.slug}/`}><span className="writing-lesson-number">درس {faNum(i+1)}</span><span className="writing-lesson-status">{done?"✓ تکمیل‌شده":lesson.level}</span><h3>{lesson.title}</h3><p>{lesson.goal}</p><span className="writing-lesson-footer">{done?"مرور دوباره":"شروع درس"}<b>←</b></span></a>;})}</section> : <div className="writing-empty">در این دسته درسی با این جست‌وجو پیدا نشد.</div>}
    </>}
    <footer className="writing-footnote">پیشرفت و پیش‌نویس‌ها در مرورگر همین دستگاه ذخیره می‌شوند. بررسی خودکار به طول متن و اصول پایهٔ نگارش کمک می‌کند و جای ارزیابی کامل معنایی معلم را نمی‌گیرد.</footer>
  </div></main>;
}
