"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  getAccountToken, getApiBase, getGuestWalletSnapshot, readLocalProgress,
  LINGUAPRO_TOKEN_KEY, LINGUAPRO_PROFILE_KEY, LINGUAPRO_AUTH_EVENT,
} from "../../lib/linguapro-rewards";
import "./account.css";

type Profile = { id?: string; email?: string; displayName?: string; totalCoins?: number; todayCoins?: number; rank?: number | null; grade?: number; passwordConfigured?: boolean; authMethod?: string };
type ApiPayload = { error?: string; message?: string; token?: string; profile?: Profile; progress?: Record<string, unknown> };
type Tab = "overview" | "settings";

function siteRoot() {
  if (typeof window === "undefined") return "";
  return window.location.pathname.startsWith("/english-learning-project") ? "/english-learning-project" : "";
}
function fa(value: number) { return Number(value || 0).toLocaleString("fa-IR"); }
function levelsNumber(floor: number) { return floor === 0 ? 1 : floor === 100 ? 2 : floor === 300 ? 3 : floor === 700 ? 4 : floor === 1500 ? 5 : 6; }
function getAccountLevel(totalCoins: number) {
  const levels = [
    { name: "شروع‌کننده", floor: 0, next: 100, symbol: "🌱" },
    { name: "کاوشگر", floor: 100, next: 300, symbol: "🧭" },
    { name: "تمرین‌کار", floor: 300, next: 700, symbol: "⚡" },
    { name: "ماهر", floor: 700, next: 1500, symbol: "🎯" },
    { name: "قهرمان", floor: 1500, next: 3000, symbol: "🏆" },
    { name: "استاد LinguaPro", floor: 3000, next: 3000, symbol: "👑" },
  ];
  const coins = Math.max(0, Number(totalCoins || 0));
  const index = levels.findIndex((item) => coins < item.next);
  const level = levels[index < 0 ? levels.length - 1 : index];
  const maxed = level.next === level.floor;
  const progress = maxed ? 100 : Math.max(0, Math.min(100, Math.floor(((coins - level.floor) / (level.next - level.floor)) * 100)));
  return { ...level, coins, maxed, progress, remaining: Math.max(0, level.next - coins) };
}

