import "dotenv/config";
import cors from "cors";
import express from "express";
import { createSessionMiddleware } from "./config/session.js";
import pool from "./db/pool.js";
import authRouter from "./routes/auth.js";
import galleryRouter from "./routes/gallery.js";

const app = express();
const port = Number(process.env.PORT) || 3001;

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set("trust proxy", 1);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(createSessionMiddleware());

app.get("/api/health", async (_req, res) => {
  const payload = {
    ok: true,
    service: "golden-hour-studio-api",
    database: "unknown",
  };

  if (!process.env.DATABASE_URL) {
    payload.database = "not_configured";
    res.json(payload);
    return;
  }

  try {
    await pool.query("SELECT 1");
    payload.database = "connected";
    res.json(payload);
  } catch (err) {
    console.error("Health check DB error:", err.message);
    payload.ok = false;
    payload.database = "error";
    res.status(503).json(payload);
  }
});

app.use("/api/auth", authRouter);
app.use("/api/gallery", galleryRouter);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
