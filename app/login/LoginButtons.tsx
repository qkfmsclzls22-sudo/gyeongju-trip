"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
export default function LoginButtons({
  providers,
  next,
}: {
  providers: { naver: boolean; google: boolean };
  next: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function login(provider: string) {
    setBusy(true);
    setError("");
    try {
      await signIn(provider, {
        callbackUrl: `/account?next=${encodeURIComponent(next)}`,
      });
    } catch {
      setError("로그인 화면을 열지 못했습니다. 다시 시도해 주세요.");
      setBusy(false);
    }
  }
  return (
    <div className="stack">
      <button
        className="button naver full"
        disabled={!providers.naver || busy}
        onClick={() => login("naver")}
      >
        <Image src="/images/auth/naver-n.png" width={48} height={48} alt="" />
        네이버로 시작하기{!providers.naver && " · 준비 중"}
      </button>
      <button
        className="button google full"
        disabled={!providers.google || busy}
        onClick={() => login("google")}
      >
        <Image src="/images/auth/google-g.png" width={20} height={20} alt="" />
        Google로 시작하기{!providers.google && " · 준비 중"}
      </button>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
