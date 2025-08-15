
"use client";
import * as React from "react";
import { cn } from "@/components/utils";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: "default"|"outline"|"ghost"; asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant="default", ...props }, ref) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm h-10 px-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-2";
  const variants = { default: "bg-[--primary] text-[--primary-foreground] hover:opacity-95", outline: "border border-[--border] hover:bg-card", ghost: "hover:bg-card" };
  return <button ref={ref} className={cn(base, variants[variant], className)} {...props} />;
});
Button.displayName = "Button";
