process.env.NODE_ENV = "test";
process.env.PORT = "5000";
process.env.CLIENT_URL = "http://localhost:5173";
process.env.MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/daydeeds-test";
process.env.SESSION_SECRET = process.env.SESSION_SECRET ?? "a-very-long-session-secret-for-testing-123456";

import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

vi.mock("@clerk/express", () => ({
  clerkMiddleware: () => (_req: unknown, _res: unknown, next: () => void) => next(),
  getAuth: (req: { headers: Record<string, string | undefined> }) => ({
    userId: req.headers["x-test-user"] ?? null,
  }),
}));

const { default: app } = await import("../app.js");
const { default: JournalEntry } = await import("../models/JournalEntry.js");

afterEach(() => vi.restoreAllMocks());

describe("Journal entry API", () => {
  it("requires a Clerk user for journal data", async () => {
    const response = await request(app).get("/api/entries");
    expect(response.status).toBe(401);
  });

  it("lists only the authenticated user's entries", async () => {
    const createdAt = new Date("2026-10-11T08:00:00.000Z");
    const entry = {
      _id: "0123456789abcdef01234567",
      title: "A saved thought",
      content: "A saved thought for today",
      contentHtml: "<p>A saved thought for today</p>",
      date: "2026-10-11",
      time: "08:00 AM",
      tags: ["daily"],
      mood: "Good",
      energy: 7,
      isDraft: false,
      isFavorite: false,
      createdAt,
    };
    const query = {
      sort: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([entry]),
    };
    const find = vi.spyOn(JournalEntry, "find").mockReturnValue(query as never);

    const response = await request(app)
      .get("/api/entries")
      .set("x-test-user", "user_123");

    expect(response.status).toBe(200);
    expect(find).toHaveBeenCalledWith({ clerkUserId: "user_123", isDraft: false });
    expect(response.body.entries[0]).toMatchObject({
      id: entry._id,
      title: entry.title,
      content: entry.content,
      words: 5,
    });
  });

  it("saves an entry under the verified Clerk identity", async () => {
    const savedEntry = {
      _id: "0123456789abcdef01234567",
      title: "A saved thought",
      content: "A saved thought for today",
      contentHtml: "<p>A saved thought for today</p>",
      date: "2026-10-11",
      time: "08:00 AM",
      tags: ["daily"],
      mood: "Good",
      energy: 7,
      isDraft: false,
      isFavorite: false,
      createdAt: new Date("2026-10-11T08:00:00.000Z"),
    };
    const create = vi.spyOn(JournalEntry, "create").mockResolvedValue(savedEntry as never);

    const response = await request(app)
      .post("/api/entries")
      .set("x-test-user", "user_123")
      .send({
        content: savedEntry.content,
        contentHtml: savedEntry.contentHtml,
        date: savedEntry.date,
        time: savedEntry.time,
        tags: savedEntry.tags,
        mood: savedEntry.mood,
        energy: savedEntry.energy,
        isDraft: false,
      });

    expect(response.status).toBe(201);
    expect(create).toHaveBeenCalledWith(expect.objectContaining({
      clerkUserId: "user_123",
      title: savedEntry.content,
    }));
    expect(response.body.entry.id).toBe(savedEntry._id);
  });
});
