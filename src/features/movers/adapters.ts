import type { ServiceProvider } from "./types";
import type {
  Provider,
  MoverItem,
  MoverQuote,
  ServiceItem,
} from "@/features/movers/types";
import type { SortTab } from "@/features/movers/components/SortTabs";
import type { SortOption } from "@/features/movers/components/SortDropdown";

export function toProvider(sp: ServiceProvider): Provider {
  return {
    name: sp.companyName,
    moves: sp.completedJobCount,
    yearsInBusiness: 0,
    rating: sp.ratingAverage,
    reviews: sp.numberOfReviews,
    summary: sp.companyDescription,
    avatar: sp.profileImageUrl,
  };
}

export function toMoverItem(
  sp: ServiceProvider,
  moveOption: string,
): MoverItem {
  const isMoversOnly = moveOption === "movers-only";

  return {
    id: String(sp.providerId),
    provider: toProvider(sp),
    price: sp.internal_GrandTotalWithFees || sp.price,
    priceLabel: isMoversOnly
      ? "Loading & unloading (no transport)"
      : "Loading, transport & unloading",
    movers: sp.actualCrewSize,
    hours: sp.actualNumHours,
    hasTruck: Boolean(sp.transportOptionID),
  };
}

interface StoreContext {
  loadingDate: string;
  unloadingDate: string | null;
  loadingLocation: string;
  unloadingLocation: string;
}

export function toServiceItem(
  sp: ServiceProvider,
  type: "loading" | "unloading",
  context: StoreContext,
): ServiceItem {
  return {
    type,
    date:
      type === "loading"
        ? context.loadingDate
        : (context.unloadingDate ?? context.loadingDate),
    location:
      type === "loading"
        ? `Loading at ${context.loadingLocation}`
        : `Unloading at ${context.unloadingLocation}`,
    startingPrice: sp.price,
    provider: toProvider(sp),
    movers: sp.actualCrewSize,
    hours: sp.actualNumHours,
    hasTruck: Boolean(sp.transportOptionID),
  };
}

export function toMoverQuote(
  providers: ServiceProvider[],
  unloadingProviders: ServiceProvider[],
  context: StoreContext,
): MoverQuote {
  const topPick = providers[0];
  const unloadingTopPick = unloadingProviders[0];

  return {
    id: String(topPick.providerId),
    totalPrice:
      topPick.internal_GrandTotalWithFees +
        unloadingTopPick?.internal_GrandTotalWithFees || topPick.price,
    lowestPrice: Math.min(...providers.map((p) => p.price)),
    topRatedPrice:
      providers.find(
        (p) =>
          p.ratingAverage ===
          Math.max(...providers.map((r) => r.ratingAverage)),
      )?.price ?? topPick.price,
    services:
      unloadingProviders?.length > 0
        ? [
            toServiceItem(topPick, "loading", context),
            toServiceItem(unloadingTopPick, "unloading", context),
          ]
        : [toServiceItem(topPick, "loading", context)],
  };
}

export function sortProviders(
  providers: ServiceProvider[],
  sort: SortTab | SortOption,
): ServiceProvider[] {
  const sorted = [...providers];

  switch (sort) {
    case "lowest":
      return sorted.sort((a, b) => a.price - b.price);
    case "top-rated":
      return sorted.sort((a, b) => b.ratingAverage - a.ratingAverage);
    case "best-value":
    default:
      return sorted.sort((a, b) => a.ranking - b.ranking);
  }
}
