"use client";

import { studentFormSchema, StudentFormType } from "@/lib/zodSchema";
import { updateStudentDetails } from "@/server/updateStudentDetails";
import { Student, Teacher } from "@generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UserPenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
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

type UpdateStudentDetailsProps = {
  student: Student;
  teachers: Teacher[];
};

const UpdateStudentDetails = ({
  student,
  teachers,
}: UpdateStudentDetailsProps) => {
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<StudentFormType>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: student.name,
      teacherId: student.teacherId,
    },
    mode: "all",
  });

  const updateStudentHandler = async (uData: StudentFormType) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    const { isSuccess, msg } = await updateStudentDetails(student.id, uData);

    if (isSuccess) {
      toast.add({
        title: "success",
        description: msg,
        type: "success",
      });
      reset();

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
      onSubmit={handleSubmit(updateStudentHandler)}
      className="grid gap-4"
      noValidate>
      <CardContent>
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
          disabled={isSubmitting || !isDirty}>
          {isSubmitting ?
            <>
              <Loader2Icon className="animate-spin" />
              Updating Student...
            </>
          : <>
              <UserPenIcon />
              Update Student
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default UpdateStudentDetails;
