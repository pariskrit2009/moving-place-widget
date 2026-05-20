import { useState, useMemo } from "react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Button } from "@/components/ui/button";
import {
  MoverCard,
  MoversHeader,
  MoversTrustBadges,
  SortDropdown,
} from "@/features/movers/components";
import type { SortOption } from "@/features/movers/components/SortDropdown";
import {
  useServiceProviders,
  toMoverItem,
  sortProviders,
} from "@/features/movers";
import { useWidgetStore } from "@/store";

export default function AllMoversPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const [activeSort, setActiveSort] = useState<SortOption>("best-value");

  const { data, isLoading, isError, refetch } = useServiceProviders();
  const selectedMoveOption = useWidgetStore((s) => s.selectedMoveOption);

  const sortedProviders = useMemo(
    () => sortProviders(data?.serviceProviders ?? [], activeSort),
    [data?.serviceProviders, activeSort],
  );

  const moverItems = useMemo(
    () =>
      sortedProviders.map((sp) =>
        toMoverItem(sp, selectedMoveOption ?? "movers-only"),
      ),
    [sortedProviders, selectedMoveOption],
  );

  const totalCount = data?.serviceProviders.length ?? 0;

  return (
    <WidgetLayout navigateBack={() => navigateWithParams("/movers")}>
      {/* Page header */}

      <MoversHeader header={`${totalCount} available movers`} />
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

      {!isLoading && !isError && (
        <div className="flex flex-col gap-3">
          {moverItems.map((mover) => (
            <MoverCard key={mover.id} mover={mover} />
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
