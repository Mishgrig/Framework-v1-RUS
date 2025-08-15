
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const v = typeof window !== "undefined" && window.localStorage.getItem("consent"); if (!v) setVisible(true); }, []);
  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] mx-auto max-w-[1240px] m-4 p-4 rounded-xl border border-transparent bg-[--primary] text-[--primary-foreground] shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="text-sm">
          Мы используем аналитические события для улучшения сайта. Подробнее в 
          <a className="underline font-medium text-[--primary-foreground]" href="/privacy">Политике конфиденциальности</a>.
        </p>
        <div className="flex gap-2">
          <Button onClick={() => { localStorage.setItem("consent","accepted"); setVisible(false); }} className="bg-[--primary-foreground] text-[--primary] hover:opacity-90">Согласен</Button>
          <Button variant="outline" onClick={() => { localStorage.setItem("consent","declined"); setVisible(false); }} className="border-[--primary-foreground] text-[--primary-foreground] hover:bg-white/10">Отклонить</Button>
        </div>
      </div>
    </div>
  );
}
