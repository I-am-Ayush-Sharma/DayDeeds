export type ApiErrorShape = {
  message?: string;
};

const buildUrl = (path: string) => {
  const baseUrl = import.meta.env.VITE_API_URL ?? "";
  return `${baseUrl}${path}`;
};

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  const csrfToken = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("csrf_token="))
    ?.split("=")[1];

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (csrfToken && !path.endsWith("/csrf")) {
    headers.set("X-CSRF-Token", csrfToken);
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    credentials: "include",
    headers,
  });

  const data = response.status === 204 ? {} : await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as ApiErrorShape)?.message ?? "Request failed");
  }

  return data as T;
}
