"use client";

import { StudentGetPayload } from "@generated/prisma/models";
import { RefreshCw, Trash2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
import { Badge } from "./shadcnui/badge";
import { Button, buttonVariants } from "./shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcnui/card";
import { Separator } from "./shadcnui/separator";

type StudentCardProps = {
  stuD: StudentGetPayload<{
    include: {
      teacher: true;
    };
  }>;
};

const StudentCard = ({ stuD }: StudentCardProps) => {
  return (
    <Card className="w-sm bg-gray-950 text-center">
      <div className="grid place-items-center bg-gray-900">
        <Avatar className="size-64">
          <AvatarImage src={`/${stuD.image}`} />
          <AvatarFallback>{stuD.name}</AvatarFallback>
        </Avatar>
      </div>

      <CardHeader>
        <CardTitle className="text-3xl">{stuD.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex place-items-center items-center justify-center text-lg">
        <div className="flex items-center gap-3 text-xl">
          {stuD.teacher.name}
          <Badge variant="default">{stuD.teacher.subject}</Badge>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button variant="destructive">
          <Trash2 />
          Delete
        </Button>
        <Link
          href={"/"}
          className={buttonVariants({ variant: "outline" })}>
          <RefreshCw />
          Update
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
