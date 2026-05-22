import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { CustomizeFormData, ContactInfo } from "../schema";

interface ContactInfoSectionProps {
  form: UseFormReturn<CustomizeFormData>;
}

export function ContactInfoSection({ form }: ContactInfoSectionProps) {
  const { register, formState: { errors } } = form;

  const fieldError = (field: keyof ContactInfo) =>
    errors.contactInfo?.[field]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-[#2e343e]">Contact Info</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#2e343e]">First name</label>
          <Input
            placeholder="John"
            {...register("contactInfo.firstName")}
            className={fieldError("firstName") ? "border-red-400" : ""}
          />
          {fieldError("firstName") && (
            <span className="text-xs text-red-500">{fieldError("firstName")}</span>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#2e343e]">Last name</label>
          <Input
            placeholder="Doe"
            {...register("contactInfo.lastName")}
            className={fieldError("lastName") ? "border-red-400" : ""}
          />
          {fieldError("lastName") && (
            <span className="text-xs text-red-500">{fieldError("lastName")}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#2e343e]">Email</label>
        <Input
          placeholder="john@example.com"
          {...register("contactInfo.email")}
          className={fieldError("email") ? "border-red-400" : ""}
        />
        {fieldError("email") && (
          <span className="text-xs text-red-500">{fieldError("email")}</span>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#2e343e]">Phone number</label>
        <Input
          placeholder="(555) 123-4567"
          {...register("contactInfo.phone")}
          className={fieldError("phone") ? "border-red-400" : ""}
        />
        {fieldError("phone") && (
          <span className="text-xs text-red-500">{fieldError("phone")}</span>
        )}
      </div>
    </div>
  );
}
