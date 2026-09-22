export class CommerceError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new CommerceError("입력 내용을 확인해 주세요.");
  return value as Record<string, unknown>;
}
export function textField(value: unknown, label: string, max = 100) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max)
    throw new CommerceError(`${label}을(를) 확인해 주세요.`);
  return value.trim();
}
export function integer(
  value: unknown,
  min: number,
  max: number,
  label: string,
) {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < min ||
    value > max
  )
    throw new CommerceError(`${label}을(를) 확인해 주세요.`);
  return value;
}
export function phoneField(value: unknown) {
  const phone = textField(value, "연락처", 20).replace(/[ -]/g, "");
  if (!/^01[016789]\d{7,8}$/.test(phone))
    throw new CommerceError("안내받으실 휴대전화번호를 확인해 주세요.");
  return phone;
}
export function uuidField(value: unknown) {
  const id = textField(value, "예약 정보", 36);
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id,
    )
  )
    throw new CommerceError("예약 정보가 올바르지 않습니다.");
  return id;
}
export function safeReturnPath(value: unknown, fallback = "/account") {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\r\n]/.test(value)
  )
    return fallback;
  return value;
}
export function bookingInput(body: unknown) {
  const b = record(body);
  const adultCount = integer(b.adultCount, 0, 20, "성인 인원");
  const childCount = integer(b.childCount, 0, 20, "어린이 인원");
  if (adultCount + childCount < 1 || adultCount + childCount > 20)
    throw new CommerceError("예약 인원은 1명부터 20명까지 가능합니다.");
  if (b.agreed !== true)
    throw new CommerceError("예약 안내와 취소 규정을 확인해 주세요.");
  return {
    sessionId: uuidField(b.sessionId),
    requestId: uuidField(b.requestId),
    adultCount,
    childCount,
    name: textField(b.name, "예약자명", 40),
    phone: phoneField(b.phone),
  };
}
export function sessionInput(body: unknown) {
  const b = record(body);
  const tourId = textField(b.tourId, "투어", 20);
  if (!["night", "museum", "bulguksa"].includes(tourId))
    throw new CommerceError("투어를 선택해 주세요.");
  const date = textField(b.date, "날짜", 10);
  const time = textField(b.time, "시간", 5);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)
  )
    throw new CommerceError("날짜와 시간을 확인해 주세요.");
  const startsAt = new Date(`${date}T${time}:00+09:00`);
  if (
    !Number.isFinite(startsAt.getTime()) ||
    new Date(startsAt.getTime() + 9 * 3600000).toISOString().slice(0, 10) !==
      date ||
    startsAt.getTime() <= Date.now()
  )
    throw new CommerceError("현재 이후의 실제 날짜를 선택해 주세요.");
  const capacity = integer(b.capacity, 1, 1000, "홈페이지 판매 정원");
  const minPeople = integer(b.minPeople, 1, 1000, "최소 출발 인원");
  const adultPrice = integer(b.adultPrice, 100, 1000000, "성인 요금");
  const childPrice = integer(b.childPrice, 100, 1000000, "어린이 요금");
  return { tourId, startsAt, capacity, minPeople, adultPrice, childPrice };
}
