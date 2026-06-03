import { useState } from "react";
import type { ServiceItem } from "@/features/movers/types";
import { AddressInfoSection } from "./AddressInfoSection";
import { MoversArrivalTime } from "./MoversArrivalTime";
import { CustomizeButton } from "./CustomizeButton";
import { LoadingOrUnloadingCrew } from "./LoadingOrUnloadingCrew";
import { formatShortDate } from "@/lib/utils/date";

interface OneAddressWithOneDateOnlyCardProps {
  stepType: "loading" | "unloading";
  service: ServiceItem;
}

export function OneAddressWithOneDateOnlyCard({
  stepType,
  service,
}: OneAddressWithOneDateOnlyCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const onCollapsibleButtonClick = () => setIsExpanded(!isExpanded);
  const formattedDate = formatShortDate(service.date);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 text-sm font-bold flex-wrap">
        <span>{formattedDate}</span>
        <span className="truncate capitalize">
          . {stepType} at {service.location}
        </span>
      </div>
      <CustomizeButton
        onCollapsibleButtonClick={onCollapsibleButtonClick}
        service={service}
        isExpanded={isExpanded}
      >
        {/* Expandable content */}
        {isExpanded && (
          <div className="px-4 py-4 flex flex-col md:flex-row md:justify-start gap-9 md:items-center mt-1 ">
            <div className="flex flex-col gap-5">
              {/* Address section */}
              <AddressInfoSection stepType={stepType} />
              {/* Arrival time section */}
              <MoversArrivalTime stepType={stepType} />
            </div>

            {/* Crew section */}
            <div className="w-1/2">
              <LoadingOrUnloadingCrew service={service} />
            </div>
          </div>
        )}
      </CustomizeButton>
    </div>
  );
}
