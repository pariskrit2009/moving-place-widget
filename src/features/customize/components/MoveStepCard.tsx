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
import { CrewSizeStepper } from "./CrewSizeStepper";
import { arrivalTimeOptions, type CustomizeFormData } from "../schema";
import type { ServiceItem } from "@/features/movers/types";

interface MoveStepCardProps {
  stepType: "loading" | "unloading";
  service: ServiceItem;
  form: UseFormReturn<CustomizeFormData>;
}

export function MoveStepCard({ stepType, service, form }: MoveStepCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { register, setValue, watch, formState: { errors } } = form;

  const prefix = stepType as "loading" | "unloading";
  const stepErrors = errors[prefix];
  const crewSize = watch(`${prefix}.crewSize`) ?? 2;
  const arrivalTime = watch(`${prefix}.arrivalTime`) ?? "";

  return (
    <div className="rounded-2xl border border-[#b1bbc8] bg-white overflow-hidden">
      {/* Card header — always visible */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#f1faf9] shrink-0">
            <Icon name={stepType === "loading" ? "movers-only" : "movers-truck"} size={18} className="text-[#3799a3]" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 text-sm">
              <span className="font-bold text-[#2e343e]">{service.date}</span>
              <span className="text-[#677890]">·</span>
              <span className="truncate text-[#2e343e] capitalize">
                {stepType} at {service.location}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <StarRating rating={service.provider.rating} maxStars={5} size="sm" showValue={false} />
              <span className="text-xs text-[#2e343e]">{service.provider.rating}</span>
              <span className="text-xs text-[#677890]">· {service.provider.reviews} reviews</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex flex-col items-end">
            <span className="text-xs text-[#677890]">Starting at</span>
            <span className="text-base font-bold text-[#2e343e]">${service.startingPrice}</span>
          </div>
          <ChevronDown
            className={`size-5 text-[#677890] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div className="border-t border-[#eceef2] px-4 py-4 flex flex-col gap-4">
          {/* Address */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-[#2e343e]">Address</h3>
            <div className="flex flex-col gap-1.5">
              <Input
                placeholder="Street address"
                {...register(`${prefix}.address`)}
                className={stepErrors?.address ? "border-red-400" : ""}
              />
              {stepErrors?.address && (
                <span className="text-xs text-red-500">{stepErrors.address.message}</span>
              )}
            </div>
            <Input
              placeholder="Apt / Suite (optional)"
              {...register(`${prefix}.aptSuite`)}
            />
          </div>

          {/* Crew size */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-[#2e343e]">Crew size</h3>
            <div className="flex items-center gap-4">
              <CrewSizeStepper
                value={crewSize}
                onChange={(v) => setValue(`${prefix}.crewSize`, v, { shouldValidate: true })}
              />
              <span className="text-xs text-[#677890]">
                Transportation not included
              </span>
            </div>
          </div>

          {/* Arrival time */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#2e343e]">Preferred arrival time</label>
            <Select
              value={arrivalTime}
              onValueChange={(v) => setValue(`${prefix}.arrivalTime`, v, { shouldValidate: true })}
            >
              <SelectTrigger
                className={stepErrors?.arrivalTime ? "border-red-400" : ""}
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
              <span className="text-xs text-red-500">{stepErrors.arrivalTime.message}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
