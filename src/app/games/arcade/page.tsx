const root = "/english-learning-project";

export default function LexiverseArcadePage() {
  return (
    <main className="warmup-embed-page" dir="rtl">
      <div className="warmup-embed-toolbar">
        <a href={root + "/games/"}>← بازگشت به آزمون‌های دست‌گرمی</a>
        <strong>LEXIverse · بازی‌های زبان انگلیسی</strong>
      </div>
      <iframe
        className="warmup-embed-frame"
        src={root + "/games/lexiverse.html"}
        title="LEXIverse English Game Universe"
        allow="autoplay; fullscreen"
      />
    </main>
  );
}
