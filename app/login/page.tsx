import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "../components/site";
import { authProviders } from "@/lib/auth";
import { safeReturnTo } from "@/lib/http";
import LoginForm from "./LoginForm";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "로그인 · 회원가입 | 경주트립",
  robots: { index: false, follow: false },
};
export default async function Login({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  return (
    <>
      <SiteHeader showCta={false} />
      <main className="login-wrap" id="main-content">
        <div className="eyebrow">WELCOME TO GYEONGJU TRIP</div>
        <h1>
          반가워요.
          <br />
          함께 경주를 만나볼까요?
        </h1>
        <p>
          네이버 또는 Google 계정으로 간편하게 시작하세요.
          <br />
          처음 방문하셨다면 회원가입도 함께 진행됩니다.
        </p>
        <LoginForm
          providers={authProviders()}
          callbackUrl={safeReturnTo(q.callbackUrl)}
          error={Boolean(q.error)}
        />
      </main>
      <SiteFooter />
    </>
  );
}
