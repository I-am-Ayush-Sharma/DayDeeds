import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export const csrfProtection = (req: Request, _res: Response, next: NextFunction) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  const providedToken = req.headers["x-csrf-token"];
  const expectedToken = req.session?.csrfToken ?? null;

  if (!expectedToken || typeof providedToken !== "string" || providedToken !== expectedToken) {
    return next(new AppError("Invalid CSRF token", 403));
  }

  return next();
};
