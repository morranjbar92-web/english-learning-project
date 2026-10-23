export const LINGUAPRO_TOKEN_KEY = "linguapro-account-token-v1";
export const LINGUAPRO_PROFILE_KEY = "linguapro-account-profile-v1";
export const LINGUAPRO_API_KEY = "linguapro-cloud-api-base-v1";
export const LINGUAPRO_GUEST_COINS_KEY = "linguapro-guest-coins-v1";
export const LINGUAPRO_GUEST_CLAIMS_KEY = "linguapro-guest-claims-v1";
export const LINGUAPRO_PROGRESS_EVENT = "linguapro:local-progress-changed";
export const LINGUAPRO_AUTH_EVENT = "linguapro:auth-changed";
export const LINGUAPRO_COINS_EVENT = "linguapro:coins-updated";

export type ActivityType =
  | "activity_opened"
  | "vocabulary_learned"
  | "reading_completed"
  | "reading_quiz_completed"
  | "listening_completed"
  | "writing_completed"
  | "speaking_completed"
  | "grammar_completed"
  | "conversation_completed"
  | "game_completed"
  | "warmup_quiz_completed";

export const ACTIVITY_REWARDS: Record<ActivityType, { coins: number; dailyLimit: number; label: string }> = {
  activity_opened: { coins: 1, dailyLimit: 20, label: "تمرین روزانه" },
  vocabulary_learned: { coins: 2, dailyLimit: 30, label: "یادگیری واژه" },
  reading_completed: { coins: 12, dailyLimit: 10, label: "تکمیل ریدینگ" },
  reading_quiz_completed: { coins: 8, dailyLimit: 10, label: "آزمون ریدینگ" },
  listening_completed: { coins: 12, dailyLimit: 10, label: "تکمیل لیسنینگ" },
  writing_completed: { coins: 15, dailyLimit: 10, label: "تکمیل نوشتن" },
  speaking_completed: { coins: 15, dailyLimit: 5, label: "تمرین اسپیکینگ" },
  grammar_completed: { coins: 10, dailyLimit: 10, label: "تمرین گرامر" },
  conversation_completed: { coins: 5, dailyLimit: 10, label: "تمرین مکالمه" },
  game_completed: { coins: 8, dailyLimit: 10, label: "بازی آموزشی" },
  warmup_quiz_completed: { coins: 10, dailyLimit: 5, label: "آزمون دست‌گرمی" },
};

const RESERVED_LOCAL_KEYS = /(?:auth|token|coin|api-base|claim|session|account|sync|profile|email)/i;
export function isSyncableProgressKey(key: string): boolean {
  return key.startsWith("linguapro-") && !RESERVED_LOCAL_KEYS.test(key) && key.length <= 120;
}

export function getApiBase(): string {
  if (typeof window === "undefined") return "https://english-learning-project.onrender.com";
  try {
    const stored = window.localStorage.getItem(LINGUAPRO_API_KEY)?.trim();
    if (stored) return stored.replace(/\/+$/, "");
  } catch { /* local storage may be disabled */ }
  if (window.location.hostname.endsWith("onrender.com")) return "";
  return "https://english-learning-project.onrender.com";
}

export function getAccountToken(): string {
  if (typeof window === "undefined") return "";
  try { return window.localStorage.getItem(LINGUAPRO_TOKEN_KEY) || ""; }
  catch { return ""; }
}

export function makeActivityId(value: string): string {
  const safe = value.normalize("NFKC").toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90);
  return safe || "activity";
}

export function tehranDayKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tehran", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(date);
  const part = (name: string) => parts.find((x) => x.type === name)?.value || "00";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

type GuestWallet = { total: number; days: Record<string, number> };
function readGuestWallet(): GuestWallet {
  if (typeof window === "undefined") return { total: 0, days: {} };
  try {
    const parsed = JSON.parse(localStorage.getItem(LINGUAPRO_GUEST_COINS_KEY) || "{}");
    if (parsed && typeof parsed === "object" && typeof parsed.total === "number" && parsed.days && typeof parsed.days === "object") {
      return { total: Math.max(0, parsed.total), days: parsed.days as Record<string, number> };
    }
  } catch { /* empty guest wallet */ }
  return { total: 0, days: {} };
}

export function getGuestWalletSnapshot() {
  const day = tehranDayKey();
  const wallet = readGuestWallet();
  return { totalCoins: wallet.total, todayCoins: Math.max(0, Number(wallet.days[day] || 0)), day };
}

