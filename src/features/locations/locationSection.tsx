import { Controller, type Control } from "react-hook-form";
import type { LocationsFormData } from "./schema";
import { Label } from "@/components/ui/label";
import { LabelStackedField } from "@/components/form/LabelStackedField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldError from "@/components/form/FieldError";
import { SelectField } from "@/components/form/SelectField";
import {
  BEDROOM_OPTIONS,
  ELEVATOR_OPTIONS,
  FLOOR_OPTIONS,
  PROPERTY_OPTIONS,
} from "./constant";

export function LocationSection({
  title,
  propertyTypeName,
  control,
  propertyTypeError,
  propertyType,
  onPropertyTypeChange,
}: {
  title: string;
  propertyTypeName: "loadingPropertyType" | "unloadingPropertyType";
  control: Control<LocationsFormData>;
  propertyTypeError?: string;
  propertyType: string | undefined;
  onPropertyTypeChange: (
    name: "loadingPropertyType" | "unloadingPropertyType",
  ) => void;
}) {
  const isHouseOrApartment =
    propertyType === "house" || propertyType === "apartment";

  const isApartment = propertyType === "apartment";

  const detailsPrefix =
    propertyTypeName === "loadingPropertyType"
      ? "loadingDetails"
      : "unloadingDetails";

  return (
    <div className="space-y-2">
      <Label className="text-xl font-bold text-[#2e343e]">{title}</Label>

      {/* Property Type */}
      <div className="pt-4 pb-2">
        <Controller
          control={control}
          name={propertyTypeName}
          render={({ field }) => (
            <LabelStackedField
              id={propertyTypeName}
              required
              label="Property Type"
            >
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  onPropertyTypeChange(propertyTypeName);
                }}
              >
                <SelectTrigger className="h-14 pb-[7px] pt-7">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                  {PROPERTY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </LabelStackedField>
          )}
        />

        <FieldError message={propertyTypeError} />
      </div>

      {/* Conditional Fields */}
      {isHouseOrApartment && (
        <>
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Bedrooms */}
            <Controller
              control={control}
              name={`${detailsPrefix}.bedrooms`}
              render={({ field, fieldState }) => (
                <div className="flex-1">
                  <SelectField
                    id={`${propertyTypeName}-bedrooms`}
                    label="Number of bedrooms"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={BEDROOM_OPTIONS}
                    required
                  />
                  <FieldError message={fieldState.error?.message} />
                </div>
              )}
            />

            {/* Floors */}

            <Controller
              control={control}
              name={`${detailsPrefix}.floors`}
              render={({ field, fieldState }) => (
                <div className="flex-1">
                  <SelectField
                    id={`${propertyTypeName}-floors`}
                    label="Number of floors"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={FLOOR_OPTIONS}
                    required
                  />
                  <FieldError message={fieldState?.error?.message} />
                </div>
              )}
            />
          </div>

          {/* Elevator (only apartment) */}
          {isApartment && (
            <div className="pt-2">
              <Controller
                control={control}
                name={`${detailsPrefix}.elevator`}
                render={({ field, fieldState }) => (
                  <div className="flex-1">
                    <SelectField
                      id={`${propertyTypeName}-elevator`}
                      label="Elevator"
                      value={field.value}
                      onValueChange={field.onChange}
                      options={ELEVATOR_OPTIONS}
                      required
                    />
                    <FieldError message={fieldState.error?.message} />
                  </div>
                )}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
