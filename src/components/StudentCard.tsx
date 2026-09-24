"use client";

import { Trash2, UserPenIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "./shadcnui/badge";
import { Button, buttonVariants } from "./shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcnui/card";

const StudentCard = () => {
  return (
    <Card className="w-sm text-center">
      <CardHeader>
        <CardTitle className="text-2xl">Student Name</CardTitle>
      </CardHeader>
      <CardContent className="items-center justify-center gap-2 text-xl">
        Teacher Name
        <Badge variant="default">Badge</Badge>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button variant="destructive">
          <Trash2 />
          Delete
        </Button>
        <Link
          href={"/"}
          className={buttonVariants({ variant: "outline" })}>
          <UserPenIcon />
          Edit
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
