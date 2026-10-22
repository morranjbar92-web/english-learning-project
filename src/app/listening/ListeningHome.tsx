"use client";

import { useEffect, useMemo, useState } from "react";
import { listeningCategories, listeningLessons } from "./listening-data";

type Props = { root: string };
const STORAGE_KEY = "linguapro-listening-completed-v1";
const GRADE_KEY = "linguapro-listening-grade-v1";
const faNum = (n: number) => n.toLocaleString("fa-IR");

export default function ListeningHome({ root }: Props) {
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
    } catch { /* local progress is optional */ }
  }, []);

  const gradeLessons = useMemo(() => listeningLessons.filter(l => String(l.grade) === grade), [grade]);
  const shownLessons = useMemo(() => gradeLessons.filter(l =>
    (!category || l.category === category) &&
    (l.title + " " + l.goal + " " + l.place).toLowerCase().includes(search.trim().toLowerCase())
  ), [gradeLessons, category, search]);
  const gradeComplete = gradeLessons.filter(l => completed.includes(l.slug)).length;

  function changeGrade(value: string) {
    setGrade(value); setCategory(null); setSearch("");
    try { localStorage.setItem(GRADE_KEY, value); } catch { /* storage may be disabled */ }
  }

  return <main className="listening-page" dir="rtl">
    <div className="listening-shell">
      <header className="listening-topbar">
        <a className="listening-brand" href={root + "/"} aria-label="بازگشت به صفحه اصلی">
          <span className="listening-brand-icon">♫</span>
          <span><strong>LinguaPro</strong><small>آزمایشگاه شنیداری</small></span>
        </a>
        <div className="listening-grade-picker">
          <label htmlFor="listening-grade">پایه</label>
          <select id="listening-grade" value={grade} onChange={e => changeGrade(e.target.value)}>
            <option value="7">هفتم</option><option value="8">هشتم</option><option value="9">نهم</option>
          </select>
        </div>
      </header>

      <section className="listening-hero">
        <div className="listening-hero-copy">
          <span className="listening-eyebrow">LISTEN · UNDERSTAND · PRACTISE</span>
          <h1>گوش بده، متوجه شو، پیشرفت کن 🎧</h1>
          <p>درس‌های شنیداری مخصوص پایه {grade === "7" ? "هفتم" : grade === "8" ? "هشتم" : "نهم"}؛ ابتدا گوش کن، بعد متن را ببین و در پایان آموخته‌هایت را بسنج.</p>
          <div className="listening-hero-stats">
            <span><strong>{faNum(gradeLessons.length)}</strong> درس</span>
            <span><strong>{faNum(gradeComplete)}</strong> تکمیل‌شده</span>
            <span><strong>{faNum(Math.round(gradeComplete / Math.max(1, gradeLessons.length) * 100))}٪</strong> پیشرفت</span>
          </div>
        </div>
        <div className="listening-hero-art" aria-hidden="true"><span>🎧</span><i>♫</i><b>EN</b></div>
      </section>

      {!category ? <>
        <div className="listening-section-head"><div><span className="listening-kicker">CHOOSE A TOPIC</span><h2>از کدام موضوع شروع کنیم؟</h2></div><span className="listening-muted">۴ دستهٔ موضوعی</span></div>
        <section className="listening-category-grid">
          {listeningCategories.map(c => {
            const count = gradeLessons.filter(l => l.category === c.id).length;
            return <button type="button" className="listening-category-card" key={c.id} onClick={() => setCategory(c.id)}>
              <span className="listening-category-icon">{c.icon}</span><strong>{c.title}</strong><small>{c.description}</small>
              <span className="listening-category-bottom">{faNum(count)} درس <b>←</b></span>
            </button>;
          })}
        </section>
      </> : <>
        <div className="listening-section-head listening-topic-head">
          <div><span className="listening-kicker">LESSON LIBRARY</span><h2>{listeningCategories.find(c => c.id === category)?.title}</h2><p>برای ورود به درس، کارت آن را انتخاب کن.</p></div>
          <button className="listening-back-button" type="button" onClick={() => {setCategory(null);setSearch("")}}>← همهٔ دسته‌ها</button>
        </div>
        <label className="listening-search"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="جست‌وجوی موضوع یا درس..." /></label>
        {shownLessons.length ? <section className="listening-lesson-grid">
          {shownLessons.map((lesson, i) => {
            const done = completed.includes(lesson.slug);
            return <a key={lesson.slug} className={`listening-lesson-card ${done ? "is-complete" : ""}`} href={`${root}/listening/${lesson.slug}/`}>
              <span className="listening-lesson-number">درس {faNum(i + 1)}</span><span className="listening-lesson-status">{done ? "✓ تکمیل‌شده" : lesson.level}</span>
              <h3>{lesson.title}</h3><p>{lesson.goal.charAt(0).toUpperCase()+lesson.goal.slice(1)}.</p>
              <span className="listening-lesson-footer">{done ? "مرور دوباره" : "شروع درس"} <b>←</b></span>
            </a>;
          })}
        </section> : <div className="listening-empty">در این دسته درسی با این جست‌وجو پیدا نشد.</div>}
      </>}

      <footer className="listening-footnote">صدای درس با قابلیت گفتار انگلیسی مرورگر پخش می‌شود؛ کیفیت صدا به دستگاه و مرورگر بستگی دارد. متن انگلیسی تا زمان انتخاب «نمایش متن» پنهان می‌ماند.</footer>
    </div>
  </main>;
}
