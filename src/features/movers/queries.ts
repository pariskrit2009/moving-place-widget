import { useQuery } from "@tanstack/react-query";
import { useWidgetStore } from "@/store";
import { getServiceProviders } from "./api";
import { mapToServiceProviderParams } from "./mapper";
import type { SortOrder } from "./types";

export function useServiceProviders(sortOrder: SortOrder = "BestMatch") {
  const search = useWidgetStore((s) => s.selectedPlaces);
  const locations = useWidgetStore((s) => s.locations);
  const movingDateData = useWidgetStore((s) => s.movingDateData);
  const estimation = useWidgetStore((s) => s.estimation);
  const moveOption = useWidgetStore((s) => s.selectedMoveOption);
  const setServiceProviders = useWidgetStore((s) => s.setServiceProviders);

  const { loadingParams, unloadingParams } = mapToServiceProviderParams({
    search,
    locations,
    movingDateData,
    estimation,
    moveOption,
  });

  const loadingQuery = useQuery({
    queryKey: ["service-providers", "loading", loadingParams, sortOrder],
    queryFn: async () => {
      const data = await getServiceProviders({ ...loadingParams!, sortOrder });
      setServiceProviders("loading", data.serviceProviders);
      return data;
    },
    enabled: !!loadingParams,
    staleTime: 1000 * 60 * 5,
  });

  const unloadingQuery = useQuery({
    queryKey: ["service-providers", "unloading", unloadingParams, sortOrder],
    queryFn: async () => {
      const data = await getServiceProviders({ ...unloadingParams!, sortOrder });
      setServiceProviders("unloading", data.serviceProviders);
      return data;
    },
    enabled: !!unloadingParams,
    staleTime: 1000 * 60 * 5,
  });

  return { loadingQuery, unloadingQuery };
}
