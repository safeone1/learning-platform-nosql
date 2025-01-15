// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Pour une meilleure organisation et une maintenance facilitée
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: par creer des middleware pour chaque type de route

import express from "express";
const router = express.Router();
import {
  createCourse,
  getCourse,
  getCourses,
  getCourseStats,
} from "../controllers/courseController";

// Routes pour les cours
router.get("/", getCourses);
router.post("/", createCourse);
router.get("/stats", getCourseStats);
router.get("/:id", getCourse);

export default router;
