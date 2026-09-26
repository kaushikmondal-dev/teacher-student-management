import { z } from "zod";

export const teacherFormSchema = z.object({
  name: z.string().min(5, { error: "Name is required" }),
  subject: z.string().min(1, { error: "Subject is required" }),
});

export type TeacherFormType = z.infer<typeof teacherFormSchema>;

export const studentFormSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  teacherId: z.string().min(4, { error: "Teacher is required" }),

  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),

  school: z
    .string()
    .min(1, "School name is required")
    .max(150, "School name must be under 150 characters"),

  grade: z.string().min(1, "Grade is required"),
});

export type StudentFormType = z.infer<typeof studentFormSchema>;
