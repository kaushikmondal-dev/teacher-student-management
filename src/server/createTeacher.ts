"use server";

import prisma from "@/lib/dbClient/prisma";
import { TeacherFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export const createTeacher = async (uData: TeacherFormType) => {
  try {
    await prisma.teacher.create({
      data: uData,
    });

    revalidatePath("/");
    revalidatePath("/create");

    return {
      isSuccess: true,
      msg: "Teacher Created✅ ",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isSuccess: false,
        msg: "Somthing went to Worng, try later ❌!!",
      };
    }
    return {
      isSuccess: false,
      msg: "Server error: Creation Failed !!",
    };
  }
};
