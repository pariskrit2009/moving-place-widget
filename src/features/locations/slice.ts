import type { StateCreator } from "zustand";
import type { LocationsFormData } from "./schema";
import { LOCATIONS_DEFAULT_VALUES } from "./constant";

export interface LocationsSlice {
  locations: LocationsFormData | null;
  setLocations: (data: LocationsFormData) => void;
  resetLocations: () => void;
}

export const createLocationsSlice: StateCreator<
  LocationsSlice,
  [],
  [],
  LocationsSlice
> = (set) => ({
  locations: LOCATIONS_DEFAULT_VALUES,
  setLocations: (data) => set({ locations: data }),
  resetLocations: () => set({ locations: null }),
});
