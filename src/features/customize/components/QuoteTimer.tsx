import { Icon } from "@/components/ui/icon";

export function QuoteTimer() {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-[#fff8e6] px-3 py-1">
      <Icon name="timer" size={14} className="text-[#d4940a]" />
      <span className="text-sm font-medium text-[#677890]">
        Quotes expire in
      </span>
      <span className="text-sm font-bold text-[#2e343e]">57:17</span>
    </div>
  );
}
