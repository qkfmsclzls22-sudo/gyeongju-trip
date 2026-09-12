export const categories = ["축제·행사", "공연·전시", "체험·프로그램", "여행정보", "운영·교통"] as const;
export type NewsItem = {
  id: string; title: string; category: string; summary: string; location: string;
  dateKind: string; startDate: string | null; endDate: string | null; occurrenceDates: string[];
  schedule: string; price: string; sourceId: string; sourceUrl: string;
  checkedAt: string; reviewBy: string; status: string;
};
export type NewsSource = {
  id: string; name: string; kind: string; url: string | null;
  status: string; lastAttemptAt: string | null; lastSuccessAt: string | null; note: string;
};
export type NewsData = { version: number; updatedAt: string; sources: NewsSource[]; items: NewsItem[] };
export function koreaDate(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}
export function addDays(date: string, days: number) {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}
export function weekend(today: string): [string, string] {
  const day = new Date(`${today}T00:00:00Z`).getUTCDay();
  const start = day === 0 ? today : addDays(today, 6 - day);
  return [start, day === 0 ? today : addDays(start, 1)];
}
export function isVisible(item: NewsItem, today: string) {
  return item.status === "published" && item.reviewBy >= today && (!item.endDate || item.endDate >= today);
}
export function matchesDates(item: NewsItem, start: string, end: string) {
  if (item.dateKind === "occurrences") return item.occurrenceDates.some(date => date >= start && date <= end);
  if (item.dateKind !== "continuous" || !item.startDate || !item.endDate) return false;
  return item.startDate <= end && item.endDate >= start;
}
export function safeUrl(value: string | null) {
  if (!value) return false;
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; } catch { return false; }
}
export function shortDate(value: string) {
  return `${Number(value.slice(5, 7))}.${Number(value.slice(8, 10))}`;
}
