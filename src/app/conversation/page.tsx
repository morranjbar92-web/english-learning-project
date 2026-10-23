"use client";
import ActivityRewardButton from "../components/activity-reward-button";

import { useEffect, useState } from "react";

export default function ConversationLabPage() {
  const [src, setSrc] = useState("");

  useEffect(() => {
    const prefix = window.location.pathname.startsWith("/english-learning-project/")
      ? "/english-learning-project"
      : "";
    setSrc(`${prefix}/conversation-lab.html`);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#f5f7ff", margin: 0 }}>
      {src ? (
        <iframe
          src={src}
          title="آزمایشگاه مکالمه انگلیسی پایه‌های هفتم، هشتم و نهم"
          allow="microphone"
          style={{ display: "block", width: "100%", height: "100vh", minHeight: "720px", border: 0 }}
        />
      ) : (
        <div style={{ padding: 32, fontFamily: "Tahoma, Arial, sans-serif" }}>در حال بارگذاری آزمایشگاه مکالمه…</div>
      )}
    
      <ActivityRewardButton type="conversation_completed" activityId="conversation-practice" label="تمرین مکالمه را انجام دادم؛ دریافت ۵ سکه" />
    </main>
  );
}