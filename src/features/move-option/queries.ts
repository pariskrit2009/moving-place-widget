import { useQuery } from "@tanstack/react-query";
import { useWidgetStore } from "@/store";
import { getServiceProviders } from "@/features/movers/api";
import { mapToServiceProviderParams } from "@/features/movers/mapper";

export function useMoveOptionProviders() {
  const search = useWidgetStore((s) => s.selectedPlaces);
  const locations = useWidgetStore((s) => s.locations);
  const movingDateData = useWidgetStore((s) => s.movingDateData);
  const estimation = useWidgetStore((s) => s.estimation);
  const moveOption = useWidgetStore((s) => s.selectedMoveOption);

  const { loadingParams: baseLoadingParams } = mapToServiceProviderParams({
    search,
    locations,
    movingDateData,
    estimation,
    moveOption,
  });

  const moversPlusTruckQuery = useQuery({
    queryKey: ["move-option-providers", "movers-truck", baseLoadingParams],
    queryFn: async () => {
      const params = {
        ...baseLoadingParams!,
        serviceType: "MoversPlusTruck" as const,
        sortOrder: "PriceLowToHigh" as const,
      };
      return getServiceProviders(params);
    },
    enabled: !!baseLoadingParams && !movingDateData?.hasDifferentDates,
    staleTime: 1000 * 60 * 5,
  });

  const moversOnlyQuery = useQuery({
    queryKey: ["move-option-providers", "movers-only", baseLoadingParams],
    queryFn: async () => {
      const params = {
        ...baseLoadingParams!,
        serviceType: "Standard" as const,
        sortOrder: "PriceLowToHigh" as const,
      };
      return getServiceProviders(params);
    },
    enabled: !!baseLoadingParams,
    staleTime: 1000 * 60 * 5,
  });

  return { moversPlusTruckQuery, moversOnlyQuery };
}
