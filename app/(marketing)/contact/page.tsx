
import { redirect } from "next/navigation";
export const metadata = { title: "Связаться с нами" };
async function submit(formData: FormData) {
  "use server";
  console.log("[contact_submit]", Object.fromEntries(formData.entries()));
  redirect("/contact?ok=1");
}
export default function ContactPage({ searchParams }: { searchParams: { ok?: string } }) {
  const ok = searchParams?.ok === "1";
  return (<section className="py-12"><h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Связаться с нами</h1>
    <form action={submit} className="mt-6 space-y-4"><div className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1"><label className="text-sm">Имя</label><input name="name" className="h-10 rounded-md border px-3" required /></div>
      <div className="flex flex-col gap-1"><label className="text-sm">Email</label><input name="email" type="email" className="h-10 rounded-md border px-3" required /></div></div>
      <div className="flex flex-col gap-1"><label className="text-sm">Сообщение</label><textarea name="message" className="w-full rounded-md border p-3" rows={5} /></div>
      <button className="inline-flex h-10 items-center px-4 rounded-md bg-[--primary] text-[--primary-foreground]">Отправить</button>
      {ok && <p className="text-sm text-green-600">Спасибо! Мы свяжемся с вами.</p>}
    </form></section>);
}
