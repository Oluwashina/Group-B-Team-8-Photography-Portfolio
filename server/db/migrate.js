import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import pool from "./pool.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, "schema.sql");

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error("Missing DATABASE_URL in server/.env");
    process.exit(1);
  }

  const sql = fs.readFileSync(schemaPath, "utf8");
  await pool.query(sql);
  console.log("Schema applied (gallery_items, users, favorites).");
  await pool.end();
}

migrate().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
