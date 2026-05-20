import { useState, useMemo } from "react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  QuoteCard,
  SortTabs,
  Timer,
  TrustBadge,
} from "@/features/movers/components";
import type { SortTab } from "@/features/movers/components";
import {
  useServiceProviders,
  toMoverQuote,
  sortProviders,
} from "@/features/movers";
import { useWidgetStore } from "@/store";
import { formatIsoDate } from "@/lib/utils/date";

export default function MoversPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const [activeTab, setActiveTab] = useState<SortTab>("best-value");
  const selectedMoveOption = useWidgetStore((s) => s.selectedMoveOption);

  const { data, isLoading, isError, refetch } = useServiceProviders();
  const search = useWidgetStore((s) => s.search);
  const movingDateData = useWidgetStore((s) => s.movingDateData);

  const providers = useMemo(
    () => sortProviders(data?.serviceProviders ?? [], activeTab),
    [data?.serviceProviders, activeTab],
  );

  const storeContext = useMemo(() => {
    const loadingDate = movingDateData?.hasDifferentDates
      ? formatIsoDate(movingDateData.loadingDate)
      : formatIsoDate(movingDateData?.movingDate ?? "");

    return {
      loadingDate,
      unloadingDate: movingDateData?.hasDifferentDates
        ? formatIsoDate(movingDateData.unloadingDate)
        : null,
      loadingLocation: search?.startLocation ?? "",
      unloadingLocation: search?.endLocation ?? "",
    };
  }, [movingDateData, search]);

  const quote = useMemo(
    () => (providers.length > 0 ? toMoverQuote(providers, storeContext) : null),
    [providers, storeContext],
  );

  const totalCount = data?.serviceProviders.length ?? 0;

  return (
    <WidgetLayout
      onContinue={() => navigateWithParams("/quote")}
      navigateBack={() => navigateWithParams("/move-option")}
    >
      {/* Page header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold leading-8.5 text-gray-800 flex-1">
            Out of {totalCount} movers, here is our top pick for your move.
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

        <div className="flex items-center gap-6">
          <TrustBadge
            label="Up to $10,000 damage protection"
            className="hidden md:block"
          >
            <Icon name="shieldcheck" size={20} className="text-gray-800" />
          </TrustBadge>
          <TrustBadge label="No hidden fees">
            <Icon name="circle-dollar" size={20} className="text-gray-800" />
          </TrustBadge>
          <TrustBadge label="Background-checked movers">
            <Icon
              name="background-checkers"
              size={20}
              className="text-gray-800"
            />
          </TrustBadge>
        </div>
      </div>

      <SortTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        lowestPrice={quote?.lowestPrice ?? 0}
        topRatedPrice={quote?.topRatedPrice ?? 0}
      />

      {isLoading && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          Loading available movers...
        </div>
      )}
      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-sm text-red-700">
            Failed to load movers. Please try again.
          </p>
          <Button variant="outline" className="mt-2" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !isError && quote && <QuoteCard quote={quote} />}

      {!isLoading && !isError && totalCount === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          No movers available for your criteria. Try adjusting your move date.
        </div>
      )}

      {!isLoading && totalCount > 1 && (
        <Button
          variant="outline"
          className="rounded-full self-center mt-4"
          onClick={() => navigateWithParams("/all-movers")}
        >
          View all {totalCount} available movers
        </Button>
      )}
    </WidgetLayout>
  );
}
