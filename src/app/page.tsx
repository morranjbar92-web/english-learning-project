"use client";
import { awardActivity } from "../lib/linguapro-rewards";

import { useEffect, useState } from "react";
import { vocabularyWords } from "../data/vocabulary";

const courses = [
  {
    icon: "📚",
    title: "واژگان انگلیسی",
    subtitle: "لغت، معنی، تلفظ و املا",
    color: "violet",
    href: "/english-learning-project/vocabulary/",
  },
  {
    icon: "🧩",
    title: "گرامر کاربردی",
    subtitle: "یادگیری قدم‌به‌قدم قواعد",
    color: "blue",
    href: "/english-learning-project/grammar/",
  },
  {
    icon: "🎧",
    title: "مهارت شنیداری",
    subtitle: "درک مکالمه و فایل صوتی",
    color: "orange",
    href: "/english-learning-project/listening/",
  },
  {
    icon: "💬",
    title: "مکالمه انگلیسی",
    subtitle: "تمرین صحبت کردن",
    color: "green",
    href: "/english-learning-project/conversation/",
  },
  {
    icon: "📖",
    title: "درک مطلب",
    subtitle: "متن‌خوانی و پاسخ به سؤال",
    color: "pink",
    href: "/english-learning-project/reading-comprehension/",
  },
  {
    icon: "✍️",
    title: "مهارت نوشتن",
    subtitle: "از جمله تا متن انگلیسی",
    color: "cyan",
    href: "/english-learning-project/writing/",
  },
  {
    icon: "📝",
    title: "آزمون‌های دست‌گرمی",
    subtitle: "تمرین زبان با آزمون‌های تعاملی",
    color: "orange",
    href: "/english-learning-project/warmup-tests/",
  },
    {
      icon: "🎮",
      title: "بازی تعاملی",
      subtitle: "یادگیری با بازی و چالش‌های تعاملی",
      color: "violet",
      href: "/english-learning-project/games/",
    },
    {
      icon: "🕹️",
      title: "بازی گرافیکی",
      subtitle: "ورود به بازی گرافیکی مستقل",
      color: "blue",
      href: "/english-learning-project/gamsgrafic/",
    },
  
  
];

const STORAGE_KEYS = {
  saved: "linguapro-saved-words",
  learned: "linguapro-learned-words",
};

const VOCABULARY_GOAL = 5000;

const DAILY_QUESTIONS = [
  {
    type: "واژگان",
    difficulty: "آسان",
    question: "معنی کلمهٔ Beautiful چیست؟",
    options: ["بزرگ", "زیبا", "سریع", "خسته"],
    correctIndex: 1,
    explanation: "Beautiful یعنی زیبا یا قشنگ."
  },
  {
    type: "واژگان",
    difficulty: "آسان",
    question: "معنی کلمهٔ Quickly چیست؟",
    options: ["آهسته", "دیروز", "به‌سرعت", "همیشه"],
    correctIndex: 2,
    explanation: "Quickly یعنی به‌سرعت."
  },
  {
    type: "واژگان",
    difficulty: "آسان",
    question: "معنی کلمهٔ Hungry چیست؟",
    options: ["گرسنه", "تشنه", "شاد", "خواب‌آلود"],
    correctIndex: 0,
    explanation: "Hungry یعنی گرسنه."
  },
  {
    type: "واژگان",
    difficulty: "متوسط",
    question: "کدام واژه به معنی «تصمیم گرفتن» است؟",
    options: ["Discover", "Decide", "Describe", "Deliver"],
    correctIndex: 1,
    explanation: "Decide یعنی تصمیم گرفتن."
  },
  {
    type: "گرامر",
    difficulty: "آسان",
    question: "جای خالی را کامل کن: She ___ a student.",
    options: ["am", "are", "is", "be"],
    correctIndex: 2,
    explanation: "برای She در زمان حال ساده از is استفاده می‌کنیم."
  },
  {
    type: "گرامر",
    difficulty: "آسان",
    question: "جای خالی را کامل کن: They ___ football every day.",
    options: ["plays", "play", "playing", "is play"],
    correctIndex: 1,
    explanation: "با فاعل They فعل در زمان حال ساده بدون s می‌آید."
  },
  {
    type: "گرامر",
    difficulty: "متوسط",
    question: "گذشتهٔ فعل Go کدام است؟",
    options: ["Goed", "Gone", "Went", "Going"],
    correctIndex: 2,
    explanation: "گذشتهٔ سادهٔ فعل بی‌قاعدهٔ Go برابر Went است."
  },
  {
    type: "واژگان",
    difficulty: "متوسط",
    question: "متضاد کلمهٔ Difficult چیست؟",
    options: ["Hard", "Easy", "Strong", "Heavy"],
    correctIndex: 1,
    explanation: "Easy یعنی آسان و متضاد Difficult است."
  },
  {
    type: "واژگان",
    difficulty: "آسان",
    question: "معنی کلمهٔ Environment چیست؟",
    options: ["محیط زیست", "آزادی", "مسافرت", "تجربه"],
    correctIndex: 0,
    explanation: "Environment یعنی محیط یا محیط زیست."
  },
  {
    type: "گرامر",
    difficulty: "متوسط",
    question: "کدام جمله درست است؟",
    options: [
      "He don't like tea.",
      "He doesn't likes tea.",
      "He doesn't like tea.",
      "He not like tea."
    ],
    correctIndex: 2,
    explanation: "ساختار درست منفی برای He برابر doesn't + شکل سادهٔ فعل است."
  },
  {
    type: "واژگان",
    difficulty: "آسان",
    question: "معنی کلمهٔ Carefully چیست؟",
    options: ["با دقت", "با عصبانیت", "به‌ندرت", "ناگهان"],
    correctIndex: 0,
    explanation: "Carefully یعنی با دقت و مراقبت."
  },
  {
    type: "گرامر",
    difficulty: "متوسط",
    question: "جای خالی را کامل کن: I have lived here ___ 2020.",
    options: ["for", "since", "during", "from"],
    correctIndex: 1,
    explanation: "برای اشاره به زمان شروع مشخص از Since استفاده می‌کنیم."
  }
] as const;

