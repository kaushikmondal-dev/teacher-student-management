"use client";

import { deleteStudent } from "@/server/deleteStudent";
import { Loader2Icon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./shadcnui/button";
import { toast } from "./shadcnui/toast";

type DeleteStudentButtonProps = {
  studId: string;
  studImage: string;
};

const DeleteStudentButton = ({
  studId,
  studImage,
}: DeleteStudentButtonProps) => {
  const [isLoading, setIsLoding] = useState(false);
  const { refresh } = useRouter();

  const DeleteStudentHandler = async () => {
    setIsLoding(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    const { isSuccess, msg } = await deleteStudent(studId, studImage);

    if (isSuccess) {
      toast.add({
        title: msg,
      });

      refresh();
    } else {
      toast.add({
        title: msg,
      });
    }

    setIsLoding(false);
  };

  return (
    <Button
      type="button"
      onClick={DeleteStudentHandler}
      variant="destructive"
      disabled={isLoading}>
      {isLoading ?
        <>
          <Loader2Icon className="animate-spin" /> Deleting Student...
        </>
      : <>
          <Trash2 /> Delete
        </>
      }
    </Button>
  );
};

export default DeleteStudentButton;
