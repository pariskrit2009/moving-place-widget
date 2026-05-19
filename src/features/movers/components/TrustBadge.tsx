import type { ReactNode } from "react";

export function TrustBadge({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center whitespace-nowrap gap-1">
      {children}
      <span className="text-xs sm:text-sm font-semibold text-primary-foreground">
        {label}
      </span>
    </div>
  );
}
