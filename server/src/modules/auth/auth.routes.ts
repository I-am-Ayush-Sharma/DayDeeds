import { Router } from "express";
import rateLimit from "express-rate-limit";
import { csrfProtection } from "../../middleware/csrfProtection.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { getCsrfToken, login, logout, me, register } from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

const authRouter = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many authentication attempts. Please try again later." },
});

authRouter.get("/csrf", getCsrfToken);
authRouter.post("/register", authLimiter, validateRequest(registerSchema), csrfProtection, register);
authRouter.post("/login", authLimiter, validateRequest(loginSchema), csrfProtection, login);
authRouter.post("/logout", requireAuth, logout);
authRouter.get("/me", requireAuth, me);

export default authRouter;
