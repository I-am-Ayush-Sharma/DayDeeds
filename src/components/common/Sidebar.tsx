import Sidebarbg from "../../assets/images/sidebarbg.png";
import {
  BookOpen,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  LayoutGrid,
  Settings,
  Sun,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({
  isOpen,
  onNavigate,
}: {
  isOpen: boolean;
  onNavigate: () => void;
}) {
  return (
    <aside
      id="app-sidebar"
      aria-hidden={!isOpen}
      inert={!isOpen}
      style={{
        backgroundImage: `url(${Sidebarbg})`,
        backgroundSize: "100% 135%",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
      className={`fixed left-0 top-0 z-[100] flex h-screen w-[50vw] flex-col items-center justify-between bg-amber-600 transition-transform duration-300 ease-in-out md:w-[17%] ${
        isOpen ? "translate-x-0" : "pointer-events-none -translate-x-[150%]"
      }`}
    >
      <div className="flex h-full w-full flex-col px-[7%] py-1.5">
        <NavLink
          to="/"
          onClick={onNavigate}
          className="flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#f3bd7a] bg-linear-to-b from-[#ffd08b] to-[#dc914c] text-[#78421f] shadow-[0_2px_5px_#24140f80]"
        >
          <Sun size={20} strokeWidth={2.5} />
          <span className="font-serif text-sm lg:text-lg font-extrabold italic">
            DayDeeds
          </span>
        </NavLink>

        <nav aria-label="Main navigation" className="mt-2 flex flex-col gap-1">
          <NavLink
            to="/"
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex h-8 items-center gap-2 rounded-lg border px-2 text-xs transition-colors ${
                isActive
                  ? "border-[#795038] bg-[#4b2c20]/90 font-semibold text-[#e6b574]"
                  : "border-transparent text-[#e4c7a4] hover:bg-[#4b2c20]/55"
              }`
            }
          >
            <LayoutGrid size={14} strokeWidth={2} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/journal/new"
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex h-8 items-center gap-2 rounded-lg border px-2 text-xs transition-colors ${
                isActive
                  ? "border-[#795038] bg-[#4b2c20]/90 font-semibold text-[#e6b574]"
                  : "border-transparent text-[#e4c7a4] hover:bg-[#4b2c20]/55"
              }`
            }
          >
            <BookOpen size={14} strokeWidth={2} />
            <span>Journal</span>
          </NavLink>
          <NavLink
            to="/calendar"
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex h-8 items-center gap-2 rounded-lg border px-2 text-xs transition-colors ${
                isActive
                  ? "border-[#795038] bg-[#4b2c20]/90 font-semibold text-[#e6b574]"
                  : "border-transparent text-[#e4c7a4] hover:bg-[#4b2c20]/55"
              }`
            }
          >
            <CalendarDays size={14} strokeWidth={2} />
            <span>Calendar</span>
          </NavLink>
          <div className="flex h-8 items-center gap-2 rounded-lg px-2 text-xs text-[#e4c7a4]">
            <ChartNoAxesColumnIncreasing size={14} strokeWidth={2} />
            <span>Insights</span>
          </div>
        </nav>

        <div className="mt-auto flex h-8 shrink-0 items-center gap-2 rounded-lg px-2 text-xs text-[#e4c7a4]">
          <Settings size={14} strokeWidth={2} />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
