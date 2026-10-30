import { apiFetch, readJson } from "./http.js";

export async function startCheckout(cartItems) {
  const response = await apiFetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({
      items: cartItems.map((line) => ({
        galleryItemId: line.galleryItemId,
        quantity: line.quantity,
      })),
    }),
  });
  return readJson(response);
}
