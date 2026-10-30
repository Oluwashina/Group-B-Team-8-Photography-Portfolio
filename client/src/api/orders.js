import { apiFetch, readJson } from "./http.js";

export async function fetchOrdersForUser() {
  const response = await apiFetch("/api/orders");
  return readJson(response);
}

export async function fetchOrderById(orderId) {
  const response = await apiFetch(`/api/orders/${encodeURIComponent(orderId)}`);
  return readJson(response);
}

export async function pollOrderUntilPaid(
  orderId,
  { attempts = 12, delayMs = 1500 } = {},
) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const order = await fetchOrderById(orderId);
      if (order.status === "paid") {
        return order;
      }
    } catch {
      // keep polling briefly if webhook is slow
    }
    await new Promise((resolve) => {
      setTimeout(resolve, delayMs);
    });
  }
  try {
    return await fetchOrderById(orderId);
  } catch {
    return null;
  }
}
