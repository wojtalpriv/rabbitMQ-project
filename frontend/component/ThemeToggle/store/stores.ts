import { create } from "zustand";

interface ThemeState {
  dark: boolean;
  isHydrated: boolean;

  initTheme: () => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  dark: false,
  isHydrated: false,

  initTheme: () => {
    const saved = localStorage.getItem("theme");

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    
    const isDark = saved === "dark" || (!saved && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
    set({ dark: isDark, isHydrated: true });
  },

  toggleTheme: () => {
    const newDark = !get().dark;
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    set({ dark: newDark });
  },
}));
