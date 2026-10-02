import React from "react";

export default function EnergySelector() {
  return (
    <div className="mt-2 flex bg-[#FDF3E6] flex-col gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border-2 border-[#CEA174] shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 text-[#4E2811]">
        <h2 className="font-[Artifika] text-sm sm:text-base font-semibold">
          ⚡ Energy Level
        </h2>
        <p className="font-[Caveat] text-[#4E2811] text-base sm:text-xl">
          How much energy did you have today?
        </p>
      </div>

      {/* Track Bar */}
      <div className="w-full">
        <div className="relative bg-[#F1E2CF] w-full h-4 sm:h-5 rounded-full mt-1 border border-[#CEA174]/60">
          {/* Dots */}
          <div className="absolute inset-0 grid grid-cols-10 items-center">
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className="relative z-10 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-amber-800/30 rounded-full justify-self-center"
              />
            ))}
          </div>

          {/* Progress */}
          <div className="absolute inset-y-0 left-[2px] my-auto bg-[#F8B44B] w-[55%] h-2.5 sm:h-3 rounded-full" />

          {/* Thumb */}
          <div className="absolute flex justify-center items-center inset-y-0 my-auto left-[51%] -translate-x-1/2 bg-[#F4C277] border-2 border-[#794924] w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform">
            <div className="bg-[#794924] w-3 h-3 sm:w-4 sm:h-4 rounded-full" />
          </div>
        </div>

        {/* Levels */}
        <div className="grid grid-cols-10 text-[10px] sm:text-xs text-[#4E2811] mt-2 font-medium">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <span key={n} className="text-center">
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

