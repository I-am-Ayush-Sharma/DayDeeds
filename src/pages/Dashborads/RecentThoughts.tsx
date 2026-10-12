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
  onViewAll?: () => void;
}

const RecentThoughts: React.FC<RecentThoughtsProps> = ({
  thoughts = [],
  onViewAll,
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

        <button onClick={onViewAll} className="
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

      {thoughts.length ? <div className="space-y-3">
        {thoughts.map((thought, index) => {
          const dateParts = thought.date.split(/[\s,]+/);
          const month = dateParts.length >= 3 ? dateParts[1] : dateParts[0] ?? "";
          const day = dateParts.length >= 3 ? dateParts[2] : dateParts[1] ?? "";
          return (
          <article
            key={`${thought.date}-${index}`}
            className="
              group relative overflow-hidden
              rounded-[20px]
              border border-[#dcc8b3]
              bg-linear-to-r from-[#fff8ed] to-[#f7ead9]
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
                  <span>{month.toUpperCase()}</span>
                  <span className="text-sm">{day}</span>
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
          );
        })}
      </div> : (
        <p className="rounded-2xl border border-[#dcc8b3] bg-[#fff8ed] p-5 text-sm text-[#765f51]">
          Your saved journal entries will appear here.
        </p>
      )}

      <button onClick={onViewAll} className="
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