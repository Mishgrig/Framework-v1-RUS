
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: { default: "Telegram MiniApps Framework", template: "%s — Telegram MiniApps Framework" },
  description: "Платформа для запуска Mini Apps в Telegram за 14 дней — с AI-инструментами, шаблонами, CI/CD и legal-first подходом.",
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] inline-flex h-10 items-center px-4 rounded-md bg-[--primary] text-[--primary-foreground]">К основному контенту</a>
        <Navbar />
        <Analytics />
        <CookieBanner />
        <main id="main" className="mx-auto max-w-[1240px] px-4 md:px-6 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
