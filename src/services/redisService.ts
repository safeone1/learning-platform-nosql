// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Utilisez Redis comme cache en stockant les données fréquemment utilisées avec une expiration définie
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utilisez des noms de clés clairs et uniques,définissez des politiques d'expiration

import { redisClient } from "../config/db";

// Fonctions utilitaires pour Redis
async function cacheData(key: string, data: any, ttl: number) {
  // TODO: Implémenter une fonction générique de cache

  try {
    await redisClient.setex(key, ttl, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to cache data:", err);
  }
}

export { cacheData };
