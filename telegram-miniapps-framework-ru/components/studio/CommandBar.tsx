
"use client";
import * as React from "react";
import type { Schema } from "./Renderer";
export function CommandBar({ schema, setSchema, onToast }: { schema: Schema; setSchema: (s: Schema)=>void; onToast: (m: string)=>void; }) {
  const [cmd, setCmd] = React.useState("");
  function run() {
    const s = cmd.trim();
    if (!s) return;
    if (s.startsWith("/add button")) {
      const m = s.match(/"(.+?)"/);
      setSchema({ ...schema, blocks: [...schema.blocks, { type: "button", label: m?.[1] || "Button", action: { type: "toast", message: "Clicked" } }] });
      onToast("Button added");
    } else if (s.startsWith("/add input")) {
      const name = (s.match(/name=([a-zA-Z0-9_-]+)/)?.[1]) || "field";
      const label = (s.match(/label="(.+?)"/)?.[1]) || name;
      setSchema({ ...schema, blocks: [...schema.blocks, { type: "input", name, label }] });
      onToast("Input added");
    } else if (s.startsWith("/add text")) {
      const m = s.match(/"(.+?)"/);
      setSchema({ ...schema, blocks: [...schema.blocks, { type: "text", value: m?.[1] || "Text" , variant: "p" }] });
      onToast("Text added");
    } else {
      onToast("Unknown command");
    }
    setCmd("");
  }
  return (
    <div className="flex items-center gap-2">
      <input value={cmd} onChange={(e)=>setCmd(e.target.value)} onKeyDown={(e)=>{ if (e.key === "Enter") run(); }} placeholder='e.g.: /add button "Book now"' className="h-10 flex-1 rounded-md border px-3" aria-label="Command input" />
      <button onClick={run} className="inline-flex h-10 px-4 rounded-md border">Run</button>
    </div>
  );
}
