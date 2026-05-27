import { useState, useMemo } from "react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Button } from "@/components/ui/button";

import {
  MoversTrustBadges,
  QuoteCard,
  SortTabs,
} from "@/features/movers/components";
import type { SortTab } from "@/features/movers/components";
import { useServiceProviders, toMoverQuote } from "@/features/movers";
import { useWidgetStore } from "@/store";
import { formatIsoDate } from "@/lib/utils/date";
import { HeaderWithQuote } from "@/components/layout/HeaderWithQuote";

export default function MoversPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const [activeTab, setActiveTab] = useState<SortTab>("best-value");

  const { loadingQuery, unloadingQuery } = useServiceProviders();
  const { data, isLoading, isError, refetch } = loadingQuery;
  const search = useWidgetStore((s) => s.selectedPlaces);
  const movingDateData = useWidgetStore((s) => s.movingDateData);

  // const providers = useMemo(
  //   () => sortProviders(data?.serviceProviders ?? [], activeTab),
  //   [data?.serviceProviders, activeTab],
  // );

  const storeContext = useMemo(() => {
    const loadingDate = movingDateData?.hasDifferentDates
      ? formatIsoDate(movingDateData.loadingDate)
      : formatIsoDate(movingDateData?.movingDate ?? "");

    return {
      loadingDate,
      unloadingDate: movingDateData?.hasDifferentDates
        ? formatIsoDate(movingDateData.unloadingDate)
        : null,
      loadingLocation: search?.startLocation?.fullAddress ?? "",
      unloadingLocation: search?.endLocation?.fullAddress ?? "",
    };
  }, [movingDateData, search]);

  const quote = useMemo(
    () =>
      data?.serviceProviders && data?.serviceProviders.length > 0
        ? toMoverQuote(
            data?.serviceProviders,
            unloadingQuery?.data?.serviceProviders ?? [],
            storeContext,
          )
        : null,
    [
      data?.serviceProviders,
      unloadingQuery?.data?.serviceProviders,
      storeContext,
    ],
  );

  const totalCount = data?.serviceProviders.length ?? 0;

  return (
    <WidgetLayout navigateBack={() => navigateWithParams("/move-option")}>
      {/* Page header */}
      <div className="flex flex-col gap-4">
        <HeaderWithQuote
          header={`Out of ${totalCount} movers, here is our top pick for your move.`}
        />
        <MoversTrustBadges />
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
