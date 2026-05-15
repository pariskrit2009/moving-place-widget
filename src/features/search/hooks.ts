import { useQuery, useMutation } from "@tanstack/react-query";
import { autocompletePlaces, fetchPlaceDetails } from "./google-places-api";
import { mapSuggestion } from "./types";
import type { PlaceSuggestion, SelectedPlace } from "./types";
import type { PlaceDetailsResponse } from "@/lib/google-places/types";

export { useLocationsForm } from "./useSearchForm";

function parsePlaceDetails(response: PlaceDetailsResponse): SelectedPlace {
  const addr = response.addressComponents ?? [];

  const city =
    addr.find((c) => c.types.includes("locality"))?.longText ??
    addr.find((c) => c.types.includes("administrative_area_level_3"))
      ?.longText ??
    "";

  const state =
    addr.find((c) => c.types.includes("administrative_area_level_1"))
      ?.shortText ?? "";

  const zipCode =
    addr.find((c) => c.types.includes("postal_code"))?.longText ?? "";

  return {
    placeId: response.id,
    formattedAddress: response.formattedAddress ?? "",
    city,
    state,
    zipCode,
    latitude: response.location?.latitude ?? 0,
    longitude: response.location?.longitude ?? 0,
  };
}

export function usePlaceAutocomplete(query: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["place-autocomplete", query],
    queryFn: async () => {
      const response = await autocompletePlaces(query);
      return response.suggestions.map(mapSuggestion);
    },
    enabled: query.length >= 2,
    staleTime: 30_000,
    retry: false,
    gcTime: 60_000,
  });

  return {
    suggestions: (data ?? []) as PlaceSuggestion[],
    isLoading,
    isError,
    error,
  };
}

export function usePlaceDetails() {
  return useMutation({
    mutationFn: async (placeId: string): Promise<SelectedPlace> => {
      const response = await fetchPlaceDetails(placeId);
      return parsePlaceDetails(response);
    },
  });
}

/** @deprecated Use usePlaceAutocomplete instead */
export { usePlaceAutocomplete as usePlaceSearch };
