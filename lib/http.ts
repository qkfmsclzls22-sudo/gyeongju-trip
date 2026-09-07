export function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return origin === new URL(req.url).origin;
  } catch {
    return false;
  }
}
export async function readObject(
  req: Request,
  max = 16000,
): Promise<Record<string, unknown>> {
  const text = await req.text();
  if (text.length > max) throw new Error("INVALID_INPUT");
  const value: unknown = JSON.parse(text);
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("INVALID_INPUT");
  return value as Record<string, unknown>;
}
export function safeReturnTo(value: unknown) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\x00-\x20]/.test(value)
  )
    return "/account";
  const path = value.split("?")[0];
  return ["/account", "/checkout"].includes(path) ? value : "/account";
}
