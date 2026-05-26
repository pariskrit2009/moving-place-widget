import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function TrustBadge({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center whitespace-nowrap gap-1", className)}>
      {children}
      <span className="text-[10px] font-normal sm:text-sm sm:font-semibold leading-4 sm:leading-[18px] text-primary-foreground">
        {label}
      </span>
    </div>
  );
}
