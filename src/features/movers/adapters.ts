import type { ServiceProvider, SortOrder } from "./types";
import { SORT_ORDER } from "./types";
import type {
  Provider,
  MoverItem,
  MoverQuote,
  ServiceItem,
} from "@/features/movers/types";

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
  providerAction: string | null = null,
): MoverItem {
  const isMoversOnly = moveOption === "movers-only";

  let priceLabel = "Loading, unloading & transport";

  if (isMoversOnly) {
    priceLabel = "Loading & unloading (no transport)";

    if (providerAction === "loading") {
      priceLabel = "Loading service (no transport)";
    }
    if (providerAction === "unloading") {
      priceLabel = "Unloading service (no transport)";
    }
  }

  return {
    id: String(sp.providerId),
    provider: toProvider(sp),
    price: sp.internal_GrandTotalWithFees || sp.price,
    priceLabel: priceLabel,
    movers: sp.actualCrewSize,
    hours: sp.actualNumHours,
    hasTruck: Boolean(sp.transportOptionID),
    avatar: sp.profileImageUrl,
    availableEquipement: sp.availableEquipment,
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
    minHours: sp.minHours ?? 2,
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
    totalPrice: parseFloat(
      (
        topPick.internal_GrandTotalWithFees +
          (unloadingTopPick?.internal_GrandTotalWithFees ?? 0) || topPick.price
      ).toFixed(2),
    ),
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
  sort: SortOrder,
): ServiceProvider[] {
  const sorted = [...providers];

  switch (sort) {
    case SORT_ORDER.PriceLowToHigh:
      return sorted.sort((a, b) => a.price - b.price);
    case SORT_ORDER.QualityRating:
      return sorted.sort((a, b) => b.ratingAverage - a.ratingAverage);
    case SORT_ORDER.BestMatch:
    default:
      return sorted.sort((a, b) => a.ranking - b.ranking);
  }
}
