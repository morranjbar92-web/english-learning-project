import ActivityRewardButton from "../../components/activity-reward-button";
const root = "/english-learning-project";

export default function LexiverseArcadePage() {
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
      <ActivityRewardButton type="game_completed" activityId="lexiverse-arcade" label="بازی را تمام کردم؛ دریافت ۸ سکه" />
    </main>
  );
}
