import { z } from "zod";

export const teacherFormSchema = z.object({
  name: z.string().min(5, { error: "Name is required" }),
  subject: z.string().min(1, { error: "Subject is required" }),
});

export type TeacherFormType = z.infer<typeof teacherFormSchema>;

export const studentFormSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  teacherId: z.string().uuid().optional().nullable(),
});

export type StudentFormType = z.infer<typeof studentFormSchema>;
