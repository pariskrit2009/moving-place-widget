import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Label } from "@/components/ui/label";

import { useLocationsForm, type LocationsFormData } from "@/features/locations";
import { useWidgetStore } from "@/store";

import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { LocationSection } from "@/features/locations/locationSection";
import { SelectField } from "@/components/form/SelectField";
import {  PIANOS_OPTIONS } from "@/features/locations/constant";
import { HeavyItemsInfoModal } from "@/components/modals";

export default function LocationsPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const [isHeavyItemsInfoOpen, setIsHeavyItemsInfoOpen] = useState(false);
  const locations = useWidgetStore((s) => s.locations);
  const setLocations = useWidgetStore((s) => s.setLocations);
  const selectedPlaces = useWidgetStore((s) => s.selectedPlaces);
  const hasStartLocation = !!selectedPlaces?.startLocation?.fullAddress;
  const hasEndLocation = !!selectedPlaces?.endLocation?.fullAddress;
  const loadingCityZip = selectedPlaces?.startLocation?.fullAddress;
  const unloadingCityZip = selectedPlaces?.endLocation?.fullAddress;

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
    setValue,
  } = useLocationsForm(locations ?? undefined, {
    showLoading: hasStartLocation,
    showUnloading: hasEndLocation,
  });
  useEffect(() => {
    const subscription = watch((values) => {
      setLocations(values as LocationsFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setLocations]);

  const loadingPropertyType = watch("loadingPropertyType");
  const unloadingPropertyType = watch("unloadingPropertyType");
  const needsHeavyItems = watch("needsHeavyItems");

  const handlePropertyTypeChange = (
    name: "loadingPropertyType" | "unloadingPropertyType",
  ) => {
    const prefix =
      name === "loadingPropertyType" ? "loadingDetails" : "unloadingDetails";

    setValue(`${prefix}.bedrooms.sqFt`, "");
    setValue(`${prefix}.floors`, "");
    setValue(`${prefix}.elevator`, "");
  };

  const onSubmit = () => {
    navigateWithParams("/moving");
  };

  const navigateBack = () => {
    navigateWithParams("/");
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
              Tell us more about your move
            </h2>
            <p className="text-sm font-normal text-[#677890]">
              This helps us give you more accurate quotes
            </p>
            <div className="flex items-center gap-2 md:gap-4 flex-wrap my-2">
              <div className="flex items-center gap-1">
                <Icon name="boxCarry" size={20} />
                <p>1,700+ background-checked movers</p>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="thumbsUp" />

                <p>1M+ moves completed</p>
              </div>
            </div>
          </div>

          {hasStartLocation && (
            <LocationSection
              title="Loading location"
              propertyTypeName="loadingPropertyType"
              control={control}
              propertyTypeError={errors.loadingPropertyType?.message}
              propertyType={loadingPropertyType}
              onPropertyTypeChange={handlePropertyTypeChange}
              locationAddress={loadingCityZip}
            />
          )}
          {hasEndLocation && (
            <LocationSection
              title="Unloading location"
              propertyTypeName="unloadingPropertyType"
              control={control}
              propertyTypeError={errors.unloadingPropertyType?.message}
              propertyType={unloadingPropertyType}
              onPropertyTypeChange={handlePropertyTypeChange}
              locationAddress={unloadingCityZip}
            />
          )}

          <div>
            <Label className="text-xl font-bold text-[#2e343e]">Extras</Label>

            <div
              className={cn(
                "border border-input mt-4 bg-transparent transition-colors rounded-2xl px-3 py-[18.5px]",
                needsHeavyItems && "bg-teal-50",
              )}
            >
              <Controller
                control={control}
                name="needsHeavyItems"
                render={({ field }) => (
                  <div className="">
                    <label className="flex items-center gap-3 relative">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(val) => {
                          field.onChange(val);
                          if (!val) setValue(`pianoDetails`, undefined);
                        }}
                      />
                      <span className="size-[30px] bg-teal-100 text-center rounded-full hidden sm:block">
                        <Icon name="extras" />
                      </span>

                      <div>
                        <p className="text-[#2E343E] font-bold">
                          I need to move heavy items
                        </p>

                        <p className="text-[#677890] text-sm">
                          Pianos, disassembled pool tables (no slate), or large
                          items that take a few people to lift
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsHeavyItemsInfoOpen(true)}
                        className="absolute top-1/2 -translate-y-1/2 right-3 hidden sm:block cursor-pointer"
                        aria-label="Heavy items info"
                      >
                        <Icon name="info" size={20} className="text-teal-600" />
                      </button>
                    </label>
                  </div>
                )}
              />

              {needsHeavyItems && (
                <div className="my-3 py-4 px-2 bg-white rounded-xl">
                  <h4 className="pb-2">Pianos:</h4>

                  <div className="flex flex-col sm:flex-row gap-3 justify-between">
                    <Controller
                      control={control}
                      name="pianoDetails.baby_or_grand_pianos"
                      render={({ field }) => (
                        <SelectField
                          id="baby-grand-pianos"
                          label="Baby or grand pianos"
                          value={field.value ? String(field.value) : ""}
                          onValueChange={field.onChange}
                          options={PIANOS_OPTIONS}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="pianoDetails.upright_pianos"
                      render={({ field }) => (
                        <SelectField
                          id="upright-pianos"
                          label="Upright pianos"
                          value={field.value ? String(field.value) : ""}
                          onValueChange={field.onChange}
                          options={PIANOS_OPTIONS}
                        />
                      )}
                    />
                  </div>

                  <h4 className="pt-6 pb-2">
                    Other heavy items by estimated weight:
                  </h4>

                  <div className="flex flex-col sm:flex-row gap-3 justify-between">
                    <Controller
                      control={control}
                      name="pianoDetails.300_to_450_lbs"
                      render={({ field }) => (
                        <SelectField
                          id="300-450"
                          label="300–450 lbs"
                          value={field.value ? String(field.value) : ""}
                          onValueChange={field.onChange}
                          options={PIANOS_OPTIONS}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="pianoDetails.450_to_600_lbs"
                      render={({ field }) => (
                        <SelectField
                          id="450-600"
                          label="450–600 lbs"
                          value={field.value ? String(field.value) : ""}
                          onValueChange={field.onChange}
                          options={PIANOS_OPTIONS}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="pianoDetails.over_600_lbs"
                      render={({ field }) => (
                        <SelectField
                          id="over-600"
                          label="Over 600 lbs"
                          value={field.value ? String(field.value) : ""}
                          onValueChange={field.onChange}
                          options={PIANOS_OPTIONS}
                        />
                      )}
                    />
                  </div>

                  <span className="text-gray-500 text-xs">
                    Not sure? Just make your best guess. Movers will
                    double-check on-site.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <HeavyItemsInfoModal
        open={isHeavyItemsInfoOpen}
        onOpenChange={setIsHeavyItemsInfoOpen}
      />
    </WidgetLayout>
  );
}
