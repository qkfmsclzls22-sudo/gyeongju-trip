import { TOURS } from "./tours.ts";

/** Deliberately conservative, offline-safe guidance, not an AI-generated itinerary. */
export function basicTravelReply(profile = "", question = "", history: { role: string; content: string }[] = []): string {
  const context = [profile, ...history.filter(m => m.role === "user").slice(-8).map(m => m.content), question].join("\n");
  const heading = "기본 여행안내\n맞춤 답변 대신 준비된 기본 동선을 보여드려요. 최신 운영·예약 여부는 별도 확인해 주세요.";
  if (/가격|요금|얼마|몇\s*원|시작|집결|투어.*시간|예약|품절|휴관/.test(question)) {
    const names = /박물관|불국사|석굴암|야경|별빛/.test(question);
    const selected = Object.values(TOURS).filter(t => !names || (t.id === "museum" && /박물관/.test(question)) || (t.id === "bulguksa" && /불국사|석굴암/.test(question)) || (t.id === "night" && /야경|별빛/.test(question)));
    return [heading, ...selected.map(t => `${t.name}\n성인 ${t.adultPrice.toLocaleString("ko-KR")}원 / 어린이 ${(t.childPrice ?? t.adultPrice).toLocaleString("ko-KR")}원\n${t.operatingHours}`),
      "2026년 9월 14일 박물관 투어는 실내 전시실 휴관으로 오전·오후 운영 불가이며 스토어 품절 처리되었습니다. 다른 날짜의 예약 가능 여부는 스토어에서 확인해 주세요.",
      "투어 예약 안내: https://www.gjtrip.co.kr/#tours"].join("\n\n");
  }
  const duration = [...context.matchAll(/당일치기|1박\s*2일|2박\s*3일|3박\s*이상/g)].at(-1)?.[0] ?? "당일치기";
  const dayTrip = duration === "당일치기";
  const multi = /2박|3박/.test(duration);
  const late = /저녁 도착/.test(context) || /(?:도착 시각:\s*)(?:1[89]|2[0-3]):/.test(context);
  const afternoon = /오후 도착/.test(context);
  const indoors = /여름|겨울|비가|우천|비\s*오는|더위|추위|실내|폭우|폭염|눈이/.test(context);
  const limitedWalk = /부모님|유모차|걷기.*(?:힘|어려)|보행.*제한|계단/.test(context);
  const car = /자차|렌터카/.test(context);
  // Any mentioned place is conservatively omitted from the offline defaults:
  // this also handles free-text "don't visit" requests without pretending NLP certainty.
  const avoid = (name: string) => context.includes(name);
  const outdoor = ["대릉원", "첨성대", "교촌마을"].filter(n => !avoid(n));
  const visit = indoors || limitedWalk ? "당일 운영을 확인한 실내 전시 1곳 (확인 전에는 관람 확정 제외)" : outdoor.slice(0, afternoon ? 1 : 2).join(" → ") || "숙소·도착지 가까운 곳에서 짧은 산책";
  const city = `${visit} → 가까운 곳에서 점심·휴식 → 카페 또는 짧은 산책`;
  const bomun = "보문 숙소 권역 → 당일 운영을 확인한 전시 1곳 → 같은 권역에서 식사·휴식";
  const firstArea = /보문/.test(profile) && !dayTrip ? bomun : city;
  const lines = [heading];
  if (dayTrip) {
    lines.push(`당일 기본 동선\n${late ? "도착지 가까운 곳에서 저녁식사·휴식 → 귀가" : firstArea + " → 귀가"}`);
    lines.push("당일치기는 숙소 체크인 없이 이동합니다. 오후 도착이면 관람은 1곳만, 저녁 도착이면 식사·휴식 위주로 줄여 주세요.");
  } else {
    lines.push(`1일차\n${late ? "숙소 권역에서 저녁식사 → 체크인·휴식" : firstArea + " → 체크인·휴식 (일반적으로 15시 이후, 숙소 안내 우선)"}`);
    if (multi) lines.push("중간 날\n같은 권역에서 당일 운영을 확인한 관람 1~2곳 → 점심 → 카페·휴식 → 저녁식사 → 숙소. 같은 명소를 반복하지 말고 남는 날은 숙소 주변 자유시간으로 두세요.");
    lines.push(`마지막 날\n숙소 안내 시각에 맞춰 체크아웃 → ${/보문/.test(profile) ? city : "전날 방문하지 않은 가까운 관람 1곳 → 점심·휴식"} → 귀가`);
  }
  lines.push(car ? "이동 팁\n권역마다 주차한 뒤 가까운 곳을 묶고, 다음 차량 이동 전에 차를 회수하세요. 식사는 45~60분, 주차·이동은 별도 여유를 잡으세요." : "이동 팁\n대중교통 대기와 도보 접근시간을 따로 확보하고 하루 관람은 1~2곳부터 잡으세요. 식사는 45~60분 여유를 두세요.");
  if (indoors) lines.push("날씨 대응\n더위·추위·비에는 긴 야외 관람을 줄이세요. 실내 시설도 휴관 여부를 확인한 뒤 선택하고, 악천후에는 가까운 식사·휴식 위주로 줄여 주세요.");
  if (/야경/.test(question) && !/귀가|출발|제외|싫|안\s*가/.test(question)) lines.push("야경을 원하면\n해가 진 뒤까지 머물 수 있을 때만 동궁과월지 또는 월정교 중 1곳을 검토하세요. 위 기본 동선에 예약이나 야경 방문이 확정된 것은 아닙니다.");
  lines.push("정확한 날짜·도착·귀가 시각과 추가 요청까지 반영한 확정 시간표는 아닙니다. 예약·알레르기·보행 제한이 있으면 그 조건을 우선해 주세요. 최신 운영 안내: https://www.gjtrip.co.kr/now");
  return lines.join("\n\n");
}
