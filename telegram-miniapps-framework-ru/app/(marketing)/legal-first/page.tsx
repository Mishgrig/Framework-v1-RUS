
export const metadata = { title: "Legal-first" };
export default function LegalFirstPage() {
  const list = ["Проверка IP-рисков до сборки.","Фильтры на бренды и контент.","Региональные правила и приватность."];
  return (<section className="py-12"><h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Legal-first</h1>
    <ul className="mt-4 list-disc pl-5 text-sm text-[--muted-foreground]">{list.map((i)=>(<li key={i}>{i}</li>))}</ul>
    <p className="mt-6 text-xs text-[--muted-foreground]">Дисклеймер: не предоставляем юридических гарантий; не аффилированы с Telegram.</p>
  </section>);
}
