import { apiUrl } from "./config.js";

export async function fetchGalleryItems() {
  const response = await fetch(apiUrl("/api/gallery"));

  if (!response.ok) {
    throw new Error(`Gallery request failed (${response.status})`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Gallery response was not an array");
  }

  return data;
}
