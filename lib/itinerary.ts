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

// Only standalone preparation is capped; hotel formalities, meals, transit and
// explicitly planned rest are real activities even if they mention packing.
function isPreparationOnly(stop: Stop): boolean {
  if (["체크인", "체크아웃", "숙박", "식사", "카페"].includes(stop.kind)) return false;
  if (!/준비|짐\s*정리|우산\s*정리/.test(stop.place)) return false;
  return !/휴식|쉬기|쉬는|체크인|체크아웃|식사|카페|관람|이동|주차|차량|회수|탑승|산책/.test(stop.place + " " + stop.text);
}

/** Shorten a standalone packing block without shifting any other appointments. */
export function repairPreparationBlocks(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  const plan = value as Plan;
  if (!Array.isArray(plan.days)) return value;
  return { ...plan, days: plan.days.map(day => {
    if (!day || !Array.isArray(day.stops)) return day;
    return { ...day, stops: day.stops.map(stop => {
      if (!stop || [stop.start, stop.end, stop.place, stop.kind, stop.text].some(v => typeof v !== "string")) return stop;
      const start = minute(stop.start), end = minute(stop.end);
      if (!isPreparationOnly(stop) || !Number.isFinite(start) || !Number.isFinite(end) || end - start <= 30) return stop;
      const revisedEnd = start + 30;
      return { ...stop, end: `${String(Math.floor(revisedEnd / 60)).padStart(2, "0")}:${String(revisedEnd % 60).padStart(2, "0")}`,
        text: "짐 정리·출발 준비 (30분 이내). 다음 일정 전 남는 시간은 자유시간입니다." };
    }) };
  }) };
}

