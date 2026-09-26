"use server";

import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";

export const deleteStudent = async (studId: string, studImage: string) => {
  try {
    await rm(`./public/${studImage}`);

    await prisma.student.delete({
      where: {
        id: studId,
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      msg: "Student Deleted ",
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
      msg: "Server error :Delete Failed    ",
    };
  }
};
