"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
export default function LoginForm({
  providers,
  callbackUrl,
  error,
}: {
  providers: { naver: boolean; google: boolean };
  callbackUrl: string;
  error: boolean;
}) {
  const [terms, setTerms] = useState(false);
  const [age, setAge] = useState(false);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState(
    error
      ? "로그인을 완료하지 못했어요. 필수 항목을 확인한 뒤 다시 시도해 주세요."
      : "",
  );
  async function login(provider: string) {
    if (!terms || !age) {
      setMessage("필수 동의 항목을 확인해 주세요.");
      return;
    }
    setBusy(provider);
    setMessage("");
    try {
      const r = await fetch("/api/membership/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ terms, age }),
      });
      if (!r.ok) throw new Error();
      await signIn(provider, { callbackUrl });
    } catch {
      setMessage("로그인 연결에 문제가 생겼어요. 잠시 후 다시 시도해 주세요.");
      setBusy("");
    }
  }
  return (
    <>
      <label className="consent">
        <input
          type="checkbox"
          checked={age}
          onChange={(e) => setAge(e.target.checked)}
        />
        <span>[필수] 만 14세 이상입니다.</span>
      </label>
      <label className="consent">
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        <span>
          [필수]{" "}
          <Link href="/terms" target="_blank">
            이용약관
          </Link>{" "}
          및{" "}
          <Link href="/privacy" target="_blank">
            개인정보 수집·이용
          </Link>
          에 동의합니다.
        </span>
      </label>
      <p style={{ fontSize: 13, color: "var(--muted)" }}>
        계정 식별정보, 이름·이메일(제공 시)을 회원 관리에 이용하며 탈퇴 시
        파기합니다. 필수 동의를 거부할 수 있으나 회원 이용이 제한됩니다.
      </p>
      {message && (
        <p role="alert" className="form-error">
          {message}
        </p>
      )}
      <div className="login-buttons">
        <button
          className="btn btn-naver"
          disabled={!providers.naver || Boolean(busy)}
          onClick={() => login("naver")}
        >
          N · {busy === "naver" ? "연결 중…" : "네이버로 시작하기"}
        </button>
        <button
          className="btn btn-outline"
          disabled={!providers.google || Boolean(busy)}
          onClick={() => login("google")}
        >
          G · {busy === "google" ? "연결 중…" : "Google로 시작하기"}
        </button>
      </div>
      {(!providers.naver || !providers.google) && (
        <p className="info-box" style={{ marginTop: 18 }}>
          간편 로그인을 준비하고 있습니다. 예약은 회원가입 없이 네이버
          스마트스토어에서 이용하실 수 있어요.
        </p>
      )}
      <div className="divider">투어 예약은 바로 이용할 수 있어요</div>
      <a
        href="https://smartstore.naver.com/gjtrip"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline btn-wide"
      >
        네이버 예약하러 가기 ↗
      </a>
    </>
  );
}
