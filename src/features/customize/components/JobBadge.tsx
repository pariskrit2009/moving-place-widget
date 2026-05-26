import { useWidgetStore } from "@/store";

function formatMoveSize(
  propertyType?: string,
  bedrooms?: number | string,
): string {
  if (!propertyType || !bedrooms) return "3 bedroom House";

  const typeLabel =
    propertyType === "CondoApt"
      ? "Condo/Apt"
      : propertyType === "StorageUnit"
        ? "Storage Unit"
        : "House";

  return `${bedrooms} bedroom ${typeLabel}`;
}

export function JobBadge() {
  const locations = useWidgetStore((s) => s.locations);

  const moveSize = formatMoveSize(
    locations?.loadingPropertyType,
    locations?.loadingDetails?.bedrooms,
  );
  const serviceType = "Movers Only";

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d5dae2] bg-white px-3 py-1">
      <span className="text-sm font-semibold text-[#2e343e]">{moveSize}</span>
      <span className="text-sm text-[#677890]">·</span>
      <span className="text-sm text-[#677890]">{serviceType}</span>
    </div>
  );
}
