process.env.NODE_ENV = "test";
process.env.PORT = "5000";
process.env.CLIENT_URL = "http://localhost:5173";
process.env.MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/daydeeds-test";
process.env.SESSION_SECRET = process.env.SESSION_SECRET ?? "a-very-long-session-secret-for-testing-123456";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import User from "../models/User.js";

const { default: app } = await import("../app.js");

describe("Auth API", () => {
  const email = `daylog-${Date.now()}@example.com`;
  const agent = request.agent(app);

  beforeEach(() => {
    vi.spyOn(User, "findOne").mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
      select: vi.fn().mockReturnValue({
        then: undefined,
      }),
    } as never);

    vi.spyOn(User, "create").mockResolvedValue({
      _id: "user-123",
      email,
      displayName: "Test User",
      role: "user",
      toJSON: () => ({
        _id: "user-123",
        email,
        displayName: "Test User",
        role: "user",
      }),
    } as never);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.MONGODB_URI;
  });

  it("registers a new user and returns a session-backed user payload", async () => {
    const csrfResponse = await agent.get("/api/auth/csrf");
    expect(csrfResponse.status).toBe(200);
    expect(csrfResponse.body.csrfToken).toBeTypeOf("string");

    const registerResponse = await agent
      .post("/api/auth/register")
      .set("X-CSRF-Token", csrfResponse.body.csrfToken)
      .send({
        email,
        password: "password123",
        displayName: "Test User",
      });

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body.user.email).toBe(email);
    expect(registerResponse.headers["set-cookie"]).toBeTruthy();
  });

  it("requires authentication for protected routes", async () => {
    const response = await request(app).get("/api/auth/me");
    expect(response.status).toBe(401);
  });
});
