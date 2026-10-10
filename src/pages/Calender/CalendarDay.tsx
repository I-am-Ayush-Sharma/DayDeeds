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
        group relative min-h-26.5 overflow-hidden rounded-2xl
        border text-left sm:min-h-31.5
        transition-all duration-300
        ${
          day.currentMonth
            ? "border-[#dfcbb7] bg-[#fff8eb] hover:-translate-y-1 hover:border-[#c88b4b] hover:shadow-[0_10px_25px_rgba(100,55,25,0.12)]"
            : "border-transparent bg-[#f1e4d3]/40"
        }
        ${isToday ? "ring-2 ring-[#d99a55] ring-offset-2 ring-offset-[#f5e6d2]" : ""}
      `}
    >
      {/* Date */}
      <div className="absolute left-2 top-2 z-10">
        <span
          className={`
            flex h-7 w-7 items-center justify-center rounded-full
            text-xs font-bold
            ${
              isToday
                ? "bg-[#c77938] text-white"
                : "bg-[#fff8eb]/85 text-[#5d4030]"
            }
          `}
        >
          {day.date.getDate()}
        </span>
      </div>

      {/* Image */}
      {day.entry?.image && (
        <div className="absolute inset-x-2 bottom-2 top-10 overflow-hidden rounded-xl">
          <img
            src={day.entry.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}

      {/* Mood */}
      {day.entry && (
        <div className="absolute bottom-1.5 right-1.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#fff8eb] bg-[#f9e5c9] text-lg shadow-sm transition-transform group-hover:scale-105">
          <span aria-hidden="true">{moodEmoji[day.entry.mood]}</span>
          <span className="sr-only">{day.entry.mood} mood</span>
        </div>
      )}

      {/* Hover */}
      {day.currentMonth && (
        <div className="
          pointer-events-none absolute inset-0
          bg-linear-to-br from-[#e9ad6b]/0 to-[#e9ad6b]/0
          transition-all duration-300
          group-hover:from-[#e9ad6b]/10
          group-hover:to-transparent
        " />
      )}
    </button>
  );
};

export default CalendarDay;