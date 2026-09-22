"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TOURS } from "@/lib/tours";
async function send(url: string, body: unknown, method = "POST") {
  const r = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.message);
}
export function SessionForm() {
  const [tourId, setTourId] = useState<keyof typeof TOURS>("museum");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const tour = TOURS[tourId];
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const d = new FormData(f);
    setBusy(true);
    setError("");
    try {
      await send("/api/admin/sessions", {
        tourId,
        date: d.get("date"),
        time: d.get("time"),
        capacity: Number(d.get("capacity")),
        minPeople: Number(d.get("minPeople")),
        adultPrice: Number(d.get("adultPrice")),
        childPrice: Number(d.get("childPrice")),
      });
      f.reset();
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="panel stack">
      <h2>판매 회차 등록</h2>
      <label>
        투어
        <select
          value={tourId}
          onChange={(e) => setTourId(e.target.value as keyof typeof TOURS)}
        >
          {Object.values(TOURS).map((t) => (
            <option value={t.id} key={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <div className="field-pair">
        <label>
          날짜 (한국시간)
          <input name="date" type="date" required />
        </label>
        <label>
          시작 시간
          <input name="time" type="time" required />
        </label>
      </div>
      <div className="field-pair">
        <label>
          홈페이지 판매 정원
          <input
            key={`${tourId}-capacity`}
            name="capacity"
            type="number"
            min={1}
            max={1000}
            defaultValue={tourId === "museum" ? 15 : 20}
            required
          />
        </label>
        <label>
          최소 출발 인원
          <input
            key={`${tourId}-min`}
            name="minPeople"
            type="number"
            min={1}
            max={1000}
            defaultValue={tour.minPeople}
            required
          />
        </label>
      </div>
      <div className="field-pair">
        <label>
          성인 요금 (원)
          <input
            key={`${tourId}-adult`}
            name="adultPrice"
            type="number"
            min={100}
            max={1000000}
            defaultValue={tour.adultPrice}
            required
          />
        </label>
        <label>
          어린이 요금 (원)
          <input
            key={`${tourId}-child`}
            name="childPrice"
            type="number"
            min={100}
            max={1000000}
            defaultValue={tour.childPrice ?? tour.adultPrice}
            required
          />
        </label>
      </div>
      <p className="notice">
        네이버·쿠팡 예약 수량은 자동 차감되지 않습니다. 홈페이지에 배정한 잔여
        좌석만 등록하세요. 최소 인원은 운영 기준에 맞게 설정하고, 출발 확정은
        별도로 처리하세요.
      </p>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <button className="button" disabled={busy}>
        회차 등록
      </button>
    </form>
  );
}
export function SessionStatus({ id, status }: { id: string; status: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  async function change(next: string) {
    if (
      next === "cancelled" &&
      !window.confirm(
        "회차 운영을 취소합니까? 결제 완료 예약은 전액 환불 대상이 되며, 각 주문에서 환불을 실행해야 합니다.",
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      await send("/api/admin/sessions", { id, status: next }, "PATCH");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="stack">
      <div className="actions">
        {status !== "cancelled" &&
          [
            ["confirmed", "출발 확정"],
            ["closed", "모집 마감"],
            ["open", "모집 재개"],
            ["cancelled", "운영 취소"],
          ]
            .filter(([s]) => s !== status)
            .map(([s, label]) => (
              <button
                key={s}
                className="button secondary compact"
                disabled={busy}
                onClick={() => change(s)}
              >
                {label}
              </button>
            ))}
      </div>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
export function RefundControl({
  id,
  amount,
  status,
  refundAmount,
  reason,
}: {
  id: string;
  amount: number;
  status: string;
  refundAmount: number | null;
  reason: string | null;
}) {
  const [open, setOpen] = useState(status === "refund_pending");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  async function reconcile() {
    setBusy(true);
    setError("");
    try {
      await send("/api/admin/bookings", { id, action: "reconcile" });
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "확인하지 못했습니다.");
    } finally {
      setBusy(false);
    }
  }
  async function refund(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const value = Number(d.get("amount"));
    if (
      !window.confirm(
        `${value.toLocaleString()}원을 환불하고 이 예약을 취소합니까?`,
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      await send("/api/admin/bookings", {
        id,
        action: "refund",
        amount: value,
        reason: d.get("reason"),
      });
      setOpen(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "환불 결과를 확인해 주세요.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="stack">
      <div className="actions">
        <button
          className="button secondary compact"
          onClick={reconcile}
          disabled={busy}
        >
          결제 결과 재확인
        </button>
        {["paid", "cancel_requested", "refund_pending"].includes(status) && (
          <button
            className="button secondary compact"
            onClick={() => setOpen(!open)}
            disabled={busy}
          >
            환불 처리
          </button>
        )}
      </div>
      {open && (
        <form className="stack" onSubmit={refund}>
          <label>
            환불 금액 (원)
            <input
              name="amount"
              type="number"
              min={0}
              max={amount}
              defaultValue={refundAmount ?? amount}
              readOnly={status === "refund_pending"}
              required
            />
          </label>
          <label>
            환불 사유
            <input
              name="reason"
              maxLength={200}
              defaultValue={reason || "고객 요청에 따른 예약 취소"}
              readOnly={status === "refund_pending"}
              required
            />
          </label>
          <p className="muted">
            환불 규정을 확인하고 입력하세요. 일부 금액을 환불해도 해당 예약의
            전체 인원이 취소됩니다. 0원은 환불 없이 예약만 취소합니다.
          </p>
          <button className="button compact" disabled={busy}>
            금액 확인 후 환불 실행
          </button>
        </form>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
