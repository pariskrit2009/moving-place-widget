import { useState } from "react";

import type { ServiceItem } from "@/features/movers/types";
import { AddressInfoSection } from "./AddressInfoSection";
import { MoversArrivalTime } from "./MoversArrivalTime";
import { CustomizeButton } from "./CustomizeButton";
import { LoadingOrUnloadingCrew } from "./LoadingCrew";

interface TwoAddressWithOneDateOnlyCardProps {
  service: ServiceItem;
}

export function TwoAddressWithOneDateOnlyCard({
  service,
}: TwoAddressWithOneDateOnlyCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

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
        <span className="truncate text-[#2e343e] capitalize">
          Loading at {service.location}
        </span>
        <span className="text-[#677890]">·</span>
        <span className="truncate text-[#2e343e] capitalize">
          UnLoading at {service.location}
        </span>
      </div>
      <CustomizeButton
        onCollapsibleButtonClick={onCollapsibleButtonClick}
        service={service}
        isExpanded={isExpanded}
      >
        {/* Expandable content */}
        {isExpanded && (
          <div className=" px-4 py-4 flex justify-start items-center mt-1 ">
            <div className="flex w-1/2 flex-col gap-5">
              {/* Address section */}
              <AddressInfoSection stepType={"loading"} />
              <AddressInfoSection stepType={"unloading"} />
              {/* Arrival time section */}
              <MoversArrivalTime stepType={"loading"} />
            </div>
            <div className="w-1/2">
              <LoadingOrUnloadingCrew service={service} />
            </div>
          </div>
        )}
      </CustomizeButton>
    </div>
  );
}
