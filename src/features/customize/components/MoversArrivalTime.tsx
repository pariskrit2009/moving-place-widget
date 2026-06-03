import { FormField } from "@/components/form/FormField";
import { LabelStackedField } from "@/components/form/LabelStackedField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type CustomizeFormData } from "../schema";
import { useFormContext } from "react-hook-form";
import { useWidgetStore } from "@/store";
import { useMemo } from "react";

export function MoversArrivalTime({
  stepType,
}: {
  stepType: "loading" | "unloading";
}) {
  const { setValue, watch } = useFormContext<CustomizeFormData>();
  const prefix = stepType;
  const loadingProvider = useWidgetStore((s) => s.selectedLoadingProvider);
  const unloadingProvider = useWidgetStore((s) => s.selectedUnloadingProvider);
  const arrivalTimeOptions = useMemo(
    () =>
      stepType === "loading"
        ? loadingProvider?.availableArrivalWindows
        : unloadingProvider?.availableArrivalWindows,
    [
      loadingProvider?.availableArrivalWindows,
      unloadingProvider?.availableArrivalWindows,
      stepType,
    ],
  );

  if (!arrivalTimeOptions?.length) {
    return <p className="text-sm text-gray-500">No time slots available</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base leading-[125%] font-bold">
        Confirm your mover's arrival time
      </h3>

      <FormField>
        <LabelStackedField label=" Preferred arrival time">
          <Select
            value={watch(`${prefix}.arrivalTime`) ?? ""}
            onValueChange={(v) =>
              setValue(`${prefix}.arrivalTime`, v, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="h-14 pb-[7px] pt-7">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {arrivalTimeOptions?.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </LabelStackedField>
      </FormField>
    </div>
  );
}
