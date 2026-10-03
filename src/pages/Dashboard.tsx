<<<<<<< HEAD
export default function Dashboard() {
=======
import React from "react";

import WelcomeHeader from "../pages/Dashborads/WelcomeHeader";
import WeeklyStreak from "../pages/Dashborads/WeeklyStreak";
import JournalPrompt from "../pages/Dashborads/JournalPrompt";
import MoodEnergyChart from "../pages/Dashborads/MoodEnergyChart";
import RecentThoughts from "../pages/Dashborads/RecentThoughts";

const Dashboard: React.FC = () => {
  const handleJournalClick = () => {
   // console.log("Open journal");
  };

>>>>>>> 4d1dff11266f24e1f0b5789875d11615c84388ad
  return (
    <main className="
      min-h-screen
      bg-[#f7eee3]
      px-3 py-4
      text-[#3d2920]
      sm:px-5
      lg:px-8
    ">

      <div className="mx-auto max-w-[1500px]">

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
};

export default Dashboard;