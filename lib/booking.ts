import { calcAmount, getTour, isFutureDate, tourTimes } from "./tours";
export function validateBooking(body: Record<string, unknown>) {
  const { tourId, date, time, adultCount, childCount } = body;
  if (
    typeof tourId !== "string" ||
    typeof date !== "string" ||
    typeof time !== "string"
  )
    throw new Error("여행 일정을 확인해 주세요.");
  const tour = getTour(tourId);
  if (
    !tour ||
    !isFutureDate(date) ||
    !tourTimes(tour, date).includes(time) ||
    new Date(date + "T" + time + ":00+09:00").getTime() <= Date.now()
  )
    throw new Error("여행 일정을 확인해 주세요.");
  if (
    typeof adultCount !== "number" ||
    typeof childCount !== "number" ||
    adultCount < 1
  )
    throw new Error("참가 인원을 확인해 주세요.");
  const amount = calcAmount(tour, adultCount, childCount);
  return { tour, date, time, adultCount, childCount, amount };
}
export function paymentMatches(
  payment: Record<string, unknown>,
  order: { id: string; amount: number; payment_key?: string | null },
  key: string,
) {
  return (
    payment.status === "DONE" &&
    payment.orderId === order.id &&
    payment.totalAmount === order.amount &&
    payment.paymentKey === key &&
    (!order.payment_key || order.payment_key === key)
  );
}
