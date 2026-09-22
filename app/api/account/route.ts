import { query } from "@/lib/commerce/db";
import { CONSENT_VERSION } from "@/lib/commerce/store";
import {
  assertSameOrigin,
  errorResponse,
  privateJson,
  readJson,
  requireMember,
} from "@/lib/commerce/http";
import { CommerceError, record } from "@/lib/commerce/validation";
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const user = await requireMember();
    const body = record(await readJson(request));
    if (body.terms !== true || body.privacy !== true || body.age !== true)
      throw new CommerceError("필수 동의 항목을 모두 확인해 주세요.");
    await query(
      "UPDATE gj_members SET terms_version=$2,consent_at=coalesce(consent_at,now()) WHERE id=$1",
      [user.id, CONSENT_VERSION],
    );
    return privateJson({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
