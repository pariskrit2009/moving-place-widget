import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Button } from "@/components/ui/button";
import {
  MoverCard,
  MoversTrustBadges,
  SortDropdown,
} from "@/features/movers/components";
import {
  useServiceProviders,
  toMoverItem,
  type SortOrder,
  SORT_ORDER,
} from "@/features/movers";
import { useWidgetStore } from "@/store";
import { HeaderWithQuote } from "@/components/layout/HeaderWithQuote";
import type { ServiceProvider } from "@/features/movers/types";

export default function AllMoversPage() {
  const [searchParams] = useSearchParams();
  const { navigateWithParams } = useNavigateWithParams();
  const [activeSort, setActiveSort] = useState<SortOrder>(SORT_ORDER.BestMatch);

  const movingDateData = useWidgetStore((s) => s.movingDateData);
  const selectedMoveOption = useWidgetStore((s) => s.selectedMoveOption);
  const selectUnloadingProvider = useWidgetStore(
    (s) => s.setSelectedUnloadingProvider,
  );
  const isTwoPhase = movingDateData?.hasDifferentDates === true;
  const phase = searchParams.get("phase");

  const { loadingQuery, unloadingQuery } = useServiceProviders(activeSort);

  const activeQuery = (() => {
    if (!isTwoPhase) return loadingQuery;
    if (phase === "unloading") return unloadingQuery;
    return loadingQuery;
  })();

  const { data, isLoading, isError, refetch } = activeQuery;

  const moverItems = useMemo(
    () =>
      data?.serviceProviders?.map((sp) => ({
        provider: sp,
        mover: toMoverItem(sp, selectedMoveOption ?? "movers-only"),
      })),
    [data?.serviceProviders, selectedMoveOption],
  );

  const totalCount = data?.serviceProviders?.length ?? 0;

  const headerText = isTwoPhase
    ? phase === "unloading"
      ? `${totalCount} other similar movers for unloading`
      : `${totalCount} other similar movers for loading`
    : `${totalCount} other similar movers`;

  const handleSelectMover = (mover: ServiceProvider) => {
    if (!isTwoPhase) {
      useWidgetStore.getState().setSelectedLoadingProvider(mover);
      navigateWithParams("/customize");
      return;
    }

    if (phase !== "unloading") {
      useWidgetStore.getState().setSelectedLoadingProvider(mover);
      navigateWithParams("/all-movers", {
        searchParams: { phase: "unloading" },
      });
    } else {
      selectUnloadingProvider(mover);
      navigateWithParams("/customize");
    }
  };

  return (
    <WidgetLayout navigateBack={() => navigateWithParams("/movers")}>
      {/* Page header */}

      <HeaderWithQuote header={headerText} />
      <div className="flex flex-col flex-wrap md:flex-row md:items-center relative justify-between space-y-2 md:pt-3 md:pb-7 mt-3 mb-6 md:m-0">
        <MoversTrustBadges />
        <SortDropdown activeSort={activeSort} onSortChange={setActiveSort} />
      </div>

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

      {!isLoading && !isError && moverItems && (
        <div className="flex flex-col gap-3">
          {moverItems.map(({ provider, mover }) => (
            <MoverCard
              key={mover.id}
              mover={mover}
              onAction={() => handleSelectMover(provider)}
            />
          ))}
        </div>
      )}

      {!isLoading && !isError && totalCount === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          No movers available for your criteria. Try adjusting your move date.
        </div>
      )}
    </WidgetLayout>
  );
}
