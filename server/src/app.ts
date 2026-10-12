import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import MongoStore from "connect-mongo";
import { clerkMiddleware } from "@clerk/express";
import authRouter from "./modules/auth/auth.routes.js";
import entriesRouter from "./modules/entries/entries.routes.js";
import aiRouter from "./modules/ai/ai.routes.js";
import dashboardRouter from "./modules/dashboard/dashboard.routes.js";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const sessionMongoUri = env.MONGODB_URI.replace(
  /^mongodb:\/\/localhost(?=[:/])/,
  "mongodb://127.0.0.1",
);

const sessionStore = env.NODE_ENV === "test"
  ? undefined
  : MongoStore.create({
      mongoUrl: sessionMongoUri,
      collectionName: "sessions",
      ttl: 7 * 24 * 60 * 60,
      autoRemove: "native",
      crypto: { secret: env.SESSION_SECRET },
    });

app.set("trust proxy", 1);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  env.NODE_ENV === "test"
    ? (_req, _res, next) => next()
    : clerkMiddleware({
        secretKey: env.CLERK_SECRET_KEY,
        publishableKey: env.VITE_CLERK_PUBLISHABLE_KEY,
      }),
);
app.use(
  session({
    name: "daydeeds.sid",
    secret: env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: env.NODE_ENV === "production" ? "lax" : "lax",
      secure: env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/entries", entriesRouter);
app.use("/api/ai", aiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
