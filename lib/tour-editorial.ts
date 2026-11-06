import { type TourId } from "./tours";

// Homepage presentation facts checked against the existing product detail pages.
// Prices, meeting points and operation times are always read from TOURS.
export const TOUR_STORIES = [
  {
    id: "museum", shortName: "박물관", name: "국립경주박물관 도슨트",
    title: "유물 앞에서,\n신라가 말을 걸다.",
    mood: "실내 중심 · 낮", photo: "gallery-museum-space.webp",
    alt: "따뜻한 조명 아래 신라의 유물이 전시된 국립경주박물관 내부",
    caption: "국립경주박물관 · 경주트립 현장 사진",
    description: "그냥 지나쳤을 작은 무늬 하나까지. 해설사와 유물을 들여다보며 신라 사람들의 생활을 만납니다.",
    route: ["성덕대왕신종", "신라역사관", "신라미술관", "월지관"],
    routeNote: "월지관은 자유관람입니다.",
    family: "초등 고학년 이상에게 권장해요. 초4 미만은 보호자 동반이 필요합니다.",
    companion: "유물 속 이야기를 함께 나누고 싶은 동행에게. 실내 중심으로 둘러봅니다.",
    solo: "혼자 신청해도 함께 해설을 듣는 투어예요. 유물의 세부를 차분히 살펴보세요.",
    poster: "product-smartstore-museum.webp",
  },
  {
    id: "bulguksa", shortName: "불국사·석굴암", name: "불국사·석굴암 역사투어",
    title: "돌에 새긴 시간,\n숲길에서 읽다.",
    mood: "야외 · 계단 · 낮", photo: "gallery-bulguksa-autumn.webp",
    alt: "붉고 노란 가을 단풍 사이로 보이는 불국사의 돌계단과 건축",
    caption: "가을의 불국사 · 경주트립 현장 사진",
    description: "청운교와 백운교를 지나, 다보탑과 석가탑에 담긴 뜻을 읽습니다. 불국사와 석굴암을 이야기로 잇는 시간.",
    route: ["청운교·백운교", "대웅전", "다보탑·석가탑", "석굴암"],
    routeNote: "불국사와 석굴암을 포함하는 코스입니다.",
    family: "야외 이동과 계단이 있어요. 초등 저학년 이하 어린이는 참여 전 상품 안내를 살펴주세요.",
    companion: "건축과 산책을 함께 즐기는 동행에게. 야외 이동과 계단이 있는 코스예요.",
    solo: "혼자 신청해도 함께 해설을 듣는 투어예요. 건축에 담긴 뜻을 따라 걸어보세요.",
    poster: "product-smartstore-bulguksa.webp",
  },
  {
    id: "night", shortName: "별빛야행", name: "청사초롱 신라별빛야행",
    title: "작은 등불 하나,\n경주의 다른 얼굴.",
    mood: "야외 도보 · 밤", photo: "gallery-bridge-night.webp",
    alt: "푸른 밤하늘 아래 조명을 밝힌 월정교와 물 위에 비친 다리",
    caption: "불을 밝힌 월정교 · 경주트립 현장 사진",
    description: "해가 지면 청사초롱을 켭니다. 동궁과월지에서 첨성대, 월정교까지. 밤의 풍경에 신라의 이야기가 더해집니다.",
    route: ["동궁과월지", "첨성대", "월정교"],
    routeNote: "18:20 동궁과월지 입구 앞에서 만나요.",
    family: "전 연령 참여 가능하며 성인·어린이 요금이 같아요. 저녁 야외 도보 코스인 점을 고려해주세요.",
    companion: "낮의 여행 뒤, 함께 밤 풍경을 보고 싶은 동행에게. 청사초롱을 들고 걸어요.",
    solo: "혼자 신청해도 함께 걷는 투어예요. 청사초롱을 들고 경주의 야경을 만나보세요.",
    poster: "product-smartstore-night.webp",
  },
] satisfies { id: TourId; shortName: string; name: string; title: string; mood: string; photo: string; alt: string; caption: string; description: string; route: string[]; routeNote: string; family: string; companion: string; solo: string; poster: string }[];

export const COMPANIONS = [
  { value: "family", label: "아이와 함께" }, { value: "couple", label: "연인·친구와" },
  { value: "solo", label: "혼자" }, { value: "group", label: "학교·기업 단체" },
] as const;
