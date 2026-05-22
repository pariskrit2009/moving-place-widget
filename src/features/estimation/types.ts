// --- Existing estimations-lfs types ---
export interface EstimationRequest {
  originZip: string | null;
  destinationZip: string | null;
  originAddressType: string;
  originBedroomCount: number;
}

export interface EstimationLfsResponse {
  laborHours: number;
  crewSize: number;
  truckSizeRange: string;
}

/** @deprecated Use EstimationLfsResponse */
export type EstimationResponse = EstimationLfsResponse;

// --- Heavy item types (backend enum) ---
export type HeavyItemType =
  | "Unknown"
  | "ItemBetweenThreeAndFourFifty"
  | "ItemBetweenFourFiftyAndSix"
  | "ItemsSixPlus"
  | "Pianos";

export interface HeavyItem {
  itemType: HeavyItemType;
  quantity: number;
}

// --- Recommendations request ---
export interface RecommendationsRequest {
  sqFt: number;
  linearFeet: number | null;
  heavyItems: HeavyItem[];
  load?: { flightsOfStairs: number };
  unload?: { flightsOfStairs: number };
}

// --- Recommendations API response ---
export interface RecommendationsApiResponse {
  load: { recommendedLaborHours: number; recommendedCrewSize: number };
  unload: { recommendedLaborHours: number; recommendedCrewSize: number };
  success: boolean;
  resultMessage: string;
}

// --- Unified normalized response ---
export interface LaborRecommendation {
  laborHours: number;
  crewSize: number;
}

export interface UnifiedEstimationResponse {
  source: "estimations-lfs" | "recommendations";
  aggregate?: LaborRecommendation;
  load?: LaborRecommendation;
  unload?: LaborRecommendation;
  truckSizeRange?: string;
  resultMessage?: string;
}
