import type { StateCreator } from "zustand";
import type { ServiceProvider } from "./types";

export interface ServiceProvidersSlice {
  loadingServiceProviders: ServiceProvider[];
  unloadingServiceProviders: ServiceProvider[];
  selectedProviderId: number | null;
  setServiceProviders: (
    type: "loading" | "unloading",
    providers: ServiceProvider[],
  ) => void;
  selectProvider: (id: number) => void;
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
  selectedProviderId: null,
  setServiceProviders: (type, providers) =>
    set(
      type === "loading"
        ? { loadingServiceProviders: providers }
        : { unloadingServiceProviders: providers },
    ),
  selectProvider: (id) => set({ selectedProviderId: id }),
  resetServiceProviders: () =>
    set({
      loadingServiceProviders: [],
      unloadingServiceProviders: [],
      selectedProviderId: null,
    }),
});
