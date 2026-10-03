import WelcomeHeader from "./Dashborads/WelcomeHeader";
import WeeklyStreak from "./Dashborads/WeeklyStreak";
import JournalPrompt from "./Dashborads/JournalPrompt";
import MoodEnergyChart from "./Dashborads/MoodEnergyChart";
import RecentThoughts from "./Dashborads/RecentThoughts";

export default function Dashboard() {
  const handleJournalClick = () => {
    console.log("Journal clicked");
  };

  return (
    <main className="
      min-h-screen
      bg-[#f7eee3]
      px-3 py-4
      text-[#3d2920]
      sm:px-5
      lg:px-8
    ">

      <div className="mx-auto max-w-375">

        {/* Top section */}
        <div className="
          grid
          gap-4
          lg:grid-cols-[1fr_370px]
          lg:items-center
        ">

          <WelcomeHeader />

          <WeeklyStreak />

        </div>

        {/* Journal prompt */}
        <div className="mt-2">
          <JournalPrompt onClick={handleJournalClick} />
        </div>

        {/* Graph */}
        <div className="mt-5">
          <MoodEnergyChart />
        </div>

        {/* Recent thoughts */}
        <RecentThoughts />

      </div>
    </main>
  );
}
