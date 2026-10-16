export default function MiniGamesPage() {
  return (
    <main className="embedded-game-page" dir="rtl">
      <div className="embedded-game-toolbar">
        <a href="/games/writing/">
          ← بازگشت به Writing
        </a>
        <strong>Mini Games · بازی‌های کلمات</strong>
      </div>
      <iframe
        className="embedded-game-frame"
        src="/games/mini-games.html"
        title="English Quest Lost Worlds Mini Games"
        allow="autoplay"
      />
    </main>
  );
}
