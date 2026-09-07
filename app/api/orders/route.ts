import { randomUUID } from "node:crypto";
import { currentMember } from "@/lib/auth";
import { sql } from "@/lib/db";
import { validateBooking } from "@/lib/booking";
import { isSameOrigin, readObject } from "@/lib/http";
import { testCheckoutEnabled, COMMERCE_DISABLED } from "@/lib/commerce";
export async function POST(req: Request) {
  if (!testCheckoutEnabled())
    return Response.json({ message: COMMERCE_DISABLED }, { status: 503 });
  if (!isSameOrigin(req))
    return Response.json({ message: "요청을 확인해 주세요." }, { status: 403 });
  try {
    const member = await currentMember();
    if (!member)
      return Response.json(
        { message: "로그인이 필요합니다." },
        { status: 401 },
      );
    let booking;
    try {
      booking = validateBooking(await readObject(req));
    } catch {
      return Response.json(
        { message: "날짜, 시간, 인원을 확인해 주세요." },
        { status: 400 },
      );
    }
    const { tour, date, time, adultCount, childCount, amount } = booking;
    const orderId = "GJT_" + randomUUID().replaceAll("-", "");
    const rows =
      await sql()`SELECT * FROM create_test_order(${orderId},${member.id},${tour.id},${tour.name},${date},${time},${adultCount},${childCount},${amount})`;
    if (!rows[0]) throw new Error();
    return Response.json(
      {
        orderId,
        amount,
        orderName: tour.name,
        customerKey: member.id,
        isTest: true,
      },
      { status: 201 },
    );
  } catch {
    return Response.json(
      {
        message:
          "해당 일정의 예약 가능 인원을 확인해 주세요. 주문을 만들지 못했습니다.",
      },
      { status: 409 },
    );
  }
}
