import { useEffect } from "react";
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
import { mapToEstimationRequest, useEstimation } from "@/features/estimation";

const PIANOS_OPTIONS = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5+",
  },
];

export default function LocationsPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const locations = useWidgetStore((s) => s.locations);
  const searchData = useWidgetStore((s) => s.search);
  const setLocations = useWidgetStore((s) => s.setLocations);
  const { mutate } = useEstimation();

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useLocationsForm(locations ?? undefined);

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

    setValue(`${prefix}.bedrooms`, "", { shouldValidate: true });
    setValue(`${prefix}.floors`, "", { shouldValidate: true });
    setValue(`${prefix}.elevator`, "", { shouldValidate: true });
  };

  const onSubmit = () => {
    navigateWithParams("/moving");
    const estimationRequest = mapToEstimationRequest({
      locations: locations,
      search: searchData,
    });
    if (estimationRequest) mutate(estimationRequest);
  };

  const navigateBack = () => {
    navigateWithParams("/");
  };

  return (
    <WidgetLayout
      onContinue={handleSubmit(onSubmit)}
      navigateBack={navigateBack}
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
          </div>

          <LocationSection
            title="Loading location"
            propertyTypeName="loadingPropertyType"
            control={control}
            propertyTypeError={errors.loadingPropertyType?.message}
            propertyType={loadingPropertyType}
            onPropertyTypeChange={handlePropertyTypeChange}
          />
          <LocationSection
            title="Unloading location"
            propertyTypeName="unloadingPropertyType"
            control={control}
            propertyTypeError={errors.unloadingPropertyType?.message}
            propertyType={unloadingPropertyType}
            onPropertyTypeChange={handlePropertyTypeChange}
          />

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
                        onCheckedChange={field.onChange}
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

                      <Icon
                        name="info"
                        size={20}
                        className="absolute top-1/2 -translate-y-1/2 right-3 hidden sm:block"
                      />
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
                          value={field.value ?? ""}
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
                          value={field.value ?? ""}
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
                          value={field.value ?? ""}
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
                          value={field.value ?? ""}
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
                          value={field.value ?? ""}
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
    </WidgetLayout>
  );
}
