import json
from pathlib import Path
from collections import defaultdict

project = Path.cwd()
source = Path.home() / "AppData" / "Local" / "Temp" / "openjam-source" / "openjam-main" / "data" / "json"

def load(name):
    return json.loads((source / name).read_text(encoding="utf-8"))

words = load("words_en.json")
translations = load("translations_fa.json")
phonetics = load("phonetics.json")
categories = load("categories.json")
word_categories = load("word_categories.json")

fa_by_sense = {}
for t in translations:
    if t.get("language_code") == "fa" and t.get("meaning"):
        fa_by_sense.setdefault(t["sense_id"], t)

ipa_by_word = {}
for p in phonetics:
    if p.get("ipa"):
        if p.get("variant") == "us" or p["word_id"] not in ipa_by_word:
            ipa_by_word[p["word_id"]] = p["ipa"]

category_names = {c["id"]: c.get("name_en", c.get("slug", "")) for c in categories}
category_ids_by_word = defaultdict(list)
for wc in word_categories:
    category_ids_by_word[wc["word_id"]].append(wc["category_id"])

topic_fa = {
    "food": "غذا", "health": "سلامت", "medical": "پزشکی",
    "education": "آموزش", "technology": "فناوری", "nature": "طبیعت",
    "animals": "حیوانات", "travel": "سفر", "transportation": "حمل‌ونقل",
    "business": "کسب‌وکار", "work": "کار", "finance": "مالی",
    "science": "علوم", "sports": "ورزش", "music": "موسیقی",
    "art": "هنر", "family": "خانواده", "people": "افراد",
    "home": "خانه", "clothing": "پوشاک", "weather": "آب‌وهوا",
    "time": "زمان", "communication": "ارتباطات", " emotions": "احساسات",
    "emotions": "احساسات", "society": "جامعه", "law": "قانون",
    "politics": "سیاست", "geography": "جغرافیا", "environment": "محیط زیست",
    "daily-life": "زندگی روزمره", "body": "بدن", "language": "زبان",
    "entertainment": "سرگرمی", "general": "عمومی"
}

def topic_for(word):
    ids = category_ids_by_word.get(word["id"], [])
    for cid in ids:
        en = category_names.get(cid, "").lower().replace(" ", "-")
        if en in topic_fa:
            return topic_fa[en]
    return "عمومی"

candidates = []
for w in words:
    level = w.get("level")
    if level not in {"A1", "A2", "B1", "B2", "C1", "C2"}:
        continue

    senses = sorted(
        w.get("senses", []),
        key=lambda s: (s.get("sense_order", 999), s.get("part_of_speech", ""))
    )
    chosen = None
    translation = None

    for s in senses:
        tr = fa_by_sense.get(s.get("id"))
        if tr and tr.get("meaning"):
            chosen, translation = s, tr
            break

    if not chosen:
        continue

    candidates.append({
        "word": w.get("english", "").strip(),
        "phonetic": ipa_by_word.get(w["id"], ""),
        "meaning": translation.get("meaning", "").strip(),
        "type": chosen.get("part_of_speech", ""),
        "example": chosen.get("example_en", "") or "",
        "level": level,
        "topic": topic_for(w),
        "rank": w.get("frequency_rank") or 999999
    })

candidates.sort(key=lambda x: (x["rank"], x["word"].lower()))
unique = {}
for item in candidates:
    key = item["word"].lower()
    if key and key not in unique:
        unique[key] = item

selected = list(unique.values())[:5000]

if len(selected) < 5000:
    raise SystemExit(f"خطا: فقط {len(selected)} واژهٔ یکتا با ترجمه پیدا شد؛ فایل ساخته نشد.")

def quote(value):
    return json.dumps(str(value), ensure_ascii=False)

output = [
    "// Generated from Openjam vocabulary dataset.",
    "// Source: https://github.com/amirj4m/openjam",
    "// License: MIT; retain the source license and attribution.",
    "",
    "export type VocabularyWord = {",
    "  word: string;",
    "  phonetic: string;",
    "  meaning: string;",
    "  type: string;",
    "  example: string;",
    "  level: string;",
    "  topic: string;",
    "};",
    "",
    "export const vocabularyWords: VocabularyWord[] = ["
]

for item in selected:
    output.append("  {")
    for key in ("word", "phonetic", "meaning", "type", "example", "level", "topic"):
        output.append(f"    {key}: {quote(item[key])},")
    output.append("  },")

output.extend(["];", ""])
target = project / "src" / "data" / "vocabulary.generated.ts"
target.write_text("\n".join(output), encoding="utf-8")

print("فایل آزمایشی ساخته شد:", target)
print("تعداد واژه‌ها:", len(selected))
print("تعداد واژه‌های یکتا:", len({x['word'].lower() for x in selected}))
print("واژه‌های بدون تلفظ:", sum(not x["phonetic"] for x in selected))
print("واژه‌های بدون مثال انگلیسی:", sum(not x["example"] for x in selected))
print("توزیع سطح‌ها:")
for level in ("A1", "A2", "B1", "B2", "C1", "C2"):
    print(f"  {level}: {sum(x['level'] == level for x in selected)}")
