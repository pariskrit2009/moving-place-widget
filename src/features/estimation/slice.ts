import type { StateCreator } from "zustand";
import type { UnifiedEstimationResponse } from "./types";

export interface EstimationSlice {
  estimation: UnifiedEstimationResponse | null;
  setEstimation: (data: UnifiedEstimationResponse) => void;
  resetEstimation: () => void;
}

export const createEstimationSlice: StateCreator<
  EstimationSlice,
  [],
  [],
  EstimationSlice
> = (set) => ({
  estimation: null,
  setEstimation: (data) => set({ estimation: data }),
  resetEstimation: () => set({ estimation: null }),
});
