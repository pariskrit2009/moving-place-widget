import { Icon } from "@/components/ui/icon";
import { TrustBadge } from "./TrustBadge";

export function MoversTrustBadges() {
  return (
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
        <Icon name="background-checkers" size={20} className="text-gray-800" />
      </TrustBadge>
    </div>
  );
}
