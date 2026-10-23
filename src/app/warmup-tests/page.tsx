"use client";

// LINGUAPRO_WARMUP_TESTS_ROUTE_V1

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
    description: "تمرین صحبت آزاد؛ بدون متن آماده، با ضبط و بازبینی صدا",
    ready: true
  },
  {
    icon: "📖",
    name: "Reading",
    fa: "مهارت خواندن",
    description: "تمرین بلندخوانی و خواندن متن با صدای بلند",
    ready: true
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
                  href={root + (skill.name === "Listening" ? "/warmup-tests/listening/" : skill.name === "Speaking" ? "/warmup-tests/speaking/" : skill.name === "Reading" ? "/warmup-tests/reading/" : skill.name === "Writing" ? "/writing/" : "/games/writing/")}
                >
                  {skill.name === "Listening" ? "ورود به Listening ←" : skill.name === "Speaking" ? "شروع تمرین اسپیکینگ ←" : skill.name === "Reading" ? "شروع تمرین بلندخوانی ←" : skill.name === "Writing" ? "ورود به مهارت نوشتن ←" : "ورود به Writing ←"}
                </a>
              ) : (
                <span className="games-coming-label">به‌زودی</span>
              )}
            </article>
          ))}
        </div>      </div>
    </main>
  );
}



