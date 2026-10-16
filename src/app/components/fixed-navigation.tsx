"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const ROOT = "";

const items = [
  { label: "خانه", icon: "⌂", href: ROOT + "/#home" },
  { label: "واژگان انگلیسی", icon: "📚", href: ROOT + "/vocabulary/" },
  { label: "گرامر", icon: "◈", href: ROOT + "/#grammar" },
  { label: "مهارت‌های زبان", icon: "◎", href: ROOT + "/#skills" },
  { label: "تمرین روزانه", icon: "✓", href: ROOT + "/#practice" },
  { label: "آزمون‌ها", icon: "▣", href: ROOT + "/#exams" },
];

export default function FixedNavigation() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const cleanPath = pathname.replace(/\/+$/, "");
  const isVocabulary = cleanPath.endsWith("/vocabulary");

  function goBack() {
    const sameSiteReferrer = (() => {
      if (!document.referrer) return false;
      try {
        return new URL(document.referrer).origin === window.location.origin;
      } catch {
        return false;
      }
    })();

    if (sameSiteReferrer && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = ROOT + "/";
    }
  }

  return (
    <>
      {open && (
        <button
          className="fixed-menu-backdrop"
          type="button"
          aria-label="بستن منو"
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <nav className="fixed-navigation-menu" dir="rtl" aria-label="منوی سایت">
          <div className="fixed-navigation-menu-title">
            <span className="fixed-navigation-menu-logo">L</span>
            <div>
              <strong>LinguaPro</strong>
              <small>منوی اصلی</small>
            </div>
          </div>

          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="fixed-navigation-link"
              onClick={() => setOpen(false)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              <span className="fixed-navigation-chevron">‹</span>
            </a>
          ))}
        </nav>
      )}

      <div className="fixed-navigation" dir="ltr">
        <button
          type="button"
          className="fixed-navigation-button"
          aria-label="باز کردن منوی سایت"
          aria-expanded={open}
          onClick={() => setOpen((previous) => !previous)}
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {isVocabulary && (
        <button
          type="button"
          className="fixed-back-button"
          onClick={goBack}
          aria-label="بازگشت به صفحه قبلی"
          title="بازگشت"
        >
          ←
        </button>
      )}
    </>
  );
}
