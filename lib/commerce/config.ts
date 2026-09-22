export function authReady() {
  return Boolean(
    process.env.DATABASE_URL &&
      process.env.NEXTAUTH_SECRET &&
      process.env.NEXTAUTH_URL,
  );
}

export function enabledProviders() {
  return {
    naver:
      authReady() &&
      Boolean(process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET),
    google:
      authReady() &&
      Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  };
}

export function paymentReady() {
  const client = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "";
  const secret = process.env.TOSS_SECRET_KEY || "";
  const mode = process.env.COMMERCE_MODE;
  const prefix = mode === "live" ? "live_" : "test_";
  const providers = enabledProviders();
  return (
    authReady() &&
    (providers.naver || providers.google) &&
    process.env.COMMERCE_ENABLED === "true" &&
    (mode === "test" || mode === "live") &&
    client.startsWith(`${prefix}ck_`) &&
    secret.startsWith(`${prefix}sk_`) &&
    (mode !== "live" || process.env.COMMERCE_LIVE_APPROVED === "true")
  );
}

export function isAdmin(id: string) {
  return (process.env.COMMERCE_ADMIN_IDS || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean)
    .includes(id);
}
