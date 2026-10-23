"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getAccountToken, getApiBase, getGuestWalletSnapshot } from "../../lib/linguapro-rewards";

type Period = "today" | "yesterday" | "month" | "all";
type Activity = "all" | "vocabulary" | "reading" | "listening" | "writing" | "speaking" | "grammar" | "conversation" | "games" | "warmup";
type LeagueEntry = { id?: string; rank: number; displayName: string; coins: number; totalCoins: number; grade: number };
type LeaguePayload = { day?: string; period?: Period; periodLabel?: string; timeZone?: string; top?: LeagueEntry[]; me?: { rank: number | null; periodCoins: number; todayCoins: number; totalCoins: number; grade: number; displayName?: string; matchesGradeFilter?: boolean } | null; error?: string };
function siteRoot() { if (typeof window === "undefined") return ""; return window.location.pathname.startsWith("/english-learning-project") ? "/english-learning-project" : ""; }
function fa(value: number) { return Number(value || 0).toLocaleString("fa-IR"); }
const PERIODS: { id: Period; label: string; short: string }[] = [
  { id: "today", label: "امروز", short: "امروز" },
  { id: "yesterday", label: "دیروز", short: "دیروز" },
  { id: "month", label: "این ماه", short: "این ماه" },
  { id: "all", label: "همیشه", short: "همهٔ زمان‌ها" },
];
const ACTIVITIES: { id: Activity; label: string }[] = [
  { id: "all", label: "همهٔ فعالیت‌ها" }, { id: "vocabulary", label: "واژگان" }, { id: "reading", label: "ریدینگ" },
  { id: "listening", label: "لیسنینگ" }, { id: "writing", label: "نوشتن" }, { id: "speaking", label: "اسپیکینگ" },
  { id: "grammar", label: "گرامر" }, { id: "conversation", label: "مکالمه" }, { id: "games", label: "بازی‌ها" }, { id: "warmup", label: "آزمون‌های دست‌گرمی" },
];

