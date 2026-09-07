import { currentMember } from "@/lib/auth";
import { sql } from "@/lib/db";
import { isSameOrigin } from "@/lib/http";
import { randomUUID } from "node:crypto";
export async function DELETE(req: Request) {
  if (!isSameOrigin(req))
    return Response.json({ message: "요청을 확인해 주세요." }, { status: 403 });
  try {
    const member = await currentMember();
    if (!member)
      return Response.json(
        { message: "로그인이 필요합니다." },
        { status: 401 },
      );
    const db = sql();
    await db`UPDATE members SET display_name='탈퇴 회원',email=NULL,subject_hash=${"deleted-" + randomUUID()},revoked_at=now() WHERE id=${member.id}`;
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { message: "요청을 처리하지 못했습니다." },
      { status: 503 },
    );
  }
}
