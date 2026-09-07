import { createHmac, timingSafeEqual } from "node:crypto";
export const POLICY_VERSION = "2026-09-07";
export const CONSENT_COOKIE = "gjtrip-auth-consent";
export function makeConsent(now = Date.now()) {
  const payload = POLICY_VERSION + "." + now;
  return (
    payload +
    "." +
    createHmac("sha256", process.env.NEXTAUTH_SECRET!)
      .update(payload)
      .digest("hex")
  );
}
export function validConsent(token: string | undefined, now = Date.now()) {
  if (!token || !process.env.NEXTAUTH_SECRET) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [version, stamp, signature] = parts;
  if (
    version !== POLICY_VERSION ||
    !stamp ||
    !signature ||
    !/^[a-f0-9]{64}$/.test(signature)
  )
    return false;
  const issued = Number(stamp);
  if (!Number.isFinite(issued) || issued > now || now - issued > 600000)
    return false;
  const expected = createHmac("sha256", process.env.NEXTAUTH_SECRET)
    .update(version + "." + stamp)
    .digest();
  return timingSafeEqual(Buffer.from(signature, "hex"), expected);
}
