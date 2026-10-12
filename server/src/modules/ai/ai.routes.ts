import { Router } from "express";
import { z } from "zod";
import { requireClerkAuth } from "../../middleware/requireClerkAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { env } from "../../config/env.js";
import { AppError } from "../../utils/AppError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const aiRouter = Router();
const reflectionSchema = z.object({
  month: z.string().trim().min(1).max(40),
  entries: z.array(z.string().trim().max(2_000)).max(50),
});

aiRouter.post(
  "/reflection",
  requireClerkAuth,
  validateRequest(z.object({ body: reflectionSchema })),
  asyncHandler(async (req, res) => {
    if (!env.GEMINI_API_KEY) {
      throw new AppError("AI reflection is unavailable until GEMINI_API_KEY is configured.", 503);
    }

    const { month, entries } = reflectionSchema.parse(req.body);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Write a brief, supportive journal reflection for ${month}. Identify gentle themes in these entries without making diagnoses or inventing events:\n${entries.join("\n---\n")}`,
            }],
          }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.6 },
        }),
      },
    );

    if (!response.ok) {
      const details = await response.text();
      console.error("Gemini reflection request failed:", response.status, details);
      throw new AppError("AI reflection could not be generated. Check the configured API key and try again.", 502);
    }

    const result = await response.json() as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const reflection = result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!reflection) {
      throw new AppError("The AI service returned an empty reflection. Please try again.", 502);
    }

    res.json({ reflection });
  }),
);

export default aiRouter;
