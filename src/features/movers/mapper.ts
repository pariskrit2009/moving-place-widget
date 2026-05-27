import { formatIsoDate } from "@/lib/utils/date";
import type { LocationsFormData } from "@/features/locations/schema";
import type { MovingDateFormData } from "@/features/moving/schema";
import type { UnifiedEstimationResponse } from "@/features/estimation/types";
import type { ServiceProviderParams } from "./types";
import type { SearchFormData } from "../search/schema";
import type { MoveOption } from "../move-option/schema";

interface ServiceProviderMapperInput {
  search: SearchFormData | null;
  locations: LocationsFormData | null;
  movingDateData: MovingDateFormData | null;
  estimation: UnifiedEstimationResponse | null;
  moveOption: MoveOption | null;
}

function toServiceType(
  moveOption: MoveOption | null,
): ServiceProviderParams["serviceType"] {
  return moveOption === "movers-truck" ? "MoversPlusTruck" : "Elite";
}

export interface ServiceProviderMapperResult {
  loadingParams: ServiceProviderParams | null;
  unloadingParams: ServiceProviderParams | null;
}

export function mapToServiceProviderParams(
  input: ServiceProviderMapperInput,
): ServiceProviderMapperResult {
  const { search, locations, movingDateData, estimation, moveOption } = input;

  const serviceType = toServiceType(moveOption);
  const empty: ServiceProviderMapperResult = {
    loadingParams: null,
    unloadingParams: null,
  };

  if (!search || !locations || !movingDateData || !estimation) return empty;

  const loadingZip = search.startLocation?.zip;
  const unloadingZip = search.endLocation?.zip;
  if (!loadingZip) return empty;

  const isSameDate = !movingDateData.hasDifferentDates;

  // Resolve labor/crew for loading end
  const loadLabor = estimation.load ?? estimation.aggregate;
  // Resolve labor/crew for unloading end
  const unloadLabor = estimation.unload ?? estimation.aggregate;

  // --- Loading params ---
  const loadingDate = isSameDate
    ? formatIsoDate(movingDateData.movingDate)
    : formatIsoDate(movingDateData.loadingDate);

  let loadingParams: ServiceProviderParams | null = null;

  if (loadingDate && loadLabor && locations.loadingDetails?.floors) {
    loadingParams = {
      requestedDate: loadingDate,
      loadingZipCode: loadingZip,
      unloadingZipCode: unloadingZip,
      laborHours: loadLabor.laborHours,
      crewSize: loadLabor.crewSize,
      sortOrder: "BestMatch",
      serviceType,
      flightsOfStairs: parseInt(locations.loadingDetails.floors, 10) || 0,
      onlyAvailable: true,
    };
  }

  // --- Unloading params (only when different dates) ---
  let unloadingParams: ServiceProviderParams | null = null;
  if (movingDateData.hasDifferentDates && unloadingZip && unloadLabor) {
    const unloadingDate = formatIsoDate(movingDateData.unloadingDate);

    if (unloadingDate) {
      unloadingParams = {
        requestedDate: unloadingDate,
        loadingZipCode: loadingZip,
        unloadingZipCode: unloadingZip,
        laborHours: unloadLabor.laborHours,
        crewSize: unloadLabor.crewSize,
        sortOrder: "BestMatch",
        serviceType,
        flightsOfStairs:
          parseInt(locations.unloadingDetails?.floors ?? "", 10) || 0,
        onlyAvailable: true,
      };
    }
  }
  return { loadingParams, unloadingParams };
}
