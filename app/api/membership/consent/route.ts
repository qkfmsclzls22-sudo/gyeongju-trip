import { NextResponse } from "next/server";
import { CONSENT_COOKIE, makeConsent } from "@/lib/auth-consent";
import { isSameOrigin, readObject } from "@/lib/http";
export async function POST(req: Request) {
  if (!isSameOrigin(req))
    return NextResponse.json(
      { message: "요청을 확인해 주세요." },
      { status: 403 },
    );
  if (!process.env.NEXTAUTH_SECRET)
    return NextResponse.json(
      { message: "간편 로그인을 준비하고 있습니다." },
      { status: 503 },
    );
  try {
    const body = await readObject(req);
    if (body.terms !== true || body.age !== true)
      return NextResponse.json(
        { message: "필수 동의 항목을 확인해 주세요." },
        { status: 400 },
      );
    const response = NextResponse.json({ ok: true });
    response.cookies.set(CONSENT_COOKIE, makeConsent(), {
      httpOnly: true,
      secure: new URL(req.url).protocol === "https:",
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });
    return response;
  } catch {
    return NextResponse.json(
      { message: "요청 내용을 확인해 주세요." },
      { status: 400 },
    );
  }
}
