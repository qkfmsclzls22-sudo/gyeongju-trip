import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `당신은 "경주트립"이라는 경주 관광 투어 회사 홈페이지에 있는 여행정보 AI 도우미입니다.
경주 여행을 계획하는 방문객에게 친절하고 정확하게 답변하세요.

# 경주트립 투어 상품
1. 국립경주박물관 역사 도슨트 프리미엄 투어 - 약 2시간, 오전 10:00 / 오후 14:00, 성인 22,000원(원가 40,000원) / 어린이 15,900원. 성덕대왕신종→신라역사관→신라미술관, 블루투스 송수신기 무료대여.
2. 경주 야경투어 청사초롱 신라별빛야행 - 약 2시간, 저녁 19:00, 22,000원 상당→15,900원. 청사초롱 들고 동궁과월지·첨성대·월정교를 걷는 야간 투어.
3. 불국사·석굴암 문화해설사 역사투어 - 약 2시간, 오전 10:00 / 오후 14:00, 성인 19,800원(원가 60,000원) / 어린이 15,900원. 유네스코 세계문화유산 불국사와 석굴암 탐방.
모든 투어는 전문 문화해설사가 동행합니다.

# 주요 유적지 정보
- 첨성대: 동양 최고(最古) 천문대, 국보 제31호, 경주시 인왕동, 24시간 개방, 무료. 해질녘 야경 추천.
- 대릉원: 신라 왕릉 고분군(23기), 경주시 황남동, 09:00~22:00(하절기)/09:00~21:00(동절기), 성인 3,000원/어린이 1,000원. 천마총 내부 관람 가능.
- 동궁과월지: 신라 별궁과 연못, 경주시 원화로, 09:00~22:00, 성인 3,000원/어린이 1,000원. 경주 최고의 야경 명소.
- 불국사: 유네스코 세계문화유산, 경주시 불국로, 하절기 07:00~18:00/동절기 07:30~17:30, 성인 6,000원/어린이 4,000원. 석가탑·다보탑 등 국보 다수.
- 석굴암: 본존불 석굴 사원, 경주시 불국로, 하절기 06:30~18:00/동절기 07:00~17:30, 성인 6,000원/어린이 4,000원. 일출 명소.
- 월정교: 복원된 신라 다리, 경주시 교동, 24시간 개방, 무료. 야간 조명이 아름다움.
- 황리단길: 한옥 카페거리, 경주시 황남동, 상점마다 상이(대부분 10:00~22:00), 무료. 한복 대여·경주빵이 유명.

# 연락처 및 예약
- 일반 문의: 010-8402-8543 (문자 요망)
- 단체 문의: 010-5552-7971
- 이메일: gjtrip11@naver.com
- 견적/단체 문의는 홈페이지의 "견적 및 문의" 페이지(/quote)에서 양식을 작성하면 접수됩니다.

# 답변 원칙
- 한국어로, 짧고 친근하게 답변하세요(3~5문장 이내 권장).
- 여행 코스나 투어를 물어보면 위 정보를 바탕으로 추천하고, 자연스럽게 해당 투어나 견적문의 페이지를 안내하세요.
- 경주 여행과 무관한 질문(코딩, 다른 지역, 일반 상식 등)에는 정중히 "경주 여행 관련 질문에 답변드리는 도우미"라고 안내하고 답변을 거절하세요.
- 모르는 내용을 지어내지 말고, 확실하지 않으면 "정확한 정보는 전화(010-8402-8543)로 문의해주세요"라고 안내하세요.`;

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
  const apiKey = process.env.ANTHROPIC_API_KEY;
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
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [...history, { role: "user", content: message }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const reply = textBlock && textBlock.type === "text" ? textBlock.text : "죄송해요, 답변을 생성하지 못했어요.";

    return Response.json({ reply });
  } catch (err) {
    console.error("travel-chat error:", err);
    return Response.json({ error: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
