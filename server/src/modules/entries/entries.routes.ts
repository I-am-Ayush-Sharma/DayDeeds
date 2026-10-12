import { Router } from "express";
import { z } from "zod";
import JournalEntry from "../../models/JournalEntry.js";
import { requireClerkAuth } from "../../middleware/requireClerkAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { favoriteSchema, journalEntrySchema } from "./entries.validation.js";
import type { JournalEntryDocument } from "../../models/JournalEntry.js";

const entriesRouter = Router();

const serializeEntry = (entry: JournalEntryDocument) => ({
  id: String(entry._id),
  title: entry.title,
  content: entry.content,
  contentHtml: entry.contentHtml,
  date: entry.date,
  time: entry.time,
  tags: entry.tags,
  mood: entry.mood,
  energy: entry.energy,
  words: entry.content.split(/\s+/).filter(Boolean).length,
  isDraft: entry.isDraft,
  isFavorite: entry.isFavorite,
  createdAt: entry.createdAt?.toISOString(),
});

entriesRouter.use(requireClerkAuth);

entriesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const includeDrafts = req.query.includeDrafts === "true";
    const entries = await JournalEntry.find({
      clerkUserId: req.clerkUserId,
      ...(includeDrafts ? {} : { isDraft: false }),
    })
      .sort({ date: -1, createdAt: -1 })
      .limit(500);

    res.json({ entries: entries.map(serializeEntry) });
  }),
);

entriesRouter.post(
  "/",
  validateRequest(z.object({ body: journalEntrySchema })),
  asyncHandler(async (req, res) => {
    const data = journalEntrySchema.parse(req.body);
    const normalizedText = data.content.replace(/\s+/g, " ").trim();
    const entry = await JournalEntry.create({
      ...data,
      clerkUserId: req.clerkUserId,
      title: normalizedText.slice(0, 120) || "Untitled draft",
    });

    res.status(201).json({ entry: serializeEntry(entry) });
  }),
);

entriesRouter.patch(
  "/:entryId/favorite",
  validateRequest(z.object({ body: favoriteSchema })),
  asyncHandler(async (req, res) => {
    const { entryId } = z.object({ entryId: z.string().regex(/^[\da-f]{24}$/i) }).parse(req.params);
    const { isFavorite } = favoriteSchema.parse(req.body);
    const entry = await JournalEntry.findOneAndUpdate(
      { _id: entryId, clerkUserId: req.clerkUserId },
      { $set: { isFavorite } },
      { new: true, runValidators: true },
    );

    if (!entry) {
      throw new AppError("Journal entry not found.", 404);
    }

    res.json({ entry: serializeEntry(entry) });
  }),
);

entriesRouter.delete(
  "/:entryId",
  asyncHandler(async (req, res) => {
    const { entryId } = z.object({ entryId: z.string().regex(/^[\da-f]{24}$/i) }).parse(req.params);
    const entry = await JournalEntry.findOneAndDelete({
      _id: entryId,
      clerkUserId: req.clerkUserId,
    });

    if (!entry) {
      throw new AppError("Journal entry not found.", 404);
    }

    res.status(204).end();
  }),
);

export default entriesRouter;
