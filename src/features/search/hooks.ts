// Existing form hook
export { useLocationsForm } from "./useSearchForm";

// Query hooks
// export { useQuotes, useLocationsHistory } from "./queries";

// Place search hook
import { useQuery } from "@tanstack/react-query";
import { searchPlaces } from "./api";

export function usePlaceSearch(query: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["place-search", query],
    queryFn: () => searchPlaces(query),
    enabled: query.length >= 2,
    staleTime: 30_000,
  });

  return {
    suggestions: data?.suggestions ?? [
      { placeId: "1", description: "New York" },
      { placeId: "2", description: "Dallas" },
    ],
    isLoading,
  };
}
