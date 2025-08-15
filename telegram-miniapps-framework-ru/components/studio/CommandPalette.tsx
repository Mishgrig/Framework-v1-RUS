
"use client";
import * as React from "react";
export type Command = { id: string; label: string; hint?: string; shortcut?: string; run: () => void; };
export function useCommandPalette() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const hot = (isMac && e.metaKey && e.key.toLowerCase() === "k") || (!isMac && e.ctrlKey && e.key.toLowerCase() === "k");
      if (hot) { e.preventDefault(); setOpen((v) => !v); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return { open, setOpen };
}
export function CommandPalette({ open, setOpen, commands }: { open: boolean; setOpen: (v: boolean)=>void; commands: Command[] }) {
  const [q, setQ] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 0); else setQ(""); }, [open]);
  const filtered = commands.filter(c => c.label.toLowerCase().includes(q.toLowerCase()) || c.hint?.toLowerCase().includes(q.toLowerCase()));
  function onEnter() { if (!filtered.length) return; filtered[0].run(); setOpen(false); }
  return open ? (
    <div aria-hidden={!open} className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div role="dialog" aria-modal="true" className="absolute left-1/2 top-24 w-[90vw] max-w-xl -translate-x-1/2 rounded-2xl border bg-background shadow-2xl">
        <div className="border-b p-3">
          <input ref={inputRef} value={q} onChange={(e)=>setQ(e.target.value)} onKeyDown={(e)=>{ if (e.key === "Enter") onEnter(); if (e.key === "Escape") setOpen(false); }} placeholder="Type a command… (e.g., insert button)" aria-label="Command search" className="h-10 w-full rounded-md border px-3" />
        </div>
        <ul className="max-h-72 overflow-auto p-2">
          {filtered.map((c) => (
            <li key={c.id}>
              <button onClick={()=>{ c.run(); setOpen(false); }} className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left hover:bg-card">
                <span className="text-sm">{c.label}{c.hint ? <span className="ml-2 text-xs text-[--muted-foreground]">{c.hint}</span> : null}</span>
                {c.shortcut ? <kbd className="rounded border px-1 py-0.5 text-xs text-[--muted-foreground]">{c.shortcut}</kbd> : null}
              </button>
            </li>
          ))}
          {!filtered.length && <li className="px-3 py-2 text-sm text-[--muted-foreground]">No results</li>}
        </ul>
        <div className="border-t p-2 text-xs text-[--muted-foreground] flex items-center justify-between">
          <span>Open palette: Ctrl/Cmd + K</span>
          <button onClick={()=>setOpen(false)} className="rounded-md border px-2 py-1">Close</button>
        </div>
      </div>
    </div>
  ) : null;
}
