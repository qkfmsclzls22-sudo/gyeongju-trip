import { basicTravelReply } from "./travel-fallback.ts";

export type TravelRequest = { message: string; profile: string; history: { role: string; content: string }[] };
export type TravelResponse = { reply: string; fallback?: boolean; planUrl?: string; elapsedMs?: number; firstPreviewMs?: number };
export const CHAT_DEADLINE_MS = 15000;

/** One deadline covers fetch headers AND stream body; a hung reader cannot hold the UI. */
export async function requestTravelReply(input: TravelRequest, options: {
  fetcher?: typeof fetch; timeoutMs?: number; signal?: AbortSignal; onPreview?: (text: string) => void;
} = {}): Promise<TravelResponse> {
  const fallback = (): TravelResponse => ({ reply: basicTravelReply(input.profile, input.message, input.history), fallback: true });
  const controller = new AbortController();
  let finished = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let cancel: () => void = () => {};
  const read = async (): Promise<TravelResponse> => {
    const response = await (options.fetcher ?? fetch)("/api/travel-chat", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/x-ndjson" },
      body: JSON.stringify(input), signal: controller.signal,
    });
    if (!response.ok) return fallback();
    let data: Record<string, unknown> | undefined;
    if (response.headers.get("content-type")?.includes("application/x-ndjson") && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let pending = "";
      const accept = (line: string) => {
        if (!line.trim()) return;
        const event = JSON.parse(line);
        if (!event || typeof event !== "object") return;
        if (event.type === "preview" && typeof event.reply === "string" && !finished) options.onPreview?.(event.reply);
        if (event.type === "result") data = event;
      };
      try {
        while (!data) {
          const { done, value } = await reader.read();
          pending += decoder.decode(value, { stream: !done });
          const lines = pending.split("\n"); pending = lines.pop() ?? "";
          for (const line of lines) accept(line);
          if (done) { accept(pending); break; }
          if (pending.length > 200000) throw new Error("Oversized stream");
        }
      } finally { void reader.cancel().catch(() => {}); }
    } else data = await response.json();
    if (!data || data.ok === false || typeof data.reply !== "string" || !data.reply.trim()) return fallback();
    return { reply: data.reply, fallback: data.fallback === true,
      planUrl: typeof data.planUrl === "string" && data.planUrl.startsWith("/travel-plan#v1.") ? data.planUrl : undefined,
      elapsedMs: typeof data.elapsedMs === "number" ? data.elapsedMs : undefined,
      firstPreviewMs: typeof data.firstPreviewMs === "number" ? data.firstPreviewMs : undefined };
  };
  const deadline = new Promise<TravelResponse>(resolve => {
    cancel = () => { controller.abort(); resolve(fallback()); };
    timer = setTimeout(cancel, options.timeoutMs ?? CHAT_DEADLINE_MS);
    if (options.signal?.aborted) cancel();
    else options.signal?.addEventListener("abort", cancel, { once: true });
  });
  try { return await Promise.race([read().catch(fallback), deadline]); }
  finally { finished = true; clearTimeout(timer); options.signal?.removeEventListener("abort", cancel); controller.abort(); }
}
