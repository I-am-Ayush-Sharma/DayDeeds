import React from "react";

export interface MoodData {
  day: string;
  mood: number;
  energy: number;
}

interface MoodEnergyChartProps {
  data?: MoodData[];
}

const defaultData: MoodData[] = [
  { day: "Mon", mood: 3, energy: 4 },
  { day: "Tue", mood: 7, energy: 6 },
  { day: "Wed", mood: 2, energy: 3 },
  { day: "Thu", mood: 3, energy: 4 },
  { day: "Fri", mood: 4, energy: 5 },
  { day: "Sat", mood: 4, energy: 7 },
  { day: "Sun", mood: 7, energy: 8 },
];

const MoodEnergyChart: React.FC<MoodEnergyChartProps> = ({
  data = defaultData,
}) => {
  const width = 700;
  const height = 240;

  const getX = (index: number) =>
    (index / (data.length - 1)) * width;

  const getY = (value: number) =>
    height - (value / 10) * height;

  const moodPoints = data
    .map(
      (item, index) =>
        `${getX(index)},${getY(item.mood)}`
    )
    .join(" ");

  const energyPoints = data
    .map(
      (item, index) =>
        `${getX(index)},${getY(item.energy)}`
    )
    .join(" ");

  return (
    <section className="
      group relative overflow-hidden
      rounded-[28px]
      border border-[#39363a]
      bg-[#302d31]
      shadow-[0_15px_35px_rgba(45,30,20,0.18)]
      transition-all duration-500
      hover:shadow-[0_20px_45px_rgba(45,30,20,0.25)]
    ">

      {/* Header */}
      <div className="
        flex flex-col gap-3
        border-b border-white/6
        px-5 py-4
        sm:flex-row sm:items-center sm:justify-between
        sm:px-6
      ">

        <div className="flex items-center gap-3">
          <span className="
            rounded-xl bg-[#454147]
            px-3 py-2
            text-xs font-semibold text-[#e8d9cb]
          ">
            Weekly ↘
          </span>

          <span className="text-xs text-[#918781]">
            Mon - Sun
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-[#d8cbc0]">
          <span>😊 Mood</span>
          <span className="text-[#f6c76d]">⚡ Energy</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative px-4 pb-4 pt-5 sm:px-6 sm:pb-6">

        {/* Background glow */}
        <div className="
          pointer-events-none absolute
          left-1/3 top-1/3
          h-40 w-40
          rounded-full
          bg-[#f5bb6b]/5
          blur-3xl
        " />

        <div className="relative h-62.5 w-full">

          {/* Grid */}
          <div className="
            pointer-events-none
            absolute inset-0
            flex flex-col justify-between
            pb-7 pl-9
          ">
            {[10, 8, 6, 4, 2, 0].map((value) => (
              <div
                key={value}
                className="flex items-center gap-2"
              >
                <span className="w-5 text-[9px] text-[#8f8580]">
                  {value}
                </span>

                <div className="h-px flex-1 bg-white/6" />
              </div>
            ))}
          </div>

          {/* SVG */}
          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="
              absolute
              bottom-7 left-9
              h-[calc(100%-28px)]
              w-[calc(100%-36px)]
              overflow-visible
            "
          >

            <defs>
              <linearGradient
                id="moodGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#e7a35e" />
                <stop offset="50%" stopColor="#ffd27f" />
                <stop offset="100%" stopColor="#f2b45f" />
              </linearGradient>

              <linearGradient
                id="moodFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#f4bd70"
                  stopOpacity="0.22"
                />

                <stop
                  offset="100%"
                  stopColor="#f4bd70"
                  stopOpacity="0"
                />
              </linearGradient>

              <filter id="chartGlow">
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Area */}
            <polygon
              points={`0,${height} ${moodPoints} ${width},${height}`}
              fill="url(#moodFill)"
              className="animate-chart-area"
            />

            {/* Mood */}
            <polyline
              points={moodPoints}
              fill="none"
              stroke="url(#moodGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#chartGlow)"
              className="animate-chart-line"
            />

            {/* Energy */}
            <polyline
              points={energyPoints}
              fill="none"
              stroke="#68ddec"
              strokeWidth="2.5"
              strokeDasharray="7 7"
              strokeLinecap="round"
              opacity="0.65"
              className="animate-energy-line"
            />

            {/* Mood points */}
            {data.map((item, index) => (
              <g key={item.day}>

                <circle
                  cx={getX(index)}
                  cy={getY(item.mood)}
                  r="10"
                  fill="#ffd27f"
                  opacity="0.08"
                  className="animate-pulse"
                />

                <circle
                  cx={getX(index)}
                  cy={getY(item.mood)}
                  r="5"
                  fill="#ffd27f"
                  stroke="#302d31"
                  strokeWidth="3"
                  filter="url(#chartGlow)"
                />

              </g>
            ))}

            {/* Energy points */}
            {data.map((item, index) => (
              <circle
                key={`energy-${item.day}`}
                cx={getX(index)}
                cy={getY(item.energy)}
                r="4"
                fill="#68ddec"
                stroke="#302d31"
                strokeWidth="2"
                filter="url(#chartGlow)"
              />
            ))}
          </svg>

          {/* X labels */}
          <div className="
            absolute
            bottom-0 left-9 right-0
            flex justify-between
          ">
            {data.map((item) => (
              <span
                key={item.day}
                className="text-[10px] text-[#918781] sm:text-xs"
              >
                {item.day}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="
          mt-3 flex
          items-center justify-between
          border-t border-white/6
          pt-4
        ">
          <span className="text-xs text-[#aaa09a]">
            7-day overview
          </span>

          <button
            className="
              rounded-xl bg-[#403c41]
              px-3 py-2
              text-xs font-medium
              text-[#d7c8bc]
              transition-all duration-300
              hover:bg-[#514a50]
              hover:text-white
            "
          >
            View all history →
          </button>
        </div>
      </div>
    </section>
  );
};

export default MoodEnergyChart;