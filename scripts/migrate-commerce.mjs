import { readFile } from "node:fs/promises";
import pg from "pg";
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL must be set.");
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
try {
  await client.connect();
  await client.query(
    await readFile(
      new URL("../migrations/001-commerce.sql", import.meta.url),
      "utf8",
    ),
  );
  console.log("Commerce schema is ready. No tour sessions were created.");
} finally {
  await client.end();
}
