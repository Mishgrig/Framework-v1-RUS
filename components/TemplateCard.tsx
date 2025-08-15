
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { compressToEncodedURIComponent } from "lz-string";
export function TemplateCard({ title, desc, slug, tags = [] }: { title: string; desc: string; slug: string; tags?: string[]; }) {
  function openInStudio() {
    const presets: any = {
      booking: { title: "Запись на услуги", blocks: [{ type:"text", value: "Выберите дату", variant:"h2" }, { type:"button", label: "Записаться", action: { type:"toast", message: "OK" } }] },
      quizzes: { title: "Викторина", blocks: [{ type:"text", value: "3 вопроса", variant:"h2" }, { type:"button", label: "Начать", action: { type:"emit", event:"quiz:start" } }] },
      civic: { title: "Городской опрос", blocks: [{ type:"form", fields:[{ name:"idea", label: "Идея" }], submit: { type:"toast", message: "Спасибо!" } }] }
    };
    const schema = presets[slug] || { title: "New", blocks: [] };
    const s = compressToEncodedURIComponent(JSON.stringify(schema));
    window.location.href = `/studio?s=${s}`;
  }
  return (
    <article className="group rounded-2xl border bg-card overflow-hidden hover:shadow-md transition">
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900" />
      <div className="p-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-[--muted-foreground]">{desc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (<span key={t} className="rounded-full border px-2.5 py-1 text-xs text-[--muted-foreground]">{t}</span>))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild><Link href="/contact">Запросить шаблон</Link></Button>
          <Button asChild variant="outline"><Link href={`/templates/${slug}`}>Клонировать</Link></Button>
          <Button variant="ghost" onClick={(e)=>{ e.stopPropagation(); openInStudio(); }}>Открыть в Студии</Button>
        </div>
      </div>
    </article>
  );
}
