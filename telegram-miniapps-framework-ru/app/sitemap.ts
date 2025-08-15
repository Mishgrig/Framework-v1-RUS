
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://miniapps.example.com";
  const routes = ["","/about","/methodology","/templates","/legal-first","/pricing","/analytics","/contact","/privacy","/terms","/studio"];
  const now = new Date().toISOString();
  return routes.map((r) => ({ url: base + r, lastModified: now, changeFrequency: "weekly", priority: r === "" ? 1 : 0.7 }));
}
