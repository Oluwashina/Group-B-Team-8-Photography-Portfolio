import { apiUrl } from "./config.js";

export async function apiFetch(path, options = {}) {
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };

  const response = await fetch(apiUrl(path), {
    ...options,
    headers,
    credentials: "include",
  });

  return response;
}

export async function readJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      typeof data.error === "string" ? data.error : "Request failed";
    throw new Error(message);
  }
  return data;
}
