
const steps = ["Анализ рынка","Визуализация","Юридическая проверка","Сборка","Запуск","Поддержка"];
export function Stepper() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl md:text-3xl font-semibold">Методология: 6 шагов</h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {steps.map((s, i) => (
          <li key={s} className="relative rounded-xl border bg-card p-4">
            <span className="absolute -top-3 left-4 inline-flex h-6 items-center rounded-full bg-[--primary] px-2 text-xs text-[--primary-foreground]">Шаг {i+1}</span>
            <h3 className="mt-2 font-medium">{s}</h3>
            <p className="mt-1 text-sm text-[--muted-foreground]">Кратко об этапе и результатах.</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
