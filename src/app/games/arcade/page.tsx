import ActivityRewardButton from "../../components/activity-reward-button";
const root = "/english-learning-project";

export default function LexiverseArcadePage() {
  return (
    <main className="warmup-embed-page" dir="rtl">
      <div className="warmup-embed-toolbar">
        <a className="graphic-game-back-button" href={root + "/"} style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", padding: ".7rem 1rem", borderRadius: "999px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", textDecoration: "none", fontWeight: 700, boxShadow: "0 8px 22px rgba(79,70,229,.25)" }}>⌂ بازگشت به صفحهٔ اصلی</a>
        <strong>LEXIverse · بازی‌های زبان انگلیسی</strong>
      </div>
      <iframe
        className="warmup-embed-frame"
        src={root + "/games/lexiverse.html"}
        title="LEXIverse English Game Universe"
        allow="autoplay; fullscreen"
      />
      <p style={{ textAlign: "center", padding: "0.75rem", lineHeight: 1.8 }}>پس از پایان یک دور یا تکمیل چالش روزانه، پاداش لیگ خودکار ثبت می‌شود. برای قرارگرفتن در رتبه‌بندی، <a href={root + "/account/"}>وارد حساب ایمیلی</a> شو.</p>
    </main>
  );
}
