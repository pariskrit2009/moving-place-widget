import { post } from "@/lib/api/client";
import type {
  EstimationRequest,
  EstimationLfsResponse,
  RecommendationsRequest,
  RecommendationsApiResponse,
} from "./types";

export async function getEstimation(
  data: EstimationRequest,
): Promise<EstimationLfsResponse> {
  return post<EstimationLfsResponse>(
    "/moving/quote/marketplace/estimations-lfs/",
    data,
  );
}

export async function getRecommendations(
  data: RecommendationsRequest,
): Promise<RecommendationsApiResponse> {
  return post<RecommendationsApiResponse>(
    "/moving/quote/marketplace/recommendations/",
    data,
  );
}
