// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : il est crucial de valider les champs essentiels pour le fonctionement du serveur sans erreur
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : jai modifier que la validation dans un try catch pour controller l'erreur et quitter l'application

import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
  "DATABASE_URL",
  "MONGODB_DB_NAME",
  "REDIS_URI",
  "PORT",
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  const dontExist = requiredEnvVars.filter((value) => !process.env[value]);

  if (dontExist.length > 0) {
    throw new Error(`Missing environment variables: ${dontExist.join(", ")}`);
  }
  // Si une variable manque, lever une erreur explicative
}

try {
  validateEnv();
  console.log("all env variables are valid");
} catch (e: any) {
  console.error("Failed to validate environment variables:", e.message);
  process.exit(1);
}

const config = {
  mongodb: {
    uri: process.env.DATABASE_URL!,
    dbName: process.env.MONGODB_DB_NAME!,
  },
  redis: {
    uri: process.env.REDIS_URI!,
  },
  port: process.env.PORT || 3000,
};

export default config;
