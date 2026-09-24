import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../shadcnui/button";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b shadow"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href={"/"}>
          <h1
            className="text-2xl font-semibold"
            aria-label="App Name">
            Teacher-Student-Management
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href={"/create"}
            className={buttonVariants({ variant: "default" })}>
            <PlusIcon />
            Student
          </Link>
          <Link
            href={"/create/teacher"}
            className={buttonVariants({ variant: "secondary" })}>
            <PlusIcon />
            Teacher
          </Link>

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
