import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface StepperProps {
  icon: string;
  className?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  displayText?: (value: number) => string;
  editable?: boolean;
}

export function Stepper({
  icon,
  value,
  min,
  max,
  onChange,
  className,
  displayText,
  editable = false,
}: StepperProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <Icon name={icon as IconName} size={30} className="text-gray-500" />

      <div className="flex items-center bg-gray-50 rounded-[36px] justify-center min-w-20 gap-3">
        {editable ? (
          <>
            <button
              type="button"
              onClick={() => onChange(Math.max(min, value - 1))}
              disabled={value <= min}
              className="transition-colors text-teal-500 cursor-pointer hover:text-teal-800 disabled:text-gray-200 disabled:cursor-not-allowed "
            >
              <Minus className="size-[15px]" />
            </button>
            <span className="text-base font-bold">{value}</span>
            <button
              type="button"
              onClick={() => onChange(Math.min(max, value + 1))}
              disabled={value >= max}
              className="transition-colors text-teal-500 cursor-pointer hover:text-teal-800 disabled:text-gray-200 disabled:cursor-not-allowed "
            >
              <Plus className="size-[15px]" />
            </button>
          </>
        ) : (
          <span className="text-base font-bold">{value}</span>
        )}
      </div>
      {displayText && (
        <span className="text-xs font-bold capitalize text-center">
          {displayText(value)}
        </span>
      )}
    </div>
  );
}
