"use client";
import { useState } from "react";
import { awardActivity, type ActivityType } from "../../lib/linguapro-rewards";
export default function ActivityRewardButton({ type, activityId, label }: { type: ActivityType; activityId: string; label: string }) {
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  async function claim() {
    setBusy(true); setNotice("");
    try {
      const result = await awardActivity(type, activityId);
      if (result.awarded > 0) setNotice(`آفرین! ${result.awarded.toLocaleString("fa-IR")} سکه اضافه شد.`);
      else setNotice("برای این فعالیت امروز قبلاً سکه گرفته‌ای یا به سقف روزانه رسیده‌ای.");
    } finally { setBusy(false); }
  }
  return <div className="lp-activity-claim-wrap" dir="rtl"><button type="button" className="lp-claim-activity" disabled={busy} onClick={() => void claim()}>{busy ? "در حال ثبت…" : label}</button>{notice && <span className="lp-claim-notice" role="status">{notice}</span>}</div>;
}
