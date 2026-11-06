import { calcAmount, TOURS, type TourId } from "./tours";
import { COMPANIONS, TOUR_STORIES } from "./tour-editorial";

export const NOTE_KEY = "gjtrip-travel-note-v2";
export const LEGACY_NOTE_KEY = "gjtrip-travel-note-v1";
export type TravelNote = { saved: TourId[]; date: string; companion: string; adults: number; children: number };
export const EMPTY_NOTE: TravelNote = { saved: [], date: "", companion: "", adults: 1, children: 0 };

export function parseTravelNote(value: unknown): TravelNote {
  const source = Array.isArray(value) ? { saved: value } : value && typeof value === "object" ? value as Record<string, unknown> : {};
  const saved = Array.isArray(source.saved) ? [...new Set(source.saved.filter((id): id is TourId => typeof id === "string" && Object.hasOwn(TOURS, id)))] : [];
  const adults = typeof source.adults === "number" && Number.isInteger(source.adults) && source.adults >= 0 && source.adults <= 20 ? source.adults : 1;
  const children = typeof source.children === "number" && Number.isInteger(source.children) && source.children >= 0 && source.children <= 20 ? source.children : 0;
  const validParty = adults + children >= 1 && adults + children <= 20;
  const date = typeof source.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(source.date) && !Number.isNaN(Date.parse(source.date)) && new Date(source.date).toISOString().slice(0, 10) === source.date ? source.date : "";
  return { saved, date, companion: COMPANIONS.some(item => item.value === source.companion) ? String(source.companion) : "", adults: validParty ? adults : 1, children: validParty ? children : 0 };
}

export function formatTravelNote(note: TravelNote) {
  const companion = COMPANIONS.find(item => item.value === note.companion)?.label;
  return ["나의 경주 여행노트", note.date ? `여행 예정일: ${note.date}` : "여행 날짜 미정", companion ? `동행: ${companion}` : "", `예상 인원: 성인 ${note.adults}명 · 어린이 ${note.children}명`, ...note.saved.map(id => {
    const story = TOUR_STORIES.find(item => item.id === id)!;
    const tour = TOURS[id];
    return `${story.name}\n${story.route.join(" → ")}\n운영: ${tour.operatingHours}\n집결: ${tour.meetingPoint}\n예상 투어 요금: ${calcAmount(tour, note.adults, note.children).toLocaleString("ko-KR")}원\n최소 ${tour.minPeople}명 모집 시 출발\nhttps://www.gjtrip.co.kr/tours/${id}`;
  }), "※ 관심 투어 목록이며 예약 확정이나 하루 일정표가 아닙니다. 어린이 기준·포함 사항·실제 운영은 각 상품에서 확인해주세요."].filter(Boolean).join("\n\n");
}
