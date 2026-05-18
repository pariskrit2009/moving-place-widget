import { Minus, Plus } from "lucide-react";

interface CrewSizeStepperProps {
  value: number;
  onChange: (value: number) => void;
}

export function CrewSizeStepper({ value, onChange }: CrewSizeStepperProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(2, value - 1))}
        disabled={value <= 2}
        className="flex size-8 items-center justify-center rounded-full border border-[#b1bbc8] text-[#677890] transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Minus className="size-4" />
      </button>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold text-[#2e343e]">{value}</span>
        <span className="text-xs text-[#677890]">
          {value} mover{value > 1 ? "s" : ""}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(3, value + 1))}
        disabled={value >= 3}
        className="flex size-8 items-center justify-center rounded-full border border-[#b1bbc8] text-[#677890] transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
