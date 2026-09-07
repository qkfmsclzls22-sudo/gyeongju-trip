import { neon } from "@neondatabase/serverless";
export function databaseReady() {
  return Boolean(process.env.DATABASE_URL);
}
export function sql() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_UNAVAILABLE");
  return neon(process.env.DATABASE_URL);
}
