import NextAuth from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import { authReady } from "@/lib/commerce/config";

async function handler(
  request: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> },
) {
  if (!authReady()) {
    return NextResponse.json(
      { message: "간편 로그인을 준비하고 있습니다. 현재 예약은 네이버스토어를 이용해 주세요." },
      { status: 503, headers: { "Cache-Control": "private, no-store" } },
    );
  }
  return NextAuth(request, context, authOptions);
}
export { handler as GET, handler as POST };
