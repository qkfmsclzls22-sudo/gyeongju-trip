"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Tour } from "@/lib/tours";
import { formatTourDate, departureLabels } from "@/lib/commerce/display";
type Slot = {
  id: string;
  starts_at: string;
  adult_price: number;
  child_price: number;
  remaining: number;
  min_people: number;
  status: string;
};
export default function CheckoutForm({
  tour,
  user,
  enabled,
  testMode,
}: {
  tour: Tour;
  user: { id: string; name: string } | null;
  enabled: boolean;
  testMode: boolean;
}) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotId, setSlotId] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(enabled);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const request = useRef<{ key: string; id: string } | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let active = true;
    fetch(`/api/tour-sessions?tourId=${tour.id}`, { cache: "no-store" })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.message);
        if (active) setSlots(d.sessions);
      })
      .catch((e) => {
        if (active) setError(e.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [enabled, tour.id]);
  const slot = slots.find((s) => s.id === slotId);
  const amount =
    adults * (slot?.adult_price ?? tour.adultPrice) +
    children * (slot?.child_price ?? tour.childPrice ?? tour.adultPrice);
  const count = adults + children;
  async function pay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!slot || !user || busy) return;
    setBusy(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const input = {
      sessionId: slot.id,
      adultCount: adults,
      childCount: children,
      name: data.get("name"),
      phone: data.get("phone"),
      agreed: data.get("agreed") === "on",
    };
    const key = JSON.stringify(input);
    if (request.current?.key !== key)
      request.current = { key, id: crypto.randomUUID() };
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, requestId: request.current.id }),
      });
      const order = await res.json();
      if (!res.ok) {
        if (res.status === 409) request.current = null;
        throw new Error(order.message);
      }
      const { loadTossPayments } = await import(
        "@tosspayments/tosspayments-sdk"
      );
      const toss = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!,
      );
      await toss.payment({ customerKey: user.id }).requestPayment({
        method: "CARD",
        amount: { currency: "KRW", value: order.amount },
        orderId: order.id,
        orderName: tour.name,
        successUrl: `${window.location.origin}/payments/success`,
        failUrl: `${window.location.origin}/payments/fail?tourId=${tour.id}`,
        customerName: String(input.name),
        card: { useEscrow: false, flowMode: "DEFAULT" },
      });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "결제창을 열지 못했습니다. 다시 시도해 주세요.",
      );
    } finally {
      setBusy(false);
    }
  }
  const image = {
    museum: "/images/tour-museum-field.webp",
    night: "/images/tour-night-field.webp",
    bulguksa: "/images/tour-bulguksa-field.webp",
  }[tour.id];
  return (
    <div className="columns">
      <form id="booking-form" className="stack" onSubmit={pay}>
        {!enabled && (
          <p className="notice">
            홈페이지 직접 결제를 준비하고 있습니다. 현재 예약은{" "}
            <a
              href="https://smartstore.naver.com/gjtrip"
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              네이버스토어
            </a>
            를 이용해 주세요.
          </p>
        )}
        {enabled && testMode && (
          <p className="notice">
            테스트 결제 화면입니다. 실제 예약과 금액 청구가 발생하지 않습니다.
          </p>
        )}
        <section className="panel stack">
          <h2>01. 날짜와 인원</h2>
          <label>
            참가 일시
            <select
              value={slotId}
              onChange={(e) => setSlotId(e.target.value)}
              disabled={!enabled || loading || busy}
              required
            >
              <option value="">
                {loading
                  ? "회차를 불러오는 중…"
                  : slots.length
                    ? "날짜와 시간을 선택하세요"
                    : "현재 온라인 예약 가능한 회차가 없습니다"}
              </option>
              {slots.map((s) => (
                <option key={s.id} value={s.id} disabled={s.remaining < 1}>
                  {formatTourDate(s.starts_at)} · 잔여 {s.remaining}명 ·{" "}
                  {departureLabels[s.status]}
                </option>
              ))}
            </select>
          </label>
          <div className="field-pair">
            <label>
              성인 (만 19세 이상)
              <input
                type="number"
                min={0}
                max={20}
                value={adults}
                disabled={busy}
                onChange={(e) => setAdults(Number(e.target.value))}
                required
              />
            </label>
            <label>
              어린이·청소년
              <input
                type="number"
                min={0}
                max={20}
                value={children}
                disabled={busy}
                onChange={(e) => setChildren(Number(e.target.value))}
                required
              />
            </label>
          </div>
          <p className="muted">
            36개월 이상부터 1인 1티켓이 필요합니다. 36개월 미만 동반 아동은 예약
            후 알려주세요. 초등학교 4학년 미만은 보호자 동반이 필요합니다.
          </p>
          {slot && (
            <p className="muted">
              최소 출발 인원 {slot.min_people}명 ·{" "}
              {departureLabels[slot.status]}
            </p>
          )}
        </section>
        <section className="panel stack">
          <h2>02. 예약자 정보</h2>
          {!user && (
            <p className="notice">
              로그인 후 예약과 결제를 진행하실 수 있습니다.{" "}
              <a
                className="text-link"
                href={`/login?next=/checkout/${tour.id}`}
              >
                로그인·회원가입
              </a>
            </p>
          )}
          <label>
            예약자명
            <input
              name="name"
              autoComplete="name"
              maxLength={40}
              defaultValue={user?.name || ""}
              required
              disabled={!user || busy}
            />
          </label>
          <label>
            휴대전화번호
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={20}
              placeholder="010-0000-0000"
              required
              disabled={!user || busy}
            />
          </label>
          <p className="muted">
            예약 및 현장 안내를 받을 연락처를 입력해 주세요.
          </p>
        </section>
        <section className="panel stack">
          <h2>03. 결제 안내</h2>
          <p>
            신용·체크카드로 결제합니다. 결제는 토스페이먼츠의 보안 결제창에서
            진행됩니다.
          </p>
          <label className="check">
            <input name="agreed" type="checkbox" required disabled={busy} />
            <span>
              [필수] 참가 일시·인원, 보호자 동반 기준 및{" "}
              <a href="/terms#refund" target="_blank" className="text-link">
                취소·환불 규정
              </a>
              을 확인했습니다. 최소 인원 미달 등으로 투어가 취소되면 전액
              환불됩니다.
            </span>
          </label>
        </section>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
      </form>
      <aside className="panel order-card stack">
        <Image
          src={image}
          alt={tour.name}
          width={600}
          height={400}
          className="w-full h-auto"
        />
        <h2>{tour.name}</h2>
        <div className="row">
          <span>성인 {adults}명</span>
          <span>
            {(adults * (slot?.adult_price ?? tour.adultPrice)).toLocaleString()}
            원
          </span>
        </div>
        <div className="row">
          <span>어린이·청소년 {children}명</span>
          <span>
            {(
              children *
              (slot?.child_price ?? tour.childPrice ?? tour.adultPrice)
            ).toLocaleString()}
            원
          </span>
        </div>
        <div className="row rule">
          <strong>총 결제금액</strong>
          <span className="amount">{amount.toLocaleString()}원</span>
        </div>
        {slot && <p>{formatTourDate(slot.starts_at)}</p>}
        {user ? (
          <button
            form="booking-form"
            className="button full"
            disabled={
              !enabled ||
              !slot ||
              busy ||
              count < 1 ||
              count > 20 ||
              (slot && count > slot.remaining)
            }
          >
            {busy
              ? "결제창으로 이동 중…"
              : `${amount.toLocaleString()}원 결제하기`}
          </button>
        ) : (
          <a className="button full" href={`/login?next=/checkout/${tour.id}`}>
            로그인하고 예약하기
          </a>
        )}
        <p className="muted">
          결제 완료와 출발 확정은 구분됩니다. 내 예약에서 출발 상태를 확인해
          주세요.
        </p>
        <a className="text-link" href="tel:01084028543">
          예약 문의 010-8402-8543
        </a>
      </aside>
    </div>
  );
}
