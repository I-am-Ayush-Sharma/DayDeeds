import React from "react";
import type { CalendarDay as CalendarDayType } from "../../Types/calendar";

interface Props {
  day: CalendarDayType;
  onClick: (day: CalendarDayType) => void;
}

const moodEmoji = {
  happy: "😊",
  calm: "🌿",
  focused: "⚡",
  sad: "🌧️",
  energetic: "☀️",
};

const CalendarDay: React.FC<Props> = ({ day, onClick }) => {
  const isToday =
    day.date.toDateString() === new Date().toDateString();

  return (
    <button
      onClick={() => onClick(day)}
      disabled={!day.currentMonth}
      className={`
        group relative min-h-[105px] overflow-hidden rounded-2xl
        border text-left
        transition-all duration-300
        sm:min-h-[125px]
        ${
          day.currentMonth
            ? "border-[#dfcbb7] bg-[#fff8eb] hover:-translate-y-1 hover:border-[#c88b4b] hover:shadow-[0_10px_25px_rgba(100,55,25,0.12)]"
            : "border-transparent bg-[#f1e4d3]/40"
        }
        ${isToday ? "ring-2 ring-[#d99a55] ring-offset-2 ring-offset-[#f5e6d2]" : ""}
      `}
    >
      {/* Date */}
      <div className="relative z-10 flex items-center justify-between p-2.5">
        <span
          className={`
            flex h-7 w-7 items-center justify-center rounded-full
            text-xs font-bold
            ${
              isToday
                ? "bg-[#c77938] text-white"
                : "text-[#5d4030]"
            }
          `}
        >
          {day.date.getDate()}
        </span>

        {day.entry && (
          <span className="text-sm">
            {moodEmoji[day.entry.mood]}
          </span>
        )}
      </div>

      {/* Image */}
      {day.entry?.image && (
        <div className="mx-2 overflow-hidden rounded-xl">
          <img
            src={day.entry.image}
            alt=""
            className="
              h-12 w-full object-cover
              transition-transform duration-500
              group-hover:scale-110
              sm:h-14
            "
          />
        </div>
      )}

      {/* Entry title */}
      {day.entry && (
        <div className="px-2.5 pb-2">
          <p className="mt-1 truncate text-[10px] font-semibold text-[#654433] sm:text-xs">
            {day.entry.title}
          </p>
        </div>
      )}

      {/* Hover */}
      {day.currentMonth && (
        <div className="
          pointer-events-none absolute inset-0
          bg-gradient-to-br from-[#e9ad6b]/0 to-[#e9ad6b]/0
          transition-all duration-300
          group-hover:from-[#e9ad6b]/10
          group-hover:to-transparent
        " />
      )}
    </button>
  );
};

export default CalendarDay;