export function inspectPlan(value: unknown, context: string, today = new Date().toISOString().slice(0, 10)): string[] {
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
  const departureMatch = [...context.matchAll(/(?:(오전|오후|저녁)\s*)?(\d{1,2})(?::(\d{2})|시(?:\s*(\d{1,2})분)?)[ \t]*(?:경주(?:에서)?[ \t]*)?귀가|(?:(오전|오후|저녁)\s*)?(\d{1,2})(?::(\d{2})|시(?:\s*(\d{1,2})분)?)[ \t]*경주(?:에서)?[ \t]*출발/g)].at(-1);
  let departure: number | null = null;
  if (departureMatch) {
    const period = departureMatch[1] ?? departureMatch[5];
    let hour = Number(departureMatch[2] ?? departureMatch[6]);
    if (["오후", "저녁"].includes(period) && hour < 12) hour += 12;
    if (period === "오전" && hour === 12) hour = 0;
    const minutes = Number(departureMatch[3] ?? departureMatch[4] ?? departureMatch[7] ?? departureMatch[8] ?? 0);
    if (hour < 24 && minutes < 60) departure = hour * 60 + minutes;
  }
  const places = new Set<string>();
  const dateMatch = [...context.matchAll(/(?:(\d{4})[-년]\s*)?(\d{1,2})[-월]\s*(\d{1,2})(?:일)?/g)].at(-1);
  const relativeDay = [...context.matchAll(/오늘|내일|모레/g)].at(-1)?.[0];
  const startDate = dateMatch ? Date.UTC(Number(dateMatch[1] || today.slice(0, 4)), Number(dateMatch[2]) - 1, Number(dateMatch[3]))
    : relativeDay ? Date.parse(today + "T00:00:00Z") + ({ 오늘: 0, 내일: 1, 모레: 2 }[relativeDay] ?? 0) * 86400000 : null;
  let previousDay = 0;
  for (const day of p.days) {
    if (!day || !Number.isInteger(day.day) || day.day <= previousDay || (tripDays && day.day > tripDays) || !Array.isArray(day.stops) || !day.stops.length) return ["숙박일수/일차 구조 오류"];
    previousDay = day.day;
    let previousEnd = -1;
    const visitedAreas = new Set<string>();
    let previousArea = "";
    for (const [i, stop] of day.stops.entries()) {
      if (!stop || [stop.start, stop.end, stop.place, stop.area, stop.kind, stop.text].some(v => typeof v !== "string")) return ["시간표 행 구조 오류"];
      const start = minute(stop.start), end = minute(stop.end);
      if (!Number.isFinite(start) || !Number.isFinite(end) || end < start || start < previousEnd) errors.push(`${day.day}일차 ${stop.text}: 시각 역전/겹침`);
      if (day.day === 1 && arrival !== null && start < arrival) errors.push("첫날 도착 이전 일정 금지");
      previousEnd = end;
      if (departure !== null && day.day === (tripDays || p.days.at(-1)?.day) && end > departure) errors.push("마지막 날 경주 귀가 출발시각 이후 일정 금지");
      if (stop.kind === "식사" && end - start < 45) errors.push("식사 자체에 최소45분 확보: 관람을 줄여서라도 식사시간을 확보하세요");
      if (end - start > 30 && isPreparationOnly(stop)) errors.push("짐·우산 정리와 준비만으로 30분 넘게 채우지 말고 관람 또는 휴식 경험을 배치하세요");
      if (stop.kind === "체크인" && start < 900 && !earlyCheckin) errors.push("미확정 체크인은 15시 이후 시작");
      if (tripDays && day.day === tripDays && ["체크인", "숙박"].includes(stop.kind)) errors.push("마지막 날 체크아웃 후 숙소 휴식/숙박 금지");
      if (stop.kind === "귀가" && i !== day.stops.length - 1) errors.push("귀가 뒤 추가 일정 금지");
      if (stop.kind === "관람") {
        const monday = startDate !== null ? new Date(startDate + (day.day - 1) * 86400000).getUTCDay() === 1 : tripDays === 1 && /월요일/.test(context);
        const venue = stop.place + " " + stop.text;
        if (monday && /라원|동궁식물원|동궁원/.test(venue)) errors.push("월요일 정기휴관인 라원·동궁식물원 대신 플래시백 계림 등 운영하는 대안을 선택하세요");
        if (/국립\s*경주\s*박물관/.test(venue) && start < 600) errors.push("국립경주박물관 관람은 10:00 개관 이후 배치하세요");
        const visitDate = startDate === null ? "" : new Date(startDate + (day.day - 1) * 86400000).toISOString().slice(0, 10);
        const closedMuseumRoom = /신라역사관|신라미술관|월지관|신라천년보고|어린이박물관|신라천년서고/.test(venue);
        const museumVisit = /(?:국립\s*)?경주\s*박물관|박물관.*(?:도슨트|투어)/.test(venue);
        const openExhibitionOnly = /특별전시관|옥외전시장/.test(venue) && !/도슨트|투어|상설/.test(venue);
        if (visitDate === "2026-09-14" && (closedMuseumRoom || (museumVisit && !openExhibitionOnly))) {
          errors.push("2026-09-14 국립경주박물관 실내 전시실 휴관: 박물관 투어는 오전·오후 모두 운영 불가이며 스토어 품절 처리. 박물관 상설전시·도슨트 대신 운영하는 다른 시설을 배치하세요");
        }
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
  const sections = plan.days.map((d, i) => `${d.day}일차\n${i === 0 && plan.assumptions ? plan.assumptions + "\n\n" : ""}${d.stops.map(s => `${s.start}${s.end === s.start ? "" : "–" + s.end} | ${s.place}${s.text === s.place ? "" : " · " + s.text.replace(/\n/g, " ")}`).join("\n")}`);
  sections.push("시각은 이동·주차 여유를 포함한 계획안입니다.");
  if (plan.reasons) sections.push(`이렇게 짠 이유\n${plan.reasons}`);
  if (plan.tips.length) sections.push(`딱 기억할 팁\n${plan.tips.slice(0, 2).map(t => `• ${t}`).join("\n")}`);
  return sections.join("\n\n");
}
