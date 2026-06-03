import { useEffect } from "react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { DatePickerInput } from "@/components/form/DatePickerInput";
import { useMovingDateForm, type MovingDateFormData } from "@/features/moving";
import { useWidgetStore } from "@/store";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller } from "react-hook-form";
import { useEstimation } from "@/features/estimation";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";

export default function MovingPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const movingDateData = useWidgetStore((s) => s.movingDateData);
  const setMovingDateData = useWidgetStore((s) => s.setMovingDateData);
  // const searchData = useWidgetStore((s) => s.search);
  const selectedAddress = useWidgetStore((s) => s.selectedPlaces);
  const locations = useWidgetStore((s) => s.locations);
  const { mutate } = useEstimation();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
    setValue,
  } = useMovingDateForm(movingDateData ?? undefined);

  useEffect(() => {
    const subscription = watch((values) => {
      setMovingDateData(values as MovingDateFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setMovingDateData]);

  const hasDifferentDates = watch("hasDifferentDates");
  const loadingDate = watch("loadingDate");

  const unloadingMinDate = loadingDate
    ? new Date(new Date(loadingDate).getTime() + 86400000)
    : new Date();

  useEffect(() => {
    if (hasDifferentDates && loadingDate) {
      const nextDay = new Date(new Date(loadingDate).getTime() + 86400000);
      setValue("unloadingDate", nextDay.toISOString());
    }
  }, [loadingDate, hasDifferentDates, setValue]);

  const hasStartLocation = !!selectedAddress?.startLocation?.fullAddress;
  const hasEndLocation = !!selectedAddress?.endLocation?.fullAddress;
  const isSingleLocation = hasStartLocation !== hasEndLocation;

  const dateLabel = !hasStartLocation
    ? "Unloading Date"
    : !hasEndLocation
      ? "Loading Date"
      : "Moving Date";

  const onSubmit = () => {
    navigateWithParams("/move-option");
    mutate({
      hasDifferentDates: !!movingDateData?.hasDifferentDates,
      search: selectedAddress,
      locations,
    });
  };

  const navigateBack = () => {
    navigateWithParams("/location");
  };
  return (
    <WidgetLayout
      onContinue={handleSubmit(onSubmit)}
      navigateBack={navigateBack}
      disabled={!isValid}
    >
      <div className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#2e343e]">
              When are you moving?
            </h2>
            <div className="flex items-center gap-1">
              <Icon name="clock" className="text-teal-600" size={20} />
              <p className="text-sm font-normal text-gray-800">
                Free cancellation & rescheduling up to 48 hours
              </p>
            </div>
          </div>
          <Label className="text-xl font-bold text-[#2e343e]">
            <p className="mb-2">{dateLabel}</p>
          </Label>
          {!hasDifferentDates && (
            <div className="w-full sm:w-1/2">
              <DatePickerInput
                control={control}
                name="movingDate"
                label={dateLabel}
                id="movingDate"
                error={errors.movingDate?.message}
                minDate={new Date()}
              />
            </div>
          )}

          {hasDifferentDates && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DatePickerInput
                control={control}
                name="loadingDate"
                label="Loading date"
                id="loadingDate"
                error={errors.loadingDate?.message}
                minDate={new Date()}
              />
              <DatePickerInput
                control={control}
                name="unloadingDate"
                label="Unloading date"
                id="unloadingDate"
                error={errors.unloadingDate?.message}
                minDate={unloadingMinDate}
              />
            </div>
          )}

          <Controller
            control={control}
            name="hasDifferentDates"
            render={({ field }) => (
              <div className="flex items-center gap-3">
                <Checkbox
                  id="hasDifferentDates"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSingleLocation}
                />
                <label
                  htmlFor="hasDifferentDates"
                  className="text-sm font-normal text-[#2e343e] cursor-pointer"
                >
                  I need different dates for loading and unloading
                </label>
              </div>
            )}
          />
        </div>
      </div>
    </WidgetLayout>
  );
}
