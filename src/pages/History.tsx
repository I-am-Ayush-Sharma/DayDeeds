import { useState } from "react";
import { Entries } from "../Entries";
import {
  Globe,
  Heart,
  Trash,
  ChevronDown,
  ListIcon,
  Grid2X2,
  Search,
  Smile,
  Tags,
  CalendarDays,
} from "lucide-react";
import EntryCards from "../components/EntryCards";

function History() {
  const [input, setInput] = useState("");
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    console.log(e.target.value);
  }
  const Filters = [
    { icon: <Globe className="h-4 w-4" />, name: "All Entries" },
    { icon: <Heart className="h-4 w-4" />, name: "Favorites" },
    { icon: <Trash className="h-4 w-4" />, name: "Trash" },
  ];

  return (
    <section className="w-full min-h-full bg-[#FAEAD3] font-[Artifika] p-3.5 sm:p-5 md:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2">
        <div className="space-y-0.5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Caveat] font-bold text-[#3D2B1F] tracking-tight">
            Journal History
          </h1>
          <h2 className="text-sm sm:text-base md:text-lg font-bold font-[Caveat] text-[#825d45]">
            All your thoughts, in one place
          </h2>
        </div>
        <span className="text-xs sm:text-sm text-[#825d45] font-sans">
          {Entries.length} {Entries.length === 1 ? "entry" : "entries"} recorded
        </span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:gap-4 bg-[#ffe6c3] shadow-md border border-amber-600/40 p-3 sm:p-4 rounded-2xl">
        {/* Row 1: Filter tabs & Controls */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {Filters.map((a, index) => (
              <button
                key={a.name}
                type="button"
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium whitespace-nowrap rounded-xl py-1.5 px-3 border transition-colors cursor-pointer ${
                  index === 0
                    ? "bg-[#e8be89]/40 border-[#b87c38] text-[#3d2b1f] shadow-xs font-semibold"
                    : "border-[#c5904a]/70 text-[#5a3825] hover:bg-[#fae4c8] bg-transparent"
                }`}
              >
                <span className="shrink-0">{a.icon}</span>
                <span>{a.name}</span>
              </button>
            ))}
          </div>

          {/* Controls: Sort and View mode */}
          <div className="flex items-center justify-between md:justify-end gap-2.5 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#43190B]">
              <span className="text-[#825d45] hidden xs:inline">Sort by:</span>
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs sm:text-sm border rounded-xl py-1.5 px-2.5 border-[#c5904a] bg-[#fff6ec]/70 hover:bg-[#fff6ec] text-[#43190B] transition-colors cursor-pointer shadow-xs"
              >
                <span>Newest</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#825d45]" />
              </button>
            </div>

            <div className="flex items-center border rounded-xl p-1 border-[#c5904a] bg-[#fff6ec]/40 text-[#43190B]">
              <button
                type="button"
                aria-label="List view"
                className="p-1 rounded-lg bg-[#e8be89]/50 text-[#3d2b1f] transition-colors cursor-pointer"
              >
                <ListIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Grid view"
                className="p-1 rounded-lg text-[#825d45] hover:text-[#3d2b1f] transition-colors cursor-pointer"
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Search & Dropdown Filters */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 sm:gap-3">
          {/* Search Bar */}
          <div className="flex items-center gap-2.5 rounded-xl border border-[#c58b55] bg-[#f5ead8]/90 px-3 py-2 shadow-[inset_0_0_0_1px_rgba(144,94,59,0.08)] flex-1 min-w-0 focus-within:ring-2 focus-within:ring-[#c58b55]/40 transition-all">
            <Search
              className="h-4 w-4 shrink-0 text-[#7a4d35]"
              strokeWidth={2.5}
            />
            <input
              type="text"
              placeholder="Search entries..."
              onChange={handleInput}
              className="bg-transparent text-xs sm:text-sm text-[#3d2b1f]  outline-none w-full min-w-0"
            />
          </div>

          {/* Secondary Filter Dropdowns */}
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5">
            <button
              type="button"
              className="flex items-center justify-between gap-1.5 sm:gap-2.5 rounded-xl border border-[#c58b55] bg-[#f8efe3]/90 px-2 sm:px-3 py-2 text-[#4c2d1c] shadow-xs hover:bg-[#fff7ed] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5 min-w-0">
                <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border border-[#cf8c48] bg-[#f4d5a1] text-[#7a4d35]">
                  <Smile
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    strokeWidth={2.5}
                  />
                </span>
                <span className="text-xs sm:text-sm font-medium truncate">
                  All Mood
                </span>
              </span>
              <ChevronDown
                className="h-3 w-3 shrink-0 text-[#7a4d35]"
                strokeWidth={2.5}
              />
            </button>

            <button
              type="button"
              className="flex items-center justify-between gap-1.5 sm:gap-2.5 rounded-xl border border-[#c58b55] bg-[#f8efe3]/90 px-2 sm:px-3 py-2 text-[#4c2d1c] shadow-xs hover:bg-[#fff7ed] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5 min-w-0">
                <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border border-[#cf8c48] bg-[#f4d5a1] text-[#7a4d35]">
                  <Tags
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    strokeWidth={2.5}
                  />
                </span>
                <span className="text-xs sm:text-sm font-medium truncate">
                  All Tags
                </span>
              </span>
              <ChevronDown
                className="h-3 w-3 shrink-0 text-[#7a4d35]"
                strokeWidth={2.5}
              />
            </button>

            <button
              type="button"
              className="flex items-center justify-between gap-1.5 sm:gap-2.5 rounded-xl border border-[#c58b55] bg-[#f8efe3]/90 px-2 sm:px-3 py-2 text-[#4c2d1c] shadow-xs hover:bg-[#fff7ed] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5 min-w-0">
                <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border border-[#cf8c48] bg-[#f4d5a1] text-[#7a4d35]">
                  <CalendarDays
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    strokeWidth={2.5}
                  />
                </span>
                <span className="text-xs sm:text-sm font-medium truncate">
                  All Time
                </span>
              </span>
              <ChevronDown
                className="h-3 w-3 shrink-0 text-[#7a4d35]"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Entry Cards List */}
      <div className="flex flex-col gap-3.5 sm:gap-4">
        <EntryCards input={input} />
      </div>
    </section>
  );
}

export default History;
