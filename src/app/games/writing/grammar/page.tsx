export default function GrammarGamePage() {
  return (
    <main className="embedded-game-page" dir="rtl">
      <div className="embedded-game-toolbar">
        <a href="/english-learning-project/games/writing/">
          ← بازگشت به Writing
        </a>
        <strong>Grammar · آکادمی گرامر</strong>
      </div>
      <iframe
        className="embedded-game-frame"
        src="/english-learning-project/games/grammar.html"
        title="English Quest Grammar Academy"
        allow="autoplay"
      />
    </main>
  );
}
