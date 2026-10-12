import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const requestedPath = req.originalUrl;
  next(new AppError(`Route not found: ${requestedPath}`, 404));
};

export const errorHandler = (error: Error, _req: Request, res: Response) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error("Unhandled error:", error);

  return res.status(500).json({
    message: "Something went wrong on the server.",
  });
};
