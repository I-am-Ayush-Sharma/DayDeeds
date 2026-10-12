declare module "express-session" {
  interface SessionData {
    userId?: string;
    csrfToken?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        displayName: string;
        role: "user" | "admin";
      };
      clerkUserId?: string;
    }
  }
}

export {};
