import React from "react";
import { X, Calendar as CalendarIcon, Smile, Zap, BookOpen } from "lucide-react";
import type { CalendarDay } from "../../Types/calendar";

interface Props {
  day: CalendarDay | null;
  onClose: () => void;
}

const moodEmoji = {
  happy: "😊",
  calm: "🌿",
  focused: "⚡",
  sad: "🌧️",
  energetic: "☀️",
};

const DayDetailsModal: React.FC<Props> = ({ day, onClose }) => {
  if (!day) return null;

  const formattedDate = day.date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[26px] border border-[#dbc5ad] bg-[#fff5e5] p-6 shadow-[0_20px_50px_rgba(80,45,25,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#ebd8c5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edd3b6] text-[#6d462f]">
              <CalendarIcon size={20} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#43291e]">
                {day.entry ? day.entry.title : "Day Details"}
              </h3>
              <p className="text-xs font-medium text-[#876653]">
                {formattedDate}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#d7bca0] bg-[#fffaf2] text-[#684735] transition-colors hover:bg-[#ebd5bd]"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        {day.entry ? (
          <div className="mt-5 space-y-4">
            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-[#d8beaa] bg-[#fffaf2] px-3 py-1 text-xs font-semibold text-[#5d4030]">
                <span>{moodEmoji[day.entry.mood]}</span>
                <span className="capitalize">{day.entry.mood}</span>
              </span>

              <span className="flex items-center gap-1.5 rounded-full border border-[#d8beaa] bg-[#fffaf2] px-3 py-1 text-xs font-semibold text-[#5d4030]">
                <Smile size={14} className="text-[#b5723b]" />
                <span>Mood: {day.entry.moodScore}/10</span>
              </span>

              <span className="flex items-center gap-1.5 rounded-full border border-[#d8beaa] bg-[#fffaf2] px-3 py-1 text-xs font-semibold text-[#5d4030]">
                <Zap size={14} className="text-[#b5723b]" />
                <span>Energy: {day.entry.energyScore}/10</span>
              </span>

              <span className="flex items-center gap-1.5 rounded-full border border-[#d8beaa] bg-[#fffaf2] px-3 py-1 text-xs font-semibold text-[#5d4030]">
                <BookOpen size={14} className="text-[#b5723b]" />
                <span>{day.entry.words} words</span>
              </span>
            </div>

            {/* Image if present */}
            {day.entry.image && (
              <div className="overflow-hidden rounded-2xl border border-[#e1ceba]">
                <img
                  src={day.entry.image}
                  alt={day.entry.title}
                  className="max-h-52 w-full object-cover"
                />
              </div>
            )}

            {/* Entry content */}
            <div className="rounded-2xl border border-[#ebd8c5] bg-[#fffaf2] p-4 text-sm leading-relaxed text-[#573d2f]">
              <p className="whitespace-pre-wrap">{day.entry.content}</p>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-[#7f6352]">
              No journal entry written for this day.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-[#d7bca0] bg-[#ebd5bd] px-5 py-2 text-xs font-bold text-[#563624] transition-colors hover:bg-[#dfc4a7]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayDetailsModal;