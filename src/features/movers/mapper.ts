import { formatIsoDate } from "@/lib/utils/date";
import type { LocationsFormData } from "@/features/locations/schema";
import type { MovingDateFormData } from "@/features/moving/schema";
import type { EstimationResponse } from "@/features/estimation/types";
import type { LocationsFormData as SearchFormData } from "@/features/search/schema";
import type { ServiceProviderParams } from "./types";

interface ServiceProviderMapperInput {
  search: SearchFormData | null;
  locations: LocationsFormData | null;
  movingDateData: MovingDateFormData | null;
  estimation: EstimationResponse | null;
}

export function mapToServiceProviderParams(
  input: ServiceProviderMapperInput,
): ServiceProviderParams | null {
  const { search, locations, movingDateData, estimation } = input;
  console.log(
    search,
    "=> search",
    locations,
    "=> locations",
    movingDateData,
    "=> movingDateData",
    estimation,
    "=> estimation",
  );

  if (!search || !locations || !movingDateData || !estimation) return null;

  // const loadingZip = extractZip(search.startLocation);
  const loadingZip = "94551";
  if (!loadingZip) return null;

  const requestedDate = movingDateData.hasDifferentDates
    ? formatIsoDate(movingDateData.loadingDate)
    : formatIsoDate(movingDateData.movingDate);

  if (!requestedDate) return null;

  const flightsOfStairs = parseInt(locations.loadingDetails.floors, 10) || 0;

  return {
    requestedDate,
    loadingZipCode: loadingZip,
    laborHours: estimation.laborHours,
    crewSize: estimation.crewSize,
    sortOrder: "QualityRating",
    serviceType: "Standard",
    flightsOfStairs,
    onlyAvailable: true,
  };
}
