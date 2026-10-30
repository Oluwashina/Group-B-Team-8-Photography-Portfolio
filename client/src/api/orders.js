import {
  createMockOrderFromCart,
  getMockOrderById,
  listMockOrdersForUser,
  markMockOrderPaid,
} from "./mockOrdersStore.js";

export const USE_MOCK_ORDERS = true;

export async function fetchOrdersForUser(userId) {
  if (USE_MOCK_ORDERS) {
    return listMockOrdersForUser(userId);
  }
  throw new Error("Live orders API not wired yet");
}

export async function fetchOrderById(_userId, orderId) {
  if (USE_MOCK_ORDERS) {
    return getMockOrderById(orderId);
  }
  throw new Error("Live orders API not wired yet");
}

export async function startMockCheckout(cartItems) {
  if (!USE_MOCK_ORDERS) {
    throw new Error("Live checkout not wired yet");
  }
  return createMockOrderFromCart(cartItems);
}

export async function pollOrderUntilPaid(orderId, { attempts = 8, delayMs = 1200 } = {}) {
  for (let i = 0; i < attempts; i += 1) {
    const order = getMockOrderById(orderId);
    if (!order) return null;
    if (order.status === "paid") return order;
    if (i === 2) {
      markMockOrderPaid(orderId);
    }
    await new Promise((resolve) => {
      setTimeout(resolve, delayMs);
    });
  }
  return getMockOrderById(orderId);
}
