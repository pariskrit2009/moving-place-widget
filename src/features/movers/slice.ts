import type { StateCreator } from "zustand";
import type { ServiceProvider } from "./types";

export interface ServiceProvidersSlice {
  serviceProviders: ServiceProvider[];
  selectedProviderId: number | null;
  setServiceProviders: (providers: ServiceProvider[]) => void;
  selectProvider: (id: number) => void;
  resetServiceProviders: () => void;
}

export const createServiceProvidersSlice: StateCreator<
  ServiceProvidersSlice,
  [],
  [],
  ServiceProvidersSlice
> = (set) => ({
  serviceProviders: [],
  selectedProviderId: null,
  setServiceProviders: (providers) => set({ serviceProviders: providers }),
  selectProvider: (id) => set({ selectedProviderId: id }),
  resetServiceProviders: () =>
    set({ serviceProviders: [], selectedProviderId: null }),
});
