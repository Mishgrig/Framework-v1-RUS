
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
      <div className="mx-auto max-w-[1240px] px-4 md:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">Telegram MiniApps Framework</Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/about" className="text-sm text-[--muted-foreground] hover:text-foreground">О нас</Link>
          <Link href="/methodology" className="text-sm text-[--muted-foreground] hover:text-foreground">Методология</Link>
          <Link href="/templates" className="text-sm text-[--muted-foreground] hover:text-foreground">Шаблоны</Link>
          <Link href="/legal-first" className="text-sm text-[--muted-foreground] hover:text-foreground">Legal-first</Link>
          <Link href="/pricing" className="text-sm text-[--muted-foreground] hover:text-foreground">Цены</Link>
          <Link href="/studio" className="text-sm text-[--muted-foreground] hover:text-foreground">Студия</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="text-sm px-2 py-1 rounded-md hover:bg-card">RU</Link>
          <Button asChild><Link href="/contact">Запросить шаблон</Link></Button>
        </div>
      </div>
    </header>
  );
}
