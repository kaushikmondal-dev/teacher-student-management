import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import StudentCreateForm from "@/components/StudentCreateForm";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student | Teacher Student Management",
  description: "Student page of Teacher Student management App",
};

const page = async () => {
  const allTeachers = await prisma.teacher.findMany();

  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Student</CardTitle>
        </CardHeader>
        <StudentCreateForm teachers={allTeachers} />
      </Card>
    </section>
  );
};

export default page;
