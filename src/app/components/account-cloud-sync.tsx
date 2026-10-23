"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  awardActivity,
  getAccountToken,
  getApiBase,
  isSyncableProgressKey,
  readLocalProgress,
  mergeProgress,
  applyLocalProgress,
  LINGUAPRO_AUTH_EVENT,
  LINGUAPRO_COINS_EVENT,
  LINGUAPRO_PROGRESS_EVENT,
} from "../../lib/linguapro-rewards";
import "../account/account.css";

type Toast = { text: string; tone: "coin" | "info" | "error" } | null;

export default function AccountCloudSync() {
  const pathname = usePathname() || "/";
  const syncingRef = useRef(false);
  const pendingRef = useRef(false);
  const applyingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const lastRouteRef = useRef("");
  const [toast, setToast] = useState<Toast>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const originalSetItem = Storage.prototype.setItem;
    const wrappedSetItem = function (this: Storage, key: string, value: string) {
      originalSetItem.call(this, key, value);
      if (this === window.localStorage && !applyingRef.current && isSyncableProgressKey(key)) {
        window.dispatchEvent(new Event(LINGUAPRO_PROGRESS_EVENT));
      }
    };
    Storage.prototype.setItem = wrappedSetItem;

    const syncProgress = async () => {
      const token = getAccountToken();
      if (!token) return;
      if (syncingRef.current) { pendingRef.current = true; return; }
      syncingRef.current = true;
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(`${getApiBase()}/api/account/progress/`, { headers, cache: "no-store" });
        if (response.status === 401) {
          window.localStorage.removeItem("linguapro-account-token-v1");
          window.localStorage.removeItem("linguapro-account-profile-v1");
          window.dispatchEvent(new Event(LINGUAPRO_AUTH_EVENT));
          return;
        }
        if (!response.ok) return;
        const cloudPayload = await response.json();
        const cloud = cloudPayload && cloudPayload.progress && typeof cloudPayload.progress === "object" ? cloudPayload.progress as Record<string, unknown> : {};
        const merged = mergeProgress(cloud, readLocalProgress());
        applyingRef.current = true;
        try { applyLocalProgress(merged); } finally { applyingRef.current = false; }
        const saved = await fetch(`${getApiBase()}/api/account/progress/`, {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({ progress: merged }),
        });
        if (saved.ok) {
          const savedPayload = await saved.json().catch(() => ({}));
          if (savedPayload && savedPayload.progress && typeof savedPayload.progress === "object") {
            applyingRef.current = true;
            try { applyLocalProgress(mergeProgress(merged, savedPayload.progress as Record<string, unknown>)); }
            finally { applyingRef.current = false; }
          }
        }
      } catch {
        // Offline learning continues locally. The account page displays any explicit sync error.
      } finally {
        syncingRef.current = false;
        if (pendingRef.current) {
          pendingRef.current = false;
          window.setTimeout(() => { void syncProgress(); }, 500);
        }
      }
    };

    const queueSync = () => {
      if (!getAccountToken()) return;
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => { void syncProgress(); }, 1200);
    };
    const handleAuth = () => { void syncProgress(); };
    const handleStorage = (event: StorageEvent) => {
      if (!event.key || isSyncableProgressKey(event.key) || event.key === "linguapro-account-token-v1") queueSync();
    };
    window.addEventListener(LINGUAPRO_PROGRESS_EVENT, queueSync);
    window.addEventListener(LINGUAPRO_AUTH_EVENT, handleAuth);
    window.addEventListener("storage", handleStorage);
    if (getAccountToken()) void syncProgress();

    return () => {
      window.removeEventListener(LINGUAPRO_PROGRESS_EVENT, queueSync);
      window.removeEventListener(LINGUAPRO_AUTH_EVENT, handleAuth);
      window.removeEventListener("storage", handleStorage);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      if (Storage.prototype.setItem === wrappedSetItem) Storage.prototype.setItem = originalSetItem;
    };
  }, []);

  useEffect(() => {
    if (lastRouteRef.current !== pathname) {
      lastRouteRef.current = pathname;
      const ignored = ["/", "/account", "/league", "/_not-found"];
      let normalized = pathname.replace(/\/+$/, "") || "/";
      const staticBasePath = "/english-learning-project";
      if (normalized === staticBasePath) normalized = "/";
      else if (normalized.startsWith(staticBasePath + "/")) normalized = normalized.slice(staticBasePath.length);
      if (!ignored.includes(normalized) && !normalized.startsWith("/api/")) {
        void awardActivity("activity_opened", normalized);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const onCoins = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      if (Number(detail.awarded || 0) > 0) {
        setToast({ text: `+${Number(detail.awarded)} سکه · ${String(detail.label || "فعالیت")}`, tone: "coin" });
      } else if (detail.source === "error") {
        setToast({ text: "سکهٔ آنلاین ثبت نشد؛ اتصال را بررسی کن.", tone: "error" });
      }
      if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = window.setTimeout(() => setToast(null), 4200);
    };
    window.addEventListener(LINGUAPRO_COINS_EVENT, onCoins);
    return () => {
      window.removeEventListener(LINGUAPRO_COINS_EVENT, onCoins);
      if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  return toast ? <div className={`lp-award-toast lp-award-toast-${toast.tone}`} role="status" dir="rtl"><span>{toast.tone === "coin" ? "🪙" : toast.tone === "error" ? "⚠️" : "ℹ️"}</span><span>{toast.text}</span><button type="button" onClick={() => setToast(null)} aria-label="بستن">×</button></div> : null;
}
