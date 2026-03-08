"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function LangToggle() {
  const initialLang = useLocale();
  const [lang, setLang] = useState(initialLang);
  const router = useRouter();

  const toggle = () => {
    const newLang = lang === "pl" ? "en" : "pl";
    setLang(newLang);

    document.cookie = `locale=${newLang}; path=/; max-age=31536000`;

    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      className="rounded-lg bg-gray-200 text-gray-800 px-4 py-2 mr-1 dark:bg-gray-700 dark:text-white"
    >
      {lang === "pl" ? "EN" : "PL"}
    </button>
  );
}