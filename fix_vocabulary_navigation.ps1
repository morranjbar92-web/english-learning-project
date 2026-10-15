$ErrorActionPreference = 'Stop'

# Run this script from the root of the E:\english project.
$projectRoot = (Get-Location).Path
$homePath = Join-Path $projectRoot 'src\app\page.tsx'
$cssPath = Join-Path $projectRoot 'src\app\globals.css'
$routeDir = Join-Path $projectRoot 'src\app\vocabulary'
$routePath = Join-Path $routeDir 'page.tsx'
$dataPath = Join-Path $projectRoot 'src\data\vocabulary.ts'

foreach ($p in @($homePath, $cssPath, $dataPath)) {
    if (!(Test-Path $p)) { throw "Required project file not found: $p. Run this script from E:\english." }
}

function Test-ValidHomeFile([string]$path) {
    if (!(Test-Path $path)) { return $false }
    $text = Get-Content -Raw -Encoding UTF8 $path
    return ($text -match 'export\s+default\s+function\s+Home\s*\(' -and
            $text -match 'vocabularyWords' -and
            $text -match 'use client')
}

# If the main page was accidentally replaced by pasted terminal text, recover the first valid backup.
if (!(Test-ValidHomeFile $homePath)) {
    $candidates = @(
        (Join-Path $projectRoot 'src\app\page.tsx.repair-backup'),
        (Join-Path $projectRoot 'src\app\page.tsx.before-vocabulary-page.bak'),
        (Join-Path $projectRoot 'src\app\page.backup.tsx'),
        (Join-Path $projectRoot 'src\app\page.before-filters.tsx'),
        (Join-Path $projectRoot 'src\app\page.tsx.backup')
    )
    $validBackup = $null
    foreach ($candidate in $candidates) {
        if (Test-ValidHomeFile $candidate) { $validBackup = $candidate; break }
    }
    if (!$validBackup) {
        throw 'The home page is invalid and no known valid backup was found. No file was overwritten.'
    }
    $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    Copy-Item $homePath "$homePath.invalid-$stamp.bak" -Force
    Copy-Item $validBackup $homePath -Force
    Write-Host "Restored homepage from: $validBackup" -ForegroundColor Yellow
}

# Back up the files this script is about to edit.
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
Copy-Item $homePath "$homePath.before-vocab-route-$stamp.bak" -Force
Copy-Item $cssPath "$cssPath.before-vocab-route-$stamp.bak" -Force
if (Test-Path $routePath) { Copy-Item $routePath "$routePath.before-vocab-route-$stamp.bak" -Force }

# Point both homepage vocabulary links (course card and sidebar navigation) at the dedicated route.
$home = Get-Content -Raw -Encoding UTF8 $homePath
$homeBefore = $home
$home = $home.Replace('href: "#vocabulary"', 'href: "/english-learning-project/vocabulary/"')
$home = $home.Replace("href: '#vocabulary'", 'href: "/english-learning-project/vocabulary/"')
$home = $home.Replace('href="#vocabulary"', 'href="/english-learning-project/vocabulary/"')
$home = $home.Replace("href='#vocabulary'", 'href="/english-learning-project/vocabulary/"')
Set-Content -Path $homePath -Value $home -Encoding UTF8

# Dedicated, searchable vocabulary page with audio and the independent back button.
New-Item -ItemType Directory -Path $routeDir -Force | Out-Null
$routeCode = @'
"use client";

import { useEffect, useMemo, useState } from "react";
import { vocabularyWords } from "../../data/vocabulary";

