import { randomUUID } from "node:crypto";
import type { QueryResultRow } from "pg";
import { CommerceError, type bookingInput } from "./validation";

export const CONSENT_VERSION = "2026-09-22";
export interface SqlClient {
  query<T extends QueryResultRow = QueryResultRow>(
    sql: string,
    values?: unknown[],
  ): Promise<{ rows: T[] }>;
}
export interface Booking extends QueryResultRow {
  id: string;
  member_id: string;
  session_id: string;
  adult_count: number;
  child_count: number;
  amount: number;
  name: string;
  phone: string;
  status: string;
  payment_key: string | null;
  expires_at: Date;
  refund_amount: number | null;
  cancel_reason: string | null;
}
type BookingInput = ReturnType<typeof bookingInput>;

export async function reserve(
  client: SqlClient,
  memberId: string,
  b: BookingInput,
) {
  const {
    rows: [member],
  } = await client.query("SELECT * FROM gj_members WHERE id=$1 FOR UPDATE", [
    memberId,
  ]);
  if (!member?.consent_at)
    throw new CommerceError("회원가입 동의를 먼저 완료해 주세요.", 403);
  const {
    rows: [previous],
  } = await client.query<Booking>(
    "SELECT * FROM gj_bookings WHERE member_id=$1 AND request_id=$2",
    [memberId, b.requestId],
  );
  if (previous) {
    if (
      previous.session_id !== b.sessionId ||
      previous.adult_count !== b.adultCount ||
      previous.child_count !== b.childCount ||
      previous.name !== b.name ||
      previous.phone !== b.phone
    )
      throw new CommerceError(
        "예약 내용이 변경되었습니다. 다시 시도해 주세요.",
        409,
      );
    if (
      previous.status !== "pending" ||
      new Date(previous.expires_at).getTime() <= Date.now()
    )
      throw new CommerceError(
        "이 주문의 결제 대기 시간이 종료되었습니다. 새로 예약해 주세요.",
        409,
      );
    return previous;
  }
  const {
    rows: [pending],
  } = await client.query(
    "SELECT count(*)::int AS count FROM gj_bookings WHERE member_id=$1 AND (status='confirming' OR (status='pending' AND expires_at>now()))",
    [memberId],
  );
  if (pending.count >= 3)
    throw new CommerceError(
      "진행 중인 결제를 완료하거나 취소한 후 다시 예약해 주세요.",
      429,
    );
  const {
    rows: [slot],
  } = await client.query("SELECT * FROM gj_sessions WHERE id=$1 FOR UPDATE", [
    b.sessionId,
  ]);
  if (
    !slot ||
    !["open", "confirmed"].includes(slot.status) ||
    new Date(slot.starts_at).getTime() <= Date.now()
  )
    throw new CommerceError("예약할 수 없는 회차입니다.", 409);
  const {
    rows: [count],
  } = await client.query(
    `SELECT coalesce(sum(adult_count+child_count),0)::int AS used FROM gj_bookings
    WHERE session_id=$1 AND (status IN ('confirming','paid','cancel_requested','refund_pending') OR (status='pending' AND expires_at>now()))`,
    [b.sessionId],
  );
  if (count.used + b.adultCount + b.childCount > slot.capacity)
    throw new CommerceError(
      "잔여 인원이 부족합니다. 인원 또는 회차를 다시 선택해 주세요.",
      409,
    );
  const amount =
    b.adultCount * slot.adult_price + b.childCount * slot.child_price;
  const {
    rows: [booking],
  } = await client.query<Booking>(
    `INSERT INTO gj_bookings
    (id,member_id,session_id,request_id,adult_count,child_count,amount,name,phone,consent_version)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
    [
      randomUUID(),
      memberId,
      b.sessionId,
      b.requestId,
      b.adultCount,
      b.childCount,
      amount,
      b.name,
      b.phone,
      CONSENT_VERSION,
    ],
  );
  return booking;
}

export async function lockBooking(client: SqlClient, id: string) {
  const {
    rows: [initial],
  } = await client.query<Booking>("SELECT * FROM gj_bookings WHERE id=$1", [
    id,
  ]);
  if (!initial) throw new CommerceError("예약을 찾을 수 없습니다.", 404);
  const {
    rows: [slot],
  } = await client.query("SELECT * FROM gj_sessions WHERE id=$1 FOR UPDATE", [
    initial.session_id,
  ]);
  const {
    rows: [booking],
  } = await client.query<Booking>(
    "SELECT * FROM gj_bookings WHERE id=$1 FOR UPDATE",
    [id],
  );
  return { booking, slot };
}

export async function beginConfirmation(
  client: SqlClient,
  id: string,
  memberId: string,
  paymentKey: string,
  amount: number,
) {
  const { booking, slot } = await lockBooking(client, id);
  if (booking.member_id !== memberId)
    throw new CommerceError("예약을 찾을 수 없습니다.", 404);
  if (booking.amount !== amount)
    throw new CommerceError("결제 금액이 주문 금액과 다릅니다.");
  if (booking.payment_key && booking.payment_key !== paymentKey)
    throw new CommerceError("결제 정보가 주문과 다릅니다.", 409);
  if (
    ["paid", "cancel_requested", "refund_pending", "refunded"].includes(
      booking.status,
    )
  )
    return booking;
  if (!["pending", "confirming"].includes(booking.status))
    throw new CommerceError("종료된 주문입니다.", 409);
  if (booking.status === "pending") {
    if (
      new Date(booking.expires_at).getTime() <= Date.now() ||
      new Date(slot.starts_at).getTime() <= Date.now() ||
      slot.status === "cancelled"
    )
      throw new CommerceError(
        "결제 가능 시간이 종료되었습니다. 새로 예약해 주세요.",
        409,
      );
    const {
      rows: [updated],
    } = await client.query<Booking>(
      "UPDATE gj_bookings SET status='confirming',payment_key=$2,updated_at=now() WHERE id=$1 RETURNING *",
      [id, paymentKey],
    );
    return updated;
  }
  return booking;
}

export interface TossPayment {
  paymentKey: string;
  orderId: string;
  totalAmount: number;
  balanceAmount: number;
  currency: string;
  status: string;
  approvedAt?: string;
  method?: string;
  type?: string;
}
export function verifyPayment(payment: TossPayment, booking: Booking) {
  if (
    payment.paymentKey !== booking.payment_key ||
    payment.orderId !== booking.id ||
    payment.totalAmount !== booking.amount ||
    !Number.isSafeInteger(payment.balanceAmount) ||
    payment.balanceAmount < 0 ||
    payment.balanceAmount > booking.amount ||
    payment.currency !== "KRW" ||
    (payment.type && payment.type !== "NORMAL")
  )
    throw new CommerceError(
      "결제사 정보와 예약 내역이 일치하지 않습니다. 고객센터로 문의해 주세요.",
      409,
    );
}
export async function applyPayment(client: SqlClient, payment: TossPayment) {
  const { booking, slot } = await lockBooking(client, payment.orderId);
  verifyPayment(payment, booking);
  if (payment.status === "DONE") {
    if (["pending", "confirming"].includes(booking.status)) {
      if (booking.status !== "confirming")
        throw new CommerceError("결제 검증이 시작되지 않은 주문입니다.", 409);
      const status = slot.status === "cancelled" ? "cancel_requested" : "paid";
      await client.query(
        "UPDATE gj_bookings SET status=$2,paid_at=$3,updated_at=now() WHERE id=$1",
        [booking.id, status, payment.approvedAt || new Date()],
      );
      await client.query(
        "INSERT INTO gj_booking_events(booking_id,event) VALUES($1,'payment_confirmed')",
        [booking.id],
      );
      booking.status = status;
    }
  } else if (["CANCELED", "PARTIAL_CANCELED"].includes(payment.status)) {
    if (
      payment.status === "CANCELED" ||
      (booking.status === "refund_pending" &&
        booking.refund_amount === booking.amount - payment.balanceAmount)
    ) {
      await client.query(
        "UPDATE gj_bookings SET status='refunded',refund_amount=$2,updated_at=now() WHERE id=$1",
        [booking.id, booking.amount - payment.balanceAmount],
      );
      booking.status = "refunded";
    }
  } else if (
    ["ABORTED", "EXPIRED"].includes(payment.status) &&
    booking.status === "confirming"
  ) {
    await client.query(
      "UPDATE gj_bookings SET status='cancelled',updated_at=now() WHERE id=$1",
      [booking.id],
    );
    booking.status = "cancelled";
  }
  return booking;
}
