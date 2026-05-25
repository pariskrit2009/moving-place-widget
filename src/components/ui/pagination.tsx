import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPaginationProps {
  data: unknown[];
  activeIndex: number;
  onPageChange: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Pagination({
  data,
  activeIndex,
  onPageChange,
  onNext,
  onPrev,
}: IPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-5 text-base">
      <button
        onClick={onPrev}
        disabled={activeIndex === 0}
        className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>

      {data.map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={cn(
            `flex cursor-pointer items-center justify-center text-base`,
            activeIndex === index && "text-teal-700 font-bold",
          )}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={onNext}
        disabled={activeIndex === data.length - 1}
        className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
