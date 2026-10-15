"use client";

const root = "/english-learning-project";

export default function WritingGamesPage() {
  return (
    <main className="games-hub-page" dir="rtl">
      <div className="games-hub-shell">
        <a className="games-back-link" href={root + "/games/"}>
          ← بازگشت به چهار مهارت
        </a>

        <header className="games-hub-hero">
          <span className="games-hub-eyebrow">WRITING · PRACTICE CENTER</span>
          <h1>✍️ مهارت نوشتن</h1>
          <p>بخش موردنظرت را انتخاب کن؛ هر بازی در صفحه‌ای جداگانه باز می‌شود.</p>
        </header>

        <div className="games-skill-grid games-writing-grid">
          <article className="games-skill-card is-ready">
            <span className="games-skill-icon">🧩</span>
            <h2>Grammar</h2>
            <h3>بازی‌ها و آموزش گرامر</h3>
            <p>درسنامه‌ها، تمرین‌ها، آزمون‌ها، بانک جمله و مأموریت‌های گرامری.</p>
            <a className="games-primary-link" href={root + "/games/writing/grammar/"}>
              ورود به Grammar ←
            </a>
          </article>

          <article className="games-skill-card is-ready words-game-card">
            <span className="games-skill-icon">🔤</span>
            <h2>Mini Games</h2>
            <h3>بازی‌های کلمات</h3>
            <p>چهارراه واژگان، جورچین جمله، حافظه، املا، شنیدار و شکار گنج.</p>
            <a className="games-primary-link" href={root + "/games/writing/words/"}>
              ورود به Mini Games ←
            </a>
          </article>
        </div>
      </div>
    </main>
  );
}
