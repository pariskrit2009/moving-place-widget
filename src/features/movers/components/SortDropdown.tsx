import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export type SortOption = "best-value" | "lowest" | "top-rated";

const sortOptions: { key: SortOption; label: string }[] = [
  { key: "best-value", label: "Best Value" },
  { key: "lowest", label: "Lowest price" },
  { key: "top-rated", label: "Top rated" },
];

export function SortDropdown({
  activeSort,
  onSortChange,
}: {
  activeSort: SortOption;
  onSortChange: (sort: SortOption) => void;
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
          className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-50"
        >
          <span className="font-bold">{activeLabel}</span>
          <ChevronDown
            className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full w-full left-0 mt-1 md:w-40  rounded-xl border border-gray-200 bg-white py-1 shadow-lg z-10">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => {
                onSortChange(option.key);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors ${
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
