import { useState } from "react";

import type { ServiceItem } from "@/features/movers/types";
import { AddressInfoSection } from "./AddressInfoSection";
import { MoversArrivalTime } from "./MoversArrivalTime";
import { CustomizeButton } from "./CustomizeButton";
import { LoadingOrUnloadingCrew } from "./LoadingOrUnloadingCrew";
import { formatShortDate } from "@/lib/utils/date";

interface TwoAddressWithOneDateOnlyCardProps {
  loadingService: ServiceItem | null;
  unloadingService: ServiceItem | null;
}

export function TwoAddressWithOneDateOnlyCard({
  loadingService,
  unloadingService,
}: TwoAddressWithOneDateOnlyCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const onCollapsibleButtonClick = () => setIsExpanded(!isExpanded);
  const fallbackService = loadingService ?? unloadingService;
  const formattedDate = formatShortDate(fallbackService?.date ?? "");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 text-sm flex-wrap font-bold">
        <span>{formattedDate}</span>
        {loadingService?.location && (
          <span className="capitalize"> . {loadingService?.location}</span>
        )}
        {unloadingService?.location && (
          <span className="capitalize"> . {unloadingService?.location}</span>
        )}
      </div>
      <CustomizeButton
        onCollapsibleButtonClick={onCollapsibleButtonClick}
        service={fallbackService}
        isExpanded={isExpanded}
      >
        {/* Expandable content */}
        {isExpanded && (
          <div className="px-4 py-4 flex flex-col md:flex-row md:justify-start gap-9 md:items-center mt-1 ">
            <div className="flex md:w-1/2 flex-col gap-6">
              {/* Address section */}
              {loadingService?.location && (
                <AddressInfoSection stepType={"loading"} />
              )}
              {unloadingService?.location && (
                <AddressInfoSection stepType={"unloading"} />
              )}
              {/* Arrival time section */}
              <MoversArrivalTime stepType={"loading"} />
            </div>
            <div className="md:w-1/2">
              <LoadingOrUnloadingCrew service={fallbackService} />
            </div>
          </div>
        )}
      </CustomizeButton>
    </div>
  );
}
