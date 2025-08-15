
import { Button } from "@/components/ui/button";
export function PricingTable() {
  const plans = [
    { name: "Publisher", desc: "Совместная публикация Mini App, доля до 49%.", cta: "Стать паблишером" },
    { name: "White-label", desc: "Индивидуальная сборка под организацию.", cta: "Запросить предложение" },
    { name: "Consulting", desc: "Сопровождение, обучение, правовая поддержка.", cta: "Получить консультацию" }
  ];
  return (<section className="grid grid-cols-1 md:grid-cols-3 gap-6">{plans.map((p)=>(<article key={p.name} className="rounded-2xl border p-6 bg-card"><h3 className="text-xl font-semibold">{p.name}</h3><p className="mt-2 text-sm text-[--muted-foreground]">{p.desc}</p><div className="mt-4"><Button>{p.cta}</Button></div></article>))}</section>);
}
