import mongoose, { Schema, type Document, type InferSchemaType } from "mongoose";

const journalEntrySchema = new Schema(
  {
    clerkUserId: { type: String, required: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    content: { type: String, required: true, maxlength: 50_000 },
    contentHtml: { type: String, required: true, maxlength: 100_000 },
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    time: { type: String, required: true },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (tags: string[]) => tags.length <= 20,
        message: "An entry can have at most 20 tags.",
      },
    },
    mood: {
      type: String,
      enum: ["Great", "Good", "Okay", "Low", "Bad"],
      default: "Okay",
    },
    energy: { type: Number, min: 1, max: 10, default: 5 },
    isDraft: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true },
);

journalEntrySchema.index({ clerkUserId: 1, date: -1, createdAt: -1 });

export type JournalEntryDocument = Document &
  InferSchemaType<typeof journalEntrySchema> & {
    _id: mongoose.Types.ObjectId;
  };

const JournalEntry =
  mongoose.models.JournalEntry ||
  mongoose.model<JournalEntryDocument>("JournalEntry", journalEntrySchema);

export default JournalEntry;
