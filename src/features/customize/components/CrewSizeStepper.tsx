import { Minus, Plus } from "lucide-react";

interface StepperProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  displayText?: (value: number) => string;
}

export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  displayText,
}: StepperProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold text-[#2e343e]">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex size-8 items-center justify-center rounded-full border border-[#b1bbc8] text-[#677890] transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Minus className="size-4" />
        </button>
        <div className="flex flex-col items-center min-w-10">
          <span className="text-lg font-bold text-[#2e343e]">{value}</span>
          {displayText && (
            <span className="text-xs text-[#677890]">
              {displayText(value)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex size-8 items-center justify-center rounded-full border border-[#b1bbc8] text-[#677890] transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
