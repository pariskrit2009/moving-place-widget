import type { SearchFormData } from "../search/schema";
import type {
  EstimationRequest,
  EstimationLfsResponse,
  RecommendationsRequest,
  RecommendationsApiResponse,
  HeavyItem,
  UnifiedEstimationResponse,
} from "./types";
import type { LocationsFormData } from "@/features/locations/schema";

// --- Input types ---

interface EstimationInput {
  search: SearchFormData | null;
  locations: LocationsFormData | null;
}

interface RecommendationsInput {
  locations: LocationsFormData | null;
}

// --- Helpers ---

function parseBedroomCount(value: number): number {
  if (!value) return 0;
  return Number.isNaN(value) ? 0 : value;
}

function parseFlightsOfStairs(floors: string): number {
  if (!floors) return 0;
  if (floors === "3+") return 3;
  const parsed = parseInt(floors, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

// function deriveLinearFeet(sqFt: number): number {
//   if (sqFt <= 0) return 0;
//   return Math.ceil(sqFt / 50);
// }

function deriveHeavyItems(
  pianoDetails: LocationsFormData["pianoDetails"],
): HeavyItem[] {
  const items: HeavyItem[] = [];

  const pianoQty =
    pianoDetails.baby_or_grand_pianos + pianoDetails.upright_pianos;
  if (!Number.isNaN(pianoQty) && +pianoQty > 0) {
    items.push({ itemType: "Pianos", quantity: +pianoQty });
  }

  const fieldMap: Array<{
    key: keyof LocationsFormData["pianoDetails"];
    itemType: HeavyItem["itemType"];
  }> = [
    { key: "300_to_450_lbs", itemType: "ItemBetweenThreeAndFourFifty" },
    { key: "450_to_600_lbs", itemType: "ItemBetweenFourFiftyAndSix" },
    { key: "over_600_lbs", itemType: "ItemsSixPlus" },
  ];

  for (const { key, itemType } of fieldMap) {
    const quantity = pianoDetails[key];
    if (!Number.isNaN(quantity) && +quantity > 0) {
      items.push({ itemType, quantity: +quantity });
    }
  }

  return items;
}

// --- Estimations LFS mapper ---

export function mapToEstimationRequest(
  input: EstimationInput,
): EstimationRequest | null {
  const { search, locations } = input;

  if (!search || !locations) return null;

  const originZip = search.startLocation?.zip;
  const destinationZip = search.endLocation?.zip;

  // if (!originZip || !destinationZip) return null;

  return {
    originZip: originZip ?? null,
    destinationZip: destinationZip ?? null,
    originAddressType: locations.loadingPropertyType,
    // originBedroomCount: parseBedroomCount(locations.loadingDetails.bedrooms),
    originBedroomCount: 2,
  };
}

// --- Recommendations mapper ---

export function mapToRecommendationsRequest(
  input: RecommendationsInput,
): RecommendationsRequest | null {
  const { locations } = input;
  if (!locations) return null;

  const sqFt = parseBedroomCount(
    +locations.loadingDetails.bedrooms || +locations.unloadingDetails.bedrooms,
  );
  // const linearFeet = deriveLinearFeet(sqFt);
  const heavyItems = deriveHeavyItems(locations.pianoDetails);

  return {
    sqFt,
    linearFeet: null,
    heavyItems,
    ...(locations.loadingDetails.floors
      ? {
          load: {
            flightsOfStairs: parseFlightsOfStairs(
              locations.loadingDetails.floors,
            ),
          },
        }
      : {}),
    ...(locations.unloadingDetails.floors
      ? {
          unload: {
            flightsOfStairs: parseFlightsOfStairs(
              locations.unloadingDetails.floors,
            ),
          },
        }
      : {}),
  };
}

// --- Normalizers ---

export function normalizeLfsResponse(
  response: EstimationLfsResponse,
): UnifiedEstimationResponse {
  return {
    source: "estimations-lfs",
    aggregate: {
      laborHours: response.laborHours,
      crewSize: response.crewSize,
    },
    truckSizeRange: response.truckSizeRange,
  };
}

export function normalizeRecommendationsResponse(
  response: RecommendationsApiResponse,
): UnifiedEstimationResponse {
  return {
    source: "recommendations",
    load: {
      laborHours: response.load.recommendedLaborHours,
      crewSize: response.load.recommendedCrewSize,
    },
    unload: {
      laborHours: response.unload.recommendedLaborHours,
      crewSize: response.unload.recommendedCrewSize,
    },
    resultMessage: response.resultMessage,
  };
}
