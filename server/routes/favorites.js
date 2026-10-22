import { Router } from "express";
import pool from "../db/pool.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT gallery_item_id
       FROM favorites
       WHERE user_id = $1
       ORDER BY created_at ASC`,
      [req.session.userId],
    );
    res.json({ galleryItemIds: rows.map((row) => row.gallery_item_id) });
  } catch (err) {
    console.error("GET /api/favorites:", err.message);
    res.status(500).json({ error: "Failed to load favorites" });
  }
});

router.post("/:galleryItemId", async (req, res) => {
  const galleryItemId = req.params.galleryItemId;

  try {
    const itemCheck = await pool.query(
      "SELECT id FROM gallery_items WHERE id = $1",
      [galleryItemId],
    );
    if (itemCheck.rowCount === 0) {
      res.status(404).json({ error: "Gallery item not found" });
      return;
    }

    await pool.query(
      `INSERT INTO favorites (user_id, gallery_item_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [req.session.userId, galleryItemId],
    );
    res.status(201).json({ galleryItemId, saved: true });
  } catch (err) {
    console.error("POST /api/favorites:", err.message);
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

router.delete("/:galleryItemId", async (req, res) => {
  const galleryItemId = req.params.galleryItemId;

  try {
    await pool.query(
      "DELETE FROM favorites WHERE user_id = $1 AND gallery_item_id = $2",
      [req.session.userId, galleryItemId],
    );
    res.json({ galleryItemId, saved: false });
  } catch (err) {
    console.error("DELETE /api/favorites:", err.message);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

export default router;
