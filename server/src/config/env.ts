import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: [".env", "server/.env"] });

const optionalMongoUri = z.preprocess(
  (value: unknown) => (value === "" ? undefined : value),
  z.string().min(10).optional(),
);
const optionalGeminiApiKey = z.preprocess(
  (value: unknown) => (
    typeof value === "string" &&
    (value.trim() === "" || value.trim().toLowerCase() === "your-gemini-api-key")
      ? undefined
      : value
  ),
  z.string().optional(),
);

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),
  CLERK_SECRET_KEY: z.string().optional(),
  VITE_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  MONGODB_CONNECTION_MODE: z.enum(["local", "atlas", "auto"]).default("local"),
  MONGODB_URI: optionalMongoUri,
  MONGODB_URI_LOCAL: optionalMongoUri,
  MONGODB_URI_ATLAS: optionalMongoUri,
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 characters"),
  GEMINI_API_KEY: optionalGeminiApiKey,
});

const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
  const issues = envResult.error.issues.map((issue) => issue.message).join("; ");
  throw new Error(`Missing or invalid environment configuration: ${issues}`);
}

const rawEnv = envResult.data;
if (
  rawEnv.NODE_ENV !== "test" &&
  (!rawEnv.CLERK_SECRET_KEY || !rawEnv.VITE_CLERK_PUBLISHABLE_KEY)
) {
  throw new Error("CLERK_SECRET_KEY and VITE_CLERK_PUBLISHABLE_KEY are required to start the API server.");
}

const preferredMongoUri =
  rawEnv.MONGODB_URI ??
  (rawEnv.MONGODB_CONNECTION_MODE === "atlas"
    ? rawEnv.MONGODB_URI_ATLAS ?? rawEnv.MONGODB_URI_LOCAL
    : rawEnv.MONGODB_CONNECTION_MODE === "local"
      ? rawEnv.MONGODB_URI_LOCAL ?? rawEnv.MONGODB_URI_ATLAS
      : rawEnv.MONGODB_URI_ATLAS ?? rawEnv.MONGODB_URI_LOCAL);

if (!preferredMongoUri) {
  throw new Error(
    "MongoDB configuration missing. Set MONGODB_URI or provide MONGODB_URI_LOCAL and/or MONGODB_URI_ATLAS."
  );
}

export const env = {
  ...rawEnv,
  CLERK_SECRET_KEY: rawEnv.CLERK_SECRET_KEY ?? "",
  VITE_CLERK_PUBLISHABLE_KEY: rawEnv.VITE_CLERK_PUBLISHABLE_KEY ?? "",
  MONGODB_URI: preferredMongoUri,
};
