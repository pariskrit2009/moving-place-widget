import { useQuery } from "@tanstack/react-query";
import { useWidgetStore } from "@/store";
import { getServiceProviders } from "@/features/movers/api";
import { mapToServiceProviderParams } from "@/features/movers/mapper";
import { SORT_ORDER } from "@/features/movers/types";

export function useMoveOptionProviders() {
  const search = useWidgetStore((s) => s.selectedPlaces);
  const locations = useWidgetStore((s) => s.locations);
  const movingDateData = useWidgetStore((s) => s.movingDateData);
  const estimation = useWidgetStore((s) => s.estimation);
  const setServiceProviders = useWidgetStore((s) => s.setServiceProviders);

  const { loadingParams, unloadingParams } = mapToServiceProviderParams({
    search,
    locations,
    movingDateData,
    estimation,
    moveOption: null,
  });

  const hasDifferentDates = !!movingDateData?.hasDifferentDates;
  const hasBothLocations =
    !!search?.startLocation?.fullAddress && !!search?.endLocation?.fullAddress;

  // Movers + Truck: only available when same date + both locations
  const moversPlusTruckQuery = useQuery({
    queryKey: ["move-option-providers", "movers-truck", loadingParams],
    queryFn: async () => {
      const params = {
        ...loadingParams!,
        serviceType: "MoversPlusTruck" as const,
        sortOrder: SORT_ORDER.PriceLowToHigh,
      };
      return getServiceProviders(params);
    },
    enabled:
      !!loadingParams && !hasDifferentDates && hasBothLocations,
    staleTime: 1000 * 60 * 5,
  });

  // Movers Only — loading phase
  const moversOnlyLoadingQuery = useQuery({
    queryKey: [
      "move-option-providers",
      "movers-only",
      "loading",
      loadingParams,
    ],
    queryFn: async () => {
      const params = {
        ...loadingParams!,
        serviceType: "Standard" as const,
        sortOrder: SORT_ORDER.PriceLowToHigh,
      };
      const data = await getServiceProviders(params);
      setServiceProviders("loading", data.serviceProviders);
      return data;
    },
    enabled: !!loadingParams,
    staleTime: 1000 * 60 * 5,
  });

  // Movers Only — unloading phase (only when different dates + both locations)
  const moversOnlyUnloadingQuery = useQuery({
    queryKey: [
      "move-option-providers",
      "movers-only",
      "unloading",
      unloadingParams,
    ],
    queryFn: async () => {
      const params = {
        ...unloadingParams!,
        serviceType: "Standard" as const,
        sortOrder: SORT_ORDER.PriceLowToHigh,
      };
      const data = await getServiceProviders(params);
      setServiceProviders("unloading", data.serviceProviders);
      return data;
    },
    enabled: !!unloadingParams && hasDifferentDates && hasBothLocations,
    staleTime: 1000 * 60 * 5,
  });

  return { moversPlusTruckQuery, moversOnlyLoadingQuery, moversOnlyUnloadingQuery };
}
