$ErrorActionPreference = "Stop"

Set-Location "E:\english"
$pagePath = ".\src\app\vocabulary\page.tsx"
$cssPath = ".\src\app\globals.css"
$pageBackup = ".\src\app\vocabulary\page.tsx.before-multi-topic.bak"
$cssBackup = ".\src\app\globals.css.before-multi-topic.bak"

foreach ($p in @($pageBackup, $cssBackup)) {
    if (!(Test-Path $p)) { throw "نسخه پشتیبان پیدا نشد: $p. هیچ تغییری انجام نشد." }
}

# Start from the exact files that existed before the failed multi-topic edit.
$page = Get-Content -Raw -Encoding UTF8 $pageBackup
$css = Get-Content -Raw -Encoding UTF8 $cssBackup

if (!$page.Contains('export default function VocabularyPage()') -or
    !$page.Contains('const filteredWords = useMemo(() => {') -or
    !$page.Contains('const [topic, setTopic] = useState("همه");')) {
    throw "نسخه پشتیبان صفحه ساختار مورد انتظار را ندارد؛ هیچ فایلی تغییر نکرد."
}

# Replace single-topic state with a multiple-selection state.
$page = $page.Replace(
    'const [topic, setTopic] = useState("همه");',
    'const [selectedTopics, setSelectedTopics] = useState<string[]>([]);'
)

# Remove the AND/OR/NOT selector state.
$page = $page.Replace(
    '  const [filterLogic, setFilterLogic] = useState("and");' + "`r`n",
    ''
)
$page = $page.Replace(
    '  const [filterLogic, setFilterLogic] = useState("and");' + "`n",
    ''
)
$page = $page.Replace(
    '  const [filterLogic, setFilterLogic] = useState("and");',
    ''
)

# Locate the current filter block only after state replacements, so offsets cannot go stale.
$filterStartMarker = '  const filteredWords = useMemo(() => {'
$filterEndMarker = '  const visibleWords = filteredWords.slice(0, limit);'
$filterStart = $page.IndexOf($filterStartMarker, [System.StringComparison]::Ordinal)
if ($filterStart -lt 0) { throw "شروع بخش فیلتر پیدا نشد؛ هیچ فایلی تغییر نکرد." }
$filterEnd = $page.IndexOf($filterEndMarker, $filterStart, [System.StringComparison]::Ordinal)
if ($filterEnd -lt 0) { throw "پایان بخش فیلتر پیدا نشد؛ هیچ فایلی تغییر نکرد." }

$filterCode = @'
  const filteredWords = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return vocabularyWords.filter((w) => {
      const text = [
        w.word, w.meaning, w.type, w.example, w.level, w.topic, w.phonetic,
      ].join(" ").toLocaleLowerCase();

      const matchesSearch = !query || text.includes(query);
      const matchesLevel = level === "همه" || w.level === level;
      const matchesTopic =
        selectedTopics.length === 0 || selectedTopics.includes(w.topic);

      const isSaved = saved.includes(w.word);
      const isLearned = learned.includes(w.word);
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
    search, level, selectedTopics, savedFilter, learnedFilter, saved, learned,
  ]);

'@
$page = $page.Substring(0, $filterStart) + $filterCode + $page.Substring($filterEnd)

# Replace the reset function to reset all topic and status filters.
$resetPattern = '(?s)  function reset\(\) \{.*?\r?\n  \}'
$resetMatch = [regex]::Match($page, $resetPattern)
if (!$resetMatch.Success) { throw "تابع پاک‌کردن فیلترها پیدا نشد؛ هیچ فایلی تغییر نکرد." }
$resetCode = @'
  function reset() {
    setSearch("");
    setLevel("همه");
    setSelectedTopics([]);
    setSavedFilter("all");
    setLearnedFilter("all");
    setLimit(PAGE_SIZE);
  }
'@
$page = $page.Substring(0, $resetMatch.Index) + $resetCode.TrimEnd() + $page.Substring($resetMatch.Index + $resetMatch.Length)

