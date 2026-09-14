import OpenAI from "openai";
import { TRAVEL_CHAT_PROMPT, TOUR_CHAT_CONTEXT } from "@/lib/travel-chat-prompt";
import { planPreview } from "@/lib/plan-preview";
import { gzipSync } from "node:zlib";
import { inspectPlan, repairPreparationBlocks, planFormat, renderPlan, type Plan } from "@/lib/itinerary";

export const maxDuration = 180;
import { LANDMARKS } from "@/app/data/travelInfo";
import news from "@/data/now.json";
import { isVisible, koreaDate, safeUrl } from "@/lib/now";

const SYSTEM_PROMPT = TRAVEL_CHAT_PROMPT + TOUR_CHAT_CONTEXT + "\n그 밖의 명소 이름·권역 참고: " + LANDMARKS.map(l => l.name + "(" + l.area + ")").join(", ");

const MAX_MESSAGE_LENGTH = 400;
const MAX_HISTORY = 8;

// 서버가 재시작되면 초기화되는 임시 저장소(서버리스 환경 특성상 완벽한 방어는 아니지만,
// 짧은 시간 내 과도한 요청으로 비용이 급증하는 것을 최소한으로 막기 위한 용도)
const requestLog = new Map<string, number[]>();
const RATE_LIMIT = 10; // 시간당 요청 수
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "서비스 설정이 완료되지 않았습니다." }, { status: 500 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ error: "잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  let body: { message?: unknown; profile?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (!body || typeof body !== "object") return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return Response.json({ error: "메시지를 확인해주세요." }, { status: 400 });
  }
  const history = (Array.isArray(body.history) ? body.history : []).filter(
    (m): m is { role: "user" | "assistant"; content: string } => !!m && typeof m === "object" && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.length <= 8000
  ).slice(-MAX_HISTORY);
  const rawProfile = typeof body.profile === "string" ? body.profile.slice(0, 1600) : "미입력";
  const latestDuration = [...[rawProfile, ...history.filter(m => m.role === "user").map(m => m.content), message].join("\n").matchAll(/\d+박\s*\d+일|당일치기/g)].at(-1)?.[0];
  const profile = latestDuration === "당일치기"
    ? rawProfile.replace(/숙소 위치:/g, "당일 방문 희망 권역:") + "\n당일치기이며 숙박 예약은 없습니다. 체크인·호텔 주차·객실 사용을 가정하지 마세요."
    : rawProfile;
  const today = koreaDate();
  const currentNews = news.items.filter(item => isVisible(item, today) && safeUrl(item.sourceUrl)).sort((a, b) => {
    const priority = (category: string) => category === "운영·교통" ? 0 : category === "여행정보" ? 1 : 2;
    return priority(a.category) - priority(b.category) || b.checkedAt.localeCompare(a.checkedAt);
  }).slice(0, 60).map(item => ({
    title: item.title, category: item.category, location: item.location, dateKind: item.dateKind,
    startDate: item.startDate, endDate: item.endDate, occurrenceDates: item.occurrenceDates,
    schedule: item.schedule, summary: item.summary, price: item.price, checkedAt: item.checkedAt, reviewBy: item.reviewBy, sourceUrl: item.sourceUrl,
    sourceKind: news.sources.find(source => source.id === item.sourceId)?.kind ?? "unknown",
  }));

  type Result = { reply?: string; planUrl?: string; error?: string; retryable?: boolean; elapsedMs?: number; firstPreviewMs?: number };
  const started = Date.now();
  const abort = new AbortController();
  req.signal.addEventListener("abort", () => abort.abort(), { once: true });
  let emit: ((event: Record<string, unknown>) => void) | undefined;
  const run = async (): Promise<{ data: Result; status: number }> => {
  try {
    const openai = new OpenAI({ apiKey, timeout: 45000, maxRetries: 0 });
    const context = [profile, ...history.filter(m => m.role === "user").map(m => m.content), message].join("\n");
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT + `\n한국 기준 오늘: ${today}\n확인된 지금 경주 자료(JSON):\n${JSON.stringify(currentNews)}` },
      { role: "user", content: `[선택한 여행 조건]\n${profile}\n이후 대화에서 바꾼 조건이 있으면 최신 요청을 적용해 주세요.` },
      ...history,
      { role: "user", content: message },
    ];
    let firstPreviewMs = 0;
    for (let attempt = 0; attempt < 2; attempt++) {
      let content = "", finishReason = "", refusal = "", previousPreview = "";
      const stream = await openai.chat.completions.create({
        model: "gpt-5.4-mini",
        reasoning_effort: "low", max_completion_tokens: 8000,
        response_format: planFormat, messages, stream: true,
      }, { signal: abort.signal });
      for await (const chunk of stream) {
        const choice = chunk.choices[0];
        if (!choice) continue;
        content += choice.delta.content || "";
        refusal += choice.delta.refusal || "";
        if (choice.finish_reason) finishReason = choice.finish_reason;
        if (attempt === 0 && emit && content.includes("}")) {
          const preview = planPreview(content);
          if (preview && preview !== previousPreview) {
            if (!firstPreviewMs) firstPreviewMs = Date.now() - started;
            previousPreview = preview;
            emit({ type: "preview", reply: preview });
          }
        }
      }
      if (refusal) return { data: { error: "이 요청으로는 일정을 만들지 못했어요. 여행 장소나 시간 중심으로 질문을 바꿔주세요.", retryable: false }, status: 422 };
      let plan: unknown;
      try { plan = repairPreparationBlocks(JSON.parse(content || "null")); } catch { plan = null; }
      const issues = finishReason === "stop" ? inspectPlan(plan, context, today) : ["응답이 완성되지 않았습니다"];
      if (!issues.length) {
        const result = plan as Plan;
        // Self-contained snapshot: excludes the customer's profile and chat history.
        const snapshot = gzipSync(JSON.stringify({ version: 1, plan: result })).toString("base64url");
        const elapsedMs = Date.now() - started;
        console.info("travel-chat timing", { elapsedMs, firstPreviewMs, attempts: attempt + 1 });
        return { data: { reply: renderPlan(result), planUrl: result.days.length ? `/travel-plan#v1.${snapshot}` : undefined, elapsedMs, firstPreviewMs }, status: 200 };
      }
      console.warn("travel-chat validation", { attempt: attempt + 1, finishReason, issues });
      if (attempt < 1) {
        emit?.({ type: "preview", reply: "이동시간과 동선을 다시 조정하고 있어요. 검사가 끝나면 최종 일정을 보여드릴게요." });
        messages.push({ role: "assistant", content: content || "{}" });
        messages.push({ role: "system", content: `시간표 검증에서 다음 오류가 발견되었습니다. 조건과 장소를 재검토하여 완전한 JSON 답변을 다시 작성하세요. 날짜별 여행과 식사를 유지하고 같은 장소나 권역을 반복하지 마세요. 단순 질문으로 바꿔 검사를 피하지 마세요.\n${issues.join("\n")}` });
      }
    }
    return { data: { error: "일정의 시간과 동선을 맞추지 못했어요. 입력하신 조건은 그대로 남아 있습니다. ‘같은 조건으로 다시 만들기’를 눌러주세요.", retryable: true }, status: 502 };
  } catch (err) {
    console.error("travel-chat error:", err);
    return { data: { error: "답변 연결이 지연되고 있어요. 입력하신 조건은 그대로 남아 있습니다. 잠시 후 다시 시도해주세요.", retryable: true }, status: 503 };
  }
  };
  if (!req.headers.get("accept")?.includes("application/x-ndjson")) {
    const { data, status } = await run();
    return Response.json(data, { status });
  }
  const encoder = new TextEncoder();
  let closed = false;
  return new Response(new ReadableStream({
    async start(controller) {
      emit = event => { if (!closed) controller.enqueue(encoder.encode(JSON.stringify(event) + "\n")); };
      const { data, status } = await run();
      emit({ type: "result", ...data, ok: status === 200 });
      if (!closed) { closed = true; controller.close(); }
    },
    cancel() { closed = true; abort.abort(); },
  }), { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store, no-transform", "X-Accel-Buffering": "no" } });
}
