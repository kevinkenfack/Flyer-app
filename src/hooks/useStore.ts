import { create } from 'zustand';

interface StoreState {
  message: string | null;
  type: 'success' | 'error' | 'info';
  showMessage: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearMessage: () => void;
}

export const useStore = create<StoreState>((set) => ({
  message: null,
  type: 'success',
  showMessage: (message, type = 'success') => {
    set({ message, type });
  },
  clearMessage: () => {
    set({ message: null });
  },
}));