"use server";

import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";
import sharp from "sharp";

export const updateAvatar = async (
  studId: string,
  studPrevImage: string,
  imgFile: File,
) => {
  try {
    const imageName = `${crypto.randomUUID()}.jpeg`;
    await rm(`./public/${studPrevImage}`);

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

    await prisma.student.update({
      where: {
        id: studId,
      },
      data: {
        image: imageUrl,
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      msg: "Student Avatar Updated ",
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
