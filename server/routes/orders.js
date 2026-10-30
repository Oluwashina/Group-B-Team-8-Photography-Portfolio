import { Router } from "express";
import pool from "../db/pool.js";
import { mapOrderRow } from "../db/orderMapper.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

async function fetchOrderItems(orderId) {
  const { rows } = await pool.query(
    `SELECT oi.gallery_item_id, oi.title, oi.unit_price_cents, oi.quantity, g.src
     FROM order_items oi
     JOIN gallery_items g ON g.id = oi.gallery_item_id
     WHERE oi.order_id = $1
     ORDER BY oi.id ASC`,
    [orderId],
  );
  return rows;
}

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, status, total_cents, created_at, updated_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.session.userId],
    );

    const orders = await Promise.all(
      rows.map(async (orderRow) => {
        const itemRows = await fetchOrderItems(orderRow.id);
        return mapOrderRow(orderRow, itemRows);
      }),
    );

    res.json(orders);
  } catch (err) {
    console.error("GET /api/orders:", err.message);
    res.status(500).json({ error: "Failed to load orders" });
  }
});

router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const { rows } = await pool.query(
      `SELECT id, status, total_cents, created_at, updated_at, user_id
       FROM orders
       WHERE id = $1`,
      [orderId],
    );
    const orderRow = rows[0];
    if (!orderRow) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    if (orderRow.user_id !== req.session.userId) {
      res.status(403).json({ error: "Not allowed to view this order" });
      return;
    }

    const itemRows = await fetchOrderItems(orderId);
    res.json(mapOrderRow(orderRow, itemRows));
  } catch (err) {
    console.error("GET /api/orders/:orderId:", err.message);
    res.status(500).json({ error: "Failed to load order" });
  }
});

export default router;
