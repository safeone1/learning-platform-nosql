// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: le contrôleur c'est la logique qui se passe quand la route est utilisée
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour rendre le code plus lisible, facile à maintenir et à tester

import { Request, Response } from "express";
import { addCourse, findOneById, getStats } from "../services/mongoService";
import { CourseSchema } from "../config/types";

async function createCourse(req: Request, res: Response): Promise<void> {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable

  try {
    const body = await req.body;
    const courseData = CourseSchema.safeParse(body);

    console.log("Creating course...", courseData);

    if (!courseData.success) {
      res.status(400).json({ message: courseData.error });
      return;
    }
    const course = await addCourse(courseData.data);

    if (course)
      res.status(200).json({ message: "Course created", course: course });
  } catch (error) {
    console.error("Failed to create course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing ID" });
    }
    console.log("Getting course...");

    const course = await findOneById("Course", id);

    if (course)
      res.status(200).json({ message: "Course found", course: course });
    else res.status(404).json({ message: "Course not found" });
  } catch (error) {
    console.error("Failed to get course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourseStats = async (req: Request, res: Response) => {
  try {
    console.log("Getting course stats...");

    const stats = await getStats();

    if (stats) res.status(200).json({ message: "Course stats", stats: stats });
    else res.status(404).json({ message: "Stats not found" });
  } catch (error) {
    console.error("Failed to get course stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createCourse, getCourse, getCourseStats };
