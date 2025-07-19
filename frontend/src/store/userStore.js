// store/userStore.ts
import { create } from "zustand";

export const useUserStore = create((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  clearUserId: () => set({ userId: null }),
}));
