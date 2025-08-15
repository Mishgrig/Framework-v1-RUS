
"use client";
import * as React from "react";
export type Device = "mobile" | "tablet" | "full";
export function DeviceFrame({ device, children }: { device: Device; children: React.ReactNode }) {
  const map: Record<Device, string> = { mobile: "w-[390px]", tablet: "w-[834px]", full: "w-full" };
  return (
    <div className="flex justify-center">
      <div className={`bg-white dark:bg-slate-900 border rounded-[24px] p-4 shadow-sm ${map[device]}`}>
        <div className="rounded-xl border bg-card p-4">{children}</div>
      </div>
    </div>
  );
}
