import { useNavigate } from "react-router-dom";
import { useJournalEntries } from "../hooks/useJournalEntries";
import type { JournalEntry } from "../Types/journal";
import WelcomeHeader from "./Dashborads/WelcomeHeader";
import WeeklyStreak from "./Dashborads/WeeklyStreak";
import JournalPrompt from "./Dashborads/JournalPrompt";
import MoodEnergyChart from "./Dashborads/MoodEnergyChart";
import RecentThoughts from "./Dashborads/RecentThoughts";

export default function Dashboard() {
  const navigate = useNavigate();
  const { entries, isLoading, error } = useJournalEntries();
  const today = new Date();
  const dateKey = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const moodScore: Record<JournalEntry["mood"], number> = {
    Great: 9,
    Good: 7,
    Okay: 5,
    Low: 3,
    Bad: 1,
  };
  const entryDates = new Set(entries.map((entry) => entry.date));
  const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  const activeDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return entryDates.has(dateKey(date));
  });
  let streakDays = 0;
  const streakDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!entryDates.has(dateKey(streakDate))) {
    streakDate.setDate(streakDate.getDate() - 1);
  }
  while (entryDates.has(dateKey(streakDate))) {
    streakDays += 1;
    streakDate.setDate(streakDate.getDate() - 1);
  }
  const chartData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (6 - index));
    const entry = entries.find((item) => item.date === dateKey(date));
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      mood: entry ? moodScore[entry.mood] : 0,
      energy: entry?.energy ?? 0,
    };
  });
  const recentThoughts = entries.slice(0, 3).map((entry) => ({
    date: new Date(`${entry.date}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    time: entry.time,
    text: entry.content,
    mood: entry.mood,
    emoji: entry.mood === "Great" ? "😄" : entry.mood === "Good" ? "🙂" : entry.mood === "Bad" ? "😣" : entry.mood === "Low" ? "😕" : "😐",
  }));

  return (
    <main
      className="
      min-h-screen
      bg-[#f7eee3]
      px-3 py-4
      text-[#3d2920]
      sm:px-5
      lg:px-8
    "
    >
      <div className="mx-auto ">
        {/* Top section */}
        <div
          className="
          grid
          gap-4
          lg:grid-cols-[1fr_370px]
          lg:items-center
        "
        >
          <WelcomeHeader />

          <WeeklyStreak streakDays={streakDays} activeDays={activeDays} />
        </div>

        {/* Journal prompt */}
        <div className="mt-2">
          <JournalPrompt onClick={() => navigate("/journal/new")} />
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-xl bg-red-100 p-3 text-sm text-red-800">
            {error}
          </p>
        )}

        {/* Graph */}
        <div className="mt-5">
          <MoodEnergyChart data={chartData} onViewAll={() => navigate("/history")} />
        </div>

        {/* Recent thoughts */}
        {isLoading ? (
          <p className="mt-6 text-sm text-[#765f51]">Loading your journal...</p>
        ) : (
          <RecentThoughts
            thoughts={recentThoughts}
            onViewAll={() => navigate("/history")}
          />
        )}
      </div>
    </main>
  );
}
