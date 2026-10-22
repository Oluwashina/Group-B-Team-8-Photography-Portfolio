import { apiFetch, readJson } from "./http.js";

export async function fetchCurrentUser() {
  const response = await apiFetch("/api/auth/me");
  return readJson(response);
}

export async function signup(name, email, password) {
  const response = await apiFetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return readJson(response);
}

export async function login(email, password) {
  const response = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return readJson(response);
}

export async function logout() {
  const response = await apiFetch("/api/auth/logout", { method: "POST" });
  return readJson(response);
}
