import { create } from "zustand";

export const useSpinnerLoadingStore = create<unknown>((set) => ({
  isLoading: true,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
