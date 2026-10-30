import Stripe from "stripe";

let stripeClient;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return null;
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

export function getClientBaseUrl() {
  const origins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (process.env.NODE_ENV !== "production") {
    const local = origins.find((origin) => origin.includes("localhost"));
    if (local) return local.replace(/\/$/, "");
  }

  const httpsOrigin = origins.find((origin) => origin.startsWith("https://"));
  const base = httpsOrigin || origins[0] || "http://localhost:5173";
  return base.replace(/\/$/, "");
}
