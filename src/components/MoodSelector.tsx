import React from "react";

export default function MoodSelector() {
  return (
    <div className="mt-2 flex bg-[#FDF3E6] flex-col gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border-2 border-[#CEA174] shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 text-[#4E2811]">
        <h2 className="font-[Artifika] text-sm sm:text-base font-semibold">
          😊 Mood
        </h2>
        <p className="font-[Caveat] text-[#4E2811] text-base sm:text-xl">
          How are you feeling today?
        </p>
      </div>

      <div className="flex items-center justify-between gap-1.5 sm:gap-3 overflow-x-auto pb-1 max-w-full">
        {[
          { label: "Great", emoji: "😄", selected: true, tone: "#F4D8A0" },
          { label: "Good", emoji: "🙂", selected: false, tone: "#F3E4C5" },
          { label: "Okay", emoji: "😐", selected: false, tone: "#F3E4C5" },
          { label: "Low", emoji: "😕", selected: false, tone: "#F3E4C5" },
          { label: "Bad", emoji: "😣", selected: false, tone: "#F7D7D1" },
        ].map((mood) => (
          <button
            type="button"
            key={mood.label}
            className="flex-1 min-w-[48px] sm:min-w-[56px] rounded-lg py-1.5 sm:py-2 px-1 text-center shadow-sm transition-all bg-[#F3E5D5] hover:bg-amber-100 hover:scale-105 active:scale-95 cursor-pointer shrink-0 sm:shrink"
          >
            <div className="mb-0.5 sm:mb-1 text-lg sm:text-2xl leading-none">
              {mood.emoji}
            </div>
            <div className="font-[Artifika] text-[11px] sm:text-xs md:text-sm text-[#4E2811] truncate">
              {mood.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

