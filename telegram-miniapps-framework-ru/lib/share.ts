
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
export function encodeState(obj: unknown) { try { return compressToEncodedURIComponent(JSON.stringify(obj)); } catch { return ""; } }
export function decodeState(s: string | null | undefined) { if (!s) return null; try { return JSON.parse(decompressFromEncodedURIComponent(s) || ""); } catch { return null; } }
