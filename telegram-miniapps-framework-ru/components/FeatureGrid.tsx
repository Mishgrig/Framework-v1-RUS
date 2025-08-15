
export function FeatureGrid() {
  const features = [
    { title: "Templates", desc: "UI/logic/monetization/onboarding — ready to adapt." },
    { title: "AI Tools", desc: "Prompts for UI, logic, content, and specs." },
    { title: "Legal-first", desc: "IP filters, guidelines, regional rules — before build." },
    { title: "CI/CD", desc: "Lint, typecheck, build, deploy, logging." },
    { title: "Analytics", desc: "Events: sign_up, template_view, template_clone, contact_submit." }
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((f) => (
        <article key={f.title} className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold">{f.title}</h3>
          <p className="mt-1 text-sm text-[--muted-foreground]">{f.desc}</p>
        </article>
      ))}
    </section>
  );
}
