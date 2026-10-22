import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import pool from "../db/pool.js";

const PgSession = connectPgSimple(session);

export function createSessionMiddleware() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    console.warn(
      "SESSION_SECRET is not set. Auth sessions will not work until server/.env is configured.",
    );
  }

  const secure =
    process.env.COOKIE_SECURE === "true" ||
    process.env.NODE_ENV === "production";
  const sameSite = process.env.COOKIE_SAME_SITE || (secure ? "none" : "lax");

  return session({
    store: new PgSession({
      pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    name: "connect.sid",
    secret: secret || "dev-only-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure,
      sameSite,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  });
}
