import { useState } from "react";

import type { ServiceItem } from "@/features/movers/types";
import { AddressInfoSection } from "./AddressInfoSection";
import { MoversArrivalTime } from "./MoversArrivalTime";
import { CustomizeButton } from "./CustomizeButton";
import { LoadingOrUnloadingCrew } from "./LoadingOrUnloadingCrew";
import { useWidgetStore } from "@/store";

interface TwoAddressWithOneDateOnlyCardProps {
  service: ServiceItem;
}

export function TwoAddressWithOneDateOnlyCard({
  service,
}: TwoAddressWithOneDateOnlyCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const endLocation = useWidgetStore(
    (s) => s.selectedPlaces?.endLocation?.fullAddress,
  );
  const startLocation = useWidgetStore(
    (s) => s.selectedPlaces?.startLocation?.fullAddress,
  );

  //   const { setValue, watch } = useFormContext<CustomizeFormData>();

  //   const prefix = stepType;
  //   const crewSize = watch(`${prefix}.crewSize`) ?? 2;
  //   const hours = watch(`${prefix}.hours`) ?? service.hours;

  const onCollapsibleButtonClick = () => setIsExpanded(!isExpanded);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 text-sm">
        <span className="font-bold text-[#2e343e]">{service.date}</span>
        <span className="text-[#677890]">·</span>
        {startLocation && (
          <span className="truncate text-[#2e343e] capitalize">
            Loading at {startLocation}
          </span>
        )}
        <span className="text-[#677890]">·</span>
        {endLocation && (
          <span className="truncate text-[#2e343e] capitalize">
            UnLoading at {endLocation}
          </span>
        )}
      </div>
      <CustomizeButton
        onCollapsibleButtonClick={onCollapsibleButtonClick}
        service={service}
        isExpanded={isExpanded}
      >
        {/* Expandable content */}
        {isExpanded && (
          <div className="px-4 py-4 flex flex-col md:flex-row md:justify-start gap-9 md:items-center mt-1 ">
            <div className="flex md:w-1/2 flex-col gap-6">
              {/* Address section */}
              {startLocation && <AddressInfoSection stepType={"loading"} />}
              {endLocation && <AddressInfoSection stepType={"unloading"} />}
              {/* Arrival time section */}
              <MoversArrivalTime stepType={"loading"} />
            </div>
            <div className="md:w-1/2">
              <LoadingOrUnloadingCrew service={service} />
            </div>
          </div>
        )}
      </CustomizeButton>
    </div>
  );
}
