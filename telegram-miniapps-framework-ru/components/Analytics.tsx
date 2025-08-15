
"use client";
import Script from "next/script";
const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
export function Analytics() { return domain ? <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" /> : null; }
