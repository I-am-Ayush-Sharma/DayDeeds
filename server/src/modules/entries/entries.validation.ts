import { z } from "zod";

export const journalEntrySchema = z.object({
  content: z.string().trim().max(50_000),
  contentHtml: z.string().max(100_000),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{1,2}:\d{2}\s(?:AM|PM)$/i),
  tags: z.array(z.string().trim().min(1).max(40)).max(20),
  mood: z.enum(["Great", "Good", "Okay", "Low", "Bad"]),
  energy: z.number().int().min(1).max(10),
  isDraft: z.boolean(),
}).refine((entry) => entry.isDraft || entry.content.length > 0, {
  message: "Write something before saving your journal entry.",
  path: ["content"],
});

export const favoriteSchema = z.object({
  isFavorite: z.boolean(),
});
