import { useQuery } from "@tanstack/react-query";
import { useWidgetStore } from "@/store";
import { getServiceProviders } from "./api";
import { mapToServiceProviderParams } from "./mapper";

export function useServiceProviders() {
  const search = useWidgetStore((s) => s.search);
  const locations = useWidgetStore((s) => s.locations);
  const movingDateData = useWidgetStore((s) => s.movingDateData);
  const estimation = useWidgetStore((s) => s.estimation);
  const setServiceProviders = useWidgetStore((s) => s.setServiceProviders);

  const params = mapToServiceProviderParams({
    search,
    locations,
    movingDateData,
    estimation,
  });

  console.log(params, "paramssss");

  return useQuery({
    queryKey: ["service-providers", params],
    queryFn: () => getServiceProviders(params!),
    enabled: !!params,
    staleTime: 1000 * 60 * 5,
    select: (data) => {
      setServiceProviders(data.serviceProviders);
      return data;
    },
  });
}
