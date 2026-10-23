"use client";

import { useCallback, useEffect, useState } from "react";
import { getAccountToken, getApiBase, getGuestWalletSnapshot } from "../../lib/linguapro-rewards";

type LeagueEntry = { rank: number; displayName: string; coins: number; totalCoins?: number };
type LeaguePayload = { day?: string; top?: LeagueEntry[]; me?: { rank: number | null; todayCoins: number; totalCoins: number } | null; error?: string };
function siteRoot() { if (typeof window === "undefined") return ""; return window.location.pathname.startsWith("/english-learning-project") ? "/english-learning-project" : ""; }
function fa(value: number) { return Number(value || 0).toLocaleString("fa-IR"); }

export default function LeagueClient() {
  const [root, setRoot] = useState("");
  const [data, setData] = useState<LeaguePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [day, setDay] = useState("");
  const [guest, setGuest] = useState({ totalCoins: 0, todayCoins: 0, day: "" });
  const [isSignedIn, setIsSignedIn] = useState(false);

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    else setRefreshing(true);
    setError("");
    try {
      const token = getAccountToken();
      const response = await fetch(`${getApiBase()}/api/league/`, { headers: token ? { Authorization: `Bearer ${token}` } : {}, cache: "no-store" });
      const payload = await response.json().catch(() => ({})) as LeaguePayload;
      if (!response.ok) throw new Error(payload.error || "دریافت لیگ ممکن نشد.");
      setData(payload);
      setDay(payload.day || "");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "سرویس لیگ در دسترس نیست.");
    } finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => {
    const refreshAuth = () => setIsSignedIn(Boolean(getAccountToken()));
    setRoot(siteRoot()); setGuest(getGuestWalletSnapshot()); refreshAuth(); void load();
    window.addEventListener("linguapro:auth-changed", refreshAuth);
    const timer = window.setInterval(() => { void load(true); }, 60_000);
    return () => { window.clearInterval(timer); window.removeEventListener("linguapro:auth-changed", refreshAuth); };
  }, [load]);

  return <main className="lp-league-page" dir="rtl"><div className="lp-league-shell">
    <a className="lp-league-back" href={`${root}/`}>← بازگشت به صفحهٔ اصلی</a>
    <header className="lp-league-hero"><div className="lp-league-trophy">🏆</div><div><span className="lp-league-kicker">LINGUAPRO · DAILY LEAGUE</span><h1>لیگ روزانهٔ زبان‌آموزها</h1><p>با تکمیل فعالیت‌های واقعی سکه بگیر، جایگاهت را ببین و هر روز از نو رقابت کن.</p><div className="lp-league-reset">🕛 جدول روزانه هر روز ساعت ۰۰:۰۰ به وقت تهران از نو شروع می‌شود.</div></div><button type="button" className="lp-league-refresh" onClick={() => void load(true)} disabled={refreshing}>{refreshing ? "در حال تازه‌سازی…" : "↻ تازه‌سازی"}</button></header>
    <section className="lp-league-stat-row"><article className="lp-league-stat"><span>امتیاز حساب من امروز</span><strong>{data?.me ? fa(data.me.todayCoins) : "—"}</strong><small>سکهٔ روز جاری{day ? ` · ${day}` : ""}</small></article><article className="lp-league-stat"><span>مجموع سکه‌های حساب</span><strong>{data?.me ? fa(data.me.totalCoins) : "—"}</strong><small>این مجموع با شروع روز جدید صفر نمی‌شود.</small></article><article className="lp-league-stat lp-league-rank"><span>رتبهٔ من امروز</span><strong>{data?.me?.rank ? `#${fa(data.me.rank)}` : "—"}</strong><small>{data?.me ? "جایگاه بین حساب‌های فعال امروز" : "برای ثبت رتبه وارد حساب شو"}</small></article></section>
    {!isSignedIn && <section className="lp-league-signin"><span>🔐</span><div><strong>رتبه و سکه‌ها را بین دستگاه‌ها نگه دار</strong><p>به‌عنوان مهمان فقط سکه‌های همین دستگاه را داری؛ ورود با ایمیل برای ذخیرهٔ ابری و ثبت رتبه لازم است.</p></div><a href={`${root}/account/`}>ورود با ایمیل ←</a></section>}
    <section className="lp-league-board"><div className="lp-league-board-head"><div><span className="lp-league-kicker">TODAY'S TOP LEARNERS</span><h2>نفرات برتر امروز</h2><p>جدول با ثبت فعالیت‌های جدید به‌روزرسانی می‌شود.</p></div><span className="lp-live-dot">● زنده</span></div>
      {loading ? <div className="lp-league-empty">در حال دریافت جدول…</div> : error ? <div className="lp-league-error"><p>{error}</p><p>اگر سرویس حساب تازه نصب شده، مدیر سایت باید دیتابیس PostgreSQL و ارسال ایمیل را در Render تنظیم کند.</p><button type="button" onClick={() => void load()}>تلاش مجدد</button></div> : !data?.top?.length ? <div className="lp-league-empty"><span>🌱</span><strong>هنوز کسی امروز سکه نگرفته است.</strong><p>اولین تمرین را انجام بده و جدول را بساز.</p></div> : <div className="lp-league-table-wrap"><table className="lp-league-table"><thead><tr><th>رتبه</th><th>زبان‌آموز</th><th>سکهٔ امروز</th></tr></thead><tbody>{data.top.map((item) => <tr key={`${item.rank}-${item.displayName}`} className={data.me?.rank === item.rank ? "lp-league-mine" : ""}><td><span className={`lp-rank-number lp-rank-${item.rank}`}>{item.rank === 1 ? "🥇" : item.rank === 2 ? "🥈" : item.rank === 3 ? "🥉" : fa(item.rank)}</span></td><td><strong>{item.displayName}</strong>{data.me?.rank === item.rank && <small className="lp-you-label">شما</small>}</td><td><span className="lp-league-coins">🪙 {fa(item.coins)}</span></td></tr>)}</tbody></table></div>}
      {data?.me?.rank && data.me.rank > 20 && <div className="lp-league-own-rank">رتبهٔ شما: <strong>#{fa(data.me.rank)}</strong> با <strong>{fa(data.me.todayCoins)} سکه</strong> امروز؛ برای نمایش در جدول برتر باید به جمع ۲۰ نفر اول برسی.</div>}
    </section>
    <section className="lp-league-rewards"><h2>با چه فعالیت‌هایی سکه می‌گیرم؟</h2><div className="lp-reward-grid"><div><span>📚</span><b>یادگیری واژه</b><strong>+۲</strong><small>برای هر واژهٔ تازه</small></div><div><span>📖</span><b>تکمیل ریدینگ</b><strong>+۱۲</strong><small>هر متن یک‌بار در روز</small></div><div><span>🎧</span><b>تکمیل لیسنینگ</b><strong>+۱۲</strong><small>پس از قبولی در تمرین</small></div><div><span>✍️</span><b>تکمیل نوشتن</b><strong>+۱۵</strong><small>پس از پایان درس</small></div><div><span>🎙️</span><b>اسپیکینگ</b><strong>+۱۵</strong><small>پس از ثبت خودارزیابی</small></div><div><span>🎮</span><b>ورود به فعالیت‌ها</b><strong>+۱</strong><small>هر مسیر آموزشی روزی یک‌بار</small></div></div><p className="lp-league-footnote">برای جلوگیری از تکرار بی‌نهایت امتیاز، هر فعالیت شناسهٔ یکتا و سقف روزانه دارد. روز جدید با ساعت تهران محاسبه می‌شود.</p></section>
    <div className="lp-league-guest-note">سکهٔ مهمان در این دستگاه: {fa(guest.totalCoins)} · امروز: {fa(guest.todayCoins)}. این مقدار وارد جدول عمومی نمی‌شود تا امتیازهای قابل‌تأیید حساب‌ها جدا بمانند.</div>
  </div></main>;
}
