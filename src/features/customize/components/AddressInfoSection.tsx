import { FormField } from "@/components/form/FormField";
import { LabelStackedField } from "@/components/form/LabelStackedField";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import type { CustomizeFormData } from "../schema";
import { useWidgetStore } from "@/store";

interface AddressInfoSectionProps {
  stepType: "loading" | "unloading";
}

type LocationKey = "startLocation" | "endLocation";

export function AddressInfoSection({ stepType }: AddressInfoSectionProps) {
  const prefix = stepType;
  const location = useWidgetStore((s) => s.selectedPlaces);
  const point =
    stepType === "loading" ? "startLocation" : ("endLocation" as LocationKey);

  const {
    register,
    formState: { errors },
  } = useFormContext<CustomizeFormData>();

  const stepErrors = errors[prefix];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm sm:text-base font-bold leading-[125%]">
        {location?.[point]?.isAddressComplete ? "Confirm" : "Complete"} your{" "}
        {stepType} address
      </h3>

      <FormField error={stepErrors?.address?.message}>
        <LabelStackedField
          required
          id={`${prefix}.address`}
          label={
            stepType === "loading" ? "Loading address" : "Unloading address"
          }
        >
          <Input placeholder="123 Main St" {...register(`${prefix}.address`)} />
        </LabelStackedField>
      </FormField>

      <FormField error={stepErrors?.aptSuite?.message}>
        <LabelStackedField
          id={`${prefix}.aptSuite`}
          label={"Apartment, suite, etc. (Optional)"}
        >
          <Input
            placeholder="Apartment, suite, etc. (Optional)"
            {...register(`${prefix}.aptSuite`)}
          />
        </LabelStackedField>
      </FormField>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <FormField
          error={stepErrors?.city?.message}
          className="col-span-2 sm:col-span-1 "
        >
          <LabelStackedField
            id={`${prefix}.city`}
            label="City or town"
            required
          >
            <Input
              placeholder="San Francisco"
              {...register(`${prefix}.city`)}
              required
            />
          </LabelStackedField>
        </FormField>
        <FormField error={stepErrors?.state?.message}>
          <LabelStackedField id={`${prefix}.state`} label="State" required>
            <Input placeholder="CA" {...register(`${prefix}.state`)} required />
          </LabelStackedField>
        </FormField>

        <FormField error={stepErrors?.zipCode?.message}>
          <LabelStackedField id={`${prefix}.zipCode`} label="Zip code" required>
            <Input
              placeholder="94109"
              {...register(`${prefix}.zipCode`)}
              className="bg-gray-50 border-none cursor-not-allowed"
              readOnly
              required
            />
          </LabelStackedField>
        </FormField>
      </div>
    </div>
  );
}
