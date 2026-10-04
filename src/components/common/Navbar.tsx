import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Search, Sidebar } from "lucide-react";

interface NavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

function Navbar({ isSidebarOpen, onToggleSidebar }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!searchContainerRef.current?.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSearchOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    searchInputRef.current?.focus();

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  return (
    <nav className="fixed left-0 top-0 z-50 h-14 w-full bg-[#F5E0C5]">
      <div
        className={`flex h-full items-center gap-4 px-4 transition-[margin,width] duration-300 sm:px-6 ${
          isSidebarOpen ? "ml-[17%] w-[83%]" : "ml-0 w-full"
        }`}
      >
        <button
          type="button"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isSidebarOpen}
          aria-controls="app-sidebar"
          onClick={onToggleSidebar}
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#563b2b] transition-colors hover:bg-[#7b5635]/10"
        >
          <Sidebar size={20} />
        </button>
        <div
          ref={searchContainerRef}
          className={`flex h-10 min-w-12 items-center overflow-hidden rounded-full border border-[#9d704d]/30 bg-[#fff8ed]/65 text-[#684b37] shadow-[inset_0_1px_2px_#6f4c3020] transition-[flex-grow,width] duration-300 ease-out ${
            isSearchOpen ? "min-w-0 flex-1" : "w-12 flex-none"
          }`}
        >
          <button
            type="button"
            aria-label={isSearchOpen ? "Close search" : "Open search"}
            aria-expanded={isSearchOpen}
            aria-controls="navbar-search-input"
            onClick={() => setIsSearchOpen((open) => !open)}
            className="flex size-12 shrink-0 items-center justify-center"
          >
            <Search size={20} aria-hidden="true" />
          </button>
          {isSearchOpen && (
            <input
              ref={searchInputRef}
              id="navbar-search-input"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search your entries, thoughts, or tags..."
              aria-label="Search your entries, thoughts, or tags"
              className="h-full min-w-0 flex-1 bg-transparent pr-4 text-sm outline-none placeholder:text-[#856d58]"
            />
          )}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-9 items-center justify-center rounded-full text-[#563b2b] transition-colors hover:bg-[#7b5635]/10"
          >
            <Bell size={20} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            aria-label="Account menu for Ayush"
            className="flex items-center gap-2 text-sm font-medium text-[#39291f]"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-[#8c5a38]/40 bg-[#b96f45] text-xs font-semibold text-white shadow-sm">
              A
            </span>
            <span className="hidden sm:inline">Ayush</span>
            <ChevronDown size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
