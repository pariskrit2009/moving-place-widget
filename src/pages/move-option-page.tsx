import { Check } from "lucide-react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { useWidgetStore } from "@/store";
import type { MoveOptionData } from "@/features/move-option";
import { Icon } from "@/components/ui/icon";
import { TrustBadge } from "@/features/movers/components";

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

function MoveOptionCard({
  option,
  isSelected,
  onSelect,
  disabled,
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  option: MoveOptionData;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        w-full text-left rounded-2xl p-4 flex gap-3 items-start transition-colors
        ${
          isSelected
            ? "bg-[#f1faf9] border border-[#3290a2]"
            : "bg-white border border-[#b1bbc8]"
        }
      `}
      role="radio"
      aria-checked={isSelected}
      disabled={disabled}
    >
      <div className="flex items-center justify-center rounded-full p-3 shrink-0 bg-[#f1faf9]">
        <Icon name={option?.id} size={30} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <div className="flex flex-col">
          <p className="font-bold text-[18px] text-[#2e343e]">{option.label}</p>
          <p className="text-sm font-normal text-[#677890] leading-relaxed">
            {option.description}
          </p>
        </div>

        <div className="border-t border-[#d5dae2] flex flex-col sm:flex-row items-start justify-between pt-2">
          <div className="flex items-center gap-1">
            <Check size={15} className="text-[#2d6671] shrink-0" />
            <span className="text-sm text-[#2e343e] whitespace-nowrap">
              {option.moversAvailable} movers available
            </span>
          </div>
          <div className="text-[#2e343e] text-sm whitespace-nowrap text-end">
            <div className="flex items-center gap-1 sm:justify-end ">
              <span className="font-normal">Starting at </span>
              <span className="font-bold">${option.startingPrice}</span>
            </div>
            {option?.id == "movers-only" && (
              <p>Includes loading + unloading labor</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-6 h-6 shrink-0 mt-0.5">
        <div
          className={`w-5 h-5 rounded-full border-2 transition-colors ${
            isSelected
              ? "border-[#3799a3] bg-[#3799a3] flex items-center justify-center"
              : "border-[rgba(1,6,47,0.17)] bg-white"
          }`}
        >
          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>
    </button>
  );
}

export default function MoveOptionPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const selectedMoveOption = useWidgetStore((s) => s.selectedMoveOption);
  const setSelectedMoveOption = useWidgetStore((s) => s.setSelectedMoveOption);
  const startLocation = useWidgetStore((s) => s.search?.startLocation);
  const endLocation = useWidgetStore((s) => s.search?.endLocation);
  const hasDifferentDates = useWidgetStore(
    (s) => s.movingDateData?.hasDifferentDates,
  );

  const isDisabled = !(startLocation && endLocation) || !!hasDifferentDates;

  const handleContinue = () => {
    if (!selectedMoveOption) return;
    navigateWithParams("/movers");
  };

  const navigateBack = () => {
    navigateWithParams("/moving");
  };

  return (
    <WidgetLayout onContinue={handleContinue} navigateBack={navigateBack}>
      <div className=" flex flex-col">
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
              disabled={option?.id == "movers-truck" && isDisabled}
            />
          ))}
        </div>
      </div>
    </WidgetLayout>
  );
}
