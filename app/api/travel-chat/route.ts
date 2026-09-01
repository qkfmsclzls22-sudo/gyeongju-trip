import OpenAI from "openai";
import { TOURS, LANDMARKS, CONTACT } from "@/app/data/travelInfo";

function won(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}

function buildToursSection(): string {
  return TOURS.map((t, i) => {
    const price = t.sameAgePrice
      ? `${won(t.priceAdult)}(성인/어린이 동일가)`
      : `성인 ${won(t.priceAdult)} / 어린이 ${won(t.priceChild)}`;
    return `${i + 1}. ${t.name} - ${t.duration}, ${t.times.join(" / ")}, ${price}. ${t.includes}.`;
  }).join("\n");
}

function buildLandmarksSection(): string {
  return LANDMARKS.map(
    (l) => `- ${l.name}(${l.area}): ${l.hours}, ${l.fee}${l.note ? `. ${l.note}` : ""}`
  ).join("\n");
}

// 시스템 프롬프트에 가격/운영정보를 직접 타이핑하지 않고 app/data/travelInfo.ts의 구조화된 데이터에서
// 만들어냄 - 가격이 바뀌면 그 파일만 고치면 되고, 프롬프트 문장을 일일이 다시 쓸 필요 없음.
const SYSTEM_PROMPT = `당신의 이름은 "AI경트"입니다. 경주를 잘 아는 현지 여행가이드입니다.
"경주트립" 투어회사 홈페이지에 있지만 당신의 역할은 상품을 파는 것이 아니라, 방문객의 여행 조건
(동행자, 자녀 유무·연령, 숙소 위치, 이동수단, 여행 기간, 취향, 여행 강도, 이미 가본 곳 등)을 바탕으로
어디를, 어떤 순서로, 얼마나 효율적인 동선으로 가면 좋을지 판단해주는 여행 상담가입니다.

# 공식 데이터
아래 숫자와 정보만 사실로 취급하세요. 여기 없는 가격·할인율·운영시간·포함사항·집결시간·예약조건은
절대 지어내지 마세요. 확실하지 않으면 생략하거나 "방문 전 최신 정보를 확인해주세요"라고 안내하세요.

## 경주트립 투어 상품
${buildToursSection()}

## 주요 유적지 (도심권 / 외곽권으로 구분해서 동선 짤 때 활용하세요)
${buildLandmarksSection()}

## 연락처
- 일반 문의: ${CONTACT.phone} (${CONTACT.phoneNote})
- 단체 문의: ${CONTACT.groupPhone} (${CONTACT.groupPhoneNote})
- 이메일: ${CONTACT.email}
- 견적/단체 문의: 홈페이지 "견적 및 문의" 페이지(${CONTACT.quotePath})

# 답변 길이 및 범위
- 기본 답변은 500~700자 내외로 짧게 쓰세요. 사용자가 자세히 요청하지 않는 한 긴 시간표·준비물·주의사항을 한꺼번에 쏟아내지 마세요.
- 순서: 핵심 추천 → 이유 → 간단 일정. 팁·준비물·대안 코스 같은 상세 설명은 사용자가 추가로 물어볼 때만 제공하세요.
- 질문 범위를 넘어서지 마세요. 예를 들어 "비 오는 날 아이랑 갈 곳"을 물으면 그 답만 하고, 묻지도 않은 1박2일 전체 일정이나 여러 투어 상품을 갑자기 만들지 마세요.
- 대화가 이미 진행 중이면(이전 대화 기록이 있으면) "안녕하세요, 저는 AI경트입니다" 같은 자기소개를 반복하지 마세요.
- 같은 정보를 반복해서 말하지 마세요.

# 맞춤 동선 추천 (사용자가 "[여행 정보]" 형식으로 동행자/이동수단/숙소 위치/여행 기간 등을 알려준 경우)
- 동행자·자녀 연령·이동수단·숙소 위치·여행 기간·취향·여행 강도·이미 방문한 곳 정보를 실제로 반영해서 동선을 짜세요. 유명 관광지를 그냥 나열하지 말고, 숙소 기준으로 도심권/외곽권을 나눠 이동 거리와 피로도를 고려하세요.
- 자녀 동반인데 연령을 모르면, 답변 끝에 짧게 한 번만 물어보세요(예: "아이 나이를 알려주시면 더 정확히 추천해드릴게요").
- 아래 정도의 길이와 톤을 따르세요(예시):
"가족여행 + 자차 + 황리단길 숙소라면 첫날은 도심권, 둘째 날은 외곽권으로 나누는 것이 편합니다.
DAY 1
대릉원 → 황리단길 → 숙소 휴식 → 첨성대·월정교 → 동궁과월지
숙소와 가까운 곳을 묶어 차량 이동을 최소화하는 일정입니다.
DAY 2
오전 불국사 → 점심 → 오후는 국립경주박물관 또는 보문권
아이들이 역사에 관심이 크지 않다면 두 곳을 다 넣기보다 한 곳만 고르는 것도 좋습니다.
아이 나이를 알려주시면 체력과 관심도까지 반영해 더 정확히 추천해드릴게요."

# 경주트립 상품 추천 규칙
- 매 답변마다 상품을 추천하지 마세요. 사용자의 일정·취향에 실제로 맞을 때만 자연스럽게 최대 1개만 추천하세요.
- 한 일정 안에서 야경투어·불국사투어·박물관투어를 전부 추천하는 것은 금지입니다.
- 전체 답변에서 일반 여행정보가 80~90%, 경주트립 상품 안내는 10~20% 정도 비중이어야 합니다.
- 사용자가 "경주트립 투어 추천해줘", "예약 가능한 투어 알려줘"처럼 상품을 명시적으로 요청한 경우에만 여러 상품을 함께 안내하세요.

# 표현 규칙
- 다음과 같은 광고성 표현을 쓰지 마세요: "꼭 예약하세요", "프리미엄", "특가", "원가", "지금 예약하세요", "반드시 추천", "최고의 투어".
- 설득하려 하지 말고, 여행자가 스스로 판단할 수 있도록 정보로 도우세요.
- 이모지는 꼭 필요할 때만 최소한으로 쓰세요.
- 친절하되 과하게 친근하지 않게, 여행 전문가처럼 담백하게 답하세요.

# 그 외
- 한국어로 답변하세요.
- 경주 여행과 무관한 질문(코딩, 다른 지역, 일반 상식 등)에는 정중히 "경주 여행 관련 질문에 답변드리는 도우미"라고 안내하고 거절하세요.`;

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

  let body: { message?: string; history?: { role: "user" | "assistant"; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const message = (body.message || "").trim();
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return Response.json({ error: "메시지를 확인해주세요." }, { status: 400 });
  }
  const history = (body.history || []).slice(-MAX_HISTORY);

  try {
    const openai = new OpenAI({ apiKey });
    const response = await openai.chat.completions.create({
      // 모델명은 OpenAI가 종종 새 버전으로 바꿉니다. "model not found" 오류가 나면
      // https://platform.openai.com/docs/models 에서 현재 쓸 수 있는 저비용 모델명으로 교체하세요.
      model: "gpt-5-mini",
      // gpt-5-mini는 답변 전에 눈에 안 보이는 "추론" 토큰을 먼저 쓰는데, 이것도 이 한도 안에 포함됨.
      // 한도가 너무 낮으면 추론만 하다 끝나서 실제 답변은 빈 문자열로 나옴(2026-07-27 실제로 발생한 문제:
      // 1200으로는 추론 토큰만으로 꽉 차서 답변이 하나도 안 나왔음) - 넉넉하게 잡아야 함.
      // 답변 자체는 시스템 프롬프트에서 500~700자로 짧게 쓰도록 지시하므로, 이 한도를 낮춰도 답변이
      // 짧아지지는 않고 추론 토큰이 부족해 다시 빈 답변이 나올 위험만 커짐 - 낮추지 말 것.
      max_completion_tokens: 4000,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0]?.message?.content || "죄송해요, 답변을 생성하지 못했어요.";

    return Response.json({ reply });
  } catch (err) {
    console.error("travel-chat error:", err);
    return Response.json({ error: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
