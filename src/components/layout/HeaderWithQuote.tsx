import { useWidgetStore } from "@/store";
import { Timer } from "./Timer";

export function HeaderWithQuote({
  header = "Out of 6 movers, here is our top pick for your move.",
}: {
  header?: string;
}) {
  const selectedMoveOption = useWidgetStore((s) => s.selectedMoveOption);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold leading-8.5 whitespace-pre-line  text-gray-800 flex-1">
          {header}
        </h1>
        <Timer className="hidden md:block" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm text-gray-800">3 bedroom House</span>
        <span className="text-sm text-gray-800">·</span>
        <span className="rounded-2xl border !border-teal-600 bg-teal-50 px-2 py-1 text-xs sm:text-sm text-gray-800">
          {selectedMoveOption === "movers-only"
            ? "Movers Only"
            : "Movers + Truck"}
        </span>
      </div>
      <Timer className="block md:hidden text-center" />
    </div>
  );
}
