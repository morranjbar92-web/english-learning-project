import Grammarino from "../games/writing/grammar/page";
import ActivityRewardButton from "../components/activity-reward-button";

export default function GrammarPage() {
  return (
    <>
      <Grammarino />
      <ActivityRewardButton type="grammar_completed" activityId="grammar-practice" label="تمرین گرامر را انجام دادم؛ دریافت ۱۰ سکه" />
    </>
  );
}
