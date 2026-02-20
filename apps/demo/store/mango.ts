import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
  isActive: boolean;
}

interface Actions {
  toggleActive: () => void;
}

type Store = State & Actions;

const initialState: State = {
  isActive: false,
};

export const useZMango = create<Store>()(
  immer((set) => ({
    ...initialState,
    toggleActive: () => set((state) => ({ isActive: !state.isActive })),
  })),
);
