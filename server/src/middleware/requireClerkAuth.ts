import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireClerkAuth = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);
    if (!userId) {
      throw new AppError("Authentication required", 401);
    }

    req.clerkUserId = userId;
    return next();
  },
);