function announceCoins(detail: Record<string, unknown>) {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(LINGUAPRO_COINS_EVENT, { detail }));
}

export async function awardActivity(type: ActivityType, rawId: string): Promise<{ awarded: number; todayCoins?: number; totalCoins?: number }> {
  if (typeof window === "undefined") return { awarded: 0 };
  const config = ACTIVITY_REWARDS[type];
  const activityId = makeActivityId(rawId);
  const day = tehranDayKey();
  const claimId = `${day}:${type}:${activityId}`;
  const token = getAccountToken();
  if (token) {
    try {
      const response = await fetch(`${getApiBase()}/api/league/activity/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type, activityId }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof payload.error === "string" ? payload.error : "ثبت سکه انجام نشد.");
      const result = {
        awarded: Number(payload.awarded || 0),
        todayCoins: Number(payload.todayCoins || 0),
        totalCoins: Number(payload.totalCoins || 0),
      };
      if (result.awarded > 0) announceCoins({ ...result, label: config.label, source: "cloud" });
      return result;
    } catch (error) {
      announceCoins({ awarded: 0, label: config.label, source: "error", message: error instanceof Error ? error.message : "اتصال برقرار نشد." });
      return { awarded: 0 };
    }
  }
  try {
    const claims = JSON.parse(localStorage.getItem(LINGUAPRO_GUEST_CLAIMS_KEY) || "[]");
    const list = Array.isArray(claims) ? claims.filter((x): x is string => typeof x === "string") : [];
    const todaysClaims = list.filter((x) => x.startsWith(`${day}:`));
    if (list.includes(claimId) || todaysClaims.filter((x) => x.startsWith(`${day}:${type}:`)).length >= config.dailyLimit) return { awarded: 0 };
    const wallet = readGuestWallet();
    wallet.total += config.coins;
    wallet.days[day] = Number(wallet.days[day] || 0) + config.coins;
    const dayKeys = Object.keys(wallet.days).sort().slice(-35);
    wallet.days = Object.fromEntries(dayKeys.map((key) => [key, wallet.days[key]]));
    localStorage.setItem(LINGUAPRO_GUEST_COINS_KEY, JSON.stringify(wallet));
    localStorage.setItem(LINGUAPRO_GUEST_CLAIMS_KEY, JSON.stringify([...list.filter((x) => x.startsWith(`${day}:`)), claimId].slice(-1000)));
    const result = { awarded: config.coins, todayCoins: wallet.days[day], totalCoins: wallet.total };
    announceCoins({ ...result, label: config.label, source: "guest" });
    return result;
  } catch {
    return { awarded: 0 };
  }
}

export function readLocalProgress(): Record<string, unknown> {
  const output: Record<string, unknown> = {};
  if (typeof window === "undefined") return output;
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key || !isSyncableProgressKey(key)) continue;
      const raw = localStorage.getItem(key);
      if (raw === null || raw.length > 250_000) continue;
      try { output[key] = JSON.parse(raw); }
      catch { output[key] = raw; }
    }
  } catch { /* ignore storage restrictions */ }
  return output;
}

function mergeValue(cloud: unknown, local: unknown): unknown {
  if (Array.isArray(cloud) && Array.isArray(local)) {
    const seen = new Set<string>();
    return [...cloud, ...local].filter((item) => {
      const key = JSON.stringify(item);
      if (seen.has(key)) return false;
      seen.add(key); return true;
    });
  }
  if (cloud && local && typeof cloud === "object" && typeof local === "object" && !Array.isArray(cloud) && !Array.isArray(local)) {
    const result: Record<string, unknown> = { ...(cloud as Record<string, unknown>) };
    for (const [key, value] of Object.entries(local as Record<string, unknown>)) result[key] = key in result ? mergeValue(result[key], value) : value;
    return result;
  }
  return local !== undefined && local !== null && local !== "" ? local : cloud;
}

export function mergeProgress(cloud: Record<string, unknown>, local: Record<string, unknown>): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...cloud };
  for (const [key, value] of Object.entries(local)) merged[key] = key in merged ? mergeValue(merged[key], value) : value;
  return merged;
}

export function applyLocalProgress(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  for (const [key, value] of Object.entries(data)) {
    if (!isSyncableProgressKey(key)) continue;
    try { localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value)); }
    catch { /* storage might be full */ }
  }
}
