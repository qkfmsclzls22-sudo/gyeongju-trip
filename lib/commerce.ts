import { databaseReady } from "./db";
export function testCheckoutEnabled() {
  return (
    process.env.COMMERCE_MODE === "test" &&
    databaseReady() &&
    Boolean(process.env.NEXTAUTH_SECRET) &&
    /^test_ck_/.test(process.env.TOSS_CLIENT_KEY || "") &&
    /^test_sk_/.test(process.env.TOSS_SECRET_KEY || "")
  );
}
export const COMMERCE_DISABLED =
  "홈페이지 직접 결제는 준비 중입니다. 네이버 스마트스토어를 이용해 주세요.";
export function tossHeaders() {
  return {
    Authorization:
      "Basic " +
      Buffer.from(process.env.TOSS_SECRET_KEY + ":").toString("base64"),
    "Content-Type": "application/json",
  };
}
