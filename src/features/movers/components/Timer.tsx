import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function Timer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-2xl bg-gray-50 px-2 py-1 shrink-0",
        className,
      )}
    >
      <Icon name="timer" size={15} className="text-gray-800" />
      <span className="text-xs text-gray-800">Quotes expire in </span>
      <span className="text-xs font-bold text-gray-800">57:17</span> //TODO
    </div>
  );
}