const SAVED_KEY = "linguapro-saved-words";
const LEARNED_KEY = "linguapro-learned-words";
const PAGE_SIZE = 50;
const HOME_URL = "/english-learning-project/";

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("همه");
  const [topic, setTopic] = useState("همه");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [saved, setSaved] = useState<string[]>([]);
  const [learned, setLearned] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem(SAVED_KEY);
      const learnedRaw = localStorage.getItem(LEARNED_KEY);
      if (savedRaw) {
        const value: unknown = JSON.parse(savedRaw);
        if (Array.isArray(value)) setSaved(value.filter((x): x is string => typeof x === "string"));
      }
      if (learnedRaw) {
        const value: unknown = JSON.parse(learnedRaw);
        if (Array.isArray(value)) setLearned(value.filter((x): x is string => typeof x === "string"));
      }
    } catch {
      console.warn("Could not restore vocabulary progress from local storage.");
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
      localStorage.setItem(LEARNED_KEY, JSON.stringify(learned));
    } catch {
      console.warn("Could not save vocabulary progress.");
    }
  }, [saved, learned, ready]);

  const levels = useMemo(() => Array.from(new Set(vocabularyWords.map((w) => w.level))).sort(), []);
  const topics = useMemo(() => Array.from(new Set(vocabularyWords.map((w) => w.topic))).sort(), []);

  const filteredWords = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return vocabularyWords.filter((word) => {
      const searchable = [word.word, word.meaning, word.type, word.example, word.level, word.topic, word.phonetic]
        .join(" ").toLocaleLowerCase();
      return (!query || searchable.includes(query)) &&
        (level === "همه" || word.level === level) &&
        (topic === "همه" || word.topic === topic);
    });
  }, [search, level, topic]);

  function speak(text: string) {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }

  function goBack() {
    const referrer = document.referrer;
    let sameOrigin = false;
    try {
      sameOrigin = Boolean(referrer) && new URL(referrer).origin === window.location.origin;
    } catch {
      sameOrigin = false;
    }
    if (sameOrigin && window.history.length > 1) window.history.back();
    else window.location.href = HOME_URL;
  }

  function toggleItem(word: string, list: string[], setList: (next: string[]) => void) {
    setList(list.includes(word) ? list.filter((item) => item !== word) : [...list, word]);
  }

  function resetFilters() {
    setSearch("");
    setLevel("همه");
    setTopic("همه");
    setLimit(PAGE_SIZE);
  }

  return (
    <main className="vocabulary-page" dir="rtl">
      <button className="vocabulary-back-button" type="button" onClick={goBack} aria-label="بازگشت" title="بازگشت">←</button>
      <div className="vocabulary-shell">
        <header className="vocab-hero">
          <div className="vocab-breadcrumb"><a href={HOME_URL}>خانه</a><span>›</span><span>واژگان انگلیسی</span></div>
          <h1>بانک واژگان انگلیسی</h1>
          <p>کلمه را به انگلیسی یا فارسی جست‌وجو کن؛ معنی، تلفظ و مثال آن را ببین.</p>
          <div className="vocab-stat-grid">
            <div><strong>{vocabularyWords.length.toLocaleString("fa-IR")}</strong><span>لغت در بانک</span></div>
            <div><strong>{saved.length.toLocaleString("fa-IR")}</strong><span>لغت ذخیره‌شده</span></div>
            <div><strong>{learned.length.toLocaleString("fa-IR")}</strong><span>لغت یادگرفته‌شده</span></div>
          </div>
        </header>

        <section className="vocab-search-panel" aria-label="جست‌وجو و فیلتر لغات">
          <label className="vocab-search">
            <span aria-hidden="true">⌕</span>
            <input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setLimit(PAGE_SIZE); }} placeholder="کلمه انگلیسی یا معنی فارسی را بنویس..." aria-label="جست‌وجو با کلمه انگلیسی یا معنی فارسی" />
            {search && <button type="button" onClick={() => { setSearch(""); setLimit(PAGE_SIZE); }} aria-label="پاک کردن جست‌وجو">×</button>}
          </label>
          <div className="vocab-filter-row">
            <label><span>سطح زبان</span><select value={level} onChange={(e) => { setLevel(e.target.value); setLimit(PAGE_SIZE); }}><option value="همه">همه سطح‌ها</option>{levels.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            <label><span>موضوع</span><select value={topic} onChange={(e) => { setTopic(e.target.value); setLimit(PAGE_SIZE); }}><option value="همه">همه موضوع‌ها</option>{topics.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            <button className="vocab-reset" type="button" onClick={resetFilters}>پاک‌کردن فیلترها</button>
          </div>
          <p className="vocab-count" aria-live="polite">{filteredWords.length.toLocaleString("fa-IR")} نتیجه</p>
        </section>

        <section className="vocab-word-list" aria-label="فهرست لغات">
          {filteredWords.slice(0, limit).map((word) => {
            const isSaved = saved.includes(word.word);
            const isLearned = learned.includes(word.word);
            return <article className="vocab-card" key={word.word}>
              <div className="vocab-initial" dir="ltr">{word.word.charAt(0).toUpperCase()}</div>
              <div className="vocab-card-main">
                <div className="vocab-word-title" dir="ltr">
                  <h2>{word.word}</h2>
                  <button type="button" className="vocab-audio" onClick={() => speak(word.word)} aria-label={`شنیدن تلفظ ${word.word}`}>🔊 تلفظ</button>
                  <span className="vocab-tag">{word.type}</span><span className="vocab-level">{word.level}</span>
                </div>
                <div className="vocab-phonetic" dir="ltr">{word.phonetic}</div>
                <p className="vocab-meaning">{word.meaning}</p>
                <div className="vocab-example">
                  <div className="vocab-example-top"><span>مثال در جمله</span><button type="button" className="vocab-audio" onClick={() => speak(word.example)}>🔊 شنیدن جمله</button></div>
                  <p dir="ltr">{word.example}</p>
                </div>
                <div className="vocab-actions">
                  <button type="button" className={isSaved ? "vocab-action saved" : "vocab-action"} aria-pressed={isSaved} onClick={() => toggleItem(word.word, saved, setSaved)}>{isSaved ? "♥ ذخیره‌شده" : "♡ ذخیره لغت"}</button>
                  <button type="button" className={isLearned ? "vocab-action learned" : "vocab-action"} aria-pressed={isLearned} onClick={() => toggleItem(word.word, learned, setLearned)}>{isLearned ? "✓ یاد گرفتم" : "علامت‌گذاری به‌عنوان یادگرفته‌شده"}</button>
                </div>
              </div>
            </article>;
          })}
          {filteredWords.length === 0 && <div className="vocab-empty"><h2>لغتی پیدا نشد</h2><p>املای کلمه یا معنی فارسی را بررسی کن.</p><button type="button" onClick={resetFilters}>پاک‌کردن جست‌وجو</button></div>}
          {limit < filteredWords.length && <button type="button" className="vocab-load-more" onClick={() => setLimit((n) => n + PAGE_SIZE)}>نمایش ۵۰ لغت دیگر</button>}
          <p className="vocab-count vocab-bottom-count">نمایش {Math.min(limit, filteredWords.length).toLocaleString("fa-IR")} از {filteredWords.length.toLocaleString("fa-IR")} لغت</p>
        </section>
      </div>
    </main>
  );
}
'@
Set-Content -Path $routePath -Value $routeCode -Encoding UTF8

