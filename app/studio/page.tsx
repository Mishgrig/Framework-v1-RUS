
"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { json } from "@codemirror/lang-json";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { Renderer, type Schema, type Block } from "@/components/studio/Renderer";
import { DeviceFrame, type Device } from "@/components/studio/DeviceFrame";
import { CommandBar } from "@/components/studio/CommandBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { CommandPalette, useCommandPalette, type Command } from "@/components/studio/CommandPalette";
import { download, schemaToHTML } from "@/lib/export";
const CodeMirror = dynamic(() => import("@uiw/react-codemirror").then((m) => m.default), { ssr: false });

function encodeState(obj: unknown) {
  try {
    return compressToEncodedURIComponent(JSON.stringify(obj));
  } catch {
    return "";
  }
}
function decodeState(s: string | null) {
  if (!s) return null;
  try {
    return JSON.parse(decompressFromEncodedURIComponent(s) || "");
  } catch {
    return null;
  }
}

const EXAMPLES: Record<string, Schema> = {
  booking: {
    title: "Запись на услуги",
    blocks: [
      { type: "text", value: "Выберите дату и оставьте контакты", variant: "h2" },
      { type: "input", name: "name", label: "Имя" },
      { type: "input", name: "email", label: "Email" },
      { type: "button", label: "Записаться", action: { type: "toast", message: "Заявка отправлена" } },
    ],
  },
  quizzes: {
    title: "Викторина",
    blocks: [
      { type: "text", value: "Ответьте на 3 вопроса", variant: "h2" },
      { type: "list", items: ["Вопрос 1", "Вопрос 2", "Вопрос 3"] },
      { type: "button", label: "Начать", action: { type: "emit", event: "quiz:start" } },
    ],
  },
  civic: {
    title: "Городской опрос",
    blocks: [{ type: "form", fields: [{ name: "idea", label: "Идея" }], submit: { type: "toast", message: "Спасибо за участие!" } }],
  },
};

