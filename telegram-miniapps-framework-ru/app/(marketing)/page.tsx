
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Stepper } from "@/components/Stepper";
import { TemplateCard } from "@/components/TemplateCard";
import { AccordionFAQ } from "@/components/AccordionFAQ";

export default function Page() {
  const templates = [
    { title: "Запись на услуги", desc: "Бизнес: запись, скидочный квиз.", slug: "booking", tags: ["Business","Booking","Quiz"] },
    { title: "Викторины/тесты", desc: "Образование: оценка и обучение.", slug: "quizzes", tags: ["Education","Quizzes"] },
    { title: "Городские опросы", desc: "Муниципалитеты: опросы, уведомления.", slug: "civic", tags: ["Municipal","Surveys"] },
  ];
  return (
    <>
      <Hero />
      <FeatureGrid />
      <Stepper />
      <section className="mt-12"><h2 className="text-2xl md:text-3xl font-semibold">Примеры шаблонов</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">{templates.map((t) => (<TemplateCard key={t.slug} {...t} />))}</div>
      </section>
      <AccordionFAQ />
    </>
  );
}
