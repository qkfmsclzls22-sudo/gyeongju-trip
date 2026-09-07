import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { databaseReady } from "@/lib/db";
const handler = NextAuth(authOptions);
async function auth(
  req: Request,
  context: { params: Promise<{ nextauth: string[] }> },
) {
  if (
    !process.env.NEXTAUTH_SECRET ||
    !process.env.NEXTAUTH_URL ||
    !databaseReady()
  )
    return Response.json(
      { message: "간편 로그인을 준비하고 있습니다." },
      { status: 503 },
    );
  return handler(req, context);
}
export { auth as GET, auth as POST };
