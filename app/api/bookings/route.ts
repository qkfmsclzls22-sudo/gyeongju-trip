import { paymentReady } from "@/lib/commerce/config";
import { transaction } from "@/lib/commerce/db";
import { reserve } from "@/lib/commerce/store";
import {
  assertSameOrigin,
  errorResponse,
  privateJson,
  readJson,
  requireMember,
} from "@/lib/commerce/http";
import { bookingInput, CommerceError } from "@/lib/commerce/validation";
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    if (!paymentReady())
      throw new CommerceError(
        "온라인 결제를 준비하고 있습니다. 네이버스토어를 이용해 주세요.",
        503,
      );
    const user = await requireMember();
    const input = bookingInput(await readJson(request));
    const booking = await transaction((client) =>
      reserve(client, user.id, input),
    );
    return privateJson({
      id: booking.id,
      amount: booking.amount,
      expiresAt: booking.expires_at,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
