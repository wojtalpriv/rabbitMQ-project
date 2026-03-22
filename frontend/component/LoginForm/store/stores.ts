import { create } from "zustand";
import { z } from "zod";
import { userSchema, type User } from "@/schemas/userSchema";
import { sendData, getData } from "@/services/authService";

interface AuthState {
  username: string;
  password: string;

  userData: User | null;
  message: string;

  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setMessage: (value: string) => void;
  resetForm: () => void;
  submitLogin: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  username: "",
  password: "",
  userData: null,
  message: "",
  isLoading: false,

  setUsername: (value) => set({ username: value }),
  setPassword: (value) => set({ password: value }),
  setMessage: (value) => set({ message: value }),

  resetForm: () =>
    set({
      username: "",
      password: "",
      userData: null,
      message: "",
    }),

  submitLogin: async () => {
    const { username, password } = get();

    set({ message: "", userData: null });

    let validatedData: User;

    try {
      validatedData = userSchema.parse({
        userName: username,
        password: password,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issue = error.issues[0];
        set({ message: `${issue.path[0].toString()}: ${issue.message}` });
      }
      return;
    }

    const result = await sendData(validatedData);

    if (!result.success) {
      set({ message: result.message });
      return;
    }

    const data = await getData(username);

    set({
      message: "Pomyślnie zapisano dane",
      userData: data ?? null,
    });
  },
}));
