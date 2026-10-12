import { useState } from "react";
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Bookmark, FileText } from "lucide-react";
import TextBox from "../components/newEntry-comps/TextEditor";
import MoodSelector from "../components/newEntry-comps/MoodSelector";
import EnergySelector from "../components/newEntry-comps/EnergySelector";
import { createJournalEntry } from "../services/journalService";
import type { JournalMood } from "../Types/journal";

function NewEntry() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [mood, setMood] = useState<JournalMood>("Okay");
  const [energy, setEnergy] = useState(5);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const saveEntry = async (isDraft: boolean) => {
    setError("");
    setNotice("");
    if (!isDraft && !content.trim()) {
      setError("Write something in your journal before saving.");
      return;
    }

    setIsSaving(true);
    try {
      const now = new Date();
      await createJournalEntry(getToken, {
        content,
        contentHtml: contentHtml || "<p></p>",
        date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        tags,
        mood,
        energy,
        isDraft,
      });
      navigate("/history", {
        state: { notice: isDraft ? "Draft saved." : "Journal entry saved." },
      });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save the journal entry.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void saveEntry(false);
      }}
      className="w-full min-h-screen bg-[#FAEAD3] font-[Artifika] p-3 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 mx-auto relative"
    >
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-[#EDCFAB] text-black text-xs sm:text-sm py-1 px-3 sm:px-4 rounded-full border-2 border-[#CEA174] flex justify-center items-center gap-1.5 hover:bg-[#e2bd90] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Back
        </button>
      </div>

      {/* Head text */}
      <div className="space-y-0.5 sm:space-y-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Caveat] font-bold text-[#3D2B1F]">
          Today's Journal
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl font-bold font-[Caveat] text-[#825d45]">
          A new day, a new story. What's on your mind?
        </h2>
      </div>

      {/* Text Box Input */}
      <TextBox
        onContentChange={(text, html) => {
          setContent(text);
          setContentHtml(html);
        }}
        tags={tags}
        onTagsChange={setTags}
      />

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Mood Selector */}
        <MoodSelector selectedMood={mood} onMoodChange={setMood} />
        {/* Energy Selector */}
        <EnergySelector energy={energy} onEnergyChange={setEnergy} />
      </div>
      {(error || notice) && (
        <p
          role={error ? "alert" : "status"}
          className={`rounded-lg px-3 py-2 text-sm ${error ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
        >
          {error || notice}
        </p>
      )}
      {/* Bottom Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        {/* Rewrite with AI Button */}
        <button
          type="button"
          onClick={() => setNotice("AI rewrite will be available after the AI API key is configured.")}
          disabled={isSaving}
          className="group relative rounded-xl border border-[#D4A373]/90 bg-[#F7E7D4] p-1 shadow-sm hover:bg-[#edd8be] active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#C89B6D] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[#4E2811]">
            <Sparkles size={18} className="text-[#4E2811] shrink-0" />
            <span className="font-[Caveat] text-lg sm:text-xl font-bold tracking-wide">
              Rewrite with AI
            </span>
          </div>
        </button>

        {/* Save as Draft Button */}
        <button
          type="button"
          onClick={() => void saveEntry(true)}
          disabled={isSaving}
          className="group relative rounded-xl border border-[#D4A373]/90 bg-[#F7E7D4] p-1 shadow-sm hover:bg-[#edd8be] active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#C89B6D] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[#4E2811]">
            <FileText size={18} className="text-[#4E2811] shrink-0" />
            <span className="font-[Caveat] text-lg sm:text-xl font-bold tracking-wide">
              {isSaving ? "Saving..." : "Save as Draft"}
            </span>
          </div>
        </button>

        {/* Save Entry / Submit Button */}
        <button
          type="submit"
          disabled={isSaving}
          className="group relative rounded-xl border border-[#231208] bg-[#341D0F] p-1 shadow-md hover:bg-[#432615] active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#8E5E3B]/90 px-4 sm:px-5 py-1.5 sm:py-2 text-[#F7D184]">
            <Bookmark size={18} className="text-[#F7D184] shrink-0" />
            <span className="font-[Caveat] text-lg sm:text-xl font-bold tracking-wide">
              {isSaving ? "Saving..." : "Save Entry"}
            </span>
          </div>
        </button>
      </div>
    </form>
  );
}

export default NewEntry;
