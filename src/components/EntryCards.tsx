import { Entries } from "../Entries";
import { Heart, Smile, Zap, MoreVertical } from "lucide-react";

interface EntryCardsProps {
  input: string;
  moodFilter?: string;
  tagFilters?: string[];
  timeFilter?: string;
  startDate?: string;
  endDate?: string;
  sortOrder?: "Newest" | "Oldest";
  viewMode?: "List" | "Grid";
  favoritesOnly?: boolean;
}

function EntryCards({
  input,
  moodFilter = "All Mood",
  tagFilters = [],
  timeFilter = "All Time",
  startDate = "",
  endDate = "",
  sortOrder = "Newest",
  viewMode = "List",
  favoritesOnly = false,
}: EntryCardsProps) {
  const query = input.trim().toLowerCase();
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  const rangeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (timeFilter === "Last 7 Days") {
    rangeStart.setDate(rangeStart.getDate() - 6);
  } else if (timeFilter === "Last 30 Days") {
    rangeStart.setDate(rangeStart.getDate() - 29);
  } else if (timeFilter === "This Month") {
    rangeStart.setDate(1);
  } else if (timeFilter === "This Year") {
    rangeStart.setMonth(0, 1);
  }
  const rangeStartString = [
    rangeStart.getFullYear(),
    String(rangeStart.getMonth() + 1).padStart(2, "0"),
    String(rangeStart.getDate()).padStart(2, "0"),
  ].join("-");

  const filteredEntries = Entries.filter((entry) => {
    const matchesFavorite = !favoritesOnly || entry.isfavorite;
    const matchesMood =
      moodFilter === "All Mood" ||
      entry.mood.toLowerCase() === moodFilter.toLowerCase();
    const matchesQuery =
      query.length < 3 ||
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(query));
    const matchesTags =
      tagFilters.length === 0 ||
      tagFilters.some((tag) =>
        entry.tags.some(
          (entryTag) => entryTag.toLowerCase() === tag.toLowerCase(),
        ),
      );
    const matchesTime =
      timeFilter === "All Time" ||
      (timeFilter === "Custom Range" &&
        (!startDate || entry.date >= startDate) &&
        (!endDate || entry.date <= endDate)) ||
      (timeFilter === "Today" && entry.date === todayString) ||
      (timeFilter === "Last 7 Days" &&
        entry.date >= rangeStartString &&
        entry.date <= todayString) ||
      (timeFilter === "Last 30 Days" &&
        entry.date >= rangeStartString &&
        entry.date <= todayString) ||
      (timeFilter === "This Month" &&
        entry.date >= rangeStartString &&
        entry.date <= todayString) ||
      (timeFilter === "This Year" &&
        entry.date >= rangeStartString &&
        entry.date <= todayString);

    return (
      matchesFavorite &&
      matchesMood &&
      matchesQuery &&
      matchesTags &&
      matchesTime
    );
  });

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    const dateComparison = a.date.localeCompare(b.date);
    const timeToMinutes = (time: string) => {
      const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (!match) return 0;

      const [, hourText, minuteText, period] = match;
      const hour = Number(hourText) % 12;
      return (
        hour * 60 +
        Number(minuteText) +
        (period.toUpperCase() === "PM" ? 12 * 60 : 0)
      );
    };
    const comparison =
      dateComparison || timeToMinutes(a.time) - timeToMinutes(b.time);

    return sortOrder === "Newest" ? -comparison : comparison;
  });
  return (
    <>
      {sortedEntries.map((entry) => {
        const entryDate = new Date(`${entry.date}T00:00:00`);

        return (
          <article
            key={`${entry.date}-${entry.time}-${entry.title}`}
            className={`group relative flex flex-col gap-3 sm:gap-4 rounded-2xl border border-[#c58b55]/60 bg-[#fff8ed]/90 p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-shadow ${
              viewMode === "Grid"
                ? "min-w-0"
                : "md:flex-row md:items-stretch"
            }`}
          >
            {/* Mobile Top Header: Date, time, and quick actions */}
            <div
              className={`flex items-center justify-between border-b border-[#c58b55]/30 pb-2.5 ${
                viewMode === "Grid" ? "" : "md:hidden"
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-[#8b674f]">
                <span className="font-bold text-[#3d2b1f]">
                  {entryDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    weekday: "short",
                  })}
                </span>
                <span>•</span>
                <span>{entry.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label={
                    entry.isfavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  className="p-1 rounded-lg hover:bg-[#f5ead8] transition-colors cursor-pointer"
                >
                  <Heart
                    className={`h-4.5 w-4.5 ${
                      entry.isfavorite
                        ? "fill-[#8a3f2d] text-[#8a3f2d]"
                        : "text-[#7a4d35]"
                    }`}
                  />
                </button>
                <button
                  type="button"
                  aria-label="More options"
                  className="p-1 rounded-lg hover:bg-[#f5ead8] transition-colors cursor-pointer"
                >
                  <MoreVertical className="h-4.5 w-4.5 text-[#7a4d35]" />
                </button>
              </div>
            </div>

            {/* Media & Desktop Date Pillar */}
            <div
              className={`flex items-center gap-3.5 sm:gap-4 shrink-0 ${
                viewMode === "Grid" ? "w-full" : ""
              }`}
            >
              <img
                src={entry.thumbnail}
                alt={entry.title}
                className={`h-40 sm:h-44 rounded-xl object-cover shrink-0 ${
                  viewMode === "Grid"
                    ? "w-full"
                    : "w-full md:h-28 md:w-36 lg:h-32 lg:w-44"
                }`}
              />

              {/* Desktop/Tablet Date Column */}
              <div
                className={
                  viewMode === "Grid"
                    ? "hidden"
                    : "hidden h-24 w-16 shrink-0 flex-col items-center justify-center border-r border-[#c58b55]/40 pr-4 text-center text-[#8b674f] md:flex lg:h-28"
                }
              >
                <span className="text-xs uppercase font-medium tracking-wide">
                  {entryDate.toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="text-2xl font-bold text-[#3d2b1f] leading-none my-0.5">
                  {entryDate.getDate()}
                </span>
                <span className="text-xs">
                  {entryDate.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
                <span className="text-[11px] text-[#8b674f]/80 mt-1">
                  {entry.time}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="min-w-0 flex-1 flex flex-col justify-between gap-2.5 py-0.5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold italic text-[#3d2b1f] truncate group-hover:text-[#6e3e1b] transition-colors">
                  {entry.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-[#6f6259] leading-relaxed">
                  {entry.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {entry.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f3e4cf] px-2.5 py-0.5 text-xs text-[#493326] font-medium"
                  >
                    #{tag}
                  </span>
                ))}
                {entry.tags.length > 3 && (
                  <span className="rounded-full border border-[#c58b55]/60 px-2 py-0.5 text-xs text-[#493326]">
                    +{entry.tags.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Stats & Actions Area */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#c58b55]/30 pt-3 md:border-t-0 md:pt-0 md:flex-col md:items-end md:justify-between md:self-stretch md:pl-2">
              {/* Desktop Quick Actions */}
              <div className="hidden md:flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label={
                    entry.isfavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  className="p-1 rounded-lg hover:bg-[#f5ead8] transition-colors cursor-pointer"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      entry.isfavorite
                        ? "fill-[#8a3f2d] text-[#8a3f2d]"
                        : "text-[#7a4d35]"
                    }`}
                  />
                </button>
                <button
                  type="button"
                  aria-label="More options"
                  className="p-1 rounded-lg hover:bg-[#f5ead8] transition-colors cursor-pointer"
                >
                  <MoreVertical className="h-5 w-5 text-[#7a4d35]" />
                </button>
              </div>

              {/* Badges: Mood & Energy */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="flex items-center gap-1.5 rounded-full border border-[#e8c99e] bg-[#fff0d8] px-2.5 py-1 text-xs sm:text-sm font-medium text-[#4c2d1c]">
                  <Smile className="h-4 w-4 text-[#d88623]" />
                  <span className="capitalize">{entry.mood}</span>
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-[#d5dadd] bg-[#edf2f3] px-2.5 py-1 text-xs sm:text-sm font-medium text-[#4c2d1c]">
                  <Zap className="h-4 w-4 text-sky-500" />
                  <span>{entry.energy}/10</span>
                </span>
              </div>

              {/* Word Count */}
              <span className="text-xs text-[#8b674f] font-medium">
                {entry.words} words
              </span>
            </div>
          </article>
        );
      })}
    </>
  );
}

export default EntryCards;
