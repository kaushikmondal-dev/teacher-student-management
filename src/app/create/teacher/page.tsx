import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import TeacherCreateForm from "@/components/TeacherCreateForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher | Teacher Student Management",
  description: "Teacher page of Teacher Student management App",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Teacher</CardTitle>
        </CardHeader>
        <TeacherCreateForm />
      </Card>
    </section>
  );
};

export default page;
