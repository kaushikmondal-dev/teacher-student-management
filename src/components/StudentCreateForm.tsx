"use client";

import { studentFormSchema, StudentFormType } from "@/lib/zodSchema";
import { createStudent } from "@/server/createStudent";
import { Teacher } from "@generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UserPenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
import { Button } from "./shadcnui/button";
import { CardContent, CardFooter } from "./shadcnui/card";
import { Field, FieldError, FieldLabel } from "./shadcnui/field";
import { Input } from "./shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcnui/select";
import { toast } from "./shadcnui/toast";

type StudentCreateFormProps = {
  teachers: Teacher[];
};

const StudentCreateForm = ({ teachers }: StudentCreateFormProps) => {
  const [isFile, setIsFile] = useState(false);
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<StudentFormType>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      teacherId: "",
    },
    mode: "all",
  });

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",

    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),

    validators: [new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 })],
  });

  const createStudentHandler = async (uData: StudentFormType) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    const { isSuccess, msg } = await createStudent(uData, plainFiles[0]);

    if (isSuccess) {
      toast.add({
        title: "success",
        description: msg,
        type: "success",
      });
      reset();
      clear();
      push("/");
    } else {
      toast.add({
        title: "Error",
        description: msg,
        type: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createStudentHandler)}
      className="grid gap-4"
      noValidate>
      <CardContent>
        {!isFile && (
          <button
            type="button"
            onClick={openFilePicker}
            className="grid place-items-center">
            <Avatar className="size-64">
              <AvatarImage src="https://placehold.co/256.jpeg" />
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

        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="Enter Student Name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="teacherId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Teacher</FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select Teacher">
                    {teachers.find((t) => t.id === field.value)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem
                      key={teacher.id}
                      value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !isFile}>
          {isSubmitting ?
            <>
              <Loader2Icon className="animate-spin" />
              Creating Student...
            </>
          : <>
              <UserPenIcon />
              Create Student
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default StudentCreateForm;
