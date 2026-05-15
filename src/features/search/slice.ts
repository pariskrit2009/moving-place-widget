import type { StateCreator } from "zustand";
import type { LocationsFormData } from "./schema";
import type { SelectedPlace } from "./types";

export interface SearchSlice {
  search: LocationsFormData | null;
  setSearch: (data: LocationsFormData) => void;
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

export const createSearchSlice: StateCreator<SearchSlice, [], [], SearchSlice> =
  (set) => ({
    search: null,
    setSearch: (data) => set({ search: data }),
    resetSearch: () => set({ search: null }),
    selectedPlaces: null,
    setSelectedPlace: (field, place) =>
      set((state) => ({
        selectedPlaces: {
          ...state.selectedPlaces,
          [field]: place,
        },
      })),
    resetSelectedPlaces: () => set({ selectedPlaces: null }),
  });
