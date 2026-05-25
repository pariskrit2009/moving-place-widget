import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DatePickerModal } from "@/components/modals/DatePickerModal";
import FieldError from "./FieldError";
import { formatIsoDate } from "@/lib/utils";
import { LabelStackedField } from "./LabelStackedField";

interface DatePickerInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  id: string;
  error?: string;
  minDate?: Date;
}

export function DatePickerInput<T extends FieldValues>({
  control,
  name,
  label,
  id,
  error,
  minDate,
}: DatePickerInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LabelStackedField id={name} label={label}>
          <DatePickerModal
            selectedDate={field.value ? new Date(field.value) : undefined}
            onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
            minDate={minDate}
            trigger={
              <div>
                <div className="relative">
                  <Input
                    id={id}
                    readOnly
                    value={field.value ? formatIsoDate(field.value) : ""}
                    placeholder="mm/dd/yyyy"
                    className="cursor-pointer pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none text-gray-500" />
                </div>
                <FieldError message={error} />
              </div>
            }
          />
        </LabelStackedField>
      )}
    />
  );
}
