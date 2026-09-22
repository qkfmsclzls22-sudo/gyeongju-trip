import { NextResponse } from "next/server";
import { currentUser } from "../auth";
import { isAdmin } from "./config";
import { CommerceError } from "./validation";

export function assertSameOrigin(request: Request) {
  const expected = process.env.NEXTAUTH_URL
    ? new URL(process.env.NEXTAUTH_URL).origin
    : new URL(request.url).origin;
  if (request.headers.get("origin") !== expected)
    throw new CommerceError(
      "요청 출처를 확인할 수 없습니다. 페이지를 새로 열어 주세요.",
      403,
    );
}
export async function requireMember(admin = false) {
  const user = await currentUser();
  if (!user) throw new CommerceError("로그인이 필요합니다.", 401);
  if (admin && !isAdmin(user.id))
    throw new CommerceError("관리자만 이용할 수 있습니다.", 403);
  return user;
}
export async function readJson(request: Request) {
  const raw = await request.text();
  if (raw.length > 12000) throw new CommerceError("요청이 너무 큽니다.", 413);
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new CommerceError("입력 형식이 올바르지 않습니다.");
  }
}
export function errorResponse(error: unknown) {
  if (error instanceof CommerceError)
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  console.error(
    "[commerce] request failed",
    error instanceof Error ? error.name : "UnknownError",
  );
  return NextResponse.json(
    { message: "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요." },
    { status: 503 },
  );
}
export function privateJson(data: unknown) {
  return NextResponse.json(data, {
    headers: { "Cache-Control": "private, no-store" },
  });
}
