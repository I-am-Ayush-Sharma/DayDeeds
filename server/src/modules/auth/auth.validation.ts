import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters").max(128),
    displayName: z.string().trim().min(2, "Display name must be at least 2 characters").max(80),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters").max(128),
  }),
});
