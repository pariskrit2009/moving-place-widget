import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { SortOrder } from "../types";
import { SORT_ORDER } from "../types";

const sortOptions: { key: SortOrder; label: string }[] = [
  { key: SORT_ORDER.BestMatch, label: "Best Value" },
  { key: SORT_ORDER.PriceLowToHigh, label: "Lowest price" },
  { key: SORT_ORDER.QualityRating, label: "Top rated" },
];

export function SortDropdown({
  activeSort,
  onSortChange,
}: {
  activeSort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLabel =
    sortOptions.find((o) => o.key === activeSort)?.label ?? "Best Value";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="justify-between items-center flex">
        <span className="font-bold md:hidden leading-[150%]">
          Sort Movers by
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer min-w-28.75 items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-50"
        >
          <span>{activeLabel}</span>
          <ChevronDown
            className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full w-full  mt-1  rounded-xl border border-gray-200 bg-white py-1 shadow-lg z-10">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => {
                onSortChange(option.key);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                activeSort === option.key
                  ? "bg-gray-50 font-bold text-gray-800"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
