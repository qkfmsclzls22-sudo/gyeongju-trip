import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import { randomUUID } from "node:crypto";
import { query } from "./commerce/db";
import { authReady, enabledProviders } from "./commerce/config";

const providers = enabledProviders();
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    ...(providers.naver
      ? [
          NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID!,
            clientSecret: process.env.NAVER_CLIENT_SECRET!,
          }),
        ]
      : []),
    ...(providers.google
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: { params: { scope: "openid email profile" } },
          }),
        ]
      : []),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async signIn({ account }) {
      return Boolean(
        authReady() &&
          account &&
          ["naver", "google"].includes(account.provider),
      );
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        // Identify by provider + subject; never automatically merge matching emails.
        const [member] = await query<{ id: string }>(
          `INSERT INTO gj_members(id, provider, provider_account_id, name, email)
           VALUES($1,$2,$3,$4,$5) ON CONFLICT(provider, provider_account_id)
           DO UPDATE SET email=EXCLUDED.email RETURNING id`,
          [
            randomUUID(),
            account.provider,
            account.providerAccountId,
            user.name || "",
            user.email || null,
          ],
        );
        token.memberId = member.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user)
        session.user.id =
          typeof token.memberId === "string" ? token.memberId : "";
      return session;
    },
  },
};
export async function currentUser() {
  if (!authReady()) return null;
  const session = await getServerSession(authOptions);
  return session?.user?.id ? session.user : null;
}
