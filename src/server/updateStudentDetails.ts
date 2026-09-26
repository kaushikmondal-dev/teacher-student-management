"use server";

import prisma from "@/lib/dbClient/prisma";
import { StudentFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export const updateStudentDetails = async (
  studId: string,
  uData: StudentFormType,
) => {
  try {
    await prisma.student.update({
      where: {
        id: studId,
      },
      data: uData,

      //   or

      //   {
      //     name: uData.name,
      //     teacherId: uData.teacherId,
      //   },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      msg: "Student Updated ",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isSuccess: false,
        msg: "Somthing want to worng, try later  ",
      };
    }
    return {
      isSuccess: false,
      msg: "Server error :Update Failed    ",
    };
  }
};
