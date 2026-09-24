import { Card, CardContent } from "@/components/shadcnui/card";
import StudentCard from "@/components/StudentCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Teacher Student Management",
  description: "Home page of Teacher Student management App",
};

const page = () => {
  const allStudents = [1, 2];
  if (allStudents.length === 0) {
    return (
      <section className="">
        <Card className="grid h-dvh place-items-center">
          <CardContent className="text-2xl">No Students Found 😒</CardContent>
        </Card>
      </section>
    );
  }
  return (
    <>
      <section className="grid place-items-center gap-8 pt-24 pb-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <StudentCard />
        <StudentCard />
        <StudentCard />
      </section>
    </>
  );
};

export default page;
