export default function ListeningWorldPage() {
  return (
    <main className="embedded-game-page" dir="rtl">
      <div className="embedded-game-toolbar">
        <a href="/english-learning-project/games/">
          ← بازگشت به آزمون‌های دست‌گرمی
        </a>
        <strong>Listening · آزمون شنیداری</strong>
      </div>
      <iframe
        className="embedded-game-frame"
        src="/english-learning-project/games/listening-world.html"
        title="English Quest Listening World"
        allow="autoplay"
      />
    </main>
  );
}
