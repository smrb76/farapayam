import { create } from 'zustand';
import { ILoadingState } from '../../../types/loading.model';

export const useSpinnerLoadingStore = create<ILoadingState>((set) => ({
  isLoading: true,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
