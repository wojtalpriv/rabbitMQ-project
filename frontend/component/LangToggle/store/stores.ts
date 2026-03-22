import { create } from "zustand";

type Locale = "pl" | "en";

interface LocaleState {
  locale: Locale;
  isHydrated: boolean;

  setLocale: (locale: Locale) => void;
  toggleLocale: () => Locale;
}

export const useLocaleStore = create<LocaleState>((set, get) => ({
  locale: "pl",
  isHydrated: false,

  setLocale: (locale) => set({ locale, isHydrated: true }),

  toggleLocale: () => {
    const newLocale: Locale = get().locale === "pl" ? "en" : "pl";
    set({ locale: newLocale });
    return newLocale;
  },
}));
