"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useThemeStore } from "./ThemeToggle/store/stores";

export function ThemeToggle() {
  const t = useTranslations("Components");

  const dark = useThemeStore((s) => s.dark);
  const isHydrated = useThemeStore((s) => s.isHydrated);
  const initTheme = useThemeStore((s) => s.initTheme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  useEffect(() => {
    if (!isHydrated) {
      initTheme();
    }
  }, [isHydrated, initTheme]);


  if (!isHydrated) return null;

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg bg-gray-200 text-gray-800 px-4 py-2 mr-1 dark:bg-gray-700 dark:text-white"
    >
      {dark ? t("themeLight") : t("themeDark")}
    </button>
  );
}
