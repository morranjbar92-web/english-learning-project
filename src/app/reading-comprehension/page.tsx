export default function ReadingComprehensionPage() {
  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "#f4f6fc",
        color: "#1c2340",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          padding: "12px 18px",
          background: "#ffffff",
          borderBottom: "1px solid #e3e7f1",
          fontFamily: "Tahoma, Arial, sans-serif",
        }}
      >
        <a href="../" style={{ color: "#5b4bd8", textDecoration: "none", fontWeight: 700 }}>
          ← بازگشت به صفحهٔ اصلی
        </a>
        <strong>آزمایشگاه درک مطلب انگلیسی · پایه‌های هفتم، هشتم و نهم</strong>
      </header>
      <iframe
        src="../reading-comprehension.html"
        title="آزمایشگاه درک مطلب انگلیسی برای پایه‌های هفتم، هشتم و نهم"
        style={{ width: "100%", flex: 1, minHeight: "calc(100dvh - 60px)", border: 0, display: "block", background: "#f4f6fc" }}
        loading="eager"
        allow="fullscreen"
      />
    </main>
  );
}
