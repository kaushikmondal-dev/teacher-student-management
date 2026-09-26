"use client";

import { Loader2Icon, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
import { Button } from "./shadcnui/button";
import { CardContent, CardFooter } from "./shadcnui/card";

import { updateAvatar } from "@/server/updateAvatar";
import { toast } from "./shadcnui/toast";

type UpdateAvatarProps = {
  studId: string;
  studPrevImage: string;
};

const UpdateAvatar = ({ studId, studPrevImage }: UpdateAvatarProps) => {
  const [isFile, setIsFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",

    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),

    validators: [new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 })],
  });

  const updateStuAvtHandlar = async () => {
    setIsLoading(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    const { isSuccess, msg } = await updateAvatar(
      studId,
      studPrevImage,
      plainFiles[0],
    );

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
    clear();
    setIsLoading(false);
  };

  return (
    <>
      <CardContent className="grid gap-4">
        {!isFile && (
          <button
            type="button"
            onClick={openFilePicker}
            className="grid place-items-center">
            <Avatar className="size-64">
              <AvatarImage src={`/${studPrevImage}`} />
              <AvatarFallback>Select Image</AvatarFallback>
            </Avatar>
          </button>
        )}

        {filesContent.map(({ size, content, name }) => (
          <button
            key={size}
            type="button"
            onClick={openFilePicker}
            className="grid place-items-center">
            <Avatar className="size-64">
              <AvatarImage src={content} />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          </button>
        ))}
      </CardContent>
      <CardFooter className="grid">
        <Button
          onClick={updateStuAvtHandlar}
          type="button"

          disabled={isLoading || !isFile}>
          {isLoading ?
            <>
              <Loader2Icon className="animate-spin" />
              Updating Student Avatar...
            </>
          : <>
              <RefreshCcw />
              Update
            </>
          }
        </Button>
      </CardFooter>
    </>
  );
};

export default UpdateAvatar;
