import { apiFetch, readJson } from "./http.js";

export async function fetchFavoriteIds() {
  const response = await apiFetch("/api/favorites");
  const data = await readJson(response);
  return data.galleryItemIds ?? [];
}

export async function addFavorite(galleryItemId) {
  const response = await apiFetch(
    `/api/favorites/${encodeURIComponent(galleryItemId)}`,
    { method: "POST" },
  );
  return readJson(response);
}

export async function removeFavorite(galleryItemId) {
  const response = await apiFetch(
    `/api/favorites/${encodeURIComponent(galleryItemId)}`,
    { method: "DELETE" },
  );
  return readJson(response);
}
