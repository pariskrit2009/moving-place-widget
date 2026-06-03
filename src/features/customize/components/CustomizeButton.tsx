import { Icon } from "@/components/ui/icon";
import { StarRating } from "@/components/ui/star-rating";
import type { ServiceItem } from "@/features/movers/types";
import { ChevronDown } from "lucide-react";
import React from "react";

interface CustomizeButtonProps {
  onCollapsibleButtonClick: () => void;
  service: ServiceItem;
  children?: React.ReactNode;
  isExpanded: boolean;
}

export function CustomizeButton({
  onCollapsibleButtonClick,
  service,
  children,
  isExpanded,
}: CustomizeButtonProps) {
  return (
    <div className="rounded-2xl border">
      <button
        type="button"
        onClick={onCollapsibleButtonClick}
        className="w-full flex items-center flex-wrap justify-between gap-3 px-4 py-3 text-left hover:bg-gray-100/50 transition-colors cursor-pointer"
      >
        <div className="flex flex-col sm:gap-1">
          <div className="flex items-center gap-1 text-teal-600">
            <span className="text-sm font-bold">{service.provider.name}</span>
            <Icon name="circle-info" size={14} />
          </div>
          <div className="flex items-center gap-1">
            <StarRating
              rating={service.provider.rating}
              maxStars={5}
              size="sm"
              showValue={false}
            />
            <span className="text-xs text-[#2e343e]">
              {service.provider.rating}
            </span>
            <span className="text-xs text-[#677890]">
              · {service.provider.reviews} reviews
            </span>
          </div>

          <div className="flex gap-1">
            <div className="flex items-center gap-[2.67px]">
              <Icon name="clock" size={10.67} className="text-gray-500" />
              <span className="whitespace-nowrap text-xs font-semibold">
                {service.hours} hours
              </span>
            </div>
            <div className="flex items-center gap-[2.67px]">
              <Icon name="movers-icon" size={16} className="text-gray-500" />
              <span className="whitespace-nowrap text-xs font-semibold">
                {service.movers} movers
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-base font-bold text-[#2e343e]">
            ${service.startingPrice}
          </span>
          <ChevronDown
            className={`size-5 text-[#677890] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      {children}
    </div>
  );
}
