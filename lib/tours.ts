export type TourId = "bulguksa" | "night" | "museum";
export interface Tour {
  id: TourId;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  adultPrice: number;
  childPrice: number | null;
  minPeople: number;
  maxPeople: number;
  meetingPoint: string;
  operatingHours: string;
  duration: string;
  walking: string;
  tags: string[];
  course: string[];
  highlights: { title: string; text: string }[];
  included: string[];
  notice: string[];
}
export const STORE_URL = "https://smartstore.naver.com/gjtrip";
export const TOURS: Record<TourId, Tour> = {
  museum: {
    id: "museum",
    name: "국립경주박물관 도슨트 투어",
    shortName: "박물관 도슨트",
    category: "박물관",
    tagline: "유물 앞에서 시작되는, 신라의 진짜 이야기",
    description:
      "성덕대왕신종부터 신라의 황금 유물까지. 해설사와 함께 보고, 질문하며 천년 전 사람들의 삶을 만납니다.",
    image: "/images/museum-exterior.jpg",
    adultPrice: 25000,
    childPrice: 22000,
    minPeople: 7,
    maxPeople: 15,
    meetingPoint: "국립경주박물관 정문 앞",
    operatingHours: "10:00 / 14:00",
    duration: "약 2시간",
    walking: "실내 중심 · 서서 관람",
    tags: ["아이와 함께", "실내 중심", "신라 역사 입문"],
    course: ["성덕대왕신종", "신라역사관", "신라미술관"],
    highlights: [
      {
        title: "이름을 외우는 대신, 이야기를 기억해요",
        text: "금관과 토기, 종에 담긴 이야기를 따라가면 교과서 속 신라가 한결 가까워집니다.",
      },
      {
        title: "질문할 수 있는 작은 그룹",
        text: "한 조 최대 15명으로 진행합니다. 전시실을 이동하며 궁금했던 내용을 해설사에게 물어보세요.",
      },
      {
        title: "경주 여행의 첫 순서로",
        text: "박물관에서 신라의 흐름을 먼저 이해하면 이후 불국사와 야경투어에서 만나는 장소들이 자연스럽게 연결됩니다.",
      },
    ],
    included: ["전문 문화해설사", "1인 1대 해설 수신기 대여"],
    notice: [
      "전시실 운영과 현장 상황에 따라 관람 순서가 달라질 수 있습니다.",
      "대부분 실내에서 진행하지만 약 2시간 동안 걷거나 서서 관람합니다.",
      "전시 관람에 집중하는 프로그램으로, 개별 사진 촬영 서비스는 제공하지 않습니다.",
      "어린이만 참여하려는 경우 보호자 동반 기준을 예약 전에 문의해 주세요.",
    ],
  },
  night: {
    id: "night",
    name: "청사초롱 야경투어 · 신라별빛야행",
    shortName: "청사초롱 야경투어",
    category: "야경",
    tagline: "불빛을 따라 걷다, 천년의 밤을 만나다",
    description:
      "청사초롱 하나 들고 신라의 밤길을 걸어요. 월성해자, 계림, 월정교와 첨성대에 얽힌 이야기가 경주의 밤을 채웁니다.",
    image: "/images/landmark-donggung-wolji.jpg",
    adultPrice: 16900,
    childPrice: null,
    minPeople: 7,
    maxPeople: 20,
    meetingPoint: "동궁과월지 입구 앞",
    operatingHours: "9–2월 18:30 / 3–8월 19:00",
    duration: "약 2시간",
    walking: "야외 도보 · 편한 신발",
    tags: ["청사초롱 대여", "가족·연인", "야외 도보"],
    course: [
      "동궁과월지 집결",
      "월성해자",
      "계림",
      "월정교",
      "첨성대",
      "동궁과월지",
    ],
    highlights: [
      {
        title: "내 손의 작은 불빛, 청사초롱",
        text: "청사초롱을 들고 해설사와 함께 걷는 밤. 눈앞의 풍경에 신라의 역사와 설화가 더해집니다.",
      },
      {
        title: "빛나는 풍경에도 이야기가 있어요",
        text: "계림의 숲과 월정교, 첨성대를 지나며 경주가 오래 간직해 온 이야기를 듣습니다.",
      },
      {
        title: "여행의 마지막을 여유롭게",
        text: "낮의 일정을 마친 뒤 가족, 연인, 친구와 함께 경주의 다른 표정을 만나보세요.",
      },
    ],
    included: ["전문 문화해설사", "1인 1대 해설 수신기 대여", "청사초롱 대여"],
    notice: [
      "9–2월은 18:20 집결, 18:30 시작입니다. 3–8월은 18:50 집결, 19:00 시작입니다.",
      "미성년자는 보호자와 함께 참여해 주세요. 야외에서 약 2시간 걷는 코스입니다.",
      "우천·기상특보 등으로 운영이 어려운 경우 별도 안내하며, 주최 측 취소 시 전액 환불합니다.",
      "행사와 현장 상황에 따라 동선·종료 지점이 조정될 수 있습니다. 입장권 포함 여부는 예약 상품에서 확인해 주세요.",
    ],
  },
  bulguksa: {
    id: "bulguksa",
    name: "불국사·석굴암 역사해설 투어",
    shortName: "불국사 역사해설",
    category: "불국사",
    tagline: "돌 하나, 기둥 하나에 담긴 신라의 마음",
    description:
      "다보탑과 석가탑은 왜 서로 다른 모습일까요? 불국사의 건축과 신라 불교예술을 해설사의 이야기로 풀어봅니다.",
    image: "/images/bulguksa-main.jpg",
    adultPrice: 24800,
    childPrice: 19800,
    minPeople: 7,
    maxPeople: 20,
    meetingPoint: "불국사 매표소 앞",
    operatingHours: "10:00 / 14:00",
    duration: "약 2시간",
    walking: "야외 중심 · 계단 있음",
    tags: ["세계유산", "가족 역사여행", "건축과 예술"],
    course: [
      "불국사 집결",
      "청운교·백운교",
      "대웅전",
      "다보탑·석가탑",
      "주요 전각",
      "석굴암 이야기",
    ],
    highlights: [
      {
        title: "익숙한 풍경을 새롭게 읽어요",
        text: "청운교·백운교와 두 탑에 담긴 의미를 알고 나면, 여러 번 와 본 불국사도 새롭게 보입니다.",
      },
      {
        title: "신라인이 꿈꾸었던 세계",
        text: "불국사의 공간과 건축을 따라가며 신라 사람들이 표현하려 했던 이상과 예술을 알아봅니다.",
      },
      {
        title: "석굴암을 만나기 전, 꼭 알아둘 이야기",
        text: "석굴암의 조각과 구조를 설명합니다. 석굴암 내부에서는 해설이 불가하며 자유관람으로 이루어집니다.",
      },
    ],
    included: ["전문 문화해설사", "1인 1대 해설 수신기 대여"],
    notice: [
      "석굴암 내부 해설은 진행하지 않습니다. 석굴암 방문·이동 방식과 포함 범위는 예약 옵션에서 확인해 주세요.",
      "계단과 경사가 있는 야외 코스입니다. 이동에 도움이 필요한 분은 예약 전 문의해 주세요.",
      "어린이만 참여하려는 경우 보호자 동반 기준을 예약 전에 문의해 주세요.",
      "사찰 행사와 현장 상황에 따라 해설 순서가 달라질 수 있습니다.",
    ],
  },
};
export const TOUR_LIST = [TOURS.museum, TOURS.night, TOURS.bulguksa];
export function getTour(id: string): Tour | undefined {
  return Object.hasOwn(TOURS, id) ? TOURS[id as TourId] : undefined;
}
export function calcAmount(tour: Tour, adults: number, children: number) {
  if (
    ![adults, children].every((n) => Number.isSafeInteger(n) && n >= 0) ||
    adults + children < 1 ||
    adults + children > tour.maxPeople
  )
    throw new Error("참가 인원을 확인해 주세요.");
  return (
    tour.adultPrice * adults + (tour.childPrice ?? tour.adultPrice) * children
  );
}
export function tourTimes(tour: Tour, date: string) {
  if (tour.id !== "night") return ["10:00", "14:00"];
  const month = Number(date.slice(5, 7));
  return [month >= 3 && month <= 8 ? "19:00" : "18:30"];
}
export function koreaToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function isFutureDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + "T00:00:00+09:00");
  return (
    !Number.isNaN(d.getTime()) &&
    koreaToday(d) === value &&
    value >= koreaToday()
  );
}
