import { useState } from "react";
import { StarRating } from "@/components/ui/star-rating";
import { CrewSizeColumn } from "./CrewSizeColumn";
import type { ServiceItem } from "../types";
import { Button } from "@/components/ui/button";
import { truncateMidLine } from "@/lib/utils/helper";
import { useWidgetStore } from "@/store";
import { extractCityZip } from "@/lib/utils/extract-city-zip";
import { formatShortDate } from "@/lib/utils/date";
import { ProviderDetailModal } from "./ProviderDetailModal";

export function ProviderBlock({ service }: { service: ServiceItem }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const locations = useWidgetStore((s) => s.selectedPlaces);
  const movingDateData = useWidgetStore((s) => s.movingDateData);
  const loadingAddress = extractCityZip(
    locations?.startLocation?.fullAddress ?? "",
  );
  const unloadingAddress = extractCityZip(
    locations?.endLocation?.fullAddress ?? "",
  );
  const isloadingProvider = service.type === "loading";
  const isDifferentDates = movingDateData?.hasDifferentDates;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-1 flex-col gap-3 min-w-0">
        <div className="flex flex-wrap items-center justify-between sm:whitespace-nowrap text-xs  sm:text-sm text-gray-800">
          <div className="flex items-center gap-1">
            <span className="font-bold">{formatShortDate(service.date)}</span>
            <span className="font-bold">·</span>
            {isloadingProvider && loadingAddress && (
              <span className="font-normal">Loading at {loadingAddress}</span>
            )}
            {!isDifferentDates && unloadingAddress && (
              <span className="font-bold">·</span>
            )}
            {(!isDifferentDates || !isloadingProvider) && unloadingAddress && (
              <span className="font-normal">
                Unloading at {unloadingAddress}
              </span>
            )}
          </div>
          <div className="flex flex-col items-end justify-center gap-1 shrink-0">
            <span className="text-xs text-gray-500 hidden md:block">
              Starting at
            </span>
            <span className="text-sm sm:text-base font-bold">
              ${service.startingPrice}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:grid grid-cols-12 gap-4">
          <div className="col-span-4 flex gap-2">
            <div className="size-9 rounded-lg bg-gray-100 shrink-0">
              <img src={service.provider.avatar} alt={service.provider.name} />
            </div>

            <div className="flex flex-col gap-0.5 min-w-0">
              <span
                className="text-sm font-bold text-teal-600 truncate cursor-pointer"
                onClick={() => setIsDetailOpen(true)}
              >
                {service.provider.name}
              </span>
              <span className="text-xs text-gray-500">
                {service.provider.moves} moves (
                {service.provider.yearsInBusiness} years in business)
              </span>
            </div>
          </div>

          <div className="col-span-8 flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1">
              <StarRating
                rating={service.provider.rating}
                maxStars={5}
                size="sm"
                showValue={false}
              />
              <span className="text-xs text-gray-800">
                {service.provider.rating}
              </span>
              <span className="text-xs text-gray-800">·</span>
              <span className="text-xs text-gray-500">
                {service.provider.reviews} reviews
              </span>
            </div>
            <p className="text-xs text-gray-500">
              <span className="font-bold">Summary:</span>{" "}
              <span>{truncateMidLine(service.provider.summary, 180)}</span>
              <Button className="text-teal-600 !text-xs !p-0 min-h-fit cursor-pointer">
                Read more
              </Button>
            </p>
          </div>
        </div>
      </div>

      <CrewSizeColumn
        movers={service.movers}
        hours={service.hours}
        hasTruck={service.hasTruck}
      />

      <ProviderDetailModal
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        provider={service.provider}
      />
    </div>
  );
}
