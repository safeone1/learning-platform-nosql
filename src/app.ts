// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

import { Request, Response } from "express";

import express from "express";
import config from "./config/env";
// const db = require("./config/db");

// const courseRoutes = require("./routes/courseRoutes");
// const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.json());

async function startServer() {
  try {
    console.log("Starting server");
    // TODO: Initialiser les connexions aux bases de données
    // TODO: Configurer les middlewares Express
    // TODO: Monter les routes
    app.get("/", (req: Request, res: Response) => {
      res.send("hello");
    });
    // TODO: Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on("SIGTERM", async () => {
  // TODO: Implémenter la fermeture propre des connexions
});

startServer();
