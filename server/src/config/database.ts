import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  try {
    const uri = new URL(env.MONGODB_URI);
    const isLocalhostUri = uri.protocol === "mongodb:" && uri.hostname === "localhost";

    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      ...(isLocalhostUri ? { family: 4 } : {}),
    });

    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown connection error";
    console.error("MongoDB connection failed:", message);
    throw error;
  }
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
  console.log("MongoDB disconnected");
}
