import { isSameOrigin, readObject } from "@/lib/http";
import { isFutureDate } from "@/lib/tours";
// Existing business-owned integration, moved out of the browser. Override through runtime configuration.
const LEGACY_QUOTE_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyvSj7nZ7XO9wmntGJaywgCTv_1n6BTs1H_cEd9WSyGkJOtY8b0a29xoZIe2AanQ2ZZ/exec";
export async function POST(req: Request) {
  if (!isSameOrigin(req))
    return Response.json({ message: "요청을 확인해 주세요." }, { status: 403 });
  let b;
  try {
    b = await readObject(req, 12000);
  } catch {
    return Response.json(
      { message: "입력 내용을 확인해 주세요." },
      { status: 400 },
    );
  }
  const text = (name: string, max: number) =>
    typeof b[name] === "string" ? (b[name] as string).trim().slice(0, max) : "";
  const date = text("date", 10),
    time = text("time", 5),
    phone = text("phone", 20),
    email = text("email", 254),
    tourType = text("tourType", 100);
  if (
    !isFutureDate(date) ||
    (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) ||
    typeof b.people !== "number" ||
    !Number.isInteger(b.people) ||
    b.people < 1 ||
    b.people > 2000 ||
    !/^0\d{8,10}$/.test(phone.replaceAll("-", "").replaceAll(" ", "")) ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    !tourType ||
    b.consent !== true ||
    text("website", 100)
  )
    return Response.json(
      { message: "필수 입력 항목과 개인정보 동의를 확인해 주세요." },
      { status: 400 },
    );
  if (process.env.VERCEL_ENV === "preview")
    return Response.json(
      {
        message:
          "미리보기에서는 문의를 전송하지 않습니다. 실제 문의는 기존 홈페이지 또는 문자로 남겨주세요.",
      },
      { status: 503 },
    );
  try {
    const upstream = await fetch(
      process.env.QUOTE_WEBAPP_URL || LEGACY_QUOTE_ENDPOINT,
      {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          참가일시: date + " " + (time || "시간 협의"),
          인원: b.people,
          투어종류: tourType,
          기업단체명: text("orgName", 100),
          담당자연락처: phone,
          이메일: email,
          기타문의사항:
            "참여 대상: " + text("purpose", 80) + "\n" + text("message", 2000),
          개인정보동의시각: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(15000),
        cache: "no-store",
      },
    );
    const result = await upstream.json();
    if (!upstream.ok || result.result !== "success") throw new Error();
    return Response.json({ result: "success" });
  } catch {
    return Response.json(
      {
        message:
          "문의 접수를 확인하지 못했습니다. 중복 전송 전에 문자로 접수 여부를 확인해 주세요.",
      },
      { status: 502 },
    );
  }
}
