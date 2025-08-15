
export const metadata = { title: "Каталог шаблонов" };
import { TemplateCard } from "@/components/TemplateCard";
export default function TemplatesPage() {
  const templates = [
    { title: "Запись на услуги", desc: "Календарь, слот, подтверждение.", slug: "booking", tags: ["Business","Booking"] },
    { title: "Викторины/тесты", desc: "Вопросы, результаты, рассылка.", slug: "quizzes", tags: ["Education","Quizzes"] },
    { title: "Городские опросы", desc: "Формы, оповещения, сегменты.", slug: "civic", tags: ["Municipal","Surveys"] },
  ];
  return (<section className="py-12"><h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Каталог шаблонов Mini Apps</h1>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">{templates.map((t) => <TemplateCard key={t.slug} {...t} />)}</div></section>);
}
