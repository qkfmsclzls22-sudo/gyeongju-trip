import type { Plan } from "./itinerary";

export async function decodePlanSnapshot(token: string): Promise<Plan> {
  if (!/^v1\.[A-Za-z0-9_-]+$/.test(token) || token.length > 50000) throw Error("link");
  const binary = atob(token.slice(3).replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  const reader = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip")).getReader();
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 150000) { await reader.cancel(); throw Error("size"); }
    chunks.push(value);
  }
  const decoded = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { decoded.set(chunk, offset); offset += chunk.length; }
  const data = JSON.parse(new TextDecoder().decode(decoded));
  const p = data.plan;
  const str = (v: unknown) => typeof v === "string" && v.length < 12000;
  if (data.version !== 1 || !p || !str(p.assumptions) || !str(p.reasons) || !Array.isArray(p.tips) || !p.tips.every(str) || !Array.isArray(p.days) || !p.days.length || p.days.length > 31) throw Error("shape");
  for (const day of p.days) {
    if (!Number.isInteger(day.day) || !Array.isArray(day.stops) || day.stops.length > 40) throw Error("day");
    for (const s of day.stops) if (!s || ![s.start,s.end,s.place,s.text,s.kind].every(str)) throw Error("stop");
  }
  return p;
}
