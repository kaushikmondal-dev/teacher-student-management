import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import StudentCreateForm from "@/components/StudentCreateForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student | Teacher Student Management",
  description: "Student page of Teacher Student management App",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Student</CardTitle>
        </CardHeader>
        <StudentCreateForm />
      </Card>
    </section>
  );
};

export default page;
