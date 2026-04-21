import { create } from "zustand";
import { getUserByID } from "@/services/authService";

interface SearchUser {
  userId: number;
  username: string;
  generationDate: string;

  setUserId: (value: number) => void;
  resetForm: () => void;
  submitSearch: () => Promise<void>;
}

export const useSearchUser = create<SearchUser>((set, get) => ({
  userId: 0,
  username: "",
  generationDate: "",

  setUserId: (value) => set({ userId: value }),

  resetForm: () =>
    set({
      userId: 0,
      username: "",
    }),

  submitSearch: async () => {
    const { userId } = get();

    const data = await getUserByID(userId);
    console.log(data);
    if (data.success == false) {
      set({ username: data.message});
      return;
    }

    set({ userId: data.message.id, username: data.message.userName, generationDate: data.message.generationDate ?? null });
  },
}));
