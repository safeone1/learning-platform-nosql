// Question: Pourquoi créer des services séparés ?
// Réponse: la création de services séparés permet une meilleure organisation et maintenabilité du code

import { ObjectId } from "mongodb";
import { dbClient } from "../config/db";
import config from "../config/env";
import { CourseType } from "../config/types";
import { cacheData, getCachedData } from "./redisService";

const addCourse = async ({ name, description, price, status }: CourseType) => {
  try {
    const course = await dbClient
      .db(config.mongodb.dbName)
      .collection("Course")
      .insertOne({
        name,
        description,
        price,
        status,
      });

    return course;
  } catch (error) {
    console.error("Failed to create course:", error);
  }
};

// Fonctions utilitaires pour MongoDB
async function findOneById(collection: string, id: string) {
  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    const cache = await getCachedData(`course:${id}`);
    if (cache) {
      return cache;
    }
    const course = await dbClient
      .db(config.mongodb.dbName)
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });
    if (!course) {
      return null;
    }
    await cacheData(`course:${id}`, JSON.stringify(course), 60);
    return course as unknown as CourseType;
  } catch (error) {
    console.error("Failed to find course:", error);
  }
}

const getStats = async () => {
  try {
    const cache = await getCachedData("stats");
    if (cache) {
      return cache;
    }
    const data = await dbClient
      .db(config.mongodb.dbName)
      .collection("Course")
      .find()
      .toArray();
    const stats = (data as unknown as CourseType[]).map((doc) => ({
      name: doc.name,
      status: doc.status?.toString(),
    }));
    if (stats.length <= 0) {
      return null;
    }
    await cacheData("stats", JSON.stringify(stats), 60);
    return stats;
  } catch (error) {
    console.error("Failed to get stats:", error);
  }
};

// Export des services

export { findOneById, addCourse, getStats };
