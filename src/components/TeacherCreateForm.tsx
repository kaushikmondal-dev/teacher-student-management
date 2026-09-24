"use client";

import { teacherFormSchema, TeacherFormType } from "@/lib/zodSchema";
import { createTeacher } from "@/server/createTeacher";
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

const TeacherCreateForm = () => {
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: "",
      subject: "",
    },

    mode: "all",
  });

  const CreateTeacherHandler = async (uData: TeacherFormType) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    const { isSuccess, msg } = await createTeacher(uData);

    if (isSuccess) {
      toast.add({
        title: "success",
        description: msg,
        type: "success",
      });
      reset();
      push("/create");
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
      onSubmit={handleSubmit(CreateTeacherHandler)}
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
                placeholder="Enter Teacher Name"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="subject"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Math">Math</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
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
          disabled={isSubmitting}>
          {isSubmitting ?
            <>
              <Loader2Icon className="animate-spin" />
              Creating Teacher...
            </>
          : <>
              <UserPenIcon />
              Create Teacher
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default TeacherCreateForm;
