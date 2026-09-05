export type TourId = "bulguksa" | "night" | "museum";

export interface Tour {
  id: TourId;
  name: string;
  adultPrice: number;
  /** null이면 연령 구분 없이 adultPrice로 통일 (예: 야경투어) */
  childPrice: number | null;
  minPeople: number;
  meetingPoint: string;
  operatingHours: string;
}

export const TOURS: Record<TourId, Tour> = {
  bulguksa: {
    id: "bulguksa",
    name: "불국사·석굴암 문화해설사 역사투어",
    adultPrice: 24800,
    childPrice: 19800,
    minPeople: 7,
    meetingPoint: "불국사 매표소 앞",
    operatingHours: "오전 10:00 / 오후 14:00",
  },
  night: {
    id: "night",
    name: "경주 야경투어 청사초롱 신라별빛야행",
    adultPrice: 16900,
    childPrice: null,
    minPeople: 7,
    meetingPoint: "동궁과월지 입구 앞",
    operatingHours: "저녁 19:00",
  },
  museum: {
    id: "museum",
    name: "국립경주박물관 역사 도슨트 프리미엄 투어",
    adultPrice: 25000,
    childPrice: 22000,
    minPeople: 7,
    meetingPoint: "국립경주박물관 정문 앞",
    operatingHours: "오전 10:00 / 오후 14:00",
  },
};

export function getTour(id: string): Tour | undefined {
  return TOURS[id as TourId];
}

export function calcAmount(tour: Tour, adultCount: number, childCount: number): number {
  const childUnitPrice = tour.childPrice ?? tour.adultPrice;
  return tour.adultPrice * adultCount + childUnitPrice * childCount;
}
