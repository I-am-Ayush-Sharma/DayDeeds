import { apiFetch } from "./api";
import type { GetClerkToken, JournalEntry, JournalEntryInput } from "../Types/journal";

async function authorizationHeaders(getToken: GetClerkToken): Promise<HeadersInit> {
  const token = await getToken();
  if (!token) {
    throw new Error("Your session expired. Sign in again to continue.");
  }

  return { Authorization: `Bearer ${token}` };
}

export async function getJournalEntries(
  getToken: GetClerkToken,
  includeDrafts = false,
): Promise<JournalEntry[]> {
  const query = includeDrafts ? "?includeDrafts=true" : "";
  const headers = await authorizationHeaders(getToken);
  const response = await apiFetch<{ entries: JournalEntry[] }>(
    `/api/entries${query}`,
    { headers },
  );
  return response.entries;
}

export async function createJournalEntry(
  getToken: GetClerkToken,
  input: JournalEntryInput,
): Promise<JournalEntry> {
  const headers = await authorizationHeaders(getToken);
  const response = await apiFetch<{ entry: JournalEntry }>("/api/entries", {
    method: "POST",
    headers,
    body: JSON.stringify(input),
  });
  return response.entry;
}

export async function setJournalFavorite(
  getToken: GetClerkToken,
  id: string,
  isFavorite: boolean,
): Promise<JournalEntry> {
  const headers = await authorizationHeaders(getToken);
  const response = await apiFetch<{ entry: JournalEntry }>(
    `/api/entries/${encodeURIComponent(id)}/favorite`,
    { method: "PATCH", headers, body: JSON.stringify({ isFavorite }) },
  );
  return response.entry;
}

export async function deleteJournalEntry(
  getToken: GetClerkToken,
  id: string,
): Promise<void> {
  const headers = await authorizationHeaders(getToken);
  await apiFetch(`/api/entries/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers,
  });
}

export async function generateJournalReflection(
  getToken: GetClerkToken,
  month: string,
  entries: string[],
): Promise<string> {
  const headers = await authorizationHeaders(getToken);
  const response = await apiFetch<{ reflection: string }>("/api/ai/reflection", {
    method: "POST",
    headers,
    body: JSON.stringify({ month, entries }),
  });
  return response.reflection;
}
