import { useState } from "react";
import { Entries } from "../Entries";
import EntryCards from "../components/EntryCards";
import HistoryToolbar from "../components/history/HistoryToolbar";

function History() {
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
        <span className="font-sans text-xs text-[#825d45] sm:text-sm">
          {Entries.length} {Entries.length === 1 ? "entry" : "entries"} recorded
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
      />

      <div
        className={
          viewMode === "Grid"
            ? "grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3"
            : "flex flex-col gap-3.5 sm:gap-4"
        }
      >
        <EntryCards
          input={input}
          moodFilter={selectedMood}
          tagFilters={selectedTags}
          timeFilter={selectedTimeFilter}
          startDate={customStartDate}
          endDate={customEndDate}
          sortOrder={sortOrder}
          viewMode={viewMode}
          favoritesOnly={entryFilter === "Favorites"}
        />
      </div>
    </section>
  );
}

export default History;
