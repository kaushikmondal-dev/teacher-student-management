"use server";
import prisma from "@/lib/dbClient/prisma";
import { StudentFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export const createStudent = async (uData: StudentFormType, imgFile: File) => {
  try {
    const imageName = `${crypto.randomUUID()}.jpeg`;

    const imageArrayBuffer = await imgFile.arrayBuffer();

    await sharp(imageArrayBuffer)
      .resize({
        width: 256,
        height: 256,
      })
      .jpeg({
        mozjpeg: true,
        quality: 97,
      })
      .toFile(`./public/uploads/${imageName} `);

    const imageUrl = `uploads/${imageName}`;

    await prisma.student.create({
      data: {
        name: uData.name,
        image: imageUrl,
        teacherId: uData.teacherId,
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      msg: "Student Created✅ ",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isSuccess: false,
        msg: "Something went wrong, try later ❌!!",
      };
    }
    return {
      isSuccess: false,
      msg: "Server error: Creation Failed 😒!!",
    };
  }
};
