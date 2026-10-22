import { Router } from "express";
import pool from "../db/pool.js";
import { rowToGalleryItem } from "../db/galleryMapper.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, src, alt, category, caption_label, caption_text, layout
       FROM gallery_items
       ORDER BY sort_order ASC, id ASC`,
    );
    res.json(rows.map(rowToGalleryItem));
  } catch (err) {
    console.error("GET /api/gallery:", err.message);
    res.status(500).json({ error: "Failed to load gallery items" });
  }
});

export default router;
