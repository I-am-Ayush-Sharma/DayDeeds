import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../utils/AppError.js";

export const validateRequest = (schema: z.ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const issues = result.error.issues.map((issue) => issue.message).join(", ");
      return next(new AppError(`Validation failed: ${issues}`, 400));
    }

    const parsedPayload = result.data as { body: unknown };
    req.body = parsedPayload.body as Record<string, unknown>;
    return next();
  };
