import type { SortOrder } from "../types";

interface SortTabsProps {
  activeTab: SortOrder;
  onTabChange: (tab: SortOrder) => void;
  lowestPrice: number;
  topRatedPrice: number;
}

export function SortTabs({
  activeTab,
  onTabChange,
  lowestPrice,
  topRatedPrice,
}: SortTabsProps) {
  const tabs: { key: SortOrder; label: string; price?: number }[] = [
    { key: "PriceLowToHigh", label: "Lowest price", price: lowestPrice },
    { key: "BestMatch", label: "Best Value" },
    { key: "QualityRating", label: "Top rated", price: topRatedPrice },
  ];

  return (
    <div>
      <div className="flex gap-2 py-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center cursor-pointer gap-0.5 rounded-xl px-4 py-2 text-sm whitespace-nowrap border transition-colors ${
              activeTab === tab.key
                ? "border-gray-700 bg-gray-800 text-white font-bold"
                : "border-gray-200 bg-white text-gray-800"
            }`}
          >
            <span>{tab.label}</span>
            {/* {tab.price && (
              <>
                <span>·</span>
                <span className="font-bold">${tab.price}</span>
              </>
            )} */}
          </button>
        ))}
      </div>
    </div>
  );
}
