"use client";

import { useEffect, useMemo, useState } from "react";
import { vocabularyWords } from "../../data/vocabulary";

const SAVED_KEY = "linguapro-saved-words";
const LEARNED_KEY = "linguapro-learned-words";
const PAGE_SIZE = 50;
const VOCABULARY_GOAL = 5000;

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("همه");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [savedFilter, setSavedFilter] = useState("all");
  const [learnedFilter, setLearnedFilter] = useState("all");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [saved, setSaved] = useState<string[]>([]);
  const [learned, setLearned] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const savedValue = localStorage.getItem(SAVED_KEY);
      const learnedValue = localStorage.getItem(LEARNED_KEY);

      if (savedValue) {
        const parsed: unknown = JSON.parse(savedValue);
        if (Array.isArray(parsed)) {
          setSaved(parsed.filter((x): x is string => typeof x === "string"));
        }
      }

      if (learnedValue) {
        const parsed: unknown = JSON.parse(learnedValue);
        if (Array.isArray(parsed)) {
          setLearned(parsed.filter((x): x is string => typeof x === "string"));
        }
      }
    } catch {
      console.warn("بازیابی اطلاعات لغات انجام نشد.");
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;

    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
      localStorage.setItem(LEARNED_KEY, JSON.stringify(learned));
    } catch {
      console.warn("ذخیره اطلاعات لغات انجام نشد.");
    }
  }, [saved, learned, storageReady]);

  const topics = useMemo(
    () => Array.from(new Set(vocabularyWords.map((word) => word.topic))).sort(),
    []
  );

  const levels = useMemo(
    () => Array.from(new Set(vocabularyWords.map((word) => word.level))).sort(),
    []
  );

  const filteredWords = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return vocabularyWords.filter((word) => {
      const searchableText = [
        word.word,
        word.meaning,
        word.type,
        word.example,
        word.level,
        word.topic,
        word.phonetic,
      ].join(" ").toLocaleLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesLevel =
        level === "همه" || word.level === level;

      // اگر موضوعی انتخاب نشده باشد، همه موضوع‌ها نمایش داده می‌شوند.
      // انتخاب چند موضوع یعنی نمایش لغات هرکدام از آن موضوع‌ها.
      const matchesTopic =
        selectedTopics.length === 0 ||
        selectedTopics.includes(word.topic);

      const isSaved = saved.includes(word.word);
      const isLearned = learned.includes(word.word);

      const matchesSaved =
        savedFilter === "all" ||
        (savedFilter === "yes" ? isSaved : !isSaved);

      const matchesLearned =
        learnedFilter === "all" ||
        (learnedFilter === "yes" ? isLearned : !isLearned);

      return (
        matchesSearch &&
        matchesLevel &&
        matchesTopic &&
        matchesSaved &&
        matchesLearned
      );
    });
  }, [
    search,
    level,
    selectedTopics,
    savedFilter,
    learnedFilter,
    saved,
    learned,
  ]);

  const visibleWords = filteredWords.slice(0, limit);

  const progressPercent = Math.min(
    100,
    Math.round((learned.length / VOCABULARY_GOAL) * 100)
  );

  function speak(text: string) {
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;

    if (typeof synth === "undefined" || !synth) {
      alert("مرورگر شما از پخش تلفظ پشتیبانی نمی‌کند.");
      return;
    }

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.pitch = 1;
    synth.speak(utterance);
  }

  function toggleSaved(word: string) {
    setSaved((current) =>
      current.includes(word)
        ? current.filter((item) => item !== word)
        : [...current, word]
    );
  }

  function toggleLearned(word: string) {
    setLearned((current) =>
      current.includes(word)
        ? current.filter((item) => item !== word)
        : [...current, word]
    );
  }

  function resetFilters() {
    setSearch("");
    setLevel("همه");
    setSelectedTopics([]);
    setSavedFilter("all");
    setLearnedFilter("all");
    setLimit(PAGE_SIZE);
  }

  return (
    <main className="vocabulary-page" dir="rtl">
      <div className="vocabulary-shell">
        <header className="vocab-hero">
          <div className="vocab-breadcrumb">
            <a href="/">خانه</a>
            <span>›</span>
            <span>واژگان انگلیسی</span>
          </div>

          <h1>بانک واژگان انگلیسی</h1>
          <p>
            لغت را پیدا کن، معنی را بخوان و تلفظ و مثالش را بشنو.
          </p>

          <div className="vocab-stat-grid">
            <div>
              <strong>{vocabularyWords.length.toLocaleString("fa-IR")}</strong>
              <span>لغت در بانک</span>
            </div>
            <div>
              <strong>{saved.length.toLocaleString("fa-IR")}</strong>
              <span>لغت ذخیره‌شده</span>
            </div>
            <div>
              <strong>{learned.length.toLocaleString("fa-IR")}</strong>
              <span>لغت یادگرفته‌شده</span>
            </div>
          </div>

          <div className="vocab-progress-panel">
            <div className="vocab-progress-heading">
              <strong>مسیر پیشرفت تو</strong>
              <span>{progressPercent.toLocaleString("fa-IR")}٪</span>
            </div>

            <div
              className="vocab-progress-track"
              role="progressbar"
              aria-label="پیشرفت یادگیری لغات"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
            >
              <div
                className="vocab-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p>
              تا امروز {learned.length.toLocaleString("fa-IR")} لغت از
              {" "}۵۰۰۰ لغت را یاد گرفته‌ای.
            </p>
          </div>
        </header>

        <section className="vocab-filter-panel">
          <label className="vocab-search-field">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setLimit(PAGE_SIZE);
              }}
              placeholder="کلمه انگلیسی یا معنی فارسی را بنویس..."
              aria-label="جست‌وجو بر اساس کلمه انگلیسی یا معنی فارسی"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setLimit(PAGE_SIZE);
                }}
                aria-label="پاک کردن جست‌وجو"
              >
                ×
              </button>
            )}
          </label>

          <div className="vocab-controls-grid">
            <label className="vocab-select-label">
              <span>سطح زبان</span>
              <select
                value={level}
                onChange={(event) => {
                  setLevel(event.target.value);
                  setLimit(PAGE_SIZE);
                }}
              >
                <option value="همه">همه سطح‌ها</option>
                {levels.map((item) => (
                  <option value={item} key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="vocab-select-label">
              <span>وضعیت یادگیری</span>
              <select
                value={learnedFilter}
                onChange={(event) => {
                  setLearnedFilter(event.target.value);
                  setLimit(PAGE_SIZE);
                }}
              >
                <option value="all">همه لغات</option>
                <option value="yes">یادگرفته‌شده</option>
                <option value="no">یادنگرفته‌شده</option>
              </select>
            </label>

            <label className="vocab-select-label">
              <span>وضعیت ذخیره</span>
              <select
                value={savedFilter}
                onChange={(event) => {
                  setSavedFilter(event.target.value);
                  setLimit(PAGE_SIZE);
                }}
              >
                <option value="all">همه لغات</option>
                <option value="yes">ذخیره‌شده</option>
                <option value="no">ذخیره‌نشده</option>
              </select>
            </label>
          </div>

          <div className="vocab-topic-filter">
            <div className="vocab-topic-filter-title">
              <strong>فیلتر موضوع‌ها</strong>
              <small>برای انتخاب چند موضوع، روی چند دکمه بزن.</small>
            </div>

            <div className="vocab-topic-chip-list">
              <button
                type="button"
                className={`vocab-topic-chip ${
                  selectedTopics.length === 0 ? "active" : ""
                }`}
                aria-pressed={selectedTopics.length === 0}
                onClick={() => {
                  setSelectedTopics([]);
                  setLimit(PAGE_SIZE);
                }}
              >
                همه موضوع‌ها
              </button>

              {topics.map((item) => {
                const active = selectedTopics.includes(item);

                return (
                  <button
                    type="button"
                    key={item}
                    className={`vocab-topic-chip ${active ? "active" : ""}`}
                    aria-pressed={active}
                    onClick={() => {
                      setSelectedTopics((current) =>
                        current.includes(item)
                          ? current.filter((topic) => topic !== item)
                          : [...current, item]
                      );
                      setLimit(PAGE_SIZE);
                    }}
                  >
                    {active ? "✓ " : ""}{item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="vocab-filter-footer">
            <p className="vocab-count" aria-live="polite">
              {filteredWords.length.toLocaleString("fa-IR")} نتیجه
            </p>

            <button
              type="button"
              className="vocab-reset-button"
              onClick={resetFilters}
            >
              پاک‌کردن فیلترها
            </button>
          </div>
        </section>

        <section className="vocab-word-list" aria-label="فهرست واژگان">
          {visibleWords.map((word) => {
            const isSaved = saved.includes(word.word);
            const isLearned = learned.includes(word.word);

            return (
              <article className="vocab-card" key={word.word}>
                <div className="vocab-initial" dir="ltr">
                  {word.word.charAt(0).toUpperCase()}
                </div>

                <div className="vocab-card-main">
                  <div className="vocab-word-title" dir="ltr">
                    <h2>{word.word}</h2>

                    <button
                      type="button"
                      className="vocab-audio"
                      onClick={() => speak(word.word)}
                      aria-label={`شنیدن تلفظ ${word.word}`}
                    >
                      🔊 تلفظ
                    </button>

                    <span className="vocab-tag">{word.type}</span>
                    <span className="vocab-level">{word.level}</span>
                  </div>

                  <div className="vocab-phonetic" dir="ltr">
                    {word.phonetic}
                  </div>

                  <p className="vocab-meaning">{word.meaning}</p>

                  <div className="vocab-example">
                    <div className="vocab-example-top">
                      <span>مثال در جمله</span>
                      <button
                        type="button"
                        className="vocab-audio"
                        onClick={() => speak(word.example)}
                        aria-label={`شنیدن جمله مثال برای ${word.word}`}
                      >
                        🔊 شنیدن جمله
                      </button>
                    </div>

                    <p dir="ltr">{word.example}</p>
                  </div>

                  <div className="vocab-actions">
                    <button
                      type="button"
                      aria-pressed={isSaved}
                      className={`vocab-action ${isSaved ? "saved" : ""}`}
                      onClick={() => toggleSaved(word.word)}
                    >
                      {isSaved ? "♥ ذخیره‌شده" : "♡ ذخیره لغت"}
                    </button>

                    <button
                      type="button"
                      aria-pressed={isLearned}
                      className={`vocab-action ${isLearned ? "learned" : ""}`}
                      onClick={() => toggleLearned(word.word)}
                    >
                      {isLearned ? "✓ یاد گرفتم" : "علامت‌گذاری به‌عنوان یادگرفته‌شده"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          {filteredWords.length === 0 && (
            <div className="vocab-empty">
              <h2>لغتی پیدا نشد</h2>
              <p>جست‌وجو یا فیلترها را تغییر بده.</p>
              <button type="button" onClick={resetFilters}>
                پاک‌کردن فیلترها
              </button>
            </div>
          )}

          {limit < filteredWords.length && (
            <button
              type="button"
              className="vocab-load-more"
              onClick={() => setLimit((current) => current + PAGE_SIZE)}
            >
              نمایش لغات بیشتر
            </button>
          )}

          <p className="vocab-bottom-count">
            نمایش {Math.min(limit, filteredWords.length).toLocaleString("fa-IR")} از{" "}
            {filteredWords.length.toLocaleString("fa-IR")} لغت
          </p>
        </section>
      </div>
    </main>
  );
}

