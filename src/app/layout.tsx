import AccountCloudSync from "./components/account-cloud-sync";
import type { Metadata } from "next";
import "./globals.css";
import FixedNavigation from "./components/fixed-navigation";

export const metadata: Metadata = {
  title: "LinguaPro | یادگیری هوشمند زبان انگلیسی",
  description: "سامانه جامع آموزش زبان انگلیسی برای دانش‌آموزان، معلمان و زبان‌آموزان",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body><FixedNavigation /><AccountCloudSync />{children}</body>
    </html>
  );
}

