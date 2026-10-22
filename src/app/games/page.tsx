// LINGUAPRO_GAMES_ARCADE_ROOT_V1
const root = "/english-learning-project";
export default function GamesPage() {
  return (
    <main className="warmup-embed-page" dir="rtl">
      <div className="warmup-embed-toolbar">
        <a href={root + "/"}>← بازگشت به صفحه اصلی</a>
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
