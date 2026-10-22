/** Base URL for the Express API. Empty in local dev uses Vite proxy (see vite.config.js). */
export function apiUrl(path) {
  const base = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalizedPath}` : normalizedPath;
}
