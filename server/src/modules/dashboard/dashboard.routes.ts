import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const dashboardRouter = Router();

dashboardRouter.get(
  "/summary",
  requireAuth,
  asyncHandler(async (_req, res) => {
    res.json({
      summary: {
        entries: 0,
        streakDays: 0,
        mood: "Calm",
      },
    });
  })
);

export default dashboardRouter;
