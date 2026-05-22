import type { StateCreator } from "zustand";
import type { SearchFormData, SelectedPlace } from "./schema";

export interface SearchSlice {
  search: SearchFormData | null;
  setSearch: (data: SearchFormData) => void;
  resetSearch: () => void;
  selectedPlaces: {
    startLocation?: SelectedPlace;
    endLocation?: SelectedPlace;
  } | null;
  setSelectedPlace: (
    field: "startLocation" | "endLocation",
    place: SelectedPlace,
  ) => void;
  resetSelectedPlaces: () => void;
}

export const createSearchSlice: StateCreator<
  SearchSlice,
  [],
  [],
  SearchSlice
> = (set) => ({
  search: null,
  setSearch: (data) => set({ search: data }),
  resetSearch: () => set({ search: null }),
  selectedPlaces: null,
  setSelectedPlace: (field, place) =>
    set((state) => ({
      selectedPlaces: {
        ...state.selectedPlaces,
        [field]: { ...state.selectedPlaces?.[field], ...place },
      },
    })),
  resetSelectedPlaces: () => set({ selectedPlaces: null }),
});
