"use client";

import { ThemeToggle } from "@/component/ThemeToggle";
import { LangToggle } from "@/component/LangToggle";
import { UsersTableStyled } from "@/component/UsersTable";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-800 flex flex-col">
      <div className="flex justify-end p-4">
        <ThemeToggle />
        <LangToggle />
      </div>
      <UsersTableStyled />
    </div>
  );
}
