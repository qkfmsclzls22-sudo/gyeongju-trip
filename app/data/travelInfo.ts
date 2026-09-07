import { TOUR_LIST } from "@/lib/tours";
import { LANDMARK_DATA } from "@/lib/landmarks";
export const TOURS = TOUR_LIST.map((t) => ({
  id: t.id,
  name: t.name,
  duration: t.duration,
  times: [t.operatingHours],
  priceAdult: t.adultPrice,
  priceChild: t.childPrice ?? t.adultPrice,
  sameAgePrice: t.childPrice === null,
  includes:
    t.included.join(", ") +
    " / " +
    t.course.join(" → ") +
    ". " +
    t.notice.join(" "),
  slug: t.id,
}));
export const LANDMARKS = Object.entries(LANDMARK_DATA).map(([slug, l]) => ({
  name: l.name,
  area: l.area === "도심권" ? "도심권" : "외곽권",
  hours: "방문 전 공식 운영 안내 확인",
  fee: l.fee,
  note: l.tip,
  slug,
}));
export const CONTACT = {
  phone: "010-8402-8543",
  phoneNote: "일반 문의, 문자 요망",
  groupPhone: "010-5552-7971",
  groupPhoneNote: "단체 문의",
  email: "gjtrip11@naver.com",
  quotePath: "/quote",
};
