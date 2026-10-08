import React from "react";
import CalendarDay from "./CalendarDay";
import type { CalendarDay as CalendarDayType } from "../../Types/calendar";

interface Props {
  days: CalendarDayType[];
  onDayClick: (day: CalendarDayType) => void;
}

const weekdays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const CalendarGrid: React.FC<Props> = ({
  days,
  onDayClick,
}) => {
  // Monday = 0, Tuesday = 1, ... Sunday = 6
  const startOffset = days.length > 0 ? (days[0].date.getDay() + 6) % 7 : 0;

  return (
    <div className="
      rounded-[26px]
      border border-[#dbc5ad]
      bg-[#fff5e5]/90
      p-3
      shadow-[0_12px_35px_rgba(80,45,25,0.08)]
      sm:p-5
    ">

      {/* Weekdays */}
      <div className="
        mb-3
        grid grid-cols-7
        gap-2
      ">
        {weekdays.map((day) => (
          <div
            key={day}
            className="
              py-2 text-center
              text-[10px] font-bold
              uppercase tracking-wider
              text-[#876653]
              sm:text-xs
            "
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar: Only this month's days, no extra days from other months */}
      <div className="
        grid grid-cols-7
        gap-1.5
        sm:gap-2
      ">
        {Array.from({ length: startOffset }).map((_, i) => (
          <div
            key={`empty-${i}`}
            aria-hidden="true"
            className="min-h-[105px] sm:min-h-[125px] rounded-2xl border border-transparent bg-transparent pointer-events-none"
          />
        ))}

        {days.map((day, index) => (
          <CalendarDay
            key={`${day.date.toISOString()}-${index}`}
            day={day}
            onClick={onDayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;