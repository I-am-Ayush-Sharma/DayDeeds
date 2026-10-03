import React from "react";

export interface Thought {
  date: string;
  time: string;
  text: string;
  mood: string;
  emoji: string;
}

interface RecentThoughtsProps {
  thoughts?: Thought[];
}

const defaultThoughts: Thought[] = [
  {
    date: "Sep 26, Friday",
    time: "10:45 AM",
    text: "Had a great morning walk today. The sun was shining and the air felt crisp. I finally finished the project I've been putting off.",
    mood: "Happy",
    emoji: "😊",
  },
  {
    date: "Sep 25, Thursday",
    time: "08:20 PM",
    text: "Spent some quiet time thinking about my goals and what I want to accomplish next.",
    mood: "Calm",
    emoji: "🌿",
  },
  {
    date: "Sep 24, Wednesday",
    time: "06:15 PM",
    text: "A productive day overall. Managed to finish most of the tasks I planned.",
    mood: "Focused",
    emoji: "⚡",
  },
];

const RecentThoughts: React.FC<RecentThoughtsProps> = ({
  thoughts = defaultThoughts,
}) => {
  return (
    <section className="mt-6">

      <div className="mb-4 flex items-center justify-between">
        <h2 className="
          font-serif text-3xl
          font-semibold text-[#43291e]
          sm:text-4xl
        ">
          Recent Thoughts
        </h2>

        <button className="
          hidden rounded-xl
          bg-[#ead5bd]
          px-4 py-2
          text-xs font-semibold
          text-[#704b36]
          transition-all duration-300
          hover:-translate-y-0.5
          hover:bg-[#dfc09f]
          sm:block
        ">
          View journal →
        </button>
      </div>

      <div className="space-y-3">
        {thoughts.map((thought, index) => (
          <article
            key={`${thought.date}-${index}`}
            className="
              group relative overflow-hidden
              rounded-[20px]
              border border-[#dcc8b3]
              bg-gradient-to-r from-[#fff8ed] to-[#f7ead9]
              p-4
              shadow-[0_6px_20px_rgba(80,45,25,0.06)]
              transition-all duration-500
              hover:-translate-y-1
              hover:shadow-[0_12px_28px_rgba(80,45,25,0.12)]
            "
            style={{
              animationDelay: `${index * 120}ms`,
            }}
          >

            {/* Hover shine */}
            <div className="
              pointer-events-none
              absolute -left-20 top-0
              h-full w-20
              rotate-12
              bg-white/30
              blur-md
              transition-all duration-700
              group-hover:left-[110%]
            " />

            <div className="relative flex gap-3 sm:gap-5">

              {/* Date */}
              <div className="
                hidden w-24 shrink-0
                border-r border-[#dbc5af]
                pr-4
                sm:block
              ">
                <p className="text-sm font-bold text-[#4a3025]">
                  {thought.date}
                </p>

                <p className="mt-1 text-[11px] text-[#927a69]">
                  {thought.time}
                </p>
              </div>

              {/* Mobile date */}
              <div className="sm:hidden">
                <div className="
                  flex h-11 w-11
                  flex-col items-center
                  justify-center
                  rounded-xl
                  bg-[#ead0af]
                  text-[8px]
                  font-bold
                  text-[#65422f]
                ">
                  <span>SEP</span>
                  <span className="text-sm">26</span>
                </div>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">

                <p className="
                  text-sm leading-6
                  text-[#4d3a31]
                  sm:text-[15px]
                ">
                  {thought.text}
                </p>

                <span className="
                  mt-3 inline-flex
                  items-center gap-1
                  rounded-full
                  border border-[#e2c89f]
                  bg-[#f8e4bf]
                  px-2.5 py-1
                  text-[10px]
                  font-semibold
                  text-[#855e35]
                ">
                  {thought.emoji} {thought.mood}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button className="
        mt-4 w-full
        rounded-xl
        border border-[#d8c1aa]
        bg-[#f9efe2]
        py-3
        text-sm font-semibold
        text-[#76513c]
        transition-all duration-300
        hover:bg-[#ead8c3]
        sm:hidden
      ">
        View journal →
      </button>
    </section>
  );
};

export default RecentThoughts;