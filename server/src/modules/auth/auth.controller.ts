import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import argon2 from "argon2";
import User, { type UserDocument } from "../../models/User.js";
import { AppError } from "../../utils/AppError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const safeUser = (user: Pick<UserDocument, "_id" | "email" | "displayName" | "role">) => ({
  id: String(user._id),
  email: user.email,
  displayName: user.displayName,
  role: user.role,
});

export const getCsrfToken = asyncHandler(async (_req: Request, res: Response) => {
  const token = crypto.randomBytes(32).toString("hex");
  if (_req.session) {
    _req.session.csrfToken = token;
  }
  return res.json({ csrfToken: token });
});

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, displayName } = req.body;
  const normalizedEmail = String(email).trim().toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail }).lean();
  if (existingUser) {
    throw new AppError("An account with this email already exists.", 409);
  }

  const passwordHash = await argon2.hash(password);
  const user = await User.create({
    email: normalizedEmail,
    displayName: String(displayName).trim(),
    passwordHash,
  });

  req.session.regenerate((regenerateError) => {
    if (regenerateError) {
      return next(new AppError("Failed to initialize session", 500));
    }

    req.session.userId = String(user._id);
    req.session.csrfToken = crypto.randomBytes(32).toString("hex");

    return res.status(201).json({
      message: "Registration successful.",
      user: safeUser(user.toJSON()),
    });
  });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const normalizedEmail = String(email).trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail }).select("+passwordHash");

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isValidPassword = await argon2.verify(user.passwordHash, String(password));

  if (!isValidPassword) {
    throw new AppError("Invalid email or password.", 401);
  }

  req.session.regenerate((regenerateError) => {
    if (regenerateError) {
      return next(new AppError("Failed to initialize session", 500));
    }

    req.session.userId = String(user._id);
    req.session.csrfToken = crypto.randomBytes(32).toString("hex");

    return res.json({
      message: "Login successful.",
      user: safeUser(user.toJSON()),
    });
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await new Promise<void>((resolve, reject) => {
    req.session.destroy((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  res.clearCookie("daydeeds.sid");
  return res.json({ message: "Logged out successfully." });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("User not found", 401);
  }

  const user = (await User.findById(req.user.id).lean()) as Partial<UserDocument> | null;

  if (!user || Array.isArray(user)) {
    throw new AppError("User not found", 404);
  }

  return res.json({ user: safeUser(user) });
});
