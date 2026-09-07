import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import { databaseReady, sql } from "./db";
import { CONSENT_COOKIE, POLICY_VERSION, validConsent } from "./auth-consent";
export function authProviders() {
  const base =
    databaseReady() &&
    Boolean(process.env.NEXTAUTH_SECRET) &&
    Boolean(process.env.NEXTAUTH_URL);
  return {
    naver:
      base &&
      Boolean(process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET),
    google:
      base &&
      Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  };
}
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    ...(process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET
      ? [
          NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: { params: { scope: "openid email profile" } },
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (
        !databaseReady() ||
        !process.env.NEXTAUTH_SECRET ||
        !account ||
        !["naver", "google"].includes(account.provider)
      )
        return false;
      if (
        account.provider === "google" &&
        !(profile as { email_verified?: boolean })?.email_verified
      )
        return false;
      return validConsent((await cookies()).get(CONSENT_COOKIE)?.value);
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        const subjectHash = createHash("sha256")
          .update(account.provider + ":" + account.providerAccountId)
          .digest("hex");
        const db = sql();
        const rows =
          await db`INSERT INTO members(provider,subject_hash,display_name,email,consent_version,consented_at)
      VALUES(${account.provider},${subjectHash},${user.name?.slice(0, 100) || "여행자"},${user.email || null},${POLICY_VERSION},now())
      ON CONFLICT(provider,subject_hash) DO UPDATE SET display_name=EXCLUDED.display_name,email=EXCLUDED.email,last_login_at=now(),consent_version=EXCLUDED.consent_version,consented_at=now()
      RETURNING id`;
        token.memberId = rows[0].id as string;
        token.picture = undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.memberId === "string")
        session.user.id = token.memberId;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/") && !url.startsWith("//") && !url.includes("\\"))
        return baseUrl + url;
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {}
      return baseUrl + "/account";
    },
  },
};
export type Member = {
  id: string;
  provider: string;
  display_name: string;
  email: string | null;
  created_at: string;
};
export async function currentMember(): Promise<Member | null> {
  if (!databaseReady() || !process.env.NEXTAUTH_SECRET) return null;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const rows =
    await sql()`SELECT id,provider,display_name,email,created_at FROM members WHERE id=${session.user.id} AND revoked_at IS NULL`;
  return (rows[0] as Member) || null;
}
