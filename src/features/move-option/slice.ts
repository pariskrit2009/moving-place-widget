import type { StateCreator } from "zustand";
import type { MoveOption } from "./schema";

export interface MoveOptionSlice {
  selectedMoveOption: MoveOption | null;
  setSelectedMoveOption: (option: MoveOption | null) => void;
  resetMoveOption: () => void;
}

export const createMoveOptionSlice: StateCreator<
  MoveOptionSlice,
  [],
  [],
  MoveOptionSlice
> = (set) => ({
  selectedMoveOption: null,
  setSelectedMoveOption: (option) => set({ selectedMoveOption: option }),
  resetMoveOption: () => set({ selectedMoveOption: null }),
});
