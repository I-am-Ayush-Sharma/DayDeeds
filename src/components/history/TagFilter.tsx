import { useMemo, useState } from "react";
import { ChevronDown, Search, Tags } from "lucide-react";
import { Entries } from "../../Entries";
import useDismissibleDropdown from "./useDismissibleDropdown";

interface TagFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function TagFilter({
  selectedTags,
  onTagsChange,
}: TagFilterProps) {
  const { isOpen, setIsOpen, dropdownRef } = useDismissibleDropdown();
  const [tagSearch, setTagSearch] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);
  const tags = useMemo(
    () =>
      Array.from(
        new Map(
          Entries.flatMap(({ tags: entryTags }) =>
            entryTags.map((tag) => [tag.toLowerCase(), tag] as const),
          ),
        ).values(),
      ).sort((a, b) => a.localeCompare(b)),
    [],
  );
  const matchingTags = tags.filter((tag) =>
    tag.toLowerCase().includes(tagSearch.trim().toLowerCase()),
  );
  const visibleTags =
    showAllTags || tagSearch.trim()
      ? matchingTags
      : matchingTags.slice(0, 5);

  const toggleTag = (tag: string) => {
    onTagsChange(
      selectedTags.includes(tag)
        ? selectedTags.filter((item) => item !== tag)
        : [...selectedTags, tag],
    );
  };

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
            <Tags className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
          </span>
          <span className="truncate text-xs font-medium sm:text-sm">
            {selectedTags.length ? `${selectedTags.length} Tags` : "All Tags"}
          </span>
        </span>
        <ChevronDown className="h-3 w-3 shrink-0 text-[#7a4d35]" strokeWidth={2.5} />
      </button>
      {isOpen && (
        <div
          role="dialog"
          aria-label="Filter entries by tags"
          className="absolute right-0 top-full z-30 mt-1.5 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-[#e8cfa6] bg-[#fdf5ed] shadow-md"
        >
          <div className="border-b border-[#e8cfa6] p-2.5">
            <label className="flex items-center gap-2 rounded-lg border border-[#c58b55]/70 bg-white/70 px-2.5 py-2 focus-within:ring-2 focus-within:ring-[#c58b55]/40">
              <Search className="h-4 w-4 shrink-0 text-[#7a4d35]" />
              <input
                type="search"
                value={tagSearch}
                onChange={(event) => setTagSearch(event.target.value)}
                placeholder="Search tags..."
                aria-label="Search tags"
                className="w-full min-w-0 bg-transparent text-sm text-[#3d2b1f] outline-none placeholder:text-[#8b674f]"
              />
            </label>
          </div>
          <div className="max-h-64 overflow-y-auto py-1">
            {visibleTags.length ? (
              visibleTags.map((tag) => (
                <label
                  key={tag}
                  className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm text-[#4c2d1c] transition-colors hover:bg-[#e6cda3]/70"
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                    className="h-4 w-4 accent-[#8a5b30]"
                  />
                  <span className="truncate">#{tag}</span>
                </label>
              ))
            ) : (
              <p className="px-3 py-3 text-sm text-[#825d45]">No tags found.</p>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-[#e8cfa6] px-3 py-2">
            {tags.length > 5 && !tagSearch.trim() ? (
              <button
                type="button"
                onClick={() => setShowAllTags((show) => !show)}
                className="text-sm font-medium text-[#70451f] hover:underline"
              >
                {showAllTags ? "Show less" : "Show more"}
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={() => onTagsChange([])}
              disabled={!selectedTags.length}
              className="text-sm font-medium text-[#70451f] hover:underline disabled:cursor-default disabled:opacity-50 disabled:no-underline"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
