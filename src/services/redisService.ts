// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Utilisez Redis comme cache en stockant les données fréquemment utilisées avec une expiration définie
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utilisez des noms de clés clairs et uniques,définissez des politiques d'expiration

import { redisClient } from "../config/db";

// Fonctions utilitaires pour Redis
async function cacheData(key: string, data: any, ttl: number) {
  // TODO: Implémenter une fonction générique de cache

  try {
    const jsonData = JSON.stringify(data);
    await redisClient.setex(key, ttl, jsonData);
  } catch (err) {
    console.error("Failed to cache data:", err);
  }
}

const getCachedData = async (key: string) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Failed to get cached data:", err);
  }
};

export { cacheData, getCachedData };
