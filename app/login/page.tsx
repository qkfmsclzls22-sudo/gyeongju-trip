import type { Metadata } from "next";
import Image from "next/image";
import CommerceShell from "@/app/components/CommerceShell";
import { enabledProviders } from "@/lib/commerce/config";
import { safeReturnPath } from "@/lib/commerce/validation";
import LoginButtons from "./LoginButtons";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "로그인·회원가입 | 경주트립",
  robots: { index: false },
};
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const next = safeReturnPath(params.next);
  const providers = enabledProviders();
  return (
    <CommerceShell>
      <div className="login-grid">
        <div className="login-visual">
          <Image
            src="/images/tour-museum-field.webp"
            alt="해설사와 함께 국립경주박물관을 둘러보는 가족 여행객"
            fill
            sizes="(max-width:760px) 100vw, 520px"
            priority
          />
        </div>
        <div className="login-form stack">
          <div>
            <p className="eyebrow">GYEONGJU TRIP</p>
            <h1>
              경주 여행,
              <br />
              여기서 이어가세요.
            </h1>
            <p>간편하게 가입하고 투어 예약 내역을 한곳에서 확인하세요.</p>
          </div>
          {params.error && (
            <p role="alert" className="error">
              로그인을 완료하지 못했습니다. 같은 계정으로 다시 시도해 주세요.
            </p>
          )}
          <LoginButtons providers={providers} next={next} />
          {(!providers.naver || !providers.google) && (
            <p className="notice">
              간편 로그인을 준비하고 있습니다. 현재 투어 예약은{" "}
              <a
                className="text-link"
                href="https://smartstore.naver.com/gjtrip"
                target="_blank"
                rel="noopener noreferrer"
              >
                네이버스토어
              </a>
              에서 이용하실 수 있습니다.
            </p>
          )}
          <p className="muted">
            처음 오셨나요? 소셜 계정 인증 후 이용약관에 동의하면 회원가입이
            완료됩니다. 별도 비밀번호는 만들지 않습니다.
          </p>
          <div className="actions muted">
            <a className="text-link" href="/terms">
              이용약관
            </a>
            <a className="text-link" href="/privacy">
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </CommerceShell>
  );
}
