import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL is not set. Database routes will fail until server/.env is configured.",
  );
}

function connectionConfig() {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    return {};
  }

  const isLocal =
    raw.includes("localhost") || raw.includes("127.0.0.1");

  if (isLocal) {
    return { connectionString: raw, ssl: false };
  }

  // Neon and other hosted Postgres URLs often use sslmode=require. pg v8 warns unless
  // libpq compatibility is explicit; see pg-connection-string release notes.
  let connectionString = raw;
  const hasSslMode = /[?&]sslmode=/i.test(connectionString);
  const hasLibpqCompat = /[?&]uselibpqcompat=/i.test(connectionString);

  if (hasSslMode && !hasLibpqCompat) {
    connectionString += connectionString.includes("?") ? "&" : "?";
    connectionString += "uselibpqcompat=true";
  }

  return {
    connectionString,
    ssl: { rejectUnauthorized: false },
  };
}

const pool = new Pool(connectionConfig());

export default pool;
