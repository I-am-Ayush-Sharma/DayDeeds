import React, { useMemo, useState } from "react";
import { useJournalEntries } from "../hooks/useJournalEntries";

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

const moodInfo: Record<string, { mood: CalendarEntry["mood"]; score: number }> = {
  Great: { mood: "energetic", score: 9 },
  Good: { mood: "happy", score: 7 },
  Okay: { mood: "calm", score: 5 },
  Low: { mood: "sad", score: 3 },
  Bad: { mood: "sad", score: 1 },
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
  const { entries, isLoading, error } = useJournalEntries();
  // Always default to the current active month (e.g., October, November)
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDay, setSelectedDay] =
    useState<CalendarDay | null>(null);

  const calendarEntries = useMemo<CalendarEntry[]>(
    () =>
      entries.map((entry) => ({
        id: entry.id,
        date: entry.date,
        title: entry.title,
        preview: entry.content.slice(0, 120),
        content: entry.content,
        mood: moodInfo[entry.mood].mood,
        moodScore: moodInfo[entry.mood].score,
        energyScore: entry.energy,
        words: entry.words,
      })),
    [entries],
  );

  const monthEntries = useMemo(
    () =>
      calendarEntries.filter((entry) => {
        const date = new Date(`${entry.date}T00:00:00`);
        return date.getFullYear() === currentMonth.getFullYear() &&
          date.getMonth() === currentMonth.getMonth();
      }),
    [calendarEntries, currentMonth],
  );

  const days = useMemo(
    () => getCalendarDays(currentMonth, calendarEntries),
    [currentMonth, calendarEntries],
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

          {error && (
            <p role="alert" className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          )}
          {isLoading && (
            <p className="mb-4 text-sm text-[#765d4c]">Loading your calendar...</p>
          )}

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
                entries={monthEntries}
              />

              <MonthMood entries={monthEntries} />

              <AIReflection
                month={currentMonth.toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
                entries={monthEntries}
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