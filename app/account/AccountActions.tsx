"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
export default function AccountActions() {
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  async function leave() {
    setBusy(true);
    setMessage("");
    try {
      const r = await fetch("/api/membership", { method: "DELETE" });
      if (!r.ok) throw new Error();
      await signOut({ callbackUrl: "/" });
    } catch {
      setMessage("탈퇴를 처리하지 못했어요. 고객센터로 문의해 주세요.");
      setBusy(false);
    }
  }
  return (
    <div style={{ marginTop: 28 }}>
      <button
        className="btn btn-outline"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        로그아웃
      </button>{" "}
      <button
        className="text-link"
        style={{ marginLeft: 16, fontWeight: 400 }}
        onClick={() => setConfirm(!confirm)}
      >
        회원 탈퇴
      </button>
      {confirm && (
        <div className="info-box" style={{ marginTop: 18 }}>
          <p>
            회원정보를 삭제할까요? 법령상 보관이 필요한 거래 내역은 별도로
            보관하며, 탈퇴 후에는 이 계정으로 조회할 수 없습니다.
          </p>
          <button className="btn btn-primary" disabled={busy} onClick={leave}>
            {busy ? "처리 중…" : "회원정보 삭제"}
          </button>{" "}
          <button className="btn btn-outline" onClick={() => setConfirm(false)}>
            취소
          </button>
        </div>
      )}
      {message && (
        <p role="alert" className="form-error">
          {message}
        </p>
      )}
    </div>
  );
}
