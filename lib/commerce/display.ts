export const bookingLabels: Record<string, string> = {
  pending: "결제 대기",
  confirming: "결제 확인 중",
  paid: "결제 완료",
  cancel_requested: "취소 접수",
  refund_pending: "환불 처리 중",
  refunded: "환불 완료",
  cancelled: "결제 취소",
};
export const departureLabels: Record<string, string> = {
  open: "모집 중 · 출발 미확정",
  closed: "모집 마감 · 출발 미확정",
  confirmed: "출발 확정",
  cancelled: "운영 취소",
};
export function formatTourDate(value: string | Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}
