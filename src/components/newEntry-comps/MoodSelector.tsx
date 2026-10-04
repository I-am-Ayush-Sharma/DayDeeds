import { useState } from "react";

const MOODS = [
  { label: "Great", emoji: "😄", tone: "#95FF80" },
  { label: "Good", emoji: "🙂", tone: "#E4FF76" },
  { label: "Okay", emoji: "😐", tone: "#FDFF70" },
  { label: "Low", emoji: "😕", tone: "#FFAC63" },
  { label: "Bad", emoji: "😣", tone: "#FB6F6F" },
];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string>("");

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

      <div className="flex items-center justify-between gap-1.5 sm:gap-3 pb-1 max-w-full overflow-x-hidden">
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.label;
          return (
            <button
              type="button"
              key={mood.label}
              onClick={() =>
                setSelectedMood((prev) =>
                  prev !== mood.label ? mood.label : "",
                )
              }
              style={{
                backgroundColor: isSelected ? `${mood.tone}66` : "#F3E5D5",
              }}
              className={`flex-1 min-w-12 sm:min-w-14 rounded-lg py-1.5 sm:py-2 px-1 text-center shadow-sm transition-all duration-200 cursor-pointer shrink-0 sm:shrink border-2 ${
                isSelected
                  ? "border-[#4E2811] shadow-md font-semibold ring-2 ring-[#4E2811]/15"
                  : "border-transparent opacity-75 hover:opacity-100 hover:scale-105"
              }`}
            >
              <div className="mb-0.5 sm:mb-1 text-lg sm:text-2xl leading-none">
                {mood.emoji}
              </div>
              <div className="font-[Artifika] text-[11px] sm:text-xs md:text-sm text-[#4E2811] truncate">
                {mood.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
