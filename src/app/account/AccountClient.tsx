"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  getAccountToken, getApiBase, getGuestWalletSnapshot, readLocalProgress,
  LINGUAPRO_TOKEN_KEY, LINGUAPRO_PROFILE_KEY, LINGUAPRO_AUTH_EVENT,
} from "../../lib/linguapro-rewards";
import "./account.css";

type Profile = { id?: string; email?: string; displayName?: string; totalCoins?: number; todayCoins?: number; rank?: number | null };
type ApiPayload = { error?: string; message?: string; token?: string; profile?: Profile; progress?: Record<string, unknown> };

function siteRoot() {
  if (typeof window === "undefined") return "";
  return window.location.pathname.startsWith("/english-learning-project") ? "/english-learning-project" : "";
}

export default function AccountClient() {
  const [root, setRoot] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"email" | "code">("email");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [busy, setBusy] = useState(false);
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
      setMessage("اگر سرویس ایمیل تنظیم باشد، کد ۶ رقمی به ایمیلت فرستاده می‌شود. پوشهٔ Spam را هم بررسی کن.");
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
      localStorage.setItem(LINGUAPRO_PROFILE_KEY, JSON.stringify(payload.profile));
      setProfile(payload.profile);
      window.dispatchEvent(new Event(LINGUAPRO_AUTH_EVENT));
      const syncResponse = await fetch(`${getApiBase()}/api/account/progress/`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.token}` },
        body: JSON.stringify({ progress: readLocalProgress() }),
      });
      if (syncResponse.ok) setSyncStatus("پیشرفت محلی و حساب ابری با هم ادغام شدند؛ این حساب را روی دستگاه دوم هم وارد کن.");
      else setSyncStatus("ورود انجام شد؛ همگام‌سازی خودکار پس از دسترسی به سرویس انجام می‌شود.");
      setMessage("با موفقیت وارد شدی. اطلاعات حساب از این پس در دستگاه‌های واردشده همگام می‌شود.");
      setGuestWallet(getGuestWalletSnapshot());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "ورود ناموفق بود.");
    } finally { setBusy(false); }
  }

  async function signOut() {
    const token = getAccountToken();
    try { if (token) await fetch(`${getApiBase()}/api/account/logout/`, { method: "POST", headers: { Authorization: `Bearer ${token}` } }); } catch { /* local logout still works */ }
    localStorage.removeItem(LINGUAPRO_TOKEN_KEY);
    localStorage.removeItem(LINGUAPRO_PROFILE_KEY);
    setProfile(null); setCode(""); setStage("email"); setMessage("از این دستگاه خارج شدی. اطلاعات ذخیره‌شدهٔ حساب حذف نشده است.");
    window.dispatchEvent(new Event(LINGUAPRO_AUTH_EVENT));
    setGuestWallet(getGuestWalletSnapshot());
  }

  return <main className="lp-account-page" dir="rtl">
    <div className="lp-account-shell">
      <a className="lp-account-back" href={`${root}/`}>← بازگشت به صفحهٔ اصلی</a>
      <header className="lp-account-hero"><div className="lp-account-orb">✉</div><div><span className="lp-eyebrow">LINGUAPRO CLOUD</span><h1>حساب کاربری اختیاری</h1><p>با یک کد ایمیلی وارد شو تا پیشرفتت بین دو دستگاه همگام شود.</p></div></header>
      <div className="lp-account-grid">
        <section className="lp-account-card lp-login-card">
          {profile ? <>
            <div className="lp-login-success"><span>✓</span><div><h2>وارد حساب شدی</h2><p>{profile.email}</p></div></div>
            <label className="lp-account-label">نام نمایشی لیگ</label><div className="lp-readonly-name">{profile.displayName || "نام نمایشی ثبت نشده؛ ایمیل به‌صورت پنهان نمایش داده می‌شود"}</div>
            <div className="lp-account-stats"><div><span>سکه‌های امروز</span><strong>{Number(profile.todayCoins || 0).toLocaleString("fa-IR")}</strong></div><div><span>مجموع سکه‌ها</span><strong>{Number(profile.totalCoins || 0).toLocaleString("fa-IR")}</strong></div></div>
            <p className="lp-muted">{syncStatus}</p>
            <button type="button" className="lp-button lp-button-secondary" onClick={signOut}>خروج از این دستگاه</button>
            <a className="lp-button lp-button-primary" href={`${root}/league/`}>مشاهدهٔ لیگ روزانه ←</a>
          </> : <>
            <h2>{stage === "email" ? "ورود با ایمیل" : "تأیید کد ورود"}</h2>
            <p className="lp-muted">ورود اجباری نیست. بدون حساب می‌توانی یادگیری را ادامه بدهی؛ اما ذخیرهٔ ابری و رتبهٔ بین کاربران به حساب نیاز دارد.</p>
            {stage === "email" ? <form onSubmit={sendCode} className="lp-account-form">
              <label className="lp-account-label" htmlFor="lp-display-name">نام نمایشی (اختیاری)</label><input id="lp-display-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={32} placeholder="مثلاً زبان‌آموز ۷۳" autoComplete="nickname" />
              <label className="lp-account-label" htmlFor="lp-email">ایمیل</label><input id="lp-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} autoComplete="email" placeholder="you@example.com" dir="ltr" />
              <button className="lp-button lp-button-primary" disabled={busy}>{busy ? "در حال ارسال…" : "ارسال کد یک‌بارمصرف"}</button>
            </form> : <form onSubmit={verifyCode} className="lp-account-form">
              <p className="lp-muted">کد ارسال‌شده به <b dir="ltr">{email}</b> را وارد کن.</p>
              <label className="lp-account-label" htmlFor="lp-otp">کد ۶ رقمی</label><input id="lp-otp" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="000000" dir="ltr" />
              <button className="lp-button lp-button-primary" disabled={busy || code.length !== 6}>{busy ? "در حال بررسی…" : "تأیید و ورود"}</button>
              <button type="button" className="lp-text-button" onClick={() => { setStage("email"); setCode(""); setError(""); }}>تغییر ایمیل / درخواست مجدد</button>
            </form>}
          </>}
          {error && <div className="lp-message lp-message-error" role="alert">{error}</div>}
          {message && <div className="lp-message lp-message-info" role="status">{message}</div>}
        </section>
        <aside className="lp-account-card lp-account-explain">
          <span className="lp-explain-icon">🔐</span><h2>چه چیزی همگام می‌شود؟</h2>
          <ul><li>واژه‌های آموخته‌شده و ذخیره‌شده</li><li>پیشرفت ریدینگ و لیسنینگ</li><li>درس‌های نوشتن و پیش‌نویس‌ها</li><li>پیشرفت محلی‌ای که بخش‌های آموزشی در مرورگر ذخیره می‌کنند</li></ul>
          <div className="lp-account-note"><strong>حریم خصوصی</strong><p>رمز عبور نمی‌گیریم؛ ورود با کد موقت ایمیل است. فایل صدای ضبط‌شدهٔ اسپیکینگ و رمز ورود در همگام‌سازی قرار نمی‌گیرند.</p></div>
          <div className="lp-guest-wallet"><span>🪙 سکهٔ مهمان (فقط این دستگاه)</span><strong>{guestWallet.totalCoins.toLocaleString("fa-IR")}</strong><small>برای جدول رتبه‌بندی سکه‌های حساب لازم است.</small></div>
        </aside>
      </div>
      <footer className="lp-account-footer">کدهای ورود ۱۰ دقیقه اعتبار دارند. در حساب خود می‌توانی هم‌زمان از دو دستگاه استفاده کنی؛ با واردشدن با همان ایمیل، پیشرفت ابری یکی می‌شود.</footer>
    </div>
  </main>;
}
