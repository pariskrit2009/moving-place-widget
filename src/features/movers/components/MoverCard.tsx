import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { StarRating } from "@/components/ui/star-rating";
import { Info } from "lucide-react";
import type { MoverItem } from "../types";
import { useWidgetStore } from "@/store";
import type { IconName } from "@/components/ui/icon";
import { ProviderDetailModal } from "./ProviderDetailModal";

const EQUIPMENT_ICON_MAP: Record<string, IconName> = {
  "Furniture dolly or straps": "trolley",
  "Hand truck": "dolly",
  "Plastic wrap": "sofa",
};

export function MoverCard({
  mover,
  onAction,
}: {
  mover: MoverItem;
  onAction?: () => void;
}) {
  const selectedMoveOption = useWidgetStore((s) => s.selectedMoveOption);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex flex-col justify-between md:flex-row md:gap-8">
        {/* Provider info row */}
        <div className="flex flex-1 items-start gap-2">
          <div className="size-10 rounded-lg bg-gray-100 shrink-0">
            <img src={mover.avatar} alt={mover.id} />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <span
              className="text-sm font-bold text-teal-600 cursor-pointer"
              onClick={() => setIsDetailOpen(true)}
            >
              {mover.provider.name}
            </span>
            <div className="flex items-center gap-1">
              <StarRating
                rating={mover.provider.rating}
                maxStars={5}
                size="sm"
                showValue={false}
              />
              <span className="text-xs text-gray-800">
                {mover.provider.rating}
              </span>
              <span className="text-xs text-gray-800">·</span>
              <span className="text-xs text-gray-500">
                {mover.provider.reviews} reviews
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {mover.provider.moves} moves ({mover.provider.yearsInBusiness}{" "}
              years in business)
            </span>
            {/* Included services */}
            <div className="flex items-center gap-1 pt-1.5">
              <span className="text-xs text-gray-500">Included</span>
              {mover.availableEquipement?.map((eq) => {
                const iconName = EQUIPMENT_ICON_MAP[eq.name];
                if (!iconName) return null;
                return (
                  <Icon
                    key={eq.name}
                    name={iconName}
                    size={24}
                    className="text-teal-600"
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center gap-0.5">
          {/* Service details row */}
          <div className="flex items-center justify-center font-bold gap-4 text-xs leading-4 text-gray-800">
            <div className="flex flex-col items-center">
              <Icon name="clock" size={30} className="text-gray-500" />
              <span className="whitespace-nowrap">{mover.hours} hours</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="movers-icon" size={30} className="text-gray-500" />
              <span className="whitespace-nowrap">{mover.movers} movers</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon
                name={mover.hasTruck ? "truck" : "truck-slash"}
                size={30}
                className={mover.hasTruck ? "text-gray-500" : "text-gray-200"}
              />

              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap">
                  {mover.hasTruck ? "1 Truck (20')" : "No truck"}
                </span>
                {/* <Icon name="circle-info" size={10} className="text-[#D9292E]" /> */}
              </div>
            </div>
          </div>

          <span className="text-xs text-gray-500 w-full bg-gray-50 leading-4 text-[10px] text-center max-w-89 mt-1.5 p-0.5 rounded-full">
            Mover's minimum crew: {mover.movers} movers &times; {mover.hours}{" "}
            hours
          </span>
          <span className="text-xs text-gray-500 text-[10px] leading-4 text-center">
            You can adjust movers or hours before checkout
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex flex-1 flex-col justify-between md:items-end">
          <span className="text-xl hidden md:block font-bold text-gray-800">
            ${mover.price}
          </span>
          <span className="text-xs text-gray-500 hidden md:block md:text-end">
            {mover.priceLabel}
          </span>
          <button className="md:flex hidden items-center gap-0.5 mt-0.5">
            <span className="text-xs text-teal-600">
              {selectedMoveOption === "movers-only"
                ? `Move's total $${mover.price}`
                : "Price details"}
            </span>
            <Info className="size-3 text-teal-600" />
          </button>
          <Button
            variant="cta"
            size={"sm"}
            className="mt-2 text-sm md:text-xs lg:text-sm leading-[125%]"
            onClick={onAction}
          >
            <span className="hidden md:block">Select & Review</span>
            <span className="block md:hidden">
              Select & Review - ${mover?.price}
            </span>
          </Button>
          <span className="text-xs text-gray-500 md:hidden pt-2 text-center block md:text-end">
            {mover.priceLabel}
          </span>
          <button className="flex md:hidden items-center justify-center gap-0.5 mt-0.5">
            <span className="text-xs text-teal-600">
              {selectedMoveOption === "movers-only"
                ? `Move's total $${mover.price}`
                : "Price details"}
            </span>
            <Info className="size-3 text-teal-600" />
          </button>
        </div>
      </div>

      <ProviderDetailModal
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        provider={mover.provider}
      />
    </div>
  );
}
