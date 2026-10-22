import bcrypt from "bcrypt";
import { Router } from "express";
import pool from "../db/pool.js";

const router = Router();
const SALT_ROUNDS = 10;
const MAX_NAME_LENGTH = 80;

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

function normalizeName(name) {
  return String(name).trim().replace(/\s+/g, " ");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function toPublicUser(row) {
  return {
    id: row.id,
    email: row.email,
    name: row.name?.trim() || null,
  };
}

async function findUserById(id) {
  const { rows } = await pool.query(
    "SELECT id, email, name FROM users WHERE id = $1",
    [id],
  );
  return rows[0] ?? null;
}

router.get("/me", async (req, res) => {
  if (!req.session?.userId) {
    res.json({ user: null });
    return;
  }

  try {
    const user = await findUserById(req.session.userId);
    if (!user) {
      req.session.destroy(() => {});
      res.json({ user: null });
      return;
    }
    res.json({ user: toPublicUser(user) });
  } catch (err) {
    console.error("GET /api/auth/me:", err.message);
    res.status(500).json({ error: "Could not load session" });
  }
});

router.post("/signup", async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password ?? "");
  const name = normalizeName(req.body?.name ?? "");

  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  if (name.length > MAX_NAME_LENGTH) {
    res.status(400).json({ error: "Name is too long" });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ error: "Enter a valid email address" });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ error: "Password must be at least 8 characters" });
    return;
  }

  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const { rows } = await pool.query(
      `INSERT INTO users (email, name, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, email, name`,
      [email, name, passwordHash],
    );
    const user = rows[0];
    req.session.userId = user.id;
    req.session.save((saveErr) => {
      if (saveErr) {
        console.error("Session save after signup:", saveErr.message);
        res.status(500).json({ error: "Account created but session failed" });
        return;
      }
      res.status(201).json({ user: toPublicUser(user) });
    });
  } catch (err) {
    if (err.code === "23505") {
      res.status(409).json({ error: "An account with this email already exists" });
      return;
    }
    console.error("POST /api/auth/signup:", err.message);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password ?? "");

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  try {
    const { rows } = await pool.query(
      "SELECT id, email, name, password_hash FROM users WHERE email = $1",
      [email],
    );
    const record = rows[0];
    if (!record) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const match = await bcrypt.compare(password, record.password_hash);
    if (!match) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    req.session.userId = record.id;
    req.session.save((saveErr) => {
      if (saveErr) {
        console.error("Session save after login:", saveErr.message);
        res.status(500).json({ error: "Login failed" });
        return;
      }
      res.json({ user: toPublicUser(record) });
    });
  } catch (err) {
    console.error("POST /api/auth/login:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/logout", (req, res) => {
  if (!req.session) {
    res.json({ ok: true });
    return;
  }
  req.session.destroy((err) => {
    if (err) {
      console.error("POST /api/auth/logout:", err.message);
      res.status(500).json({ error: "Logout failed" });
      return;
    }
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

export default router;
