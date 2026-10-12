import React from "react";

interface WeeklyStreakProps {
  streakDays: number;
  activeDays: boolean[];
}

interface Day {
  label: string;
}

const days: Day[] = [
  { label: "Mon" },
  { label: "Tue" },
  { label: "Wed" },
  { label: "Thu" },
  { label: "Fri" },
  { label: "Sat" },
  { label: "Sun" },
];

const WeeklyStreak: React.FC<WeeklyStreakProps> = ({ streakDays, activeDays }) => {
  return (
    <div className="group rounded-[24px] border border-[#d8c4b1] bg-[#f7ead8]/90 p-4 shadow-[0_8px_25px_rgba(80,45,25,0.08)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(80,45,25,0.14)] sm:p-5">

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wide text-[#76513b]">
          🔥 Weekly Streak
        </h3>

        <span className="rounded-full bg-[#ead7c1] px-2 py-1 text-[10px] font-semibold text-[#805b43]">
          {streakDays} {streakDays === 1 ? "DAY" : "DAYS"}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((day, index) => (
          <div
            key={day.label}
            className="flex flex-col items-center gap-1.5"
            style={{
              animationDelay: `${index * 80}ms`,
            }}
          >
            <div
              className={`
                flex h-9 w-9 items-center justify-center rounded-full
                border text-xs font-semibold
                transition-all duration-300
                sm:h-10 sm:w-10
                ${
                  activeDays[index]
                    ? "border-[#c99458] bg-gradient-to-br from-[#ffe0a9] to-[#eabf84] text-[#5d3a26] shadow-[0_4px_10px_rgba(180,120,55,0.25)] group-hover:scale-105"
                    : "border-[#c7b09b] bg-[#6d5b50] text-[#eee1d4]"
                }
              `}
            >
              {activeDays[index] ? "✓" : ""}
            </div>

            <span className="text-[10px] font-medium text-[#765f51]">
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyStreak;