export type Stop = { start: string; end: string; place: string; area: string; kind: string; text: string };
export type Plan = { answer: string; assumptions: string; days: { day: number; stops: Stop[] }[]; reasons: string; tips: string[] };

const string = { type: "string" };
const object = (properties: Record<string, unknown>) => ({ type: "object", additionalProperties: false, properties, required: Object.keys(properties) });
export const planFormat = {
  type: "json_schema" as const,
  json_schema: { name: "gyeongju_plan", strict: true, schema: object({
    answer: string, assumptions: string,
    days: { type: "array", items: object({ day: { type: "integer" }, stops: { type: "array", items: object({
      start: string, end: string, place: string,
      area: { type: "string", enum: ["보문", "도심", "서악", "남산", "불국사", "동해안", "기타", "이동"] },
      kind: { type: "string", enum: ["관람", "식사", "카페", "체크인", "체크아웃", "숙박", "이동", "귀가"] }, text: string,
    }) } }) }, reasons: string, tips: { type: "array", items: string },
  }) },
};

const minute = (value: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value) ? Number(value.slice(0, 2)) * 60 + Number(value.slice(3)) : NaN;
const canonicalPlace = (place: string) => {
  const compact = place.replace(/[\s·:：()]/g, "");
  return /보문(호|관광단지|단지|정|물레방아)/.test(compact) ? "보문산책" : compact.replace(/경주|산책|야경|관람|사진촬영/g, "");
};

export function inspectPlan(value: unknown, context: string): string[] {
  const errors: string[] = [];
  if (!value || typeof value !== "object") return ["응답 구조 오류"];
  const p = value as Plan;
  if (!Array.isArray(p.days) || typeof p.answer !== "string" || typeof p.assumptions !== "string" || typeof p.reasons !== "string" || !Array.isArray(p.tips) || p.tips.some(t => typeof t !== "string")) return ["응답 구조 오류"];
  if (!p.days.length) return p.answer.trim() ? [] : ["답변 없음"];
  const duration = [...context.matchAll(/(\d+)박\s*(\d+)일|당일치기/g)].at(-1);
  const tripDays = duration ? (duration[2] ? Number(duration[2]) : 1) : null;
  const repeatsAllowed = /재방문.*(?:원해|희망|하고|싶)|같은.*(?:다시|두 번).*보고/.test(context);
  const earlyCheckin = /(?:얼리|조기)\s*체크인.*(?:확정|예약|가능)/.test(context);
  const arrivalMatch = [...context.matchAll(/(?:도착\s*(?:시각|시간)?\s*:?\s*)(\d{1,2}):(\d{2})|(\d{1,2}):(\d{2})\s*(?:경주\s*)?도착/g)].at(-1);
  const arrival = arrivalMatch ? Number(arrivalMatch[1] ?? arrivalMatch[3]) * 60 + Number(arrivalMatch[2] ?? arrivalMatch[4]) : null;
  const places = new Set<string>();
  let previousDay = 0;
  for (const day of p.days) {
    if (!Number.isInteger(day.day) || day.day <= previousDay || (tripDays && day.day > tripDays) || !Array.isArray(day.stops) || !day.stops.length) return ["숙박일수/일차 구조 오류"];
    previousDay = day.day;
    let previousEnd = -1;
    const visitedAreas = new Set<string>();
    let previousArea = "";
    for (const [i, stop] of day.stops.entries()) {
      if ([stop.start, stop.end, stop.place, stop.area, stop.kind, stop.text].some(v => typeof v !== "string")) return ["시간표 행 구조 오류"];
      const start = minute(stop.start), end = minute(stop.end);
      if (!Number.isFinite(start) || !Number.isFinite(end) || end < start || start < previousEnd) errors.push(`${day.day}일차 ${stop.text}: 시각 역전/겹침`);
      if (day.day === 1 && arrival !== null && start < arrival) errors.push("첫날 도착 이전 일정 금지");
      previousEnd = end;
      if (stop.kind === "체크인" && start < 900 && !earlyCheckin) errors.push("미확정 체크인은 15시 이후 시작");
      if (tripDays && day.day === tripDays && ["체크인", "숙박"].includes(stop.kind)) errors.push("마지막 날 체크아웃 후 숙소 휴식/숙박 금지");
      if (stop.kind === "귀가" && i !== day.stops.length - 1) errors.push("귀가 뒤 추가 일정 금지");
      if (stop.kind === "관람") {
        const key = canonicalPlace(stop.place);
        if (places.has(key) && !repeatsAllowed) errors.push(`명소 중복: ${stop.place}`);
        places.add(key);
      }
      // Exclude overnight endpoints and transit; hotel rest must not split sightseeing districts.
      const endpointHotel = ["숙박", "체크아웃"].includes(stop.kind) && (i === 0 || i === day.stops.length - 1);
      if (!endpointHotel && !["이동", "귀가"].includes(stop.kind) && !["이동", "기타"].includes(stop.area)) {
        if (stop.area !== previousArea && visitedAreas.has(stop.area)) errors.push(`${day.day}일차 ${stop.area} 권역 재진입: 불필요한 왕복을 줄이세요`);
        visitedAreas.add(stop.area); previousArea = stop.area;
      }
    }
  }
  return [...new Set(errors)];
}

export function renderPlan(plan: Plan): string {
  if (!plan.days.length) return plan.answer;
  const sections = plan.days.map((d, i) => `${d.day}일차\n${i === 0 && plan.assumptions ? plan.assumptions + "\n\n" : ""}${d.stops.map(s => `${s.start}${s.end === s.start ? "" : "–" + s.end} | ${s.text.replace(/\n/g, " ")}`).join("\n")}`);
  sections.push("시각은 이동·주차 여유를 포함한 계획안입니다.");
  if (plan.reasons) sections.push(`이렇게 짠 이유\n${plan.reasons}`);
  if (plan.tips.length) sections.push(`딱 기억할 팁\n${plan.tips.slice(0, 2).map(t => `• ${t}`).join("\n")}`);
  return sections.join("\n\n");
}
