import React from "react";

const moods = [
  "😐",
  "🙂",
  "😊",
  "😊",
  "😄",
  "😄",
  "😊",
  "🙂",
  "😄",
  "😊",
  "😄",
  "😊",
  "😄",
  "😄",
  "😊",
];

const MonthMood: React.FC = () => {
  return (
    <section className="
      mt-4
      rounded-[24px]
      border border-[#dcc4aa]
      bg-[#fff6e7]
      p-5
      shadow-[0_10px_30px_rgba(80,45,25,0.06)]
    ">

      <div className="flex items-center gap-2">
        <span className="text-xl">☀️</span>

        <h3 className="
          font-serif text-lg
          font-semibold text-[#4b3022]
        ">
          Your Month in a Glance
        </h3>
      </div>

      <div className="
        mt-4 flex
        items-center justify-between
      ">
        <span className="text-xs font-semibold text-[#765a47]">
          Mood Trend
        </span>

        <span className="
          rounded-full
          bg-[#f0dfc6]
          px-2 py-1
          text-[9px] font-bold
          text-[#8b603d]
        ">
          Mostly positive!
        </span>
      </div>

      <div className="
        mt-3 flex
        items-center justify-between
        overflow-hidden
      ">
        {moods.map((mood, index) => (
          <span
            key={index}
            className="
              text-base
              transition-transform duration-300
              hover:scale-150
            "
          >
            {mood}
          </span>
        ))}
      </div>
    </section>
  );
};

export default MonthMood;