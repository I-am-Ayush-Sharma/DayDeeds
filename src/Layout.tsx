import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";


export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() =>
    window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      setIsSidebarOpen(event.matches);
    };

    desktopQuery.addEventListener("change", handleBreakpointChange);
    return () =>
      desktopQuery.removeEventListener("change", handleBreakpointChange);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-[#F5E0C5]">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
      />

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-[90] block bg-black/10 backdrop-blur-sm md:hidden"
        />
      )}

      <div className="flex h-full pt-14">
        <Sidebar
          isOpen={isSidebarOpen}
          onNavigate={() => {
            if (!window.matchMedia("(min-width: 768px)").matches) {
              setIsSidebarOpen(false);
            }
          }}
        />

        <main
          className={`h-full overflow-y-auto transition-[margin,width] duration-300 ${
            isSidebarOpen ? "md:ml-[17%] md:w-[83%]" : "w-full"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}