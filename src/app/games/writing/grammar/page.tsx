export default function GrammarGamePage() {
  return (
    <main className="embedded-game-page" dir="rtl">
      <div className="embedded-game-toolbar">
        <a href="/english-learning-project/">
          ← بازگشت به صفحه اصلی
        </a>
        <strong>Grammarino PLUS · آموزش گرامر پایه‌های هفتم، هشتم و نهم</strong>
      </div>
      <iframe
        className="embedded-game-frame"
        src="/english-learning-project/games/grammarino-plus.html"
        title="Grammarino PLUS | آموزش گرامر و تلفظ حروف ترکیبی"
        allow="autoplay; fullscreen"
      />
    </main>
  );
}