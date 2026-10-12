/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import { getJournalEntries } from "../services/journalService";
import type { JournalEntry } from "../Types/journal";

export function useJournalEntries(includeDrafts = false) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setEntries([]);
      setIsLoading(false);
      setError("Sign in to view your journal entries.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      setEntries(await getJournalEntries(getToken, includeDrafts));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load journal entries.");
    } finally {
      setIsLoading(false);
    }
  }, [getToken, includeDrafts, isLoaded, isSignedIn]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { entries, isLoading, error, refresh, getToken };
}
