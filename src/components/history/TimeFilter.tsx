import { ChevronDown, CalendarDays } from "lucide-react";
import useDismissibleDropdown from "./useDismissibleDropdown";

interface TimeFilterProps {
  selectedTimeFilter: string;
  onTimeFilterChange: (filter: string) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
}

const dateRanges = [
  "All Time",
  "Today",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
  "This Year",
  "Custom Range",
];

export default function TimeFilter({
  selectedTimeFilter,
  onTimeFilterChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: TimeFilterProps) {
  const { isOpen, setIsOpen, dropdownRef } = useDismissibleDropdown();

  return (
    <div className="relative min-w-0" ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-1.5 rounded-xl border border-[#c58b55] bg-[#f8efe3]/90 px-2 py-2 text-[#4c2d1c] shadow-xs transition-colors hover:bg-[#fff7ed] sm:gap-2.5 sm:px-3"
      >
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#cf8c48] bg-[#f4d5a1] text-[#7a4d35] sm:h-6 sm:w-6">
            <CalendarDays
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              strokeWidth={2.5}
            />
          </span>
          <span className="truncate text-xs font-medium sm:text-sm">
            {selectedTimeFilter}
          </span>
        </span>
        <ChevronDown className="h-3 w-3 shrink-0 text-[#7a4d35]" strokeWidth={2.5} />
      </button>
      {isOpen && (
        <div
          role="dialog"
          aria-label="Filter entries by date"
          className="absolute right-0 top-full z-30 mt-1.5 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-[#e8cfa6] bg-[#fdf5ed] shadow-md"
        >
          <div className="py-1">
            {dateRanges.map((range) => (
              <button
                key={range}
                type="button"
                aria-pressed={selectedTimeFilter === range}
                onClick={() => {
                  onTimeFilterChange(range);
                  if (range !== "Custom Range") {
                    onStartDateChange("");
                    onEndDateChange("");
                    setIsOpen(false);
                  }
                }}
                className={`w-full px-3 py-2 text-left text-sm text-[#4c2d1c] transition-colors hover:bg-[#e6cda3]/70 ${
                  selectedTimeFilter === range
                    ? "bg-[#e6cda3]/60 font-semibold"
                    : ""
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          {selectedTimeFilter === "Custom Range" && (
            <div className="space-y-2.5 border-t border-[#e8cfa6] p-3">
              <label className="flex flex-col gap-1 text-xs text-[#825d45]">
                From
                <input
                  type="date"
                  value={startDate}
                  max={endDate || undefined}
                  onChange={(event) => onStartDateChange(event.target.value)}
                  className="rounded-lg border border-[#c58b55]/70 bg-white/70 px-2 py-1.5 text-sm text-[#3d2b1f] outline-none focus:ring-2 focus:ring-[#c58b55]/40"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-[#825d45]">
                To
                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => onEndDateChange(event.target.value)}
                  className="rounded-lg border border-[#c58b55]/70 bg-white/70 px-2 py-1.5 text-sm text-[#3d2b1f] outline-none focus:ring-2 focus:ring-[#c58b55]/40"
                />
              </label>
              <button
                type="button"
                disabled={!startDate && !endDate}
                onClick={() => setIsOpen(false)}
                className="w-full rounded-lg bg-[#8a5b30] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#70451f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Apply date range
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
