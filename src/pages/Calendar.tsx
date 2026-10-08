import React, { useMemo, useState } from "react";

import CalendarHeader from "../pages/Calender/CalendarHeader";
import CalendarGrid from "../pages/Calender/CalendarGrid";
import DayDetailsModal from "../pages/Calender/DayDetailsModal";
import MonthReflection from "../pages/Calender/MonthReflection";
import MonthMood from "../pages/Calender/MonthMood";
import AIReflection from "../pages/Calender/AIReflection";

import type {
  CalendarDay,
  CalendarEntry,
} from "../Types/calendar";

const getSampleEntries = (month: Date): CalendarEntry[] => {
  const year = month.getFullYear();
  const monthStr = String(month.getMonth() + 1).padStart(2, "0");

  return [
    {
      id: "1",
      date: `${year}-${monthStr}-01`,
      title: "A fresh beginning",
      preview: `Started ${month.toLocaleDateString("en-US", { month: "long" })} with a clear mind.`,
      content:
        "Today felt like a fresh beginning. I started the month with a clear mind and a positive attitude.",
      mood: "happy",
      moodScore: 8,
      energyScore: 7,
      words: 342,
    },
    {
      id: "2",
      date: `${year}-${monthStr}-04`,
      title: "Quiet morning",
      preview: "A peaceful morning with coffee.",
      content:
        "Had a peaceful morning today. Coffee, some music and a little time away from everything.",
      mood: "calm",
      moodScore: 8,
      energyScore: 6,
      words: 280,
    },
    {
      id: "3",
      date: `${year}-${monthStr}-08`,
      title: "Small wins",
      preview: "Finished some important work.",
      content:
        "Today reminded me that small wins matter. Finished several things I had been delaying.",
      mood: "focused",
      moodScore: 7,
      energyScore: 8,
      words: 410,
    },
    {
      id: "4",
      date: `${year}-${monthStr}-18`,
      title: "A beautiful day",
      preview: "Morning walk and good thoughts.",
      content:
        "Had a great morning walk today. The sun was shining and the air felt crisp. I finally finished the project I've been putting off.",
      mood: "happy",
      moodScore: 9,
      energyScore: 9,
      words: 530,
    },
  ];
};

const getCalendarDays = (
  month: Date,
  entries: CalendarEntry[]
): CalendarDay[] => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const daysInMonth = new Date(
    year,
    monthIndex + 1,
    0
  ).getDate();

  const days: CalendarDay[] = [];

  // Current month only - no previous or next month extra days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, monthIndex, i);

    const yearStr = date.getFullYear();
    const monthStr = String(date.getMonth() + 1).padStart(2, "0");
    const dayStr = String(date.getDate()).padStart(2, "0");
    const dateString = `${yearStr}-${monthStr}-${dayStr}`;

    const entry = entries.find(
      (item) => item.date === dateString
    );

    days.push({
      date,
      currentMonth: true,
      entry,
    });
  }

  return days;
};

const Calendar: React.FC = () => {
  // Always default to the current active month (e.g., October, November)
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDay, setSelectedDay] =
    useState<CalendarDay | null>(null);

  const days = useMemo(
    () =>
      getCalendarDays(
        currentMonth,
        getSampleEntries(currentMonth)
      ),
    [currentMonth]
  );

  const previousMonth = () => {
    setCurrentMonth(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() - 1,
          1
        )
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() + 1,
          1
        )
    );
  };

  const goToday = () => {
    const today = new Date();

    setCurrentMonth(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );
  };

  return (
    <>
      <main className="
        min-h-screen
        bg-[#f6eadb]
        px-3 py-4
        sm:px-5
        lg:px-8
      ">

        <div className="
          mx-auto max-w-[1500px]
        ">

          <CalendarHeader
            month={currentMonth}
            onPrevious={previousMonth}
            onNext={nextMonth}
            onToday={goToday}
          />

          <div className="
            grid gap-5
            xl:grid-cols-[minmax(0,1fr)_330px]
          ">

            {/* Calendar */}
            <CalendarGrid
              days={days}
              onDayClick={setSelectedDay}
            />

            {/* Right panel */}
            <aside>
              <MonthReflection
                monthName={currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                })}
              />

              <MonthMood />

              <AIReflection
                month={currentMonth.toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              />
            </aside>
          </div>
        </div>
      </main>

      <DayDetailsModal
        day={selectedDay}
        onClose={() => setSelectedDay(null)}
      />
    </>
  );
};

export default Calendar;