# Replace the standalone topic select with multi-select chips.
$topicPattern = '(?s)<label>\s*<span>موضوع</span>\s*<select\s+value=\{topic\}.*?</select>\s*</label>'
$topicMatch = [regex]::Match($page, $topicPattern)
if (!$topicMatch.Success) { throw "فیلتر موضوع پیدا نشد؛ هیچ فایلی تغییر نکرد." }
$topicUI = @'
            <div className="vocab-topic-filter">
              <div className="vocab-topic-filter-title">
                موضوع‌ها
                <small>می‌توانی چند موضوع را هم‌زمان انتخاب کنی</small>
              </div>
              <div className="vocab-topic-chip-list">
                <button
                  type="button"
                  className={`vocab-topic-chip ${selectedTopics.length === 0 ? "active" : ""}`}
                  aria-pressed={selectedTopics.length === 0}
                  onClick={() => {
                    setSelectedTopics([]);
                    setLimit(PAGE_SIZE);
                  }}
                >
                  همه موضوع‌ها
                </button>
                {topics.map((x) => {
                  const active = selectedTopics.includes(x);
                  return (
                    <button
                      type="button"
                      key={x}
                      className={`vocab-topic-chip ${active ? "active" : ""}`}
                      aria-pressed={active}
                      onClick={() => {
                        setSelectedTopics((current) =>
                          current.includes(x)
                            ? current.filter((item) => item !== x)
                            : [...current, x]
                        );
                        setLimit(PAGE_SIZE);
                      }}
                    >
                      {active ? "✓ " : ""}{x}
                    </button>
                  );
                })}
              </div>
            </div>
'@
$page = $page.Substring(0, $topicMatch.Index) + $topicUI.TrimEnd() + $page.Substring($topicMatch.Index + $topicMatch.Length)

# Remove the old combination (AND/OR/NOT) label if present.
$logicPattern = '(?s)<label>\s*<span>ترکیب فیلترها</span>.*?</label>'
$page = [regex]::Replace($page, $logicPattern, '', 1)

# Validate the resulting source before writing anything.
if ($page.Contains('filterLogic') -or $page.Contains('setTopic(') -or
    !$page.Contains('selectedTopics.includes(w.topic)') -or
    !$page.Contains('وضعیت یادگیری') -or !$page.Contains('وضعیت ذخیره')) {
    throw "اعتبارسنجی کد جدید ناموفق بود؛ هیچ فایل اصلی نوشته نشد."
}

$cssMarker = '/* MULTI TOPIC FILTER */'
if (!$css.Contains($cssMarker)) {
    $extraCss = @'

/* MULTI TOPIC FILTER */
.vocab-topic-filter {
  grid-column: 1 / -1;
  min-width: 0;
  padding-top: 5px;
}
.vocab-topic-filter-title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: 10px;
  color: #77748b;
  font-size: 12px;
}
.vocab-topic-filter-title small {
  color: #9894aa;
  font-size: 10px;
}
.vocab-topic-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.vocab-topic-chip {
  min-height: 35px;
  padding: 7px 12px;
  border: 1px solid #e6e2f1;
  border-radius: 10px;
  background: #fff;
  color: #625d77;
  font: 11px Tahoma, Arial, sans-serif;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease;
}
.vocab-topic-chip:hover {
  border-color: #bdb0fa;
  background: #f8f6ff;
}
.vocab-topic-chip.active {
  border-color: #9e8af5;
  background: #eeeaff;
  color: #5942cb;
  font-weight: 700;
}
@media (max-width: 650px) {
  .vocab-topic-filter {
    grid-column: auto;
  }
}
'@
    $css = $css.TrimEnd() + "`r`n" + $extraCss + "`r`n"
}

# Save copies of the damaged/current files, then write only the validated result.
Copy-Item $pagePath ".\src\app\vocabulary\page.tsx.failed-multiselect.bak" -Force
Copy-Item $cssPath ".\src\app\globals.css.failed-multiselect.bak" -Force
Set-Content -Path $pagePath -Value $page -Encoding UTF8
Set-Content -Path $cssPath -Value $css -Encoding UTF8

Write-Host "فیلتر چندموضوعی آماده شد؛ گزینه AND/OR/NOT حذف شد." -ForegroundColor Green
Write-Host "اکنون ساخت پروژه بررسی می‌شود." -ForegroundColor Cyan
npm run build
