// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : éviter la duplication du code et faciliter les modifications
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : En utilisant des gestionnaires de connexions qui ferment proprement les connexions lors de l'arrêt de l'application

import { MongoClient } from "mongodb";
import config from "./env";

const dbClient = new MongoClient(config.mongodb.uri);

async function connectMongo() {
  try {
    await dbClient.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

const disconnectMongoClient = async () => {
  try {
    await dbClient.close();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Failed to disconnect from MongoDB:", err);
  }
};

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
}

// Export des fonctions et clients

// TODO: Exporter les clients et fonctions utiles
export { dbClient, connectMongo, disconnectMongoClient, connectRedis };
