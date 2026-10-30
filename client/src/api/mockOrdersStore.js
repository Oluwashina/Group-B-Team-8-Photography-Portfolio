import { seedMockOrders } from "../data/mockOrders.js";

const SESSION_KEY = "ghs-mock-orders-v1";

function readAll() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    const stored = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(stored) ? stored : [];
    const byId = new Map(seedMockOrders.map((order) => [order.id, order]));
    for (const order of list) {
      byId.set(order.id, order);
    }
    return [...byId.values()].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } catch {
    return [...seedMockOrders];
  }
}

function writeDynamic(orders) {
  const seededIds = new Set(seedMockOrders.map((o) => o.id));
  const dynamic = orders.filter((o) => !seededIds.has(o.id));
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(dynamic));
}

export function listMockOrdersForUser() {
  return readAll();
}

export function getMockOrderById(orderId) {
  return readAll().find((order) => order.id === orderId) ?? null;
}

export function createMockOrderFromCart(cartItems) {
  const id = `ord-${Date.now()}`;
  const order = {
    id,
    status: "pending",
    totalCents: cartItems.reduce(
      (sum, row) => sum + row.priceCents * row.quantity,
      0,
    ),
    createdAt: new Date().toISOString(),
    items: cartItems.map((row) => ({
      galleryItemId: row.galleryItemId,
      title: row.title,
      unitPriceCents: row.priceCents,
      quantity: row.quantity,
      src: row.src,
    })),
  };
  const all = readAll();
  writeDynamic([order, ...all.filter((o) => !seedMockOrders.some((s) => s.id === o.id))]);
  return order;
}

export function markMockOrderPaid(orderId) {
  const all = readAll();
  const target = all.find((o) => o.id === orderId);
  if (!target || target.status === "paid") return target;
  const updated = { ...target, status: "paid" };
  const dynamic = all
    .filter((o) => !seedMockOrders.some((s) => s.id === o.id))
    .map((o) => (o.id === orderId ? updated : o));
  if (!seedMockOrders.some((s) => s.id === orderId)) {
    writeDynamic(dynamic);
  }
  return updated;
}
