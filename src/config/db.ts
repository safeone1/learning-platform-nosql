// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse :
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse :

import { MongoClient } from "mongodb";
import redis from "redis";
import config from "./env";

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
}

// Export des fonctions et clients

// TODO: Exporter les clients et fonctions utiles
