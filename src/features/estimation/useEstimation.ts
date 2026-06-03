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
import { useWidgetStore } from "@/store";
import type { SearchFormData } from "../search/schema";

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
        input.search?.startLocation?.fullAddress &&
        input.search?.endLocation?.fullAddress
      );

      // Case: same date + both locations → estimations-lfs (unchanged)
      if (!input.hasDifferentDates && hasBothLocations) {
        const request = mapToEstimationRequest({
          search: input.search,
          locations: input.locations,
        });
        if (!request) throw new Error("Unable to build estimation request");
        const response = await getEstimation(request);
        return normalizeLfsResponse(response);
      }

      // Case: different dates + both locations → dual recommendations calls
      if (input.hasDifferentDates && hasBothLocations) {
        const [loadingReq, unloadingReq] = [
          mapToRecommendationsRequest(
            { locations: input.locations },
            "loading",
          ),
          mapToRecommendationsRequest(
            { locations: input.locations },
            "unloading",
          ),
        ];

        if (!loadingReq || !unloadingReq)
          throw new Error("Unable to build recommendations requests");

        const [loadingRes, unloadingRes] = await Promise.all([
          getRecommendations(loadingReq),
          getRecommendations(unloadingReq),
        ]);

        const loadingNorm = normalizeRecommendationsResponse(loadingRes);
        const unloadingNorm = normalizeRecommendationsResponse(unloadingRes);

        return {
          source: "recommendations",
          load: loadingNorm.load,
          unload: unloadingNorm.unload,
          resultMessage: unloadingNorm.resultMessage,
        } satisfies UnifiedEstimationResponse;
      }

      // Case: single address or fallback → single recommendations call
      const request = mapToRecommendationsRequest({
        locations: input.locations,
      });
      if (!request) throw new Error("Unable to build recommendations request");
      const response = await getRecommendations(request);
      return normalizeRecommendationsResponse(response);
    },
    onSuccess: (data) => {
      setEstimation(data);
    },
  });
}
