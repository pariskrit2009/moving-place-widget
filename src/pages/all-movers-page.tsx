import { useState, useMemo } from "react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  MoverCard,
  SortDropdown,
  TrustBadge,
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
    <WidgetLayout
      onContinue={() => navigateWithParams("/quote")}
      navigateBack={() => navigateWithParams("/movers")}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold leading-8.5 text-gray-800">
          {totalCount} available movers
        </h1>

        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-800">
            {selectedMoveOption === "movers-only"
              ? "Movers Only"
              : "Movers + Truck"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <TrustBadge label="Up to $10,000 damage protection">
              <Icon name="shieldcheck" size={20} className="text-gray-800" />
            </TrustBadge>
            <TrustBadge label="No hidden fees">
              <Icon name="circle-dollar" size={24} className="text-gray-800" />
            </TrustBadge>
            <TrustBadge label="Background-checked movers">
              <Icon name="shieldcheck" size={20} className="text-gray-800" />
            </TrustBadge>
          </div>

          <SortDropdown activeSort={activeSort} onSortChange={setActiveSort} />
        </div>
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

      <div className="flex items-center justify-end gap-1 rounded-2xl bg-gray-50 px-2 py-1 self-end">
        <Icon name="timer" size={15} className="text-gray-800" />
        <span className="text-xs text-gray-800">Quotes expire in</span>
        <span className="text-xs font-bold text-gray-800">57:17</span>
      </div>
    </WidgetLayout>
  );
}
