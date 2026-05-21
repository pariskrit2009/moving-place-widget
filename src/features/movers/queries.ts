import { useQuery } from "@tanstack/react-query";
import { useWidgetStore } from "@/store";
import { getServiceProviders } from "./api";
import { mapToServiceProviderParams } from "./mapper";

export function useServiceProviders() {
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
  });

  const loadingQuery = useQuery({
    queryKey: ["service-providers", "loading", loadingParams],
    queryFn: async () => {
      const data = await getServiceProviders(loadingParams!);
      setServiceProviders("loading", data.serviceProviders);
      return data;
    },
    enabled: !!loadingParams,
    staleTime: 1000 * 60 * 5,
  });

  const unloadingQuery = useQuery({
    queryKey: ["service-providers", "unloading", unloadingParams],
    queryFn: async () => {
      const data = await getServiceProviders(unloadingParams!);
      setServiceProviders("unloading", data.serviceProviders);
      return data;
    },
    enabled: !!unloadingParams,
    staleTime: 1000 * 60 * 5,
  });

  return { loadingQuery, unloadingQuery };
}
