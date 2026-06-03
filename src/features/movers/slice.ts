import type { StateCreator } from "zustand";
import type { ServiceProvider } from "./types";

export interface ServiceProvidersSlice {
  loadingServiceProviders: ServiceProvider[];
  unloadingServiceProviders: ServiceProvider[];
  selectedLoadingProvider: ServiceProvider | null;
  selectedUnloadingProvider: ServiceProvider | null;
  setServiceProviders: (
    type: "loading" | "unloading",
    providers: ServiceProvider[],
  ) => void;
  setSelectedLoadingProvider: (provider: ServiceProvider) => void;
  setSelectedUnloadingProvider: (provider: ServiceProvider) => void;
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
  selectedLoadingProvider: null,
  selectedUnloadingProvider: null,
  setServiceProviders: (type, providers) =>
    set(
      type === "loading"
        ? { loadingServiceProviders: providers }
        : { unloadingServiceProviders: providers },
    ),
  // selectLoadingProvider: (id) => set({ selectedLoadingProviderId: id }),
  // selectUnloadingProvider: (id) => set({ selectedUnloadingProviderId: id }),
  setSelectedLoadingProvider: (provider) =>
    set({ selectedLoadingProvider: provider }),

  setSelectedUnloadingProvider: (provider) =>
    set({ selectedUnloadingProvider: provider }),
  resetServiceProviders: () =>
    set({
      loadingServiceProviders: [],
      unloadingServiceProviders: [],
      selectedLoadingProvider: null,
      selectedUnloadingProvider: null,
      // selectedLoadingProviderId: null,
      // selectedUnloadingProviderId: null,
    }),
});
