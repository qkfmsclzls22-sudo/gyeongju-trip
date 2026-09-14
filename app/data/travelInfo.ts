// 투어 가격·운영시간의 기준은 lib/tours.ts입니다.
import { TOURS as TOUR_CATALOG } from "@/lib/tours";

export type TourInfo = {
  id: string;
  name: string;
  duration: string;
  times: string[];
  priceAdult: number;
  priceChild: number;
  sameAgePrice?: boolean; // 성인/어린이 가격이 같은 경우(야경투어)
  includes: string;
  slug: string; // /tours/{slug}
};

export const TOURS: TourInfo[] = [
  {
    id: "museum",
    name: "국립경주박물관 역사 도슨트 프리미엄 투어",
    duration: "약 2시간",
    times: ["오전 10:00", "오후 14:00"],
    priceAdult: TOUR_CATALOG.museum.adultPrice,
    priceChild: TOUR_CATALOG.museum.childPrice ?? TOUR_CATALOG.museum.adultPrice,
    includes: "성덕대왕신종, 신라역사관, 신라미술관 문화해설사 안내 + 블루투스 송수신기 무료대여",
    slug: "museum",
  },
  {
    id: "night",
    name: "경주 야경투어 청사초롱 신라별빛야행",
    duration: "약 2시간",
    times: [TOUR_CATALOG.night.operatingHours],
    priceAdult: TOUR_CATALOG.night.adultPrice,
    priceChild: TOUR_CATALOG.night.childPrice ?? TOUR_CATALOG.night.adultPrice,
    sameAgePrice: true,
    includes: "청사초롱을 들고 동궁과월지·첨성대·월정교를 도보로 둘러보는 야간 투어",
    slug: "night",
  },
  {
    id: "bulguksa",
    name: "불국사·석굴암 문화해설사 역사투어",
    duration: "약 2시간",
    times: ["오전 10:00", "오후 14:00"],
    priceAdult: TOUR_CATALOG.bulguksa.adultPrice,
    priceChild: TOUR_CATALOG.bulguksa.childPrice ?? TOUR_CATALOG.bulguksa.adultPrice,
    includes: "불국사와 석굴암을 문화해설사와 함께 탐방(석굴암 포함)",
    slug: "bulguksa",
  },
];

export type LandmarkInfo = {
  name: string;
  area: "도심권" | "외곽권";
  hours: string;
  fee: string;
  note?: string;
  slug: string; // /landmarks/{slug}
};

export const LANDMARKS: LandmarkInfo[] = [
  { name: "첨성대", area: "도심권", hours: "24시간 개방", fee: "무료", note: "해질녘 야경 명소", slug: "cheomseongdae" },
  { name: "대릉원", area: "도심권", hours: "09:00~22:00(하절기) / 09:00~21:00(동절기)", fee: "성인 3,000원 / 어린이 1,000원", note: "천마총 내부 관람 가능", slug: "daereungwon" },
  { name: "동궁과월지", area: "도심권", hours: "09:00~22:00", fee: "성인 3,000원 / 어린이 1,000원", note: "경주 최고의 야경 명소", slug: "donggung-wolji" },
  { name: "불국사", area: "외곽권", hours: "하절기 07:00~18:00 / 동절기 07:30~17:30", fee: "성인 6,000원 / 어린이 4,000원", slug: "bulguksa" },
  { name: "석굴암", area: "외곽권", hours: "하절기 06:30~18:00 / 동절기 07:00~17:30", fee: "성인 6,000원 / 어린이 4,000원", note: "일출 명소, 계단 많음", slug: "seokguram" },
  { name: "월정교", area: "도심권", hours: "24시간 개방", fee: "무료", note: "야간 조명이 아름다움", slug: "woljeonggyo" },
  { name: "황리단길", area: "도심권", hours: "상점마다 상이(대부분 10:00~22:00)", fee: "무료(가게 이용료 별도)", note: "한옥 카페거리, 한복 대여", slug: "hwangnidan" },
];

export const CONTACT = {
  phone: "010-8402-8543",
  phoneNote: "일반 문의, 문자 요망",
  groupPhone: "010-5552-7971",
  groupPhoneNote: "단체 문의",
  email: "gjtrip11@naver.com",
  quotePath: "/quote",
};
