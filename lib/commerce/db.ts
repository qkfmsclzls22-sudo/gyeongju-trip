import { Pool, type PoolClient, type QueryResultRow } from "pg";

let pool: Pool | undefined;
export function database() {
  if (!process.env.DATABASE_URL)
    throw new Error("COMMERCE_DATABASE_UNAVAILABLE");
  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 20000,
  });
  return pool;
}
export async function query<T extends QueryResultRow>(
  text: string,
  values: unknown[] = [],
) {
  return (await database().query<T>(text, values)).rows;
}
export async function transaction<T>(
  fn: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await database().connect();
  try {
    await client.query("BEGIN");
    await client.query("SET LOCAL lock_timeout = '5s'");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
