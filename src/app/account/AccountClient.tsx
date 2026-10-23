"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  getAccountToken, getApiBase, getGuestWalletSnapshot, readLocalProgress,
  LINGUAPRO_TOKEN_KEY, LINGUAPRO_PROFILE_KEY, LINGUAPRO_AUTH_EVENT,
} from "../../lib/linguapro-rewards";
import "./account.css";

type Profile = { id?: string; email?: string; displayName?: string; totalCoins?: number; todayCoins?: number; rank?: number | null };
type ApiPayload = { error?: string; message?: string; token?: string; profile?: Profile; progress?: Record<string, unknown> };
type Stage = "email" | "code" | "password-login";

function siteRoot() {
  if (typeof window === "undefined") return "";
  return window.location.pathname.startsWith("/english-learning-project") ? "/english-learning-project" : "";
}

export default function AccountClient() {
  const [root, setRoot] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stage, setStage] = useState<Stage>("email");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [busy, setBusy] = useState(false);
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [guestWallet, setGuestWallet] = useState({ totalCoins: 0, todayCoins: 0, day: "" });
  const [syncStatus, setSyncStatus] = useState("پس از ورود، پیشرفت همین دستگاه با حساب ابری ادغام می‌شود.");

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
        if (!cancelled && payload.profile) setProfile(payload.profile);
      } catch (reason) {
        if (!cancelled) setError(reason instanceof Error ? reason.message : "ارتباط با حساب ممکن نشد.");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function finishLogin(payload: ApiPayload) {
    if (!payload.token || !payload.profile) throw new Error("اطلاعات ورود از سرور کامل نیست.");
    localStorage.setItem(LINGUAPRO_TOKEN_KEY, payload.token);
    localStorage.setItem(LINGUAPRO_PROFILE_KEY, JSON.stringify(payload.profile));
    setProfile(payload.profile);
    setPassword("");
    window.dispatchEvent(new Event(LINGUAPRO_AUTH_EVENT));
    try {
      const syncResponse = await fetch(`${getApiBase()}/api/account/progress/`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.token}` },
        body: JSON.stringify({ progress: readLocalProgress() }),
      });
      if (syncResponse.ok) setSyncStatus("پیشرفت این دستگاه با حساب ابری ادغام شد؛ روی دستگاه دوم هم با همین ایمیل وارد شو.");
      else setSyncStatus("ورود انجام شد؛ همگام‌سازی پس از دسترسی به سرویس دوباره انجام می‌شود.");
    } catch {
      setSyncStatus("ورود انجام شد؛ همگام‌سازی با اتصال مجدد انجام می‌شود.");
    }
    setMessage("با موفقیت وارد شدی. می‌توانی از این حساب روی دستگاه دوم هم استفاده کنی.");
    setGuestWallet(getGuestWalletSnapshot());
  }

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
      setMessage("کد ۶ رقمی به ایمیلت فرستاده شد. اگر پیدایش نکردی، پوشهٔ Spam را هم بررسی کن.");
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
      await finishLogin(payload);
      setCode("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "ورود ناموفق بود.");
    } finally { setBusy(false); }
  }

  async function passwordLogin(event: FormEvent) {
    event.preventDefault(); setError(""); setMessage(""); setBusy(true);
    try {
      const response = await fetch(`${getApiBase()}/api/account/password-login/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const payload = await response.json().catch(() => ({})) as ApiPayload;
      if (!response.ok || !payload.token || !payload.profile) throw new Error(payload.error || "ورود با رمز انجام نشد.");
      await finishLogin(payload);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "ورود با رمز انجام نشد.");
    } finally { setBusy(false); }
  }

  async function savePassword(event: FormEvent) {
    event.preventDefault(); setError(""); setMessage("");
    if (newPassword.length < 10 || newPassword.length > 128) {
      setError("رمز جدید باید حداقل ۱۰ و حداکثر ۱۲۸ نویسه باشد."); return;
    }
    if (newPassword !== confirmPassword) { setError("تکرار رمز جدید با رمز واردشده یکسان نیست."); return; }
    const token = getAccountToken();
    if (!token) { setError("نشست معتبر نیست؛ دوباره وارد شو."); return; }
    setPasswordBusy(true);
    try {
      const response = await fetch(`${getApiBase()}/api/account/password/`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: currentPassword || undefined, password: newPassword }),
      });
      const payload = await response.json().catch(() => ({})) as ApiPayload;
      if (!response.ok) throw new Error(payload.error || "ذخیرهٔ رمز عبور انجام نشد.");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      setMessage(payload.message || "رمز ذخیره شد؛ از ورود بعدی می‌توانی با رمز وارد شوی.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "ذخیرهٔ رمز عبور انجام نشد.");
    } finally { setPasswordBusy(false); }
  }

  async function signOut() {
    const token = getAccountToken();
    try { if (token) await fetch(`${getApiBase()}/api/account/logout/`, { method: "POST", headers: { Authorization: `Bearer ${token}` } }); } catch { /* local logout still works */ }
    localStorage.removeItem(LINGUAPRO_TOKEN_KEY);
    localStorage.removeItem(LINGUAPRO_PROFILE_KEY);
    setProfile(null); setCode(""); setPassword(""); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); setStage("email"); setMessage("از این دستگاه خارج شدی. اطلاعات ذخیره‌شدهٔ حساب حذف نشده است.");
    window.dispatchEvent(new Event(LINGUAPRO_AUTH_EVENT));
    setGuestWallet(getGuestWalletSnapshot());
  }

  function chooseEmailCode() {
    setStage("email"); setPassword(""); setCode(""); setError("");
    setMessage("با کد ایمیل می‌توانی حساب بسازی یا رمز فراموش‌شده را بازیابی کنی.");
  }

  return <main className="lp-account-page" dir="rtl">
    <div className="lp-account-shell">
      <a className="lp-account-back" href={`${root}/`}>← بازگشت به صفحهٔ اصلی</a>
      <header className="lp-account-hero"><div className="lp-account-orb">✉</div><div><span className="lp-eyebrow">LINGUAPRO CLOUD</span><h1>حساب کاربری اختیاری</h1><p>یک‌بار با کد ایمیل تأیید کن و رمز بگذار؛ دفعات بعد می‌توانی مستقیم با رمز وارد شوی.</p></div></header>
      <div className="lp-account-grid">
        <section className="lp-account-card lp-login-card">
          {profile ? <>
            <div className="lp-login-success"><span>✓</span><div><h2>وارد حساب شدی</h2><p>{profile.email}</p></div></div>
            <label className="lp-account-label">نام نمایشی لیگ</label><div className="lp-readonly-name">{profile.displayName || "نام نمایشی ثبت نشده؛ ایمیل به‌صورت پنهان نمایش داده می‌شود"}</div>
            <div className="lp-account-stats"><div><span>سکه‌های امروز</span><strong>{Number(profile.todayCoins || 0).toLocaleString("fa-IR")}</strong></div><div><span>مجموع سکه‌ها</span><strong>{Number(profile.totalCoins || 0).toLocaleString("fa-IR")}</strong></div></div>
            <p className="lp-muted">{syncStatus}</p>
            <form onSubmit={savePassword} className="lp-account-form lp-password-settings">
              <h2>رمز عبور برای ورودهای بعدی</h2>
              <p className="lp-muted">اگر رمز را برای اولین بار تنظیم می‌کنی، رمز فعلی را خالی بگذار. برای تغییر رمز موجود، رمز فعلی لازم است. اگر فراموشش کرده‌ای، با کد تازهٔ ایمیل دوباره وارد شو.</p>
              <label className="lp-account-label" htmlFor="lp-current-password">رمز فعلی (در صورت وجود)</label>
              <input id="lp-current-password" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} maxLength={128} autoComplete="current-password" placeholder="اگر رمز داری، وارد کن" />
              <label className="lp-account-label" htmlFor="lp-new-password">رمز جدید</label>
              <input id="lp-new-password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength={10} maxLength={128} required autoComplete="new-password" placeholder="حداقل ۱۰ نویسه" />
              <label className="lp-account-label" htmlFor="lp-confirm-password">تکرار رمز جدید</label>
              <input id="lp-confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={10} maxLength={128} required autoComplete="new-password" placeholder="رمز جدید را دوباره وارد کن" />
              <button className="lp-button lp-button-primary" disabled={passwordBusy}>{passwordBusy ? "در حال ذخیره…" : "ذخیرهٔ رمز عبور"}</button>
            </form>
            <button type="button" className="lp-button lp-button-secondary" onClick={signOut}>خروج از این دستگاه</button>
            <a className="lp-button lp-button-primary" href={`${root}/league/`}>مشاهدهٔ لیگ روزانه ←</a>
          </> : <>
            <h2>{stage === "email" ? "ورود یا ساخت حساب با ایمیل" : stage === "code" ? "تأیید کد ورود" : "ورود با رمز عبور"}</h2>
            <p className="lp-muted">ورود اجباری نیست. با کد ایمیل می‌توانی حساب بسازی یا رمز را بازیابی کنی؛ اگر رمز تنظیم کرده‌ای، برای دفعات بعد کد لازم نیست.</p>
            {stage === "email" ? <>
              <form onSubmit={sendCode} className="lp-account-form">
                <label className="lp-account-label" htmlFor="lp-display-name">نام نمایشی (اختیاری)</label><input id="lp-display-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={32} placeholder="مثلاً زبان‌آموز ۷۳" autoComplete="nickname" />
                <label className="lp-account-label" htmlFor="lp-email">ایمیل</label><input id="lp-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} autoComplete="email" placeholder="you@example.com" dir="ltr" />
                <button className="lp-button lp-button-primary" disabled={busy}>{busy ? "در حال ارسال…" : "ارسال کد ایمیل / ساخت حساب"}</button>
              </form>
              <button type="button" className="lp-text-button" onClick={() => { setStage("password-login"); setError(""); setMessage(""); }}>قبلاً رمز گذاشته‌ام؛ ورود با رمز عبور</button>
            </> : stage === "code" ? <form onSubmit={verifyCode} className="lp-account-form">
              <p className="lp-muted">کد ارسال‌شده به <b dir="ltr">{email}</b> را وارد کن.</p>
              <label className="lp-account-label" htmlFor="lp-otp">کد ۶ رقمی</label><input id="lp-otp" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="000000" dir="ltr" />
              <button className="lp-button lp-button-primary" disabled={busy || code.length !== 6}>{busy ? "در حال بررسی…" : "تأیید کد و ورود"}</button>
              <button type="button" className="lp-text-button" onClick={chooseEmailCode}>تغییر ایمیل / درخواست کد تازه</button>
              <button type="button" className="lp-text-button" onClick={() => { setStage("password-login"); setError(""); setMessage(""); }}>ورود با رمز عبور</button>
            </form> : <form onSubmit={passwordLogin} className="lp-account-form">
              <label className="lp-account-label" htmlFor="lp-login-email">ایمیل حساب</label><input id="lp-login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} autoComplete="username" placeholder="you@example.com" dir="ltr" />
              <label className="lp-account-label" htmlFor="lp-login-password">رمز عبور</label><input id="lp-login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required maxLength={128} autoComplete="current-password" placeholder="رمز عبور حساب" />
              <button className="lp-button lp-button-primary" disabled={busy || !password}>{busy ? "در حال ورود…" : "ورود با رمز عبور"}</button>
              <button type="button" className="lp-text-button" onClick={chooseEmailCode}>رمز ندارم یا فراموش کرده‌ام؛ ارسال کد ایمیل</button>
            </form>}
          </>}
          {error && <div className="lp-message lp-message-error" role="alert">{error}</div>}
          {message && <div className="lp-message lp-message-info" role="status">{message}</div>}
        </section>
        <aside className="lp-account-card lp-account-explain">
          <span className="lp-explain-icon">🔐</span><h2>چه چیزی همگام می‌شود؟</h2>
          <ul><li>واژه‌های آموخته‌شده و ذخیره‌شده</li><li>پیشرفت ریدینگ و لیسنینگ</li><li>درس‌های نوشتن و پیش‌نویس‌ها</li><li>پیشرفت محلی‌ای که بخش‌های آموزشی در مرورگر ذخیره می‌کنند</li></ul>
          <div className="lp-account-note"><strong>حریم خصوصی</strong><p>رمز عبور به‌صورت هش امن در دیتابیس نگه‌داری می‌شود و هرگز برای مرورگر برگردانده نمی‌شود. کد ایمیل همچنان برای ساخت حساب یا بازیابی رمز در دسترس است.</p></div>
          <div className="lp-guest-wallet"><span>🪙 سکهٔ مهمان (فقط این دستگاه)</span><strong>{guestWallet.totalCoins.toLocaleString("fa-IR")}</strong><small>برای جدول رتبه‌بندی سکه‌های حساب لازم است.</small></div>
        </aside>
      </div>
      <footer className="lp-account-footer">کدهای ورود ۱۰ دقیقه اعتبار دارند. نشست تا ۳۰ روز معتبر است و می‌توانی هم‌زمان روی دو دستگاه وارد شوی. در ورودهای بعدی از رمز استفاده کن؛ برای بازیابی، کد ایمیل بگیر.</footer>
    </div>
  </main>;
}
