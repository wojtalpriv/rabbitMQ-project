"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocaleStore } from "@/component/LangToggle/store/stores";

export function LangToggle() {
  const nextIntlLocale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const locale = useLocaleStore((s) => s.locale);
  const isHydrated = useLocaleStore((s) => s.isHydrated);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const toggleLocale = useLocaleStore((s) => s.toggleLocale);

  useEffect(() => {
    setLocale(nextIntlLocale as "pl" | "en");
  }, [nextIntlLocale, setLocale]);

  const handleToggle = () => {
    const newLocale = toggleLocale();
    router.replace(pathname, { locale: newLocale });
  };

  if (!isHydrated) return null;

  return (
    <button
      onClick={handleToggle}
      className="rounded-lg bg-gray-200 text-gray-800 px-4 py-2 mr-1 dark:bg-gray-700 dark:text-white"
    >
      {locale === "pl" ? "EN" : "PL"}
    </button>
  );
}
