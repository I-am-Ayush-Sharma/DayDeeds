import { ChevronDown, Smile } from "lucide-react";
import { Entries } from "../../Entries";
import useDismissibleDropdown from "./useDismissibleDropdown";

interface MoodFilterProps {
  selectedMood: string;
  onMoodChange: (mood: string) => void;
}

export default function MoodFilter({
  selectedMood,
  onMoodChange,
}: MoodFilterProps) {
  const { isOpen, setIsOpen, dropdownRef } = useDismissibleDropdown();
  const moods = [
    "All Mood",
    ...new Set([
      "Great",
      "Good",
      "Okay",
      "Low",
      "Bad",
      ...Entries.map(
        ({ mood }) => mood.charAt(0).toUpperCase() + mood.slice(1),
      ),
    ]),
  ];

  return (
    <div className="relative min-w-0" ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="mood-filter-options"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-1.5 rounded-xl border border-[#c58b55] bg-[#f8efe3]/90 px-2 py-2 text-[#4c2d1c] shadow-xs transition-colors hover:bg-[#fff7ed] sm:gap-2.5 sm:px-3"
      >
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#cf8c48] bg-[#f4d5a1] text-[#7a4d35] sm:h-6 sm:w-6">
            <Smile className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
          </span>
          <span className="truncate text-xs font-medium sm:text-sm">
            {selectedMood}
          </span>
        </span>
        <ChevronDown className="h-3 w-3 shrink-0 text-[#7a4d35]" strokeWidth={2.5} />
      </button>
      {isOpen && (
        <div
          id="mood-filter-options"
          role="listbox"
          aria-label="Filter entries by mood"
          className="absolute left-0 top-full z-20 mt-1.5 w-full min-w-[140px] overflow-hidden rounded-xl border border-[#e8cfa6] bg-[#fdf5ed] shadow-md"
        >
          <ul className="py-1">
            {moods.map((mood) => (
              <li key={mood}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selectedMood === mood}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[#e6cda3] hover:text-[#4a3525] focus:outline-none focus-visible:bg-[#e6cda3] ${
                    selectedMood === mood ? "bg-[#e6cda3]/60 font-semibold" : ""
                  }`}
                  onClick={() => {
                    onMoodChange(mood);
                    setIsOpen(false);
                  }}
                >
                  {mood}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
