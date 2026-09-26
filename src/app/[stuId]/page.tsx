import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import UpdateAvatar from "@/components/UpdateAvatar";
import UpdateStudentDetails from "@/components/UpdateStudentDetails";
import prisma from "@/lib/dbClient/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Update | Teacher Student Management",
  description: "Update page of Teacher Student management App",
};

type EdidpageProps = {
  params: Promise<{ stuId: string }>;
};

const page = async ({ params }: EdidpageProps) => {
  const { stuId } = await params;

  const student = await prisma.student.findUnique({
    where: {
      id: stuId,
    },

    include: {
      teacher: true,
    },
  });

  if (student === null) {
    return notFound();
  }

  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Update Student Avatar </CardTitle>
        </CardHeader>
        <UpdateAvatar
          studId={student.id}
          studPrevImage={student.image}
        />
      </Card>

      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Update Student Details</CardTitle>
        </CardHeader>
        <UpdateStudentDetails />
      </Card>
    </section>
  );
};

export default page;
