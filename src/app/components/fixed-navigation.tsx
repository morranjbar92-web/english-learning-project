"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
const ROOT = "";

const items = [
  { label: "خانه", icon: "⌂", href: ROOT + "/#home" },
  { label: "ساخت یا ورود به کلاس آنلاین", icon: "🎥", href: ROOT + "/classroom/" },
  { label: "واژگان انگلیسی", icon: "📚", href: ROOT + "/vocabulary/" },
  { label: "گرامر", icon: "◈", href: ROOT + "/grammar/" },
    { label: "بازی‌ها", icon: "🎮", href: ROOT + "/games/" },
  { label: "مکالمه انگلیسی", icon: "💬", href: ROOT + "/conversation/" },
  { label: "مهارت‌های زبان", icon: "◎", href: ROOT + "/#skills" },
  { label: "مهارت نوشتن", icon: "✍️", href: ROOT + "/writing/" },
  { label: "مهارت شنیداری", icon: "🎧", href: ROOT + "/listening/" },
  { label: "تمرین روزانه", icon: "✓", href: ROOT + "/#practice" },
  { label: "آزمون‌های دست‌گرمی", icon: "▣", href: ROOT + "/warmup-tests/" },
  { label: "درک مطلب", icon: "📖", href: ROOT + "/reading-comprehension/" },
];

export default function FixedNavigation() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const cleanPath = pathname.replace(/\/+$/, "");
  const isHome = cleanPath === "" || cleanPath === "/" || cleanPath === "/english-learning-project";
  const [showHomeBack, setShowHomeBack] = useState(false);
  useEffect(() => {
    if (isHome) { setShowHomeBack(false); return; }
    const elements = Array.from(document.querySelectorAll("a, button, [role=\"button\"]"));
    const hasBackControl = elements.some((element) => {
      if (element.classList.contains("fixed-back-button")) return false;
      const value = [element.textContent || "", element.getAttribute("aria-label") || "", element.getAttribute("title") || ""].join(" ");
      return /بازگشت|برگشت|\bback\b|go back/i.test(value);
    });
    setShowHomeBack(!hasBackControl);
  }, [pathname, isHome]);

  function goBack() {
    window.location.href = ROOT + "/";
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

      {showHomeBack && (
        <button
          type="button"
          className="fixed-back-button"
          onClick={goBack}
          aria-label="بازگشت به صفحه اصلی"
          title="بازگشت به صفحه اصلی"
        >
          ←
        </button>
      )}
    </>
  );
}

