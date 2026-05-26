import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { useWidgetStore } from "@/store";
import { MoveOptionCard, type MoveOptionData } from "@/features/move-option";
import { Icon } from "@/components/ui/icon";

import { useEffect } from "react";
import {
  canUseTruckOption,
  reconcileMoveOption,
} from "@/features/move-option/helper";
import { TrustBadge } from "@/components/layout/TrustBadge";

const MOVE_OPTIONS: MoveOptionData[] = [
  {
    id: "movers-truck",
    label: "Movers + Truck",
    description:
      "Licensed and vetted professional movers handle loading, transport, and unloading for a full-service move.",
    moversAvailable: 6,
    startingPrice: 694,
  },
  {
    id: "movers-only",
    label: "Movers Only",
    description:
      "Vetted, professional moving labor handle loading and unload of your truck or container.",
    moversAvailable: 13,
    startingPrice: 468,
  },
];

export default function MoveOptionPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const selectedMoveOption = useWidgetStore((s) => s.selectedMoveOption);
  const setSelectedMoveOption = useWidgetStore((s) => s.setSelectedMoveOption);
  const startLocation = useWidgetStore(
    (s) => s.selectedPlaces?.startLocation?.fullAddress,
  );
  const endLocation = useWidgetStore(
    (s) => s.selectedPlaces?.endLocation?.fullAddress,
  );
  const hasDifferentDates = useWidgetStore(
    (s) => s.movingDateData?.hasDifferentDates,
  );
  const canUseTruck = canUseTruckOption({
    startLocation,
    endLocation,
    hasDifferentDates,
  });

  useEffect(() => {
    const next = reconcileMoveOption({
      current: selectedMoveOption,
      canUseTruck,
    });

    if (next !== selectedMoveOption) {
      setSelectedMoveOption(next);
    }
  }, [canUseTruck, selectedMoveOption, setSelectedMoveOption]);

  const handleContinue = () => {
    if (!selectedMoveOption) return;
    navigateWithParams("/movers");
  };

  const navigateBack = () => {
    navigateWithParams("/moving");
  };

  return (
    <WidgetLayout onContinue={handleContinue} navigateBack={navigateBack}>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-2 ">
          <h2 className="text-xl leading-6">Choose a move option</h2>
          <div className="text-sm pb-6 sm:pb-8 flex gap-4 leading-[18px]">
            <TrustBadge label=" Up to $10,000 damage protection">
              <Icon name="shieldcheck" />
            </TrustBadge>
            <TrustBadge label="No hidden fees">
              <Icon name="circle-dollar" />
            </TrustBadge>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {MOVE_OPTIONS.map((option) => (
            <MoveOptionCard
              key={option.id}
              option={option}
              isSelected={selectedMoveOption === option.id}
              onSelect={() => setSelectedMoveOption(option.id)}
              disabled={option?.id === "movers-truck" && !canUseTruck}
            />
          ))}
        </div>
      </div>
    </WidgetLayout>
  );
}
