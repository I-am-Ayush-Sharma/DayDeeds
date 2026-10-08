import React, { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

interface Props {
  month: string;
}

const AIReflection: React.FC<Props> = ({ month }) => {
  const [reflection, setReflection] = useState(
    `${month} was a meaningful month. Your journal shows consistency, reflection, and a positive movement in your daily mood.`
  );

  const [loading, setLoading] = useState(false);

  const generateReflection = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/ai/reflection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            month,
            entries: [
              "Had a great morning walk today.",
              "Finished an important project.",
              "Spent some quiet time thinking about my goals.",
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.reflection) {
        setReflection(data.reflection);
      }
    } catch (error) {
      console.error("AI reflection error:", error);
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
            onClick={generateReflection}
            disabled={loading}
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
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>

        <p className="
          mt-4 text-sm
          leading-6
          text-[#675044]
        ">
          {loading ? "Reflecting on your month..." : reflection}
        </p>

        <button
          onClick={generateReflection}
          disabled={loading}
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