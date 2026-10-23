// LINGUAPRO_SPEAKING_PRACTICE_V1
import SpeakingPractice from "./speaking-practice";
import "./speaking.css";

const root = "/english-learning-project";
const backHref = root + "/games/";

export default function SpeakingPracticePage() {
  return <SpeakingPractice backHref={backHref} />;
}
