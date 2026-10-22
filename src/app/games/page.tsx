"use client";

const root = "/english-learning-project";

const skills = [
  {
    icon: "🎧",
    name: "Listening",
    fa: "مهارت شنیداری",
    description: "شنیدن واژه‌ها، جمله‌ها و مکالمه‌های انگلیسی",
    ready: true
  },
  {
    icon: "🎙️",
    name: "Speaking",
    fa: "مهارت گفتاری",
    description: "تمرین مکالمه و بیان جمله‌ها",
    ready: false
  },
  {
    icon: "📖",
    name: "Reading",
    fa: "مهارت خواندن",
    description: "خواندن متن و درک معنی",
    ready: false
  },
  {
    icon: "✍️",
    name: "Writing",
    fa: "مهارت نوشتن",
    description: "تمرین گرامر، ساخت جمله و بازی کلمات",
    ready: true
  }
];

export default function GamesPage() {
  return (
    <main className="games-hub-page" dir="rtl">
      <div className="games-hub-shell">
        <a className="games-back-link" href={root + "/"}>
          ← بازگشت به صفحه اصلی
        </a>

        <header className="games-hub-hero">
          <span className="games-hub-eyebrow">LINGUAPRO · WARM-UP TESTS</span>
          <h1>📝 آزمون‌های دست‌گرمی زبان</h1>
          <p>مهارت موردنظرت را انتخاب کن و یادگیری را با بازی ادامه بده.</p>
        </header>

        <div className="games-skill-grid">
          {skills.map((skill) => (
            <article
              className={`games-skill-card ${skill.ready ? "is-ready" : "is-coming"}`}
              key={skill.name}
            >
              <span className="games-skill-icon">{skill.icon}</span>
              <h2>{skill.name}</h2>
              <h3>{skill.fa}</h3>
              <p>{skill.description}</p>

              {skill.ready ? (
                <a
                  className="games-primary-link"
                  href={root + (skill.name === "Listening" ? "/games/listening/" : skill.name === "Writing" ? "/writing/" : "/games/writing/")}
                >
                  {skill.name === "Listening" ? "ورود به Listening ←" : skill.name === "Writing" ? "ورود به مهارت نوشتن ←" : "ورود به Writing ←"}
                </a>
              ) : (
                <span className="games-coming-label">به‌زودی</span>
              )}
            </article>
          ))}
        </div>

        {/* LEXIVERSE ARCADE BUTTON START */}
        <section className="games-arcade-feature" aria-label="بازی‌های زبان انگلیسی">
          <div className="games-arcade-symbol" aria-hidden="true">🎮</div>
          <div className="games-arcade-copy">
            <span className="games-hub-eyebrow">LEXIVERSE · GAME UNIVERSE</span>
            <h2>بازی‌ها</h2>
            <p>وارد دنیای LEXIverse شو؛ واژگان، معماها و چالش‌های سرعتی زبان انگلیسی را بازی کن.</p>
          </div>
          <a className="games-primary-link games-arcade-action" href={root + "/games/arcade/"}>
            ورود به بازی‌ها ←
          </a>
        </section>
        {/* LEXIVERSE ARCADE BUTTON END */}      </div>
    </main>
  );
}



