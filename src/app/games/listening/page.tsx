const root = "/english-learning-project";

export default function ListeningWorldPage() {
  return (
    <main className="warmup-embed-page" dir="rtl">
      <div className="warmup-embed-toolbar">
        <a href={root + "/games/"}>← بازگشت به آزمون‌های دست‌گرمی</a>
        <strong>Listening World · آزمون شنیداری</strong>
      </div>
      <iframe
        className="warmup-embed-frame"
        src={root + "/games/listening-world.html"}
        title="LinguaPro Listening World"
        allow="autoplay"
      />
    </main>
  );
}
