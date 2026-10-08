import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface Props {
  month: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<Props> = ({
  month,
  onPrevious,
  onNext,
  onToday,
}) => {
  const title = month.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="
      relative overflow-hidden
      rounded-[28px]
      px-2 py-5
      sm:px-5 sm:py-7
    ">

      <div className="
        pointer-events-none
        absolute right-0 top-0
        h-48 w-48
        rounded-full
        bg-[#e7ad67]/15
        blur-3xl
      " />

      <div className="relative">

        <div className="
          flex flex-col
          gap-4
          lg:flex-row
          lg:items-end
          lg:justify-between
        ">

          <div>
            <p className="
              text-xs font-bold
              uppercase tracking-[0.2em]
              text-[#a47658]
            ">
              Your journal calendar
            </p>

            <h1 className="
              mt-1 font-serif
              text-4xl font-semibold
              text-[#43291e]
              sm:text-5xl
            ">
              {title}
            </h1>

            <p className="
              mt-2 text-sm
              text-[#765d4d]
              sm:text-base
            ">
              Each day is a story. Here's how your month looked.
            </p>
          </div>

          {/* Search */}
          <div className="
            flex items-center
            rounded-2xl
            border border-[#d5b99d]
            bg-[#fff7e9]/80
            px-4 py-3
            shadow-sm
            backdrop-blur-sm
          ">
            <Search size={18} className="text-[#896b57]" />

            <input
              placeholder="Search your entries..."
              className="
                ml-3 w-full
                bg-transparent
                text-sm
                text-[#4c3326]
                outline-none
                placeholder:text-[#a18a79]
                lg:w-64
              "
            />
          </div>
        </div>

        {/* Month controls */}
        <div className="
          mt-5 flex
          items-center justify-between
          sm:justify-start sm:gap-3
        ">

          <button
            onClick={onPrevious}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-[#d7bca0]
              bg-[#fff6e7]
              text-[#684735]
              transition-all
              hover:-translate-x-0.5
              hover:bg-[#ead6bd]
            "
          >
            <ChevronLeft size={19} />
          </button>

          <button
            onClick={onToday}
            className="
              rounded-xl
              border border-[#d7bca0]
              bg-[#fff6e7]
              px-5 py-2.5
              text-sm font-semibold
              text-[#684735]
              transition-all
              hover:bg-[#ead6bd]
            "
          >
            {title}
          </button>

          <button
            onClick={onNext}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-[#d7bca0]
              bg-[#fff6e7]
              text-[#684735]
              transition-all
              hover:translate-x-0.5
              hover:bg-[#ead6bd]
            "
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CalendarHeader;