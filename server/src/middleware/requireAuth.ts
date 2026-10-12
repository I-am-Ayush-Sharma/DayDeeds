import type { Request, Response, NextFunction } from "express";
import User, { type UserDocument } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  if (!req.session?.userId) {
    throw new AppError("Authentication required", 401);
  }

  const user = (await User.findById(req.session.userId).lean()) as Partial<UserDocument> | null;

  if (!user || Array.isArray(user)) {
    throw new AppError("Session expired or invalid", 401);
  }

  req.user = {
    id: String(user._id),
    email: user.email,
    displayName: user.displayName,
    role: user.role,
  };

  return next();
});
