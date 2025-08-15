
export const metadata = { title: "О нас — Telegram MiniApps Framework" };
export default function AboutPage() {
  return (<section className="py-12"><h1 className="text-4xl md:text-5xl font-semibold tracking-tight">О нас</h1>
    <p className="mt-4 max-w-2xl text-base text-[--muted-foreground]">Telegram MiniApps Framework — производственная система для безопасного и быстрого запуска Mini Apps в Telegram за 14 дней. Мы объединяем шаблоны, AI, legal-first и CI/CD.</p>
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <article className="rounded-2xl border bg-card p-6"><h2 className="text-xl font-semibold">Что делаем</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-[--muted-foreground]">
          <li>Запуск Mini Apps по методологии из 6 шагов за 14 дней.</li>
          <li>Шаблоны экранов/логики/онбординга + AI-генерация.</li>
          <li>Legal-first: IP-фильтры, гайдлайны и региональные правила.</li>
          <li>CI/CD, логирование и событийная аналитика.</li>
        </ul></article>
      <article className="rounded-2xl border bg-card p-6"><h2 className="text-xl font-semibold">Для кого</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-[--muted-foreground]">
          <li>Малый бизнес и социальные проекты.</li>
          <li>Стажёры, студенты, начинающие специалисты.</li>
          <li>Школы/вузы, НКО, библиотеки, музеи, инициативы.</li>
          <li>Стартапы на этапе PMF.</li>
        </ul></article>
    </div>
    <div className="mt-8 rounded-2xl border bg-card p-6">
      <h2 className="text-xl font-semibold">Модели сотрудничества</h2>
      <ul className="mt-3 grid gap-2 text-sm text-[--muted-foreground]">
        <li>• <span className="font-medium">Publisher</span>: co-publishing.</li>
        <li>• <span className="font-medium">White-label</span>: custom build.</li>
        <li>• <span className="font-medium">Consulting</span>: methodology & legal-first.</li>
      </ul>
      <div className="mt-4 flex gap-3">
        <a href="/templates" className="inline-flex h-10 items-center px-4 rounded-md border focus-visible:ring-2">Посмотреть шаблоны</a>
        <a href="/contact" className="inline-flex h-10 items-center px-4 rounded-md bg-[--primary] text-[--primary-foreground] focus-visible:ring-2">Связаться</a>
      </div>
      <p className="mt-4 text-xs text-[--muted-foreground]">Дисклеймер: не аффилированы с Telegram; legal-first без юридических гарантий.</p>
    </div>
  </section>);
}
