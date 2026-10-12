import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { disconnectDatabase } from "./config/database.js";

async function startServer() {
  try {
    await connectDatabase();
    const server = app.listen(env.PORT, () => {
      console.log(`DayDeeds API running on http://localhost:${env.PORT}`);
    });

    const shutdown = async () => {
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

startServer();
