import { randomUUID } from "node:crypto";
import { Router } from "express";
import { getClientBaseUrl, getStripe } from "../config/stripe.js";
import pool from "../db/pool.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

function normalizeCartItems(body) {
  if (!Array.isArray(body?.items) || body.items.length === 0) {
    return null;
  }
  return body.items.map((row) => ({
    galleryItemId: String(row.galleryItemId ?? row.id ?? "").trim(),
    quantity: Math.min(3, Math.max(1, Number(row.quantity) || 1)),
  }));
}

router.post("/", requireAuth, async (req, res) => {
  const cartLines = normalizeCartItems(req.body);
  if (!cartLines?.length) {
    res.status(400).json({ error: "Cart is empty or invalid" });
    return;
  }

  const stripe = getStripe();
  if (!stripe) {
    res.status(503).json({ error: "Stripe is not configured on the server" });
    return;
  }

  const client = await pool.connect();
  const orderId = `ord-${randomUUID()}`;

  try {
    await client.query("BEGIN");

    const resolvedLines = [];
    for (const line of cartLines) {
      const { rows } = await client.query(
        `SELECT id, caption_label, src, price_cents
         FROM gallery_items
         WHERE id = $1`,
        [line.galleryItemId],
      );
      const product = rows[0];
      if (!product) {
        await client.query("ROLLBACK");
        res.status(400).json({ error: `Unknown print: ${line.galleryItemId}` });
        return;
      }
      if (!product.price_cents || product.price_cents <= 0) {
        await client.query("ROLLBACK");
        res.status(400).json({ error: `Print is not for sale: ${line.galleryItemId}` });
        return;
      }
      resolvedLines.push({
        galleryItemId: product.id,
        title: product.caption_label,
        src: product.src,
        unitPriceCents: product.price_cents,
        quantity: line.quantity,
      });
    }

    const totalCents = resolvedLines.reduce(
      (sum, line) => sum + line.unitPriceCents * line.quantity,
      0,
    );

    await client.query(
      `INSERT INTO orders (id, user_id, status, total_cents)
       VALUES ($1, $2, 'pending', $3)`,
      [orderId, req.session.userId, totalCents],
    );

    for (const line of resolvedLines) {
      await client.query(
        `INSERT INTO order_items (order_id, gallery_item_id, title, unit_price_cents, quantity)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          orderId,
          line.galleryItemId,
          line.title,
          line.unitPriceCents,
          line.quantity,
        ],
      );
    }

    const clientBase = getClientBaseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${clientBase}/checkout/success?order_id=${encodeURIComponent(orderId)}`,
      cancel_url: `${clientBase}/cart`,
      metadata: { orderId },
      line_items: resolvedLines.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: "usd",
          unit_amount: line.unitPriceCents,
          product_data: {
            name: `${line.title} print`,
            images: line.src.startsWith("http")
              ? [line.src]
              : [`${clientBase}${line.src}`],
          },
        },
      })),
    });

    await client.query(
      `UPDATE orders SET stripe_checkout_session_id = $1, updated_at = NOW() WHERE id = $2`,
      [session.id, orderId],
    );

    await client.query("COMMIT");
    res.json({ url: session.url, orderId });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("POST /api/checkout:", err.message);
    res.status(500).json({ error: "Could not start checkout" });
  } finally {
    client.release();
  }
});

export default router;
