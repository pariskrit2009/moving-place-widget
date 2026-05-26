import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { CustomizeFormData, ContactInfo } from "../schema";
import { LabelStackedField } from "@/components/form/LabelStackedField";
import FieldError from "@/components/form/FieldError";

interface ContactInfoSectionProps {
  form: UseFormReturn<CustomizeFormData>;
}

export function ContactInfoSection({ form }: ContactInfoSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const fieldError = (field: keyof ContactInfo) =>
    errors.contactInfo?.[field]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-bold text-[#2e343e]">
          Contact information
        </h2>
        <p className="text-sm text-[#677890]">
          Used to save your quote and help movers reach you if you book
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <LabelStackedField
              label="First name"
              id="contactInfo.firstName"
              required
            >
              <Input
                placeholder="John"
                {...register("contactInfo.firstName")}
                className="h-14 border-[#b1bbc8] rounded-lg"
              />
            </LabelStackedField>
            <FieldError message={fieldError("firstName")} />
          </div>

          <div>
            <LabelStackedField
              id="contactInfo.lastName"
              label="Last name"
              required
            >
              <Input
                placeholder="Smith"
                {...register("contactInfo.lastName")}
                className="h-14 border-[#b1bbc8] rounded-lg"
              />
            </LabelStackedField>
            <FieldError message={fieldError("lastName")} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <LabelStackedField label="Email" id="contactInfo.email" required>
              <Input
                placeholder="me@email.com"
                {...register("contactInfo.email")}
                className="h-14 border-[#b1bbc8] rounded-lg"
              />
            </LabelStackedField>
            <FieldError message={fieldError("email")} />
          </div>

          <div>
            <LabelStackedField
              label="Phone number"
              id="contactInfo.phone"
              required
            >
              <Input
                placeholder="(555) 123-4567"
                {...register("contactInfo.phone")}
                className="h-14 border-[#b1bbc8] rounded-lg"
              />
            </LabelStackedField>
            <FieldError message={fieldError("phone")} />
          </div>
        </div>
      </div>
    </div>
  );
}