export default function AccountClient() {
  const [root, setRoot] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"email" | "code">("email");
  const [loginMode, setLoginMode] = useState<"email" | "password">("email");
  const [loginPassword, setLoginPassword] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [settingsName, setSettingsName] = useState("");
  const [settingsGrade, setSettingsGrade] = useState("7");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [guestWallet, setGuestWallet] = useState({ totalCoins: 0, todayCoins: 0, day: "" });
  const [syncStatus, setSyncStatus] = useState("پس از ورود، پیشرفت همین دستگاه با حساب ابری ادغام می‌شود.");

  function adoptProfile(next: Profile) {
    setProfile(next);
    setSettingsName(next.displayName || "");
    setSettingsGrade(String(next.grade || 7));
    try { localStorage.setItem(LINGUAPRO_PROFILE_KEY, JSON.stringify(next)); } catch { /* optional local cache */ }
  }

  useEffect(() => {
    setRoot(siteRoot());
    setGuestWallet(getGuestWalletSnapshot());
    const token = getAccountToken();
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${getApiBase()}/api/account/me/`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
        const payload = await response.json().catch(() => ({})) as ApiPayload;
        if (!response.ok) throw new Error(payload.error || "ورود فعلی معتبر نیست.");
        if (!cancelled && payload.profile) adoptProfile(payload.profile);
      } catch (reason) {
        if (!cancelled) setError(reason instanceof Error ? reason.message : "ارتباط با حساب ممکن نشد.");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function sendCode(event: FormEvent) {
    event.preventDefault(); setError(""); setMessage(""); setBusy(true);
    try {
      const response = await fetch(`${getApiBase()}/api/account/request-code/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), displayName: displayName.trim() }),
      });
      const payload = await response.json().catch(() => ({})) as ApiPayload;
      if (!response.ok) throw new Error(payload.error || "ارسال کد ورود ناموفق بود.");
      setStage("code");
      setMessage("کد ورود به ایمیلت فرستاده شد. پوشهٔ Spam را هم بررسی کن.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "امکان ارسال کد وجود ندارد.");
    } finally { setBusy(false); }
  }

  async function verifyCode(event: FormEvent) {
    event.preventDefault(); setError(""); setMessage(""); setBusy(true);
    try {
      const response = await fetch(`${getApiBase()}/api/account/verify-code/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code: code.trim(), displayName: displayName.trim() }),
      });
      const payload = await response.json().catch(() => ({})) as ApiPayload;
      if (!response.ok || !payload.token || !payload.profile) throw new Error(payload.error || "کد ورود پذیرفته نشد.");
      localStorage.setItem(LINGUAPRO_TOKEN_KEY, payload.token);
      adoptProfile(payload.profile);
      window.dispatchEvent(new Event(LINGUAPRO_AUTH_EVENT));
      const syncResponse = await fetch(`${getApiBase()}/api/account/progress/`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.token}` },
        body: JSON.stringify({ progress: readLocalProgress() }),
      });
      if (syncResponse.ok) setSyncStatus("پیشرفت همین دستگاه با حساب ابری ادغام شد؛ با همان ایمیل در دستگاه دوم هم وارد شو.");
      else setSyncStatus("ورود انجام شد؛ همگام‌سازی پس از دسترسی کامل به سرویس انجام می‌شود.");
      setMessage("ورود موفق بود. حالا می‌توانی نمایه و تنظیمات حسابت را مدیریت کنی.");
      setTab("overview"); setGuestWallet(getGuestWalletSnapshot());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "ورود ناموفق بود.");
    } finally { setBusy(false); }
  }

  async function passwordLogin(event: FormEvent) {
    event.preventDefault(); setError(""); setMessage(""); setBusy(true);
    try {
      const response = await fetch(`${getApiBase()}/api/account/password-login/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password: loginPassword }),
      });
      const payload = await response.json().catch(() => ({})) as ApiPayload;
      if (!response.ok || !payload.token || !payload.profile) throw new Error(payload.error || "ورود با رمز ناموفق بود.");
      localStorage.setItem(LINGUAPRO_TOKEN_KEY, payload.token);
      adoptProfile(payload.profile);
      window.dispatchEvent(new Event(LINGUAPRO_AUTH_EVENT));
      setMessage("با موفقیت وارد شدی."); setLoginPassword(""); setTab("overview");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "ورود با رمز ناموفق بود.");
    } finally { setBusy(false); }
  }

  async function saveSettings(event: FormEvent) {
    event.preventDefault(); setError(""); setMessage("");
    if (newPassword && newPassword !== confirmPassword) { setError("رمز جدید و تکرار آن یکسان نیستند."); return; }
    if (newPassword && newPassword.length < 10) { setError("رمز جدید باید دست‌کم ۱۰ کاراکتر باشد."); return; }
    setSaving(true);
    try {
      const token = getAccountToken();
      const response = await fetch(`${getApiBase()}/api/account/settings/`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ displayName: settingsName, grade: Number(settingsGrade), currentPassword, newPassword }),
      });
      const payload = await response.json().catch(() => ({})) as ApiPayload;
      if (!response.ok || !payload.profile) throw new Error(payload.error || "ذخیرهٔ تنظیمات ناموفق بود.");
      adoptProfile(payload.profile); setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      setMessage(payload.message || "تنظیمات ذخیره شد.");
      window.dispatchEvent(new Event(LINGUAPRO_AUTH_EVENT));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "ذخیرهٔ تنظیمات ناموفق بود.");
    } finally { setSaving(false); }
  }

  async function signOut() {
    const token = getAccountToken();
    try { if (token) await fetch(`${getApiBase()}/api/account/logout/`, { method: "POST", headers: { Authorization: `Bearer ${token}` } }); } catch { /* local logout still works */ }
    localStorage.removeItem(LINGUAPRO_TOKEN_KEY); localStorage.removeItem(LINGUAPRO_PROFILE_KEY);
    setProfile(null); setCode(""); setStage("email"); setLoginMode("email"); setMessage("از این دستگاه خارج شدی؛ اطلاعات حساب حذف نشده است.");
    window.dispatchEvent(new Event(LINGUAPRO_AUTH_EVENT)); setGuestWallet(getGuestWalletSnapshot());
  }

  return <main className="lp-account-page" dir="rtl"><div className="lp-account-shell">
    <a className="lp-account-back" href={`${root}/`}>← بازگشت به صفحهٔ اصلی</a>
    <header className="lp-account-hero lp-account-hero-modern">
      <div className="lp-account-orb">✦</div><div className="lp-account-hero-copy"><span className="lp-eyebrow">LINGUAPRO · PERSONAL SPACE</span><h1>{profile ? `خوش برگشتی، ${profile.displayName || "زبان‌آموز"}` : "مرکز حساب کاربری"}</h1><p>{profile ? "پیشرفت، امنیت و مشخصات یادگیری‌ات را از یکجا مدیریت کن." : "اختیاری وارد شو، پیشرفتت را نگه دار و روی دستگاه‌های مختلف ادامه بده."}</p></div>
      {profile && <div className="lp-profile-grade-chip"><span>پایهٔ تحصیلی</span><strong>{profile.grade || 7}</strong></div>}
    </header>

    {profile ? <>
      <div className="lp-account-tabs" role="tablist" aria-label="بخش‌های حساب"><button type="button" className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>نمای کلی</button><button type="button" className={tab === "settings" ? "active" : ""} onClick={() => setTab("settings")}>تنظیمات و امنیت</button></div>
      {tab === "overview" ? <>
        <section className="lp-profile-welcome"><div className="lp-profile-avatar">{(profile.displayName || profile.email || "L").slice(0, 1).toLocaleUpperCase("fa-IR")}</div><div className="lp-profile-identity"><span className="lp-profile-status"><i /> حساب ابری فعال</span><h2>{profile.displayName || "زبان‌آموز LinguaPro"}</h2><p dir="ltr">{profile.email}</p><small>{syncStatus}</small></div><button type="button" className="lp-button lp-button-secondary lp-edit-profile" onClick={() => setTab("settings")}>ویرایش نمایه</button></section>
        {(() => { const level = getAccountLevel(profile.totalCoins || 0); return <section className="lp-account-level-card"><div className="lp-account-level-emblem">{level.symbol}</div><div className="lp-account-level-content"><div className="lp-account-level-top"><span>سطح زبان‌آموزی تو</span><b>LEVEL {level.maxed ? "MAX" : fa(levelsNumber(level.floor))}</b></div><h2>{level.name}</h2><p>{level.maxed ? "به بالاترین نشان فعلی رسیدی؛ به یادگیری ادامه بده!" : `برای رسیدن به سطح بعدی ${fa(level.remaining)} سکهٔ دیگر جمع کن.`}</p><div className="lp-account-level-track"><span style={{ width: `${level.progress}%` }} /></div><div className="lp-account-level-bottom"><span>{fa(level.coins)} سکهٔ کل</span><strong>{level.maxed ? "سطح کامل" : `${fa(level.progress)}٪ پیشرفت`}</strong></div></div></section>; })()}
        <section className="lp-profile-stat-grid"><article className="lp-profile-stat lp-profile-stat-coin"><span>🪙</span><label>مجموع سکه‌ها</label><strong>{fa(profile.totalCoins || 0)}</strong><small>امتیازهای تمام روزها</small></article><article className="lp-profile-stat"><span>⚡</span><label>سکه‌های امروز</label><strong>{fa(profile.todayCoins || 0)}</strong><small>فعالیت‌های امروز به وقت تهران</small></article><article className="lp-profile-stat"><span>🎓</span><label>پایهٔ من</label><strong>{fa(Number(profile.grade || 7))}</strong><small>پایهٔ انتخابی: {fa(profile.grade || 7)}</small></article></section>
        <section className="lp-account-action-grid"><a href={`${root}/league/`} className="lp-account-action lp-account-action-league"><span>🏆</span><div><strong>لیگ و رتبه‌بندی</strong><small>رتبهٔ خودت و برترین زبان‌آموزها را ببین</small></div><b>←</b></a><button type="button" className="lp-account-action" onClick={() => setTab("settings")}><span>⚙️</span><div><strong>تنظیمات حساب</strong><small>نام نمایشی، پایه و رمز ورود را مدیریت کن</small></div><b>←</b></button></section>
        <section className="lp-account-cloud-card"><div className="lp-cloud-icon">☁</div><div><strong>پیشرفتت همراه خودت می‌آید</strong><p>با همین ایمیل در دستگاه دوم وارد شو تا پیشرفت‌های پشتیبانی‌شده با حساب ابری ادغام شوند. فایل صدای اسپیکینگ در فضای ابری ذخیره نمی‌شود.</p></div><span className="lp-cloud-badge">همگام‌سازی</span></section>
      </> : <section className="lp-account-card lp-settings-card"><div className="lp-settings-heading"><span>⚙️</span><div><h2>تنظیمات حساب</h2><p>نمایه، پایه و امنیت ورود خود را به‌روز نگه دار.</p></div></div><form onSubmit={saveSettings} className="lp-account-form lp-settings-form">
        <div className="lp-settings-section-title">اطلاعات نمایه</div>
        <label className="lp-account-label" htmlFor="lp-settings-name">نام نمایشی در لیگ</label><input id="lp-settings-name" value={settingsName} onChange={(event) => setSettingsName(event.target.value)} required minLength={2} maxLength={32} placeholder="نامی که دیگران می‌بینند" />
        <label className="lp-account-label" htmlFor="lp-settings-grade">پایهٔ تحصیلی</label><select id="lp-settings-grade" value={settingsGrade} onChange={(event) => setSettingsGrade(event.target.value)}><option value="7">پایهٔ هفتم</option><option value="8">پایهٔ هشتم</option><option value="9">پایهٔ نهم</option></select>
        <div className="lp-settings-section-title lp-security-title">امنیت و رمز عبور</div><div className="lp-password-state"><span>{profile.passwordConfigured ? "🔐" : "✉️"}</span><div><strong>{profile.passwordConfigured ? "ورود با رمز فعال است" : "ورود با کد ایمیل فعال است"}</strong><p>{profile.passwordConfigured ? "می‌توانی رمزت را تغییر بدهی یا با کد ایمیل آن را بازنشانی کنی." : "در صورت تمایل می‌توانی رمز تنظیم کنی؛ ورود با کد ایمیل همچنان در دسترس می‌ماند."}</p></div></div>
        {profile.passwordConfigured && profile.authMethod === "password" && <><label className="lp-account-label" htmlFor="lp-current-password">رمز فعلی</label><input id="lp-current-password" type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="رمز فعلی" /></>}
        <label className="lp-account-label" htmlFor="lp-new-password">{profile.passwordConfigured ? "رمز جدید (اختیاری)" : "ساخت رمز (اختیاری)"}</label><input id="lp-new-password" type="password" autoComplete="new-password" minLength={10} maxLength={128} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="حداقل ۱۰ کاراکتر" />
        <label className="lp-account-label" htmlFor="lp-confirm-password">تکرار رمز جدید</label><input id="lp-confirm-password" type="password" autoComplete="new-password" maxLength={128} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="رمز جدید را دوباره وارد کن" />
        <p className="lp-security-help">رمز به‌صورت هش‌شده در دیتابیس ذخیره می‌شود. اگر رمز را فراموش کردی، با کد ایمیل وارد شو و از همین بخش رمز تازه بگذار.</p>
        <button className="lp-button lp-button-primary" disabled={saving}>{saving ? "در حال ذخیره…" : "ذخیرهٔ تنظیمات"}</button>
      </form></section>}
      <div className="lp-account-logout-row"><span>این حساب روی چند دستگاه قابل استفاده است.</span><button type="button" className="lp-text-button lp-danger-button" onClick={signOut}>خروج از این دستگاه</button></div>
    </> : <div className="lp-account-grid lp-login-grid">
      <section className="lp-account-card lp-login-card"><div className="lp-login-card-heading"><span className="lp-login-lock">🔐</span><div><h2>ورود یا ساخت حساب</h2><p>برای همگام‌سازی پیشرفت و ثبت رتبه وارد شو.</p></div></div>
        <div className="lp-login-mode"><button type="button" className={loginMode === "email" ? "active" : ""} onClick={() => { setLoginMode("email"); setError(""); }}>کد ایمیل</button><button type="button" className={loginMode === "password" ? "active" : ""} onClick={() => { setLoginMode("password"); setError(""); }}>رمز عبور</button></div>
        {loginMode === "email" ? stage === "email" ? <form onSubmit={sendCode} className="lp-account-form"><label className="lp-account-label" htmlFor="lp-display-name">نام نمایشی (اختیاری)</label><input id="lp-display-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={32} placeholder="مثلاً زبان‌آموز ۷۳" autoComplete="nickname" /><label className="lp-account-label" htmlFor="lp-email">ایمیل</label><input id="lp-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} autoComplete="email" placeholder="you@example.com" dir="ltr" /><button className="lp-button lp-button-primary" disabled={busy}>{busy ? "در حال ارسال…" : "ارسال کد یک‌بارمصرف"}</button></form> : <form onSubmit={verifyCode} className="lp-account-form"><p className="lp-muted">کد ارسال‌شده به <b dir="ltr">{email}</b> را وارد کن.</p><label className="lp-account-label" htmlFor="lp-otp">کد ۶ رقمی</label><input id="lp-otp" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="000000" dir="ltr" /><button className="lp-button lp-button-primary" disabled={busy || code.length !== 6}>{busy ? "در حال بررسی…" : "تأیید و ورود"}</button><button type="button" className="lp-text-button" onClick={() => { setStage("email"); setCode(""); setError(""); }}>تغییر ایمیل / درخواست مجدد</button></form> : <form onSubmit={passwordLogin} className="lp-account-form"><p className="lp-muted">با ایمیلی که برای حساب ثبت کرده‌ای و رمزی که ساخته‌ای وارد شو.</p><label className="lp-account-label" htmlFor="lp-password-email">ایمیل</label><input id="lp-password-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} autoComplete="email" placeholder="you@example.com" dir="ltr" /><label className="lp-account-label" htmlFor="lp-login-password">رمز عبور</label><input id="lp-login-password" type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} required autoComplete="current-password" maxLength={128} placeholder="رمز حسابت" /><button className="lp-button lp-button-primary" disabled={busy}>{busy ? "در حال ورود…" : "ورود با رمز"}</button><button type="button" className="lp-text-button" onClick={() => { setLoginMode("email"); setStage("email"); setError(""); }}>رمز را فراموش کرده‌ای؟ ورود با کد ایمیل</button></form>}
        {error && <div className="lp-message lp-message-error" role="alert">{error}</div>}{message && <div className="lp-message lp-message-info" role="status">{message}</div>}
      </section>
      <aside className="lp-account-card lp-account-explain"><span className="lp-explain-icon">🌐</span><h2>همراه در همهٔ دستگاه‌ها</h2><p className="lp-muted">با حساب رایگان می‌توانی روی لپ‌تاپ و موبایل ادامه بدهی؛ اطلاعاتی که بخش‌های آموزشی پشتیبانی می‌کنند در فضای ابری ادغام می‌شوند.</p><div className="lp-login-benefits"><div><span>☁️</span><strong>پیشرفت یکپارچه</strong><small>ادغام اطلاعات دستگاه‌ها</small></div><div><span>🏆</span><strong>لیگ و رتبه</strong><small>رتبه‌بندی بر اساس فیلترهای انتخابی</small></div><div><span>🛡️</span><strong>ورود امن</strong><small>کد ایمیل یا رمز هش‌شده</small></div></div><div className="lp-guest-wallet"><span>🪙 سکهٔ مهمان (این دستگاه)</span><strong>{fa(guestWallet.totalCoins)}</strong><small>برای ثبت رتبهٔ عمومی وارد حساب شو.</small></div></aside>
    </div>}
    {profile && error && <div className="lp-message lp-message-error" role="alert">{error}</div>}
    {profile && message && <div className="lp-message lp-message-info" role="status">{message}</div>}
    <footer className="lp-account-footer">ورود اختیاری است · کد ایمیل ۱۰ دقیقه معتبر است · نشست‌ها پس از ۳۰ روز منقضی می‌شوند · فایل صدای Speaking همگام‌سازی نمی‌شود.</footer>
  </div></main>;
}
