import { useState } from "react";
import { useAuth } from "@clerk/react";
import { useLocation, useNavigate } from "react-router-dom";
import EntryCards from "../components/EntryCards";
import HistoryToolbar from "../components/history/HistoryToolbar";
import { useJournalEntries } from "../hooks/useJournalEntries";
import { deleteJournalEntry, setJournalFavorite } from "../services/journalService";
import type { JournalEntry } from "../Types/journal";

function History() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { entries, isLoading, error, refresh } = useJournalEntries(true);
  const [actionError, setActionError] = useState("");
  const [input, setInput] = useState("");
  const [entryFilter, setEntryFilter] = useState<"All Entries" | "Favorites">(
    "All Entries",
  );
  const [selectedMood, setSelectedMood] = useState("All Mood");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("All Time");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState<"Newest" | "Oldest">("Newest");
  const [viewMode, setViewMode] = useState<"List" | "Grid">("List");
  const notice = (location.state as { notice?: string } | null)?.notice;

  const toggleFavorite = async (entry: JournalEntry) => {
    setActionError("");
    try {
      await setJournalFavorite(getToken, entry.id, !entry.isFavorite);
      await refresh();
    } catch (actionFailure) {
      setActionError(actionFailure instanceof Error ? actionFailure.message : "Could not update the favorite.");
    }
  };

  const removeEntry = async (entry: JournalEntry) => {
    if (!window.confirm("Delete this journal entry? This cannot be undone.")) return;
    setActionError("");
    try {
      await deleteJournalEntry(getToken, entry.id);
      await refresh();
    } catch (actionFailure) {
      setActionError(actionFailure instanceof Error ? actionFailure.message : "Could not delete the entry.");
    }
  };

  return (
    <section className="mx-auto flex min-h-full w-full max-w-7xl flex-col gap-4 bg-[#FAEAD3] p-3.5 font-[Artifika] sm:gap-6 sm:p-5 md:p-6 lg:p-8">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
        <div className="space-y-0.5">
          <h1 className="text-3xl font-bold tracking-tight text-[#3D2B1F] sm:text-4xl md:text-5xl font-[Caveat]">
            Journal History
          </h1>
          <h2 className="text-sm font-bold text-[#825d45] sm:text-base md:text-lg font-[Caveat]">
            All your thoughts, in one place
          </h2>
        </div>
        <button
          type="button"
          onClick={() => navigate("/journal/new")}
          className="w-fit rounded-xl bg-[#341D0F] px-4 py-2 text-sm font-semibold text-[#F7D184] transition hover:bg-[#432615]"
        >
          Write an entry
        </button>
        <span className="font-sans text-xs text-[#825d45] sm:text-sm">
          {entries.length} {entries.length === 1 ? "entry" : "entries"} recorded
        </span>
      </header>

      <HistoryToolbar
        input={input}
        onInputChange={setInput}
        entryFilter={entryFilter}
        onEntryFilterChange={setEntryFilter}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedMood={selectedMood}
        onMoodChange={setSelectedMood}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        selectedTimeFilter={selectedTimeFilter}
        onTimeFilterChange={setSelectedTimeFilter}
        startDate={customStartDate}
        onStartDateChange={setCustomStartDate}
        endDate={customEndDate}
        onEndDateChange={setCustomEndDate}
        entries={entries}
      />

      {(error || actionError) && (
        <p role="alert" className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-800">
          {error || actionError}
        </p>
      )}
      {notice && (
        <p role="status" className="rounded-lg bg-green-100 px-3 py-2 text-sm text-green-800">
          {notice}
        </p>
      )}

      {isLoading ? (
        <p className="py-8 text-center text-sm text-[#765d4c]">Loading your entries...</p>
      ) : entries.length === 0 ? (
        <div className="rounded-2xl border border-[#c58b55]/40 bg-[#fff8ed] p-8 text-center">
          <p className="text-lg font-semibold text-[#3d2b1f]">No journal entries yet</p>
          <p className="mt-1 text-sm text-[#765d4c]">Your saved entries and drafts will show up here.</p>
        </div>
      ) : <div
        className={
          viewMode === "Grid"
            ? "grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3"
            : "flex flex-col gap-3.5 sm:gap-4"
        }
      >
        <EntryCards
          entries={entries}
          input={input}
          moodFilter={selectedMood}
          tagFilters={selectedTags}
          timeFilter={selectedTimeFilter}
          startDate={customStartDate}
          endDate={customEndDate}
          sortOrder={sortOrder}
          viewMode={viewMode}
          favoritesOnly={entryFilter === "Favorites"}
          onFavoriteChange={(entry) => void toggleFavorite(entry)}
          onDelete={(entry) => void removeEntry(entry)}
        />
      </div>}
    </section>
  );
}

export default History;
