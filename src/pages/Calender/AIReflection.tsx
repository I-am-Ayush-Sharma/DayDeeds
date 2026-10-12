import React, { useState } from "react";
import { useAuth } from "@clerk/react";
import { Sparkles, RefreshCw } from "lucide-react";
import { generateJournalReflection } from "../../services/journalService";
import type { CalendarEntry } from "../../Types/calendar";

interface Props {
  month: string;
  entries: CalendarEntry[];
}

const AIReflection: React.FC<Props> = ({ month, entries }) => {
  const { getToken } = useAuth();
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateReflection = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await generateJournalReflection(
        getToken,
        month,
        entries.map((entry) => entry.content),
      );
      setReflection(result);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Could not generate the reflection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="
      relative mt-4
      overflow-hidden
      rounded-[26px]
      border border-[#d9c0a2]
      bg-gradient-to-br
      from-[#fff7e8]
      to-[#f1dfc8]
      p-5
      shadow-[0_10px_30px_rgba(80,45,25,0.07)]
    ">

      <div className="
        pointer-events-none
        absolute -right-10 -top-10
        h-32 w-32
        rounded-full
        bg-[#e5aa65]/20
        blur-3xl
      " />

      <div className="relative">

        <div className="
          flex items-center
          justify-between
        ">
          <div className="flex items-center gap-2">
            <div className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              bg-[#e8b16e]
              text-[#613a22]
            ">
              <Sparkles size={18} />
            </div>

            <h3 className="
              font-serif text-lg
              font-semibold text-[#4b3022]
            ">
              AI Reflection
            </h3>
          </div>

          <button
            type="button"
            onClick={() => void generateReflection()}
            disabled={loading || entries.length === 0}
            aria-label="AI reflection requires API key configuration"
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              bg-[#ead6bd]
              text-[#714d35]
              transition-all
              hover:rotate-180
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={15}
            />
          </button>
        </div>

        <p className="
          mt-4 text-sm
          leading-6
          text-[#675044]
        ">
          {loading
            ? "Reflecting on your saved entries..."
            : error || reflection || (entries.length
              ? `Generate a reflection from your ${entries.length} saved ${entries.length === 1 ? "entry" : "entries"} for ${month}.`
              : "Save an entry this month to get an AI reflection.")}
        </p>

        <button
          type="button"
          onClick={() => void generateReflection()}
          disabled={loading || entries.length === 0}
          className="
            mt-4 rounded-xl
            bg-[#a96334]
            px-4 py-2
            text-xs font-semibold
            text-white
            transition-all
            hover:-translate-y-0.5
            hover:bg-[#8d502b]
            disabled:opacity-50
          "
        >
          {loading ? "Generating..." : "Generate reflection ✨"}
        </button>
      </div>
    </section>
  );
};

export default AIReflection;