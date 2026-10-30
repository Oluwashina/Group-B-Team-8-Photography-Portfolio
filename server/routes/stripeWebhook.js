import { getStripe } from "../config/stripe.js";
import pool from "../db/pool.js";

export async function handleStripeWebhook(req, res) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    res.status(503).send("Stripe webhook is not configured");
    return;
  }

  const signature = req.headers["stripe-signature"];
  if (!signature) {
    res.status(400).send("Missing Stripe signature");
    return;
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    try {
      if (orderId) {
        await pool.query(
          `UPDATE orders
           SET status = 'paid', updated_at = NOW()
           WHERE id = $1 AND status = 'pending'`,
          [orderId],
        );
      } else if (session.id) {
        await pool.query(
          `UPDATE orders
           SET status = 'paid', updated_at = NOW()
           WHERE stripe_checkout_session_id = $1 AND status = 'pending'`,
          [session.id],
        );
      }
    } catch (err) {
      console.error("Stripe webhook DB update:", err.message);
      res.status(500).send("Webhook handler failed");
      return;
    }
  }

  res.json({ received: true });
}
