import { apiFetch } from "./api";

export type User = {
  id: string;
  email: string;
  displayName: string;
  role: "user" | "admin";
};

export type AuthResponse = {
  user: User;
  message?: string;
};

export async function getCsrfToken(): Promise<string> {
  const data = await apiFetch<{ csrfToken: string }>("/api/auth/csrf");

  document.cookie = `csrf_token=${data.csrfToken}; path=/; samesite=lax`;
  return data.csrfToken;
}

export async function registerUser(input: {
  email: string;
  password: string;
  displayName: string;
}) {
  await getCsrfToken();
  return apiFetch<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function loginUser(input: { email: string; password: string }) {
  await getCsrfToken();
  return apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function logoutUser() {
  return apiFetch<{ message: string }>("/api/auth/logout", { method: "POST" });
}

export async function getCurrentUser() {
  return apiFetch<{ user: User }>("/api/auth/me");
}
