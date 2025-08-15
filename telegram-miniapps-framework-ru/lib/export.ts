
type Block = { type: string; [key: string]: any };
export type ExportSchema = { title?: string; blocks: Block[] };
export function download(filename: string, content: string, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
export function schemaToHTML(schema: ExportSchema): string {
  const parts: string[] = [];
  if (schema.title) parts.push(`<h1>${escapeHtml(schema.title)}</h1>`);
  for (const b of schema.blocks || []) {
    if (b.type === "text") {
      const tag = b.variant === "h1" ? "h2" : b.variant === "h2" ? "h3" : "p";
      parts.push(`<${tag}>${escapeHtml(b.value || "")}</${tag}>`);
    } else if (b.type === "button") {
      parts.push(`<button>${escapeHtml(b.label || "Button")}</button>`);
    } else if (b.type === "input") {
      const label = b.label ? `<label>${escapeHtml(b.label)}</label>` : "";
      parts.push(`<div>${label}<input name="${escapeAttr(b.name || "field")}" placeholder="${escapeAttr(b.placeholder || "")}"/></div>`);
    } else if (b.type === "list") {
      parts.push(`<ul>${(b.items || []).map((it: string) => `<li>${escapeHtml(it)}</li>`).join("")}</ul>`);
    } else if (b.type === "card") {
      parts.push(`<article><h3>${escapeHtml(b.title || "")}</h3>${b.description ? `<p>${escapeHtml(b.description)}</p>` : ""}</article>`);
    } else if (b.type === "form") {
      const fields = (b.fields || []).map((f: any) => {
        const l = f.label ? `<label>${escapeHtml(f.label)}</label>` : "";
        return `<div>${l}<input name="${escapeAttr(f.name || "field")}" placeholder="${escapeAttr(f.placeholder || "")}"/></div>`;
      }).join("");
      parts.push(`<form onsubmit="event.preventDefault(); alert('Submitted');">${fields}<button type="submit">Submit</button></form>`);
    }
  }
  const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${escapeHtml(schema.title || "Mini App")}</title>
<style>
  body{font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial;padding:24px;color:#0B1220;background:#FFFFFF;}
  h1{font-size:24px;margin:0 0 12px;} h2,h3{margin:16px 0 8px;} p,li,label{color:#606A80;}
  button{height:36px;padding:0 14px;border-radius:8px;border:1px solid #E5E7EB;background:#1E66F5;color:#fff;cursor:pointer}
  input{height:36px;padding:0 12px;border-radius:8px;border:1px solid #E5E7EB;display:block;width:100%}
  article{border:1px solid #E5E7EB;border-radius:16px;padding:16px;margin:8px 0;background:#F8FAFC} ul{padding-left:20px} form>div{margin:8px 0}
</style></head><body>${parts.join("\n")}</body></html>`;
  return html;
}
function escapeHtml(s: string) { return String(s).replace(/[&<>"]/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c] as string)); }
function escapeAttr(s: string) { return escapeHtml(s).replace(/"/g, "&quot;"); }
