import type { StateCreator } from "zustand";
import type { ServiceProvider } from "./types";

export interface ServiceProvidersSlice {
  loadingServiceProviders: ServiceProvider[];
  unloadingServiceProviders: ServiceProvider[];
  selectedLoadingProviderId: number | null;
  selectedUnloadingProviderId: number | null;
  setServiceProviders: (
    type: "loading" | "unloading",
    providers: ServiceProvider[],
  ) => void;
  selectLoadingProvider: (id: number) => void;
  selectUnloadingProvider: (id: number) => void;
  resetServiceProviders: () => void;
}

export const createServiceProvidersSlice: StateCreator<
  ServiceProvidersSlice,
  [],
  [],
  ServiceProvidersSlice
> = (set) => ({
  loadingServiceProviders: [],
  unloadingServiceProviders: [],
  selectedLoadingProviderId: null,
  selectedUnloadingProviderId: null,
  setServiceProviders: (type, providers) =>
    set(
      type === "loading"
        ? { loadingServiceProviders: providers }
        : { unloadingServiceProviders: providers },
    ),
  selectLoadingProvider: (id) => set({ selectedLoadingProviderId: id }),
  selectUnloadingProvider: (id) => set({ selectedUnloadingProviderId: id }),
  resetServiceProviders: () =>
    set({
      loadingServiceProviders: [],
      unloadingServiceProviders: [],
      selectedLoadingProviderId: null,
      selectedUnloadingProviderId: null,
    }),
});
