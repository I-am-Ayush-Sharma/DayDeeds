import React from "react";
import { ArrowRight, Coffee, Feather, Watch } from "lucide-react";

interface JournalPromptProps {
  onClick?: () => void;
}

const JournalPrompt: React.FC<JournalPromptProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        group relative w-full overflow-hidden rounded-[22px]
        border border-[#d8c3ae]
        bg-[#fff9f0]
        p-4 text-left
        shadow-[0_8px_25px_rgba(80,45,25,0.08)]
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[0_15px_35px_rgba(80,45,25,0.14)]
        sm:p-5
      "
    >
      {/* Animated glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-300/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />

      <div className="relative flex items-center gap-4">

        <div className="
          flex h-12 w-12 shrink-0 items-center justify-center
          rounded-2xl bg-[#e6b06b]
          text-[#5c351f]
          shadow-[0_5px_15px_rgba(190,125,55,0.25)]
          transition-transform duration-500
          group-hover:rotate-[-8deg] group-hover:scale-110
        ">
          <Feather size={23} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#a1785b]">
            Today's journal
          </p>

          <h3 className="mt-0.5 truncate text-base font-medium text-[#4a3024] sm:text-lg">
            Write today's journal entry...
          </h3>
        </div>

        <div className="hidden items-center gap-3 text-[#806b5d] sm:flex">
          <Watch size={25} />
          <Coffee size={23} />

          <span className="rounded-xl bg-[#f2dfc8] px-4 py-2 text-xs font-semibold text-[#714d37]">
            Today
          </span>
        </div>

        <ArrowRight
          size={20}
          className="
            text-[#a36c3d]
            transition-all duration-300
            group-hover:translate-x-1
          "
        />
      </div>
    </button>
  );
};

export default JournalPrompt;