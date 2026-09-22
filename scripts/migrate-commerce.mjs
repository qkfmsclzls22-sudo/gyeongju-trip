import { readFile } from "node:fs/promises";
import pg from "pg";

const productionOnly = process.argv.includes("--vercel-production");
const productionBuild =
  process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production";

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error("Commerce schema setup requires DATABASE_URL.");
    process.exitCode = 1;
    return;
  }
  let client;
  try {
    client = new pg.Client({
      connectionString:
        process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL,
      connectionTimeoutMillis: 15000,
      statement_timeout: 60000,
      application_name: "gjtrip-commerce-migration",
    });
    await client.connect();
    await client.query(
      await readFile(
        new URL("../migrations/001-commerce.sql", import.meta.url),
        "utf8",
      ),
    );
    console.log("Commerce schema is ready: 4 tables. No tour sessions were created.");
  } catch (error) {
    // Do not print connection strings or raw driver errors in deployment logs.
    const code = /^[A-Z0-9_]{1,32}$/.test(error?.code || "")
      ? error.code
      : "SETUP_FAILED";
    console.error(`Commerce schema setup failed (${code}). Deployment stopped.`);
    process.exitCode = 1;
  } finally {
    await client?.end().catch(() => {});
  }
}

if (productionOnly && !productionBuild) {
  console.log("Commerce schema setup skipped outside Vercel production.");
} else {
  await migrate();
}
