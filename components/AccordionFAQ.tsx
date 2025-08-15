
import { Accordion } from "@/components/ui/accordion";
const items = [
  { title: "Сколько длится запуск Mini App?", content: "Базовый цикл — 14 дней по нашей методологии из 6 шагов." },
  { title: "Что означает legal-first?", content: "Проверка IP-рисков и гайдлайны до этапа сборки." },
  { title: "Можно ли принимать платежи?", content: "Telegram поддерживает встроенные платежи; детали зависят от кейса." },
];
export function AccordionFAQ() {
  return (<section className="mt-12"><h2 className="text-2xl md:text-3xl font-semibold">Частые вопросы</h2><div className="mt-4"><Accordion items={items} /></div></section>);
}