export default function LeagueClient() {
  const [root, setRoot] = useState("");
  const [period, setPeriod] = useState<Period>("all");
  const [grade, setGrade] = useState("all");
  const [activity, setActivity] = useState<Activity>("all");
  const [data, setData] = useState<LeaguePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [guest, setGuest] = useState({ totalCoins: 0, todayCoins: 0, day: "" });
  const [isSignedIn, setIsSignedIn] = useState(false);

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true); else setRefreshing(true);
    setError("");
    try {
      const token = getAccountToken();
      const params = new URLSearchParams({ period, grade, activity });
      const response = await fetch(`${getApiBase()}/api/league/?${params.toString()}`, { headers: token ? { Authorization: `Bearer ${token}` } : {}, cache: "no-store" });
      const payload = await response.json().catch(() => ({})) as LeaguePayload;
      if (!response.ok) throw new Error(payload.error || "دریافت جدول رتبه‌بندی ممکن نشد.");
      setData(payload);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "سرویس لیگ در دسترس نیست.");
    } finally { setLoading(false); setRefreshing(false); }
  }, [period, grade, activity]);

  useEffect(() => {
    setRoot(siteRoot()); setGuest(getGuestWalletSnapshot());
    const refreshAuth = () => setIsSignedIn(Boolean(getAccountToken()));
    refreshAuth(); void load();
    window.addEventListener("linguapro:auth-changed", refreshAuth);
    const timer = window.setInterval(() => { void load(true); }, 60_000);
    return () => { window.clearInterval(timer); window.removeEventListener("linguapro:auth-changed", refreshAuth); };
  }, [load]);

  const podium = useMemo(() => (data?.top || []).filter((row) => row.rank <= 3).sort((a, b) => a.rank - b.rank), [data]);
  const selectedPeriod = PERIODS.find((item) => item.id === period)?.label || "همیشه";
  const selectedActivity = ACTIVITIES.find((item) => item.id === activity)?.label || "همهٔ فعالیت‌ها";

  return <main className="lp-league-page" dir="rtl"><div className="lp-league-shell">
    <a className="lp-league-back" href={`${root}/`}>← بازگشت به صفحهٔ اصلی</a>
    <header className="lp-league-hero lp-league-hero-modern"><div className="lp-league-trophy">🏆</div><div className="lp-league-hero-copy"><span className="lp-league-kicker">LINGUAPRO · LEADERBOARD</span><h1>لیگ زبان‌آموزها</h1><p>تمرین کن، سکه جمع کن و جایگاهت را بین زبان‌آموزها پیدا کن.</p><div className="lp-league-persistent-note">♾️ امتیازها پاک نمی‌شوند؛ فقط بازهٔ رتبه‌بندی را عوض کن.</div></div><button type="button" className="lp-league-refresh" onClick={() => void load(true)} disabled={refreshing}>{refreshing ? "در حال تازه‌سازی…" : "↻ تازه‌سازی"}</button></header>

    <section className="lp-league-filter-panel" aria-label="فیلترهای رتبه‌بندی">
      <div className="lp-filter-heading"><span>تصفیهٔ جدول</span><small>رتبه‌ها با تغییر فیلتر دوباره محاسبه می‌شوند.</small></div>
      <div className="lp-period-tabs" role="group" aria-label="بازهٔ زمانی">{PERIODS.map((item) => <button key={item.id} type="button" className={period === item.id ? "active" : ""} onClick={() => setPeriod(item.id)}>{item.label}</button>)}</div>
      <div className="lp-filter-selects"><label><span>پایهٔ تحصیلی</span><select value={grade} onChange={(event) => setGrade(event.target.value)}><option value="all">همهٔ پایه‌ها</option><option value="7">پایهٔ هفتم</option><option value="8">پایهٔ هشتم</option><option value="9">پایهٔ نهم</option></select></label><label><span>نوع فعالیت</span><select value={activity} onChange={(event) => setActivity(event.target.value as Activity)}>{ACTIVITIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></div>
      <div className="lp-filter-summary">نمایش: <strong>{selectedPeriod}</strong><span>·</span><strong>{grade === "all" ? "همهٔ پایه‌ها" : `پایهٔ ${fa(Number(grade))}`}</strong><span>·</span><strong>{selectedActivity}</strong></div>
    </section>

    {data?.me && <section className="lp-my-league-strip"><div className="lp-my-league-avatar">{(data.me.displayName || "ش").slice(0, 1)}</div><div className="lp-my-league-who"><small>جایگاه تو در این فیلتر</small><strong>{data.me.rank ? `رتبهٔ ${fa(data.me.rank)}` : data.me.matchesGradeFilter === false ? "پایهٔ حسابت با این فیلتر یکی نیست" : "در این بازه هنوز امتیازی نداری"}</strong><span>پایهٔ {fa(data.me.grade || 7)}</span></div><div className="lp-my-league-points"><strong>🪙 {fa(data.me.periodCoins)}</strong><small>سکه در {selectedPeriod}</small></div><div className="lp-my-league-total"><strong>{fa(data.me.totalCoins)}</strong><small>مجموع سکه‌ها</small></div></section>}

    {!isSignedIn && <section className="lp-league-signin"><span>🔐</span><div><strong>رتبهٔ خودت را در جدول ثبت کن</strong><p>برای ذخیرهٔ سکه و دیدن جایگاه شخصی در دستگاه‌های دیگر، با ایمیل وارد شو.</p></div><a href={`${root}/account/`}>ورود / ساخت حساب ←</a></section>}

    <section className="lp-league-board lp-league-board-modern"><div className="lp-league-board-head"><div><span className="lp-league-kicker">TOP LEARNERS</span><h2>برترین زبان‌آموزها</h2><p>{selectedPeriod} · {grade === "all" ? "همهٔ پایه‌ها" : `پایهٔ ${fa(Number(grade))}`} · {selectedActivity}</p></div><span className="lp-live-dot">● به‌روز</span></div>
      {loading ? <div className="lp-league-empty">در حال دریافت جدول…</div> : error ? <div className="lp-league-error"><p>{error}</p><p>اتصال API و تنظیم PostgreSQL در Render را بررسی کن.</p><button type="button" onClick={() => void load()}>تلاش مجدد</button></div> : !data?.top?.length ? <div className="lp-league-empty"><span>🌱</span><strong>هنوز امتیازی برای این فیلتر ثبت نشده است.</strong><p>بازه، پایه یا نوع فعالیت را تغییر بده یا اولین تمرین را کامل کن.</p></div> : <>
        <div className="lp-podium" aria-label="سه نفر برتر">{[2, 1, 3].map((rank) => { const item = podium.find((row) => row.rank === rank); return <div key={rank} className={`lp-podium-place lp-podium-${rank}${data.me?.rank === rank ? " is-me" : ""}`}>{item ? <><span className="lp-podium-medal">{rank === 1 ? "👑" : rank === 2 ? "🥈" : "🥉"}</span><div className="lp-podium-avatar">{item.displayName.slice(0, 1)}</div><strong className="lp-podium-name">{item.displayName}</strong><small>پایهٔ {fa(item.grade || 7)}</small><b className="lp-podium-coins">🪙 {fa(item.coins)}</b><div className="lp-podium-base"><span>{fa(rank)}</span></div></> : <div className="lp-podium-empty">جایگاه {fa(rank)}<small>هنوز خالی</small></div>}</div>; })}</div>
        <div className="lp-league-table-wrap"><table className="lp-league-table lp-league-table-modern"><thead><tr><th>رتبه</th><th>زبان‌آموز</th><th>پایه</th><th>{period === "all" ? "سکه‌های کل" : "سکهٔ بازه"}</th><th>مجموع</th></tr></thead><tbody>{data.top.map((item) => <tr key={`${item.rank}-${item.displayName}`} className={data.me?.rank === item.rank ? "lp-league-mine" : ""}><td><span className={`lp-rank-number lp-rank-${item.rank}`}>{item.rank === 1 ? "🥇" : item.rank === 2 ? "🥈" : item.rank === 3 ? "🥉" : fa(item.rank)}</span></td><td><strong>{item.displayName}</strong>{data.me?.rank === item.rank && <small className="lp-you-label">شما</small>}</td><td><span className="lp-grade-pill">{fa(item.grade || 7)}</span></td><td><span className="lp-league-coins">🪙 {fa(item.coins)}</span></td><td>{fa(item.totalCoins)}</td></tr>)}</tbody></table></div>
      </>}
      {data?.me?.rank && data.me.rank > 50 && <div className="lp-league-own-rank">رتبهٔ تو: <strong>#{fa(data.me.rank)}</strong> · {fa(data.me.periodCoins)} سکه در {selectedPeriod}. جدول بالا ۵۰ نفر نخست را نمایش می‌دهد.</div>}
    </section>

    <section className="lp-league-explain"><div><span>🧾</span><h2>امتیازدهی شفاف</h2><p>هر فعالیت تأییدشده در تاریخ خودش ذخیره می‌شود. تغییر روز فقط فیلتر امروز را عوض می‌کند و امتیازهای قبلی برای بازهٔ دیروز، این ماه و همیشه باقی می‌مانند.</p></div><div><span>🎓</span><h2>رتبه‌بندی متناسب با پایه</h2><p>می‌توانی رقیب‌های هم‌پایه را جدا ببینی یا فیلتر همهٔ پایه‌ها را انتخاب کنی.</p></div><div><span>🪙</span><h2>سکه‌ها باقی می‌مانند</h2><p>مجموع سکه‌های حساب با پایان روز صفر نمی‌شود؛ امتیازهای مهمان فقط در همین دستگاه نگه داشته می‌شوند.</p></div></section>
    <div className="lp-league-guest-note">سکهٔ مهمان این دستگاه: {fa(guest.totalCoins)} · امروز: {fa(guest.todayCoins)}. امتیاز مهمان برای جلوگیری از ثبت‌نام تقلبی وارد جدول عمومی نمی‌شود.</div>
  </div></main>;
}
