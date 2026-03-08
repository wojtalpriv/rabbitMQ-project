"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const t = useTranslations("Components");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = saved === "dark" || (!saved && prefersDark);

    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="rounded-lg bg-gray-200 text-gray-800 px-4 py-2 mr-1 dark:bg-gray-700 dark:text-white"
    >
      {dark ? t("themeLight") : t("themeDark")}
    </button>
  );
}
