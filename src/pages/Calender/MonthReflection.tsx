import React from "react";
import {
  FileText,
  Smile,
  Zap,
  Flame,
  PenLine,
} from "lucide-react";
import type { CalendarEntry } from "../../Types/calendar";

interface Props {
  monthName?: string;
  entries: CalendarEntry[];
}

const MonthReflection: React.FC<Props> = ({ monthName = "Month", entries }) => {
  const average = (values: number[]) =>
    values.length ? (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1) : "—";
  const dates = [...new Set(entries.map((entry) => entry.date))].sort();
  let bestStreak = 0;
  let currentStreak = 0;
  let previousDate: Date | undefined;
  for (const dateText of dates) {
    const date = new Date(`${dateText}T00:00:00`);
    currentStreak =
      previousDate && date.getTime() - previousDate.getTime() === 86_400_000
        ? currentStreak + 1
        : 1;
    bestStreak = Math.max(bestStreak, currentStreak);
    previousDate = date;
  }
  const stats = [
    {
      label: "Total Entries",
      value: String(entries.length),
      icon: <FileText size={20} />,
    },
    {
      label: "Average Mood",
      value: `${average(entries.map((entry) => entry.moodScore))}/10`,
      icon: <Smile size={20} />,
    },
    {
      label: "Average Energy",
      value: `${average(entries.map((entry) => entry.energyScore))}/10`,
      icon: <Zap size={20} />,
    },
    {
      label: "Best Streak",
      value: `${bestStreak} days`,
      icon: <Flame size={20} />,
    },
  ];

  return (
    <section className="
      rounded-[26px]
      border border-[#dcc4aa]
      bg-[#fff6e7]
      p-4
      shadow-[0_10px_30px_rgba(80,45,25,0.07)]
      sm:p-5
    ">

      <h2 className="
        font-serif text-xl
        font-semibold text-[#432a1e]
      ">
        {monthName} Reflection
      </h2>

      <div className="
        mt-4 grid grid-cols-2
        gap-2
      ">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="
              rounded-2xl
              border border-[#e3cfb8]
              bg-[#fffaf2]
              p-3
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-md
            "
          >
            <div className="text-[#b7753d]">
              {stat.icon}
            </div>

            <p className="
              mt-2 text-lg
              font-bold text-[#422b20]
            ">
              {stat.value}
            </p>

            <p className="
              text-[10px]
              text-[#8c715f]
            ">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="
        mt-3 flex
        items-center gap-3
        rounded-2xl
        bg-[#f1dfc7]
        p-3
      ">
        <PenLine
          size={24}
          className="text-[#9d6438]"
        />

        <div>
          <p className="text-lg font-bold text-[#432c21]">
            {entries.reduce((total, entry) => total + entry.words, 0).toLocaleString()}
          </p>

          <p className="text-[10px] text-[#876b58]">
            Words Written
          </p>
        </div>
      </div>
    </section>
  );
};

export default MonthReflection;