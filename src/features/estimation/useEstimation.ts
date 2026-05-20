import { useMutation } from "@tanstack/react-query";
import { getEstimation, getRecommendations } from "./api";
import {
  mapToEstimationRequest,
  mapToRecommendationsRequest,
  normalizeLfsResponse,
  normalizeRecommendationsResponse,
} from "./mapper";
import type { UnifiedEstimationResponse } from "./types";
import type { LocationsFormData } from "@/features/locations/schema";
import type { LocationsFormData as SearchFormData } from "@/features/search/schema";
import { useWidgetStore } from "@/store";

export interface EstimationCallInput {
  hasDifferentDates: boolean;
  search: SearchFormData | null;
  locations: LocationsFormData | null;
}

export function useEstimation() {
  const setEstimation = useWidgetStore((s) => s.setEstimation);

  return useMutation<UnifiedEstimationResponse, Error, EstimationCallInput>({
    mutationFn: async (input) => {
      const hasBothLocations = !!(
        input.search?.startLocation && input.search?.endLocation
      );

      if (!input.hasDifferentDates && hasBothLocations) {
        const request = mapToEstimationRequest({
          search: input.search,
          locations: input.locations,
        });
        if (!request)
          throw new Error("Unable to build estimation request");
        const response = await getEstimation(request);
        return normalizeLfsResponse(response);
      }

      const request = mapToRecommendationsRequest({
        locations: input.locations,
      });
      if (!request)
        throw new Error("Unable to build recommendations request");
      const response = await getRecommendations(request);
      return normalizeRecommendationsResponse(response);
    },
    onSuccess: (data) => {
      setEstimation(data);
    },
  });
}
