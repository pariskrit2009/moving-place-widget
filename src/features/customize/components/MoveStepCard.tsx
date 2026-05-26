import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { StarRating } from "@/components/ui/star-rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stepper } from "./CrewSizeStepper";
import { arrivalTimeOptions, type CustomizeFormData } from "../schema";
import type { ServiceItem } from "@/features/movers/types";

interface MoveStepCardProps {
  stepType: "loading" | "unloading";
  service: ServiceItem;
  form: UseFormReturn<CustomizeFormData>;
}

export function MoveStepCard({ stepType, service, form }: MoveStepCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const prefix = stepType;
  const stepErrors = errors[prefix];
  const crewSize = watch(`${prefix}.crewSize`) ?? 2;
  const hours = watch(`${prefix}.hours`) ?? service.hours;

  return (
    <div className="rounded-2xl border border-[#b1bbc8] bg-white overflow-hidden">
      {/* Card header — always visible */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#f1faf9] shrink-0">
            <Icon
              name={stepType === "loading" ? "movers-only" : "movers-truck"}
              size={18}
              className="text-[#3799a3]"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 text-sm">
              <span className="font-bold text-[#2e343e]">{service.date}</span>
              <span className="text-[#677890]">·</span>
              <span className="truncate text-[#2e343e] capitalize">
                {stepType} at {service.location}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Icon
                  name="circle-info"
                  size={14}
                  className="text-[#677890]"
                />
                <span className="text-xs font-semibold text-[#2e343e]">
                  {service.provider.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <StarRating
                  rating={service.provider.rating}
                  maxStars={5}
                  size="sm"
                  showValue={false}
                />
                <span className="text-xs text-[#2e343e]">
                  {service.provider.rating}
                </span>
                <span className="text-xs text-[#677890]">
                  · {service.provider.reviews} reviews
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-[#d5dae2] px-2.5 py-0.5">
              <Icon name="clock" size={12} className="text-[#677890]" />
              <span className="text-xs text-[#677890]">{service.hours} hours</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-[#d5dae2] px-2.5 py-0.5">
              <Icon name="person-dolly" size={12} className="text-[#677890]" />
              <span className="text-xs text-[#677890]">
                {service.movers} movers
              </span>
            </div>
          </div>
          <span className="text-base font-bold text-[#2e343e]">
            ${service.startingPrice}
          </span>
          <ChevronDown
            className={`size-5 text-[#677890] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div className="border-t border-[#eceef2] px-4 py-4 flex flex-col gap-5">
          {/* Address section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-[#2e343e]">
              Complete your {stepType} address
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-0.5 px-1">
                <label className="text-xs font-semibold text-[#677890]">
                  {stepType === "loading" ? "Loading" : "Unloading"} address
                </label>
                <span className="text-xs font-bold text-[#d9292e]">*</span>
              </div>
              <Input
                placeholder="123 Main St"
                {...register(`${prefix}.address`)}
                className={stepErrors?.address ? "border-red-400" : "border-[#b1bbc8]"}
              />
              {stepErrors?.address && (
                <span className="text-xs text-red-500">
                  {stepErrors.address.message}
                </span>
              )}
            </div>
            <Input
              placeholder="Apartment, suite, etc. (Optional)"
              {...register(`${prefix}.aptSuite`)}
              className="border-[#b1bbc8]"
            />
            <div className="grid grid-cols-3 gap-3">
              <FormField label="City or town" required error={stepErrors?.city?.message}>
                <Input
                  placeholder="San Francisco"
                  {...register(`${prefix}.city`)}
                  className={stepErrors?.city ? "border-red-400" : "border-[#b1bbc8]"}
                />
              </FormField>
              <FormField label="State" required error={stepErrors?.state?.message}>
                <Input
                  placeholder="CA"
                  {...register(`${prefix}.state`)}
                  className={stepErrors?.state ? "border-red-400" : "border-[#b1bbc8]"}
                />
              </FormField>
              <FormField label="Zip code" error={stepErrors?.zipCode?.message}>
                <Input
                  placeholder="94109"
                  {...register(`${prefix}.zipCode`)}
                  className={stepErrors?.zipCode ? "border-red-400" : "border-[#b1bbc8]"}
                />
              </FormField>
            </div>
          </div>

          {/* Arrival time section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-[#2e343e]">
              Confirm your mover's arrival time
            </h3>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#677890]">
                Preferred arrival time
              </label>
              <Select
                value={watch(`${prefix}.arrivalTime`) ?? ""}
                onValueChange={(v) =>
                  setValue(`${prefix}.arrivalTime`, v, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger
                  className={
                    stepErrors?.arrivalTime
                      ? "border-red-400"
                      : "border-[#b1bbc8]"
                  }
                >
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {arrivalTimeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {stepErrors?.arrivalTime && (
                <span className="text-xs text-red-500">
                  {stepErrors.arrivalTime.message}
                </span>
              )}
            </div>
          </div>

          {/* Crew section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-[#2e343e]">
              Confirm your {stepType} crew
            </h3>
            <div className="flex items-start gap-8">
              <Stepper
                label="Hours"
                value={hours}
                min={2}
                max={8}
                onChange={(v) =>
                  setValue(`${prefix}.hours`, v, { shouldValidate: true })
                }
                displayText={(v) => `hour${v > 1 ? "s" : ""}`}
              />
              <Stepper
                label="Movers"
                value={crewSize}
                min={2}
                max={3}
                onChange={(v) =>
                  setValue(`${prefix}.crewSize`, v, { shouldValidate: true })
                }
                displayText={(v) => `mover${v > 1 ? "s" : ""}`}
              />
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-[#f8f9fb] p-3">
              <Icon name="truck" size={16} className="text-[#677890] mt-0.5 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-[#2e343e]">
                  You provide transportation for your move
                </span>
                <span className="text-xs text-[#677890]">
                  Mover's minimum crew: {service.movers} movers × {service.hours}{" "}
                  hours
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({
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
      <div className="flex items-center gap-0.5 px-1">
        <label className="text-xs font-semibold text-[#677890]">{label}</label>
        {required && (
          <span className="text-xs font-bold text-[#d9292e]">*</span>
        )}
      </div>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
