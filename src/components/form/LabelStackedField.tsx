import * as React from "react";
import { cn } from "@/lib/utils";

type LabelStackedFieldProps = {
  label?: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
};

function LabelStackedField({
  label,
  id,
  required = false,
  children,
  className,
}: LabelStackedFieldProps) {
  return (
    <div className={cn("relative w-full leading-[130%]", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "absolute left-3 text-[#677890] top-[7px] text-xs font-semibold z-10",
          )}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="[&_input]:h-14 [&_input]:pt-6 [&_input]:pb-2 [&_input]:pr-8">
        {children}
      </div>
    </div>
  );
}

LabelStackedField.displayName = "LabelStackedField";

export { LabelStackedField };
