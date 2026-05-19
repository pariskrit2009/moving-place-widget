import { Icon } from "@/components/ui/icon";
import type { MoveOptionData } from "../schema";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function MoveOptionCard({
  option,
  isSelected,
  onSelect,
  disabled,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  option: MoveOptionData;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        `group relative w-full text-left rounded-2xl items-start p-4 flex flex-col sm:flex-row gap-3 sm:items-center transition-colors bg-white border text-xs sm:text-sm`,
        isSelected && "bg-teal-50  !border-teal-600",
        disabled && "bg-gray-50",
      )}
      {...rest}
      role="radio"
      aria-checked={isSelected}
      disabled={disabled}
    >
      <div className="flex items-center justify-center rounded-full p-3 shrink-0 bg-teal-50 group-disabled:bg-gray-50">
        <Icon
          name={option?.id}
          size={30}
          className="group-disabled:text-gray-600"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-3 ">
        <div className="flex flex-col">
          <p className="font-bold text-base sm:text-lg text-[#2e343e] group-disabled:text-gray-600">
            {option.label}
          </p>
          <p className=" font-normal text-[#677890] leading-relaxed group-disabled:text-gray-600">
            {option.description}
          </p>
        </div>

        <div className="border-t border-[#d5dae2] flex flex-row gap-2 items-start justify-between pt-2">
          <div className="flex items-center gap-1">
            <Check
              size={15}
              className="text-[#2d6671] group-disabled:text-gray-600 shrink-0"
            />
            <span className="text-[#2e343e] group-disabled:text-gray-600 whitespace-nowrap">
              {option.moversAvailable} movers available
            </span>
          </div>
          <div className="text-[#2e343e] group-disabled:text-gray-600   text-end">
            <div className="flex items-center flex-wrap gap-1 justify-end ">
              <span className="font-normal">Starting at </span>
              <span className="font-bold">${option.startingPrice}</span>
            </div>
            {option?.id === "movers-only" && (
              <p>Includes loading + unloading labor</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center absolute right-4 top-4 w-6 h-6 shrink-0 ">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 transition-color group-disabled:bg-gray-600 border-[rgba(1,6,47,0.17)] bg-white",
            isSelected &&
              "border-[#3799a3] bg-[#3799a3] flex items-center justify-center",
          )}
        >
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-white border-[rgba(1,6,47,0.17)] " />
          )}
        </div>
      </div>
    </button>
  );
}