export default function Home() {
  const [active, setActive] = useState("خانه");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [learned, setLearned] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [checked, setChecked] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const currentQuestion = DAILY_QUESTIONS[questionIndex];
  const [selectedLevel, setSelectedLevel] = useState("همه");
  const [selectedTopic, setSelectedTopic] = useState("همه");

  const navigation = [
    { name: "خانه", icon: "⌂", href: "#home" },
    { name: "آزمون‌های دست‌گرمی", icon: "📝", href: "/english-learning-project/warmup-tests/" },
    { name: "حساب کاربری", icon: "👤", href: "/english-learning-project/account/" },
    { name: "سکه‌ها و لیگ روزانه", icon: "🏆", href: "/english-learning-project/league/" },
    { name: "واژگان", icon: "▤", href: "/english-learning-project/vocabulary/" },
    { name: "گرامر", icon: "◈", href: "/english-learning-project/grammar/" },
    { name: "بازی تعاملی", icon: "🎮", href: "/english-learning-project/games/" },
    { name: "بازی گرافیکی", icon: "🕹️", href: "/english-learning-project/gamsgrafic/" },
    { name: "مکالمه انگلیسی", icon: "💬", href: "/english-learning-project/conversation/" },
    { name: "مهارت‌های زبان", icon: "◎", href: "#skills" },
    { name: "مهارت نوشتن", icon: "✍️", href: "/english-learning-project/writing/" },
    { name: "مهارت شنیداری", icon: "🎧", href: "/english-learning-project/listening/" },
    { name: "تمرین روزانه", icon: "✓", href: "#practice" },
    { name: "آزمون‌ها", icon: "▣", href: "#exams" },
    { name: "ساخت یا ورود به کلاس آنلاین", icon: "🎥", href: "/english-learning-project/classroom/" },
      { name: "درک مطلب", icon: "📖", href: "/english-learning-project/reading-comprehension/" },
];

  // بازیابی اطلاعات ذخیره‌شده پس از بازشدن صفحه
  useEffect(() => {
    try {
      const savedWords = localStorage.getItem(STORAGE_KEYS.saved);
      const learnedWords = localStorage.getItem(STORAGE_KEYS.learned);

      if (savedWords) {
        const parsed = JSON.parse(savedWords);
        if (Array.isArray(parsed)) setSaved(parsed);
      }

      if (learnedWords) {
        const parsed = JSON.parse(learnedWords);
        if (Array.isArray(parsed)) setLearned(parsed);
      }
    } catch {
      console.warn("بازیابی اطلاعات یادگیری انجام نشد.");
    } finally {
      setStorageReady(true);
    }
  }, []);

  // ذخیره اطلاعات در مرورگر
  useEffect(() => {
    if (!storageReady) return;

    try {
      localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(saved));
      localStorage.setItem(STORAGE_KEYS.learned, JSON.stringify(learned));
    } catch {
      console.warn("ذخیره اطلاعات یادگیری انجام نشد.");
    }
  }, [saved, learned, storageReady]);

  const topics = Array.from(
    new Set(vocabularyWords.map((word) => word.topic))
  ).sort();

  const filteredWords = vocabularyWords.filter((word) => {
    const searchableText = [
      word.word,
      word.meaning,
      word.type,
      word.example,
      word.topic,
      word.level,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(
      search.trim().toLowerCase()
    );

    const matchesLevel =
      selectedLevel === "همه" || word.level === selectedLevel;

    const matchesTopic =
      selectedTopic === "همه" || word.topic === selectedTopic;

    return matchesSearch && matchesLevel && matchesTopic;
  });

  const progressPercent = Math.min(
    100,
    Math.round((learned.length / VOCABULARY_GOAL) * 100)
  );

  const speakWord = (text: string) => {
    if (!("speechSynthesis" in window)) {
      alert("مرورگر شما از پخش تلفظ پشتیبانی نمی‌کند.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };
  const toggleSaved = (word: string) => {
    setSaved((previous) =>
      previous.includes(word)
        ? previous.filter((item) => item !== word)
        : [...previous, word]
    );
  };

  const toggleLearned = (word: string) => {
    if (!learned.includes(word)) void awardActivity("vocabulary_learned", word);
    setLearned((previous) =>
      previous.includes(word)
        ? previous.filter((item) => item !== word)
        : [...previous, word]
    );
  };

  return (
    <main className="app-shell" id="home">
      <aside className="sidebar">
        <a href="#home" className="brand">
          <span className="brand-mark">L</span>
          <span className="brand-copy">
            <strong>LinguaPro</strong>
            <small>یادگیری هوشمند زبان</small>
          </span>
        </a>

        <div className="side-label">منوی اصلی</div>

        <nav className="nav-list" aria-label="منوی اصلی">
          {navigation.map((item) => (
            <a
              href={item.href}
              key={item.name}
              className={`nav-link ${
                active === item.name ? "nav-active" : ""
              }`}
              onClick={() => setActive(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
              {item.name === "تمرین روزانه" && (
                <span className="nav-dot" />
              )}
            </a>
          ))}
        </nav>

        <div className="side-label side-label-spaced">
          حساب کاربری
        </div>


        <a className="nav-link" href="#exams">
          <span className="nav-icon">▧</span>
          <span>کلاس و آزمون</span>
        </a>

        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon">✦</span>
            <strong>هر روز یک قدم جلوتر!</strong>
            <p>با تمرین منظم، انگلیسی را بهتر یاد بگیر.</p>
            <a href="#practice">شروع یادگیری ←</a>
          </div>

          <div className="profile-row">
            <div className="avatar">ز</div>
            <div className="profile-info">
              <strong>زبان‌آموز</strong>
              <small>خوش آمدی!</small>
            </div>
            <span className="profile-menu">···</span>
          </div>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div className="breadcrumb">
            <span>خانه</span>
            <span className="crumb-sep">/</span>
            <strong>داشبورد یادگیری</strong>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  document
                    .getElementById("vocabulary")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                placeholder="جست‌وجوی لغت..."
                aria-label="جست‌وجوی لغت"
              />
              <kbd>جست‌وجو</kbd>
            </label>

            <button
              className="icon-button"
              aria-label="اعلان‌ها"
              title="اعلان‌ها"
              type="button"
            >
              ♧
            </button>

            <span className="language-pill">
              EN <span>↔</span> FA
            </span>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-star">✦</span>
                مسیر یادگیری تو از اینجا شروع می‌شود
              </div>

              <h1>
                سلام، به دنیای{" "}
                <span className="text-gradient">انگلیسی</span>{" "}
                خوش آمدی!
              </h1>

              <p className="welcome-description">
                یاد بگیر، تمرین کن و هر روز یک قدم به تسلط بر زبان
                انگلیسی نزدیک‌تر شو.
              </p>
            </div>

            <div className="date-chip">
              <span>◷</span> فضای یادگیری شخصی تو
            </div>
          </section>

          <section className="hero-banner">
            <div className="hero-orb orb-one" />
            <div className="hero-orb orb-two" />

            <div className="hero-copy">
              <div className="hero-badge">
                <span>✦</span> شروع یک مسیر تازه
              </div>

              <h2>
                انگلیسی را فقط یاد نگیر،
                <br />
                <span>زندگی‌اش کن!</span>
              </h2>

              <p>
                از اولین لغت تا مکالمه روان؛ قدم‌به‌قدم در کنار تو هستیم.
              </p>

              <div className="hero-actions">
                <a className="hero-button classroom-hero-button" href="/english-learning-project/classroom/">
                  ساخت یا ورود به کلاس آنلاین <span>←</span>
                </a>
<div className="hero-actions">
                <a className="hero-button classroom-hero-button" href="/english-learning-project/classroom/">
                  ساخت یا ورود به کلاس آنلاین <span>←</span>
                </a>
                <a className="hero-button" href="#courses">
                  کشف مسیر یادگیری <span>←</span>
                </a>
                <a
                  className="hero-button graphic-game-home-button"
                  href="/english-learning-project/gamsgrafic/"
                  aria-label="ورود مستقیم به بازی گرافیکی"
                  style={{
                    background: "linear-gradient(135deg, #f7d4ff 0%, #9be7ff 100%)",
                    color: "#24133f",
                    border: "1px solid rgba(255,255,255,.65)",
                    boxShadow: "0 10px 26px rgba(99,102,241,.24)",
                  }}
                >
                  🎮 بازی گرافیکی <span>←</span>
                </a>
              </div>
                <a
                  className="hero-button homepage-games-button"
                  href="/english-learning-project/games/arcade/"
                  aria-label="باز کردن بازی‌های زبان انگلیسی"
                >
                  🎮 بازی‌ها <span>←</span>
                </a>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="book-glow" />

              <div className="floating-card float-word">
                <span className="mini-spark">✦</span>
                <div>
                  <strong>Learn</strong>
                  <small>یاد گرفتن</small>
                </div>
              </div>

              <div className="book-emoji">📚</div>

              <div className="floating-card float-score">
                <span className="score-icon">↗</span>
                <div>
                  <strong>Keep going!</strong>
                  <small>به مسیرت ادامه بده</small>
                </div>
              </div>

              <div className="orbit orbit-a" />
              <div className="orbit orbit-b" />
            </div>

            <div className="hero-bottom-note">
              <span className="live-dot" /> هر روز بهتر از دیروز
            </div>
          </section>

          <section className="stats-grid" aria-label="آمار یادگیری">
            <article className="stat-card">
              <span className="stat-icon stat-violet">▤</span>
              <div>
                <span className="stat-label">واژگان بانک فعلی</span>
                <strong>
                  {vocabularyWords.length.toLocaleString("fa-IR")}{" "}
                  <small>لغت</small>
                </strong>
                <span className="stat-note">لغات موجود در بانک</span>
              </div>
              <span className="stat-decoration">Aa</span>
            </article>

            <article className="stat-card">
              <span className="stat-icon stat-orange">⚡</span>
              <div>
                <span className="stat-label">لغات یادگرفته‌شده</span>
                <strong>
                  {learned.length.toLocaleString("fa-IR")}{" "}
                  <small>لغت</small>
                </strong>
                <span className="stat-note">ادامه بده!</span>
              </div>
              <span className="stat-decoration">✓</span>
            </article>

            <article className="stat-card">
              <span className="stat-icon stat-green">♡</span>
              <div>
                <span className="stat-label">لغات ذخیره‌شده</span>
                <strong>
                  {saved.length.toLocaleString("fa-IR")}{" "}
                  <small>لغت</small>
                </strong>
                <span className="stat-note">دفتر لغات شخصی</span>
              </div>
              <span className="stat-decoration">♥</span>
            </article>

            <article className="stat-card">
              <span className="stat-icon stat-blue">◎</span>
              <div>
                <span className="stat-label">هدف واژگان</span>
                <strong>
                  {VOCABULARY_GOAL.toLocaleString("fa-IR")}{" "}
                  <small>لغت</small>
                </strong>
                <span className="stat-note">مسیر یادگیری تو</span>
              </div>
              <span className="stat-decoration">✦</span>
            </article>
          </section>

          <section className="section-block" id="courses">
            <div className="section-heading">
              <div>
                <span className="section-kicker">LEARNING PATH</span>
                <h2>مسیر یادگیری تو</h2>
                <p>مهارتت را انتخاب کن و از همین‌جا شروع کن.</p>
              </div>

              <a className="text-link" href="#skills">
                همه مهارت‌ها <span>←</span>
              </a>
            </div>

            <div className="courses-grid">
              {courses.map((course) => (
                <a
                  className="course-card"
                  href={course.href}
                  key={course.title}
                >
                  <div className={`course-icon ${course.color}`}>
                    {course.icon}
                  </div>

                  <span className="course-arrow">↖</span>
                  <h3>{course.title}</h3>
                  <p>{course.subtitle}</p>

                  <div className="course-footer">
                    <span>مشاهده بخش</span>
                    <span className="mini-arrow">←</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="lower-grid">
            

            {/* تمرین روزانه */}
            <div className="section-block practice-panel" id="practice">
              <div className="section-heading compact-heading">
                <div>
                  <span className="section-kicker">DAILY PRACTICE</span>
                  <h2>تمرین امروز</h2>
                  <p>هر بار یک سؤال تازه تمرین کن و پاسخ خودت را بررسی کن.</p>
                </div>
                <span className="practice-emoji">✍️</span>
              </div>

              <div className="practice-box">
                <div className="practice-label">
                  <span>تمرین {currentQuestion.type}</span>
                  <span className="difficulty">{currentQuestion.difficulty}</span>
                </div>

                <div className="practice-label">
                  <span>سؤال {questionIndex + 1} از {DAILY_QUESTIONS.length}</span>
                  <span>{Math.round(((questionIndex + 1) / DAILY_QUESTIONS.length) * 100)}٪</span>
                </div>

                <div
                  style={{
                    height: "6px",
                    background: "var(--border-color, #e9e7f2)",
                    borderRadius: "99px",
                    overflow: "hidden",
                    margin: "10px 0 20px"
                  }}
                >
                  <div
                    style={{
                      width: `${((questionIndex + 1) / DAILY_QUESTIONS.length) * 100}%`,
                      height: "100%",
                      background: "var(--primary, #7957d5)",
                      borderRadius: "99px",
                      transition: "width .25s ease"
                    }}
                  />
                </div>

                <h3>{currentQuestion.question}</h3>
                <p className="practice-hint">
                  یک گزینه انتخاب کن، سپس «بررسی پاسخ» را بزن.
                </p>

                <div className="answer-list">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={`${questionIndex}-${index}`}
                      type="button"
                      disabled={checked}
                      aria-pressed={selectedAnswer === index}
                      className={`answer-option ${
                        checked && index === currentQuestion.correctIndex
                          ? "correct"
                          : checked && selectedAnswer === index
                            ? "incorrect"
                            : selectedAnswer === index
                              ? "selected"
                              : ""
                      }`}
                      onClick={() => {
                        setSelectedAnswer(index);
                        setChecked(false);
                      }}
                    >
                      <span className="answer-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                      {checked && index === currentQuestion.correctIndex && (
                        <span className="answer-check">✓</span>
                      )}
                      {checked &&
                        selectedAnswer === index &&
                        index !== currentQuestion.correctIndex && (
                          <span className="answer-check">✕</span>
                        )}
                    </button>
                  ))}
                </div>

                {checked && (
                  <p
                    className={
                      selectedAnswer === currentQuestion.correctIndex
                        ? "feedback-success"
                        : "feedback-error"
                    }
                    role="status"
                  >
                    {selectedAnswer === currentQuestion.correctIndex
                      ? "آفرین! پاسخ تو درست است. "
                      : "این پاسخ درست نیست. پاسخ صحیح مشخص شده است. "}
                    {currentQuestion.explanation}
                  </p>
                )}

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "16px" }}>
                  {!checked ? (
                    <button
                      type="button"
                      className="check-answer"
                      disabled={selectedAnswer === null}
                      onClick={() => {
                        if (selectedAnswer !== null) {
                          setChecked(true);
                        }
                      }}
                    >
                      بررسی پاسخ <span>←</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="check-answer"
                      onClick={() => {
                        setQuestionIndex((previous) => (previous + 1) % DAILY_QUESTIONS.length);
                        setSelectedAnswer(null);
                        setChecked(false);
                      }}
                    >
                      سؤال بعدی <span>←</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* بخش‌های آموزشی آینده */}
          <section className="section-block future-section" id="grammar">
            <div className="section-heading compact-heading">
              <div>
                <span className="section-kicker">
                  COMING INTO THE LEARNING PATH
                </span>
                <h2>ادامه مسیر تو</h2>
                <p>
                  بخش‌های آموزشی در مراحل بعدی توسعه کامل می‌شوند.
                </p>
              </div>
            </div>

            <div className="future-grid" id="exams">
              <div className="future-card">
                <span>📝</span>
                <div>
                  <strong>آزمون آنلاین</strong>
                  <p>آزمون‌های موضوعی و تعیین سطح</p>
                </div>
                <span className="future-tag">در مسیر توسعه</span>
              </div>

              <a className="future-card" href="/english-learning-project/games/writing/grammar/" aria-label="ورود به گرامرینو PLUS">
  <span>🧠</span>
  <div>
    <strong>گرامر مرحله‌ای</strong>
    <p>آموزش قواعد با مثال و تمرین</p>
  </div>
  <span className="future-tag">ورود به گرامر ←</span>
</a>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}










