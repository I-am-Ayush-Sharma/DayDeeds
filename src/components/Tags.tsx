import { Tag, Plus } from "lucide-react";

export default function Tags() {
  return (
    <div className="w-full flex flex-col sm:flex-row items-start gap-2 sm:gap-3 border-t border-amber-600/40 pt-3 sm:pt-4 text-xs sm:text-sm">
      <div className="font-bold text-[#4E2811] flex items-center gap-1 shrink-0 mt-1">
        <Tag size={16} className="inline-block" /> Tags:
      </div>
      <div className="w-full flex-1">
        <input
          type="text"
          placeholder="Add a tag..."
          className="w-full bg-transparent text-black font-[Artifika] focus:outline-none border border-[#ddac75] px-3 py-1.5 rounded-lg text-xs sm:text-sm"
        />
        <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
          <span className="bg-[#F0DCC7] px-2.5 py-0.5 rounded-full border border-amber-700 text-xs flex items-center gap-1">
            #coding{" "}
            <Plus size={14} className="rotate-45 inline cursor-pointer" />
          </span>
          <span className="bg-[#F0DCC7] px-2.5 py-0.5 rounded-full border border-amber-700 text-xs flex items-center gap-1">
            #coding{" "}
            <Plus size={14} className="rotate-45 inline cursor-pointer" />
          </span>
          <span className="bg-[#F0DCC7] px-2.5 py-0.5 rounded-full border border-amber-700 text-xs flex items-center gap-1">
            #coding{" "}
            <Plus size={14} className="rotate-45 inline cursor-pointer" />
          </span>
        </div>
      </div>
    </div>
  );
}
