import express, { Request, Response } from "express";
import config from "./config/env"; // Assuming you have your env configuration here
import dotenv from "dotenv";
import router from "./routes/courseRoutes";
import {
  connectMongo,
  connectRedis,
  disconnectMongoClient,
  disconnectRedisClient,
} from "./config/db";

dotenv.config();

const app = express();

app.use(express.json());

async function startServer() {
  try {
    console.log("Starting server...");
    await connectMongo();
    await connectRedis();

    app.use("/", router);

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM, shutting down gracefully...");
  await disconnectMongoClient();
  await disconnectRedisClient();
  process.exit(0);
});

startServer();
