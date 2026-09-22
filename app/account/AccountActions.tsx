"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function LogoutButton() {
  return (
    <button className="text-link" onClick={() => signOut({ callbackUrl: "/" })}>
      로그아웃
    </button>
  );
}
export function SignupConsent({ next }: { next: string }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          terms: form.get("terms") === "on",
          privacy: form.get("privacy") === "on",
          age: form.get("age") === "on",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      router.replace(next);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "잠시 후 다시 시도해 주세요.");
      setBusy(false);
    }
  }
  return (
    <form className="panel stack" onSubmit={submit}>
      <h2>회원가입을 마무리해 주세요</h2>
      <label className="check">
        <input type="checkbox" name="terms" required />
        <span>
          [필수]{" "}
          <a href="/terms" target="_blank" className="text-link">
            이용약관
          </a>
          에 동의합니다.
        </span>
      </label>
      <label className="check">
        <input type="checkbox" name="privacy" required />
        <span>
          [필수]{" "}
          <a href="/privacy" target="_blank" className="text-link">
            개인정보 수집·이용 안내
          </a>
          를 확인하고 동의합니다.
        </span>
      </label>
      <label className="check">
        <input type="checkbox" name="age" required />
        <span>
          [필수] 만 14세 이상입니다. 어린이 참가자의 예약은 보호자가 진행해
          주세요.
        </span>
      </label>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <button className="button" disabled={busy}>
        {busy ? "처리 중…" : "동의하고 가입 완료"}
      </button>
    </form>
  );
}
export function CancelBooking({
  id,
  pending,
}: {
  id: string;
  pending: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const reason = new FormData(e.currentTarget).get("reason");
    try {
      const r = await fetch(`/api/bookings/${id}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message);
      setOpen(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "다시 시도해 주세요.");
    } finally {
      setBusy(false);
    }
  }
  if (!open)
    return (
      <button className="text-link" onClick={() => setOpen(true)}>
        {pending ? "결제 대기 취소" : "예약 취소 요청"}
      </button>
    );
  return (
    <form className="stack rule" onSubmit={submit}>
      <label>
        취소 사유
        <input name="reason" maxLength={200} required />
      </label>
      {!pending && (
        <p className="muted">
          취소 요청 후 담당자가 환불 금액을 확인합니다. 환불이 완료되면 예약
          내역에 반영됩니다.
        </p>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <div className="actions">
        <button className="button compact" disabled={busy}>
          취소 요청 접수
        </button>
        <button
          type="button"
          className="button secondary compact"
          onClick={() => setOpen(false)}
        >
          돌아가기
        </button>
      </div>
    </form>
  );
}
