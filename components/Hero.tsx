
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export function Hero() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Платформа для запуска Mini Apps в Telegram за 14 дней</h1>
      <p className="mt-4 max-w-2xl text-base text-[--muted-foreground]">Шаблоны UI/логики/монетизации, AI-инструменты, legal-first и CI/CD — от идеи до публикации.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild><Link href="/contact">Запросить шаблон</Link></Button>
        <Button asChild variant="outline"><Link href="/methodology">Посмотреть методологию</Link></Button>
      </div>
    </section>
  );
}