# Append scoped styles only once.
$css = Get-Content -Raw -Encoding UTF8 $cssPath
if (!$css.Contains('/* LINGUAPRO DEDICATED VOCABULARY ROUTE */')) {
$styles = @'

/* LINGUAPRO DEDICATED VOCABULARY ROUTE */
.vocabulary-page { min-height:100vh; padding:30px 22px 100px; color:#302d47; background:#f7f8fc; font-family:Tahoma,Arial,sans-serif; }
.vocabulary-shell { width:100%; max-width:1000px; margin:0 auto; }
.vocab-hero { margin-bottom:20px; padding:25px; border:1px solid #ebe7ff; border-radius:22px; background:radial-gradient(circle at 8% 8%,#e6e1ff 0,transparent 30%),linear-gradient(135deg,#fff,#faf9ff); }
.vocab-breadcrumb { display:flex; gap:10px; align-items:center; margin-bottom:18px; color:#8175c5; font-size:12px; }
.vocab-breadcrumb a { color:inherit; text-decoration:none; }
.vocab-hero h1 { margin:0; color:#312b52; font-size:clamp(24px,4vw,34px); }
.vocab-hero>p { color:#85829a; font-size:13px; line-height:2; margin:11px 0 20px; }
.vocab-stat-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }
.vocab-stat-grid>div { display:flex; flex-direction:column; gap:7px; padding:13px; border:1px solid #efecfc; border-radius:13px; background:#ffffffdf; }
.vocab-stat-grid strong { color:#654ed5; font-size:21px; }
.vocab-stat-grid span { color:#9290a4; font-size:11px; }
.vocab-search-panel { margin-bottom:17px; padding:17px; border:1px solid #eeedf5; border-radius:17px; background:#fff; }
.vocab-search { display:flex; align-items:center; gap:10px; min-height:49px; padding:0 13px; border:1px solid #e8e4f4; border-radius:13px; background:#fcfbff; color:#7868d8; }
.vocab-search>span { font-size:25px; }
.vocab-search input { width:100%; min-width:0; border:0; outline:0; background:transparent; color:#37334d; font:13px Tahoma,Arial,sans-serif; }
.vocab-search input::placeholder { color:#aaa7b9; }
.vocab-search button { border:0; background:transparent; color:#77718f; font-size:23px; cursor:pointer; }
.vocab-filter-row { display:grid; grid-template-columns:1fr 1fr auto; align-items:end; gap:10px; margin-top:14px; }
.vocab-filter-row label { display:flex; flex-direction:column; gap:7px; color:#77748b; font-size:11px; }
.vocab-filter-row select { width:100%; min-width:0; min-height:40px; padding:0 9px; border:1px solid #e9e6f2; border-radius:10px; background:#fff; color:#48435f; font:12px Tahoma,Arial,sans-serif; }
.vocab-reset,.vocab-audio,.vocab-action,.vocab-empty button { border:1px solid #e2dcfb; border-radius:10px; background:#f7f5ff; color:#634bd1; cursor:pointer; font-family:Tahoma,Arial,sans-serif; }
.vocab-reset { min-height:40px; padding:0 12px; font-size:11px; }
.vocab-count { margin:14px 0 0; color:#8a869e; font-size:11px; }
.vocab-word-list { display:grid; gap:11px; }
.vocab-card { display:grid; grid-template-columns:40px minmax(0,1fr); gap:12px; padding:16px; border:1px solid #eeedf5; border-radius:16px; background:#fff; }
.vocab-initial { display:grid; width:40px; height:40px; place-items:center; border-radius:12px; background:#f0edff; color:#6954d8; font:700 20px Arial,sans-serif; }
.vocab-card-main { min-width:0; }
.vocab-word-title { display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
.vocab-word-title h2 { margin:0; color:#332e4b; font:700 19px Arial,sans-serif; overflow-wrap:anywhere; }
.vocab-audio { padding:6px 9px; font-size:11px; white-space:nowrap; }
.vocab-tag,.vocab-level { padding:5px 8px; border-radius:7px; background:#f2efff; color:#7059cb; font-size:10px; }
.vocab-level { background:#eef8f3; color:#32845c; }
.vocab-phonetic { margin-top:8px; color:#9994ae; font:12px Arial,sans-serif; }
.vocab-meaning { margin:12px 0 0; color:#575269; font-size:13px; line-height:2; overflow-wrap:anywhere; }
.vocab-example { margin-top:12px; padding:13px; border:1px solid #eae8f2; border-radius:13px; background:#fafafe; }
.vocab-example-top { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:9px; color:#77728d; font-size:11px; }
.vocab-example>p { margin:10px 0 0; color:#39344f; font:14px/1.9 Arial,sans-serif; text-align:left; overflow-wrap:anywhere; }
.vocab-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:13px; }
.vocab-action { padding:8px 11px; font-size:11px; background:#fff; }
.vocab-action.saved { border-color:#f1d4e0; background:#fff4f8; color:#c14e7a; }
.vocab-action.learned { border-color:#c7ebd6; background:#f0fbf4; color:#26804a; }
.vocab-load-more { width:100%; min-height:47px; margin-top:8px; border:1px solid #e1dafb; border-radius:13px; background:#fff; color:#634bd1; font:13px Tahoma,Arial,sans-serif; cursor:pointer; }
.vocab-bottom-count { text-align:center; }
.vocab-empty { padding:38px 20px; border:1px dashed #dcd6ef; border-radius:18px; background:#fff; text-align:center; }
.vocab-empty h2 { color:#48405f; font-size:18px; }
.vocab-empty p { color:#89859d; font-size:12px; }
.vocab-empty button { padding:10px 13px; }
.vocabulary-back-button { position:fixed; top:16px; left:16px; z-index:1002; display:grid; place-items:center; width:48px; height:48px; border:1px solid #e5dfff; border-radius:15px; background:#fff; color:#5b43d5; box-shadow:0 6px 20px #6354cb24; cursor:pointer; font:700 27px Arial,sans-serif; }
@media(max-width:650px) { .vocabulary-page{padding:16px 12px 95px}.vocab-hero{padding:18px 14px}.vocab-stat-grid{gap:6px}.vocab-stat-grid>div{padding:10px 7px}.vocab-stat-grid strong{font-size:17px}.vocab-stat-grid span{font-size:9px;line-height:1.8}.vocab-search-panel{padding:12px}.vocab-filter-row{grid-template-columns:1fr}.vocab-reset{width:100%}.vocab-card{grid-template-columns:32px minmax(0,1fr);gap:9px;padding:12px 10px}.vocab-initial{width:32px;height:32px;font-size:16px}.vocab-word-title h2{font-size:17px}.vocab-example>p{font-size:13px}.vocabulary-back-button{top:12px;left:12px} }
'@
    Add-Content -Path $cssPath -Value $styles -Encoding UTF8
}

Write-Host ''
Write-Host 'Updated homepage vocabulary links:' -ForegroundColor Cyan
Select-String -Path $homePath -Pattern 'english-learning-project/vocabulary|#vocabulary' | Select-Object -First 12
Write-Host ''
Write-Host "Dedicated vocabulary page created: $routePath" -ForegroundColor Green
Write-Host 'Now checking the production build. Wait for the route list at the end.' -ForegroundColor Cyan
& npm run build
if ($LASTEXITCODE -ne 0) { throw 'Build failed. Do not push to GitHub yet.' }
