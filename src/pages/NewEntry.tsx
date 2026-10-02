import { ArrowLeft } from "lucide-react";
import TextBox from "../components/TestEditor";
import MoodSelector from "../components/MoodSelector";
import EnergySelector from "../components/EnergySelector";

function NewEntry() {
  return (
    <div className="w-full min-h-screen bg-[#FAEAD3] font-[Artifika] p-3 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 max-w-6xl mx-auto relative">
      
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
    </div>
  );
}

export default NewEntry;
