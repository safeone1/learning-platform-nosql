import z from "zod";

const CourseSchema = z.object({
  name: z.string().min(4, "Le nom doit contenir au moins 4 caractères"),
  description: z.string().optional(),
  price: z.number().min(0, "Le prix doit être positif"),
  status: z.enum(["Not Started", "Finished", "Ongoing"]).default("Not Started"),
});

type CourseType = z.infer<typeof CourseSchema>;

export type { CourseType };

export { CourseSchema };
