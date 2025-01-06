// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : éviter la duplication du code et faciliter les modifications
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : En utilisant des gestionnaires de connexions qui ferment proprement les connexions lors de l'arrêt de l'application

import { MongoClient } from "mongodb";
import config from "./env";
import Redis from "ioredis";
const dbClient = new MongoClient(config.mongodb.uri);
const redisClient = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  lazyConnect: true,
});

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
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
}

const disconnectRedisClient = async () => {
  try {
    await redisClient.quit();
    console.log("Disconnected from Redis");
  } catch (err) {
    console.error("Failed to disconnect from Redis:", err);
  }
};

// Export des fonctions et clients

// TODO: Exporter les clients et fonctions utiles
export {
  dbClient,
  redisClient,
  connectMongo,
  disconnectMongoClient,
  connectRedis,
  disconnectRedisClient,
};
