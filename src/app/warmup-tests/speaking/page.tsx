// LINGUAPRO_SPEAKING_PRACTICE_ALIAS_V1
import SpeakingPractice from "../../games/speaking/speaking-practice";
import "../../games/speaking/speaking.css";

const root = "/english-learning-project";
const backHref = root + "/warmup-tests/";

export default function WarmupSpeakingPracticePage() {
  return <SpeakingPractice backHref={backHref} />;
}
