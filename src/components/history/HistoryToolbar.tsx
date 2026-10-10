import {
  ChevronDown,
  Globe,
  Grid2X2,
  Heart,
  ListIcon,
  Search,
  Trash,
} from "lucide-react";
import MoodFilter from "./MoodFilter";
import TagFilter from "./TagFilter";
import TimeFilter from "./TimeFilter";
import useDismissibleDropdown from "./useDismissibleDropdown";

type EntryFilter = "All Entries" | "Favorites";
type SortOrder = "Newest" | "Oldest";
type ViewMode = "List" | "Grid";

interface HistoryToolbarProps {
  input: string;
  onInputChange: (input: string) => void;
  entryFilter: EntryFilter;
  onEntryFilterChange: (filter: EntryFilter) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedMood: string;
  onMoodChange: (mood: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedTimeFilter: string;
  onTimeFilterChange: (filter: string) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
}

const entryFilters = [
  { icon: <Globe className="h-4 w-4" />, name: "All Entries" },
  { icon: <Heart className="h-4 w-4" />, name: "Favorites" },
  { icon: <Trash className="h-4 w-4" />, name: "Trash" },
] as const;

export default function HistoryToolbar({
  input,
  onInputChange,
  entryFilter,
  onEntryFilterChange,
  sortOrder,
  onSortOrderChange,
  viewMode,
  onViewModeChange,
  selectedMood,
  onMoodChange,
  selectedTags,
  onTagsChange,
  selectedTimeFilter,
  onTimeFilterChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: HistoryToolbarProps) {
  const {
    isOpen: isSortOpen,
    setIsOpen: setIsSortOpen,
    dropdownRef: sortDropdownRef,
  } = useDismissibleDropdown();

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-amber-600/40 bg-[#ffe6c3] p-3 shadow-md sm:gap-4 sm:p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none sm:gap-2 md:pb-0">
          {entryFilters.map((filter) => (
            <button
              key={filter.name}
              type="button"
              aria-pressed={
                filter.name === "Trash"
                  ? undefined
                  : entryFilter === filter.name
              }
              onClick={() => {
                if (filter.name !== "Trash") {
                  onEntryFilterChange(filter.name);
                }
              }}
              className={`flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                entryFilter === filter.name
                  ? "border-[#b87c38] bg-[#e8be89]/40 font-semibold text-[#3d2b1f] shadow-xs"
                  : "border-[#c5904a]/70 bg-transparent text-[#5a3825] hover:bg-[#fae4c8]"
              }`}
            >
              <span className="shrink-0">{filter.icon}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-2.5 sm:gap-3 md:justify-end">
          <div className="flex items-center gap-1.5 text-xs text-[#43190B] sm:gap-2 sm:text-sm">
            <span className="hidden text-[#825d45] xs:inline">Sort by:</span>
            <div className="relative" ref={sortDropdownRef}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
                aria-controls="sort-options"
                onClick={() => setIsSortOpen((open) => !open)}
                className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#c5904a] bg-[#fff6ec]/70 px-2.5 py-1.5 text-xs text-[#43190B] shadow-xs transition-colors hover:bg-[#fff6ec] sm:text-sm"
              >
                <span>{sortOrder}</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#825d45]" />
              </button>
              {isSortOpen && (
                <div
                  id="sort-options"
                  role="listbox"
                  aria-label="Sort entries"
                  className="absolute right-0 top-full z-30 mt-1.5 w-32 overflow-hidden rounded-xl border border-[#e8cfa6] bg-[#fdf5ed] py-1 shadow-md"
                >
                  {(["Newest", "Oldest"] as const).map((order) => (
                    <button
                      key={order}
                      type="button"
                      role="option"
                      aria-selected={sortOrder === order}
                      onClick={() => {
                        onSortOrderChange(order);
                        setIsSortOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm text-[#4c2d1c] transition-colors hover:bg-[#e6cda3]/70 ${
                        sortOrder === order
                          ? "bg-[#e6cda3]/60 font-semibold"
                          : ""
                      }`}
                    >
                      {order}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center rounded-xl border border-[#c5904a] bg-[#fff6ec]/40 p-1 text-[#43190B]">
            <button
              type="button"
              aria-label="List view"
              aria-pressed={viewMode === "List"}
              onClick={() => onViewModeChange("List")}
              className={`cursor-pointer rounded-lg p-1 transition-colors ${
                viewMode === "List"
                  ? "bg-[#e8be89]/50 text-[#3d2b1f]"
                  : "text-[#825d45] hover:text-[#3d2b1f]"
              }`}
            >
              <ListIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={viewMode === "Grid"}
              onClick={() => onViewModeChange("Grid")}
              className={`cursor-pointer rounded-lg p-1 transition-colors ${
                viewMode === "Grid"
                  ? "bg-[#e8be89]/50 text-[#3d2b1f]"
                  : "text-[#825d45] hover:text-[#3d2b1f]"
              }`}
            >
              <Grid2X2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-2.5 sm:gap-3 lg:flex-row lg:items-center">
        <label className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-[#c58b55] bg-[#f5ead8]/90 px-3 py-2 shadow-[inset_0_0_0_1px_rgba(144,94,59,0.08)] transition-all focus-within:ring-2 focus-within:ring-[#c58b55]/40">
          <Search className="h-4 w-4 shrink-0 text-[#7a4d35]" strokeWidth={2.5} />
          <input
            type="search"
            value={input}
            placeholder="Search entries..."
            onChange={(event) => onInputChange(event.target.value)}
            aria-label="Search entries"
            className="w-full min-w-0 bg-transparent text-xs text-[#3d2b1f] outline-none sm:text-sm"
          />
        </label>

        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5">
          <MoodFilter
            selectedMood={selectedMood}
            onMoodChange={onMoodChange}
          />
          <TagFilter selectedTags={selectedTags} onTagsChange={onTagsChange} />
          <TimeFilter
            selectedTimeFilter={selectedTimeFilter}
            onTimeFilterChange={onTimeFilterChange}
            startDate={startDate}
            onStartDateChange={onStartDateChange}
            endDate={endDate}
            onEndDateChange={onEndDateChange}
          />
        </div>
      </div>
    </div>
  );
}