export default function StudioPage() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const initial = decodeState(params.get("s")) as Schema | null;

  const [schema, setSchema] = React.useState<Schema>(initial || EXAMPLES.booking);
  const [code, setCode] = React.useState<string>(JSON.stringify(schema, null, 2));
  const [device, setDevice] = React.useState<Device>("mobile");
  const [log, setLog] = React.useState<string[]>([]);
  const palette = useCommandPalette();

  React.useEffect(() => {
    try {
      setSchema(JSON.parse(code) as Schema);
    } catch {}
  }, [code]);

  function onEvent(name: string, payload?: any) {
    setLog((l) => [`${new Date().toLocaleTimeString()} — ${name} ${payload?.message ? `(${payload.message})` : ""}`, ...l].slice(0, 50));
  }
  function loadExample(key: keyof typeof EXAMPLES) {
    const s = EXAMPLES[key];
    setSchema(s);
    setCode(JSON.stringify(s, null, 2));
  }
  function share() {
    const q = encodeState(schema);
    const url = `${window.location.origin}/studio?s=${q}`;
    navigator.clipboard?.writeText(url);
    alert("Ссылка скопирована");
  }
  function formatJSON() {
    try {
      setCode(JSON.stringify(JSON.parse(code), null, 2));
    } catch {}
  }
  function exportJSON() {
    download(`miniapp-schema-${Date.now()}.json`, JSON.stringify(schema, null, 2), "application/json;charset=utf-8");
  }
  function exportHTML() {
    const html = schemaToHTML(schema as any);
    download(`miniapp-${Date.now()}.html`, html, "text/html;charset=utf-8");
  }

  // <<< ВАЖНО: мини-helper для типобезопасного добавления блоков
  function appendBlock(b: Block) {
    const next: Schema = { ...schema, blocks: [...schema.blocks, b] };
    setSchema(next);
    setCode(JSON.stringify(next, null, 2));
  }

  const commands: Command[] = [
    {
      id: "insert:button",
      label: "Insert: Button",
      hint: "Add button",
      run: () => appendBlock({ type: "button", label: "OK", action: { type: "toast", message: "OK" } }),
    },
    {
      id: "insert:input-email",
      label: "Insert: Input (email)",
      hint: "email",
      run: () => appendBlock({ type: "input", name: "email", label: "Email", placeholder: "you@example.com" }),
    },
    {
      id: "insert:text",
      label: 'Insert: Text "Title"',
      run: () => appendBlock({ type: "text", value: "Title", variant: "h2" }),
    },
    {
      id: "insert:form",
      label: "Insert: Form (name+email)",
      run: () =>
        appendBlock({
          type: "form",
          fields: [
            { name: "name", label: "Name" },
            { name: "email", label: "Email" },
          ],
          submit: { type: "toast", message: "Submitted" },
        }),
    },
    { id: "device:mobile", label: "Device: Mobile", shortcut: "M", run: () => setDevice("mobile") },
    { id: "device:tablet", label: "Device: Tablet", shortcut: "T", run: () => setDevice("tablet") },
    { id: "device:full", label: "Device: Full", shortcut: "F", run: () => setDevice("full") },
    { id: "templ:booking", label: "Template: Booking", run: () => loadExample("booking") },
    { id: "templ:quizzes", label: "Template: Quizzes", run: () => loadExample("quizzes") },
    { id: "templ:civic", label: "Template: Civic", run: () => loadExample("civic") },
    { id: "share", label: "Share link", hint: "Copy link", run: share },
    { id: "format", label: "Format JSON", run: formatJSON },
    { id: "export:json", label: "Export JSON", run: exportJSON },
    { id: "export:html", label: "Export HTML", run: exportHTML },
  ];

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target && (e.target as HTMLElement).tagName === "INPUT") return;
      const k = e.key.toLowerCase();
      if (k === "m") setDevice("mobile");
      if (k === "t") setDevice("tablet");
      if (k === "f") setDevice("full");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="py-6">
      <CommandPalette open={palette.open} setOpen={palette.setOpen} commands={commands} />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h1 className="text-2xl font-semibold">Студия — vibe-coding</h1>
        <div className="ml-auto flex items-center gap-2">
          <select className="h-9 rounded-md border px-2" value={device} onChange={(e) => setDevice(e.target.value as any)} aria-label="Device">
            <option value="mobile">Mobile</option>
            <option value="tablet">Tablet</option>
            <option value="full">Full</option>
          </select>
          <button onClick={() => share()} className="inline-flex h-9 px-3 rounded-md border">
            Поделиться
          </button>
          <button onClick={exportJSON} className="inline-flex h-9 px-3 rounded-md border">
            Export JSON
          </button>
          <button onClick={exportHTML} className="inline-flex h-9 px-3 rounded-md border">
            Export HTML
          </button>
          <button onClick={() => palette.setOpen(true)} className="inline-flex h-9 px-3 rounded-md bg-[--primary] text-[--primary-foreground]">
            Commands (⌘/Ctrl+K)
          </button>
        </div>
      </div>

      <div className="mb-3 flex gap-2">
        <button onClick={() => loadExample("booking")} className="h-8 px-3 rounded-md border text-sm">
          Шаблон: Booking
        </button>
        <button onClick={() => loadExample("quizzes")} className="h-8 px-3 rounded-md border text-sm">
          Шаблон: Quizzes
        </button>
        <button onClick={() => loadExample("civic")} className="h-8 px-3 rounded-md border text-sm">
          Шаблон: Civic
        </button>
        <span className="ml-auto text-xs text-[--muted-foreground] hidden md:inline">Совет: M/T/F — устройство; ⌘/Ctrl+K — палитра</span>
      </div>

      <PanelGroup direction="horizontal" className="rounded-xl border overflow-hidden">
        <Panel defaultSize={50} minSize={25}>
          <div className="p-3 h-full flex flex-col gap-3">
            <div className="text-sm font-medium">Schema (JSON)</div>
            <div className="flex-1 min-h-[360px] rounded-lg border overflow-hidden">
              <CodeMirror value={code} height="100%" extensions={[json()]} onChange={setCode} />
            </div>
            <CommandBar
              schema={schema}
              setSchema={(s) => {
                setSchema(s);
                setCode(JSON.stringify(s, null, 2));
              }}
              onToast={(m) => onEvent("toast", { message: m })}
            />
          </div>
        </Panel>
        <PanelResizeHandle className="w-1 bg-[--border] hover:bg-[--primary] transition" />
        <Panel defaultSize={50} minSize={25}>
          <div className="p-3 h-full grid grid-rows-[1fr_160px] gap-3">
            <div className="overflow-auto">
              <DeviceFrame device={device}>
                <Renderer schema={schema} onEvent={onEvent} />
              </DeviceFrame>
            </div>
            <div className="rounded-lg border bg-card p-3 overflow-auto">
              <div className="text-sm font-medium mb-2">События</div>
              <ul className="text-xs text-[--muted-foreground] space-y-1">
                {log.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </section>
  );
}
