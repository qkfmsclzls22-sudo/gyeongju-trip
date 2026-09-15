import { basicTravelReply } from "./travel-fallback.ts";

export type TravelRequest = { message: string; profile: string; history: { role: string; content: string }[] };
export type TravelResponse = { reply: string; fallback?: boolean; planUrl?: string; elapsedMs?: number; firstPreviewMs?: number };
export const CHAT_DEADLINE_MS = 30000;

// Mobile browsers can suspend streamed fetches when the keyboard, another app,
// or a screen lock changes page visibility. Use the existing JSON endpoint there.
export function prefersCompleteReply(userAgent: string, touchPoints = 0): boolean {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent) || (/Macintosh/.test(userAgent) && touchPoints > 1);
}

/** One deadline covers fetch headers AND stream body; a hung reader cannot hold the UI. */
export async function requestTravelReply(input: TravelRequest, options: {
  fetcher?: typeof fetch; timeoutMs?: number; signal?: AbortSignal; onPreview?: (text: string) => void;
  transport?: "json" | "stream";
} = {}): Promise<TravelResponse> {
  const fallback = (): TravelResponse => ({ reply: basicTravelReply(input.profile, input.message, input.history), fallback: true });
  const controller = new AbortController();
  let finished = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let cancel: () => void = () => {};
  const expiresAt = Date.now() + (options.timeoutMs ?? CHAT_DEADLINE_MS);
  const complete = options.transport ? options.transport === "json" : typeof navigator !== "undefined" && prefersCompleteReply(navigator.userAgent, navigator.maxTouchPoints);
  const publishPreview = (text: string) => {
    // Rendering progress must never cause a successful network request to fail.
    if (!finished) { try { options.onPreview?.(text); } catch { /* final reply still wins */ } }
  };
  const read = async (json: boolean): Promise<TravelResponse> => {
    const response = await (options.fetcher ?? fetch)("/api/travel-chat", {
      method: "POST", cache: "no-store", headers: { "Content-Type": "application/json", Accept: json ? "application/json" : "application/x-ndjson" },
      body: JSON.stringify(input), signal: controller.signal,
    });
    if (!response.ok) { void response.body?.cancel().catch(() => {}); throw new Error("Response unavailable"); }
    let data: Record<string, unknown> | undefined;
    if (response.headers.get("content-type")?.includes("application/x-ndjson") && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let pending = "";
      const accept = (line: string) => {
        if (!line.trim()) return;
        const event = JSON.parse(line);
        if (!event || typeof event !== "object") return;
        if (event.type === "preview" && typeof event.reply === "string") publishPreview(event.reply);
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
    if (!data || data.ok === false || typeof data.reply !== "string" || !data.reply.trim()) throw new Error("Incomplete response");
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
  // Mobile timers are paused in the background. Check real elapsed time as soon
  // as the page returns, even if a fetch body and its timer are both suspended.
  const resume = () => { if (!finished && Date.now() >= expiresAt) cancel(); };
  if (typeof window !== "undefined") {
    window.addEventListener("pageshow", resume);
    window.addEventListener("focus", resume);
  }
  if (typeof document !== "undefined") document.addEventListener("visibilitychange", resume);
  const readWithRecovery = async (): Promise<TravelResponse> => {
    for (let attempt = 0; attempt < 2; attempt++) {
      if (controller.signal.aborted) return fallback();
      try {
        const result = await read(complete || attempt > 0);
        return controller.signal.aborted || Date.now() >= expiresAt ? fallback() : result;
      }
      catch {
        if (controller.signal.aborted || attempt === 1) return fallback();
        publishPreview("연결을 복구하고 있어요. 같은 여행 조건으로 답변을 이어갑니다.");
      }
    }
    return fallback();
  };
  try { return await Promise.race([readWithRecovery(), deadline]); }
  finally {
    finished = true; clearTimeout(timer); options.signal?.removeEventListener("abort", cancel); controller.abort();
    if (typeof window !== "undefined") {
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("focus", resume);
    }
    if (typeof document !== "undefined") document.removeEventListener("visibilitychange", resume);
  }
}
