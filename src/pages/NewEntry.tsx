import { ArrowLeft, Sparkles, Bookmark, FileText } from "lucide-react";
import TextBox from "../components/newEntry-comps/TextEditor";
import MoodSelector from "../components/newEntry-comps/MoodSelector";
import EnergySelector from "../components/newEntry-comps/EnergySelector";

function NewEntry() {
  return (
    <form className="w-full min-h-screen bg-[#FAEAD3] font-[Artifika] p-3 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 mx-auto relative">
      {/* Back Button */}
      <div>
        <button
          type="button"
          className="bg-[#EDCFAB] text-black text-xs sm:text-sm py-1 px-3 sm:px-4 rounded-full border-2 border-[#CEA174] flex justify-center items-center gap-1.5 hover:bg-[#e2bd90] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Back
        </button>
      </div>

      {/* Head text */}
      <div className="space-y-0.5 sm:space-y-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Caveat] font-bold text-[#3D2B1F]">
          Today's Journal
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl font-bold font-[Caveat] text-[#825d45]">
          A new day, a new story. What's on your mind?
        </h2>
      </div>

      {/* Text Box Input */}
      <TextBox />

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Mood Selector */}
        <MoodSelector />
        {/* Energy Selector */}
        <EnergySelector />
      </div>
      {/* Bottom Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        {/* Rewrite with AI Button */}
        <button
          type="button"
          className="group relative rounded-xl border border-[#D4A373]/90 bg-[#F7E7D4] p-1 shadow-sm hover:bg-[#edd8be] active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#C89B6D] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[#4E2811]">
            <Sparkles size={18} className="text-[#4E2811] shrink-0" />
            <span className="font-[Caveat] text-lg sm:text-xl font-bold tracking-wide">
              Rewrite with AI
            </span>
          </div>
        </button>

        {/* Save as Draft Button */}
        <button
          type="button"
          className="group relative rounded-xl border border-[#D4A373]/90 bg-[#F7E7D4] p-1 shadow-sm hover:bg-[#edd8be] active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#C89B6D] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[#4E2811]">
            <FileText size={18} className="text-[#4E2811] shrink-0" />
            <span className="font-[Caveat] text-lg sm:text-xl font-bold tracking-wide">
              Save as Draft
            </span>
          </div>
        </button>

        {/* Save Entry / Submit Button */}
        <button
          type="submit"
          className="group relative rounded-xl border border-[#231208] bg-[#341D0F] p-1 shadow-md hover:bg-[#432615] active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#8E5E3B]/90 px-4 sm:px-5 py-1.5 sm:py-2 text-[#F7D184]">
            <Bookmark size={18} className="text-[#F7D184] shrink-0" />
            <span className="font-[Caveat] text-lg sm:text-xl font-bold tracking-wide">
              Save Entry
            </span>
          </div>
        </button>
      </div>
    </form>
  );
}

export default NewEntry;
