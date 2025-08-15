
"use client";
import * as React from "react";

export type Action = { type: "emit" | "toast" | "navigate"; event?: string; to?: string; message?: string };

export type Block =
  | { type: "text"; value: string; variant?: "h1" | "h2" | "p" }
  | { type: "button"; label: string; action?: Action }
  | { type: "input"; name: string; label?: string; placeholder?: string }
  | { type: "list"; items: string[] }
  | { type: "card"; title: string; description?: string; cta?: Action }
  | { type: "form"; fields: { name: string; label?: string; placeholder?: string }[]; submit: Action };

export type Schema = { title?: string; blocks: Block[] };

export function Renderer({ schema, onEvent }: { schema: Schema; onEvent: (e: string, payload?: any) => void }) {
  function run(a?: Action) {
    if (!a) return;
    if (a.type === "emit") onEvent(a.event || "event", {});
    if (a.type === "toast") onEvent("toast", { message: a.message || "OK" });
    if (a.type === "navigate" && a.to) window.location.href = a.to;
  }
  return (
    <div className="space-y-4">
      {schema?.title && <h1 className="text-2xl font-semibold">{schema.title}</h1>}
      {schema?.blocks?.map((b, i) => {
        if (b.type === "text") {
          const Tag: any = b.variant === "h1" ? "h2" : b.variant === "h2" ? "h3" : "p";
          return <Tag key={i} className={b.variant?.startsWith("h") ? "font-semibold text-xl" : "text-sm text-[--muted-foreground]"}>{b.value}</Tag>;
        }
        if (b.type === "button") {
          return <button key={i} onClick={()=>run(b.action)} className="inline-flex h-9 px-4 rounded-md bg-[--primary] text-[--primary-foreground]">{b.label}</button>;
        }
        if (b.type === "input") {
          return (
            <div key={i} className="flex flex-col gap-1">
              {b.label && <label className="text-sm">{b.label}</label>}
              <input name={b.name} placeholder={b.placeholder} className="h-10 rounded-md border px-3" />
            </div>
          );
        }
        if (b.type === "list") {
          return (
            <ul key={i} className="list-disc pl-5 text-sm text-[--muted-foreground]">
              {b.items.map((it, idx) => <li key={idx}>{it}</li>)}
            </ul>
          );
        }
        if (b.type === "card") {
          return (
            <article key={i} className="rounded-2xl border bg-card p-4">
              <h3 className="font-medium">{b.title}</h3>
              {b.description && <p className="mt-1 text-sm text-[--muted-foreground]">{b.description}</p>}
              {b.cta && <div className="mt-3"><button onClick={()=>run(b.cta)} className="inline-flex h-9 px-4 rounded-md border">Action</button></div>}
            </article>
          );
        }
        if (b.type === "form") {
          return (
            <form key={i} onSubmit={(e)=>{ e.preventDefault(); run(b.submit); }} className="space-y-3">
              {b.fields.map((f, idx) => (
                <div className="flex flex-col gap-1" key={idx}>
                  {f.label && <label className="text-sm">{f.label}</label>}
                  <input name={f.name} placeholder={f.placeholder} className="h-10 rounded-md border px-3" />
                </div>
              ))}
              <button className="inline-flex h-9 px-4 rounded-md bg-[--primary] text-[--primary-foreground]" type="submit">Submit</button>
            </form>
          );
        }
        return null;
      })}
    </div>
  );
}
