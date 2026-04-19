"use client";

import { ThemeToggle } from "@/component/ThemeToggle";
import { LangToggle } from "@/component/LangToggle";
import { SearchUser } from "@/component/SearchUser";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-800 flex flex-col h-screen">
      <div className="flex justify-end p-4">
        <ThemeToggle />
        <LangToggle />
      </div>
      <SearchUser />
    </div>
  );
}
