import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { CustomizeFormData, ContactInfo } from "../schema";

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
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <FloatingField
            label="First name"
            required
            error={fieldError("firstName")}
          >
            <Input
              placeholder="John"
              {...register("contactInfo.firstName")}
              className="h-14 border-[#b1bbc8] rounded-lg"
            />
          </FloatingField>
          <FloatingField label="Last name" error={fieldError("lastName")}>
            <Input
              placeholder="Smith"
              {...register("contactInfo.lastName")}
              className="h-14 border-[#b1bbc8] rounded-lg"
            />
          </FloatingField>
        </div>
        <FloatingField label="Email" error={fieldError("email")}>
          <Input
            placeholder="me@email.com"
            {...register("contactInfo.email")}
            className="h-14 border-[#b1bbc8] rounded-lg"
          />
        </FloatingField>
        <FloatingField label="Phone number" error={fieldError("phone")}>
          <Input
            placeholder="(555) 123-4567"
            {...register("contactInfo.phone")}
            className="h-14 border-[#b1bbc8] rounded-lg"
          />
        </FloatingField>
      </div>
    </div>
  );
}

function FloatingField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-0.5 px-2 pt-1">
        <label className="text-xs font-semibold text-[#677890]">{label}</label>
        {required && (
          <span className="text-xs font-bold text-[#d9292e]">*</span>
        )}
      </div>
      {children}
      {error && <span className="px-2 text-xs text-red-500">{error}</span>}
    </div>
  );
}
