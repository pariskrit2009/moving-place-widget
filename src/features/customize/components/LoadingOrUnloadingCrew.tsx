import { useFormContext } from "react-hook-form";
import { Stepper } from "./CrewSizeStepper";
import type { CustomizeFormData } from "../schema";
import type { ServiceItem } from "@/features/movers/types";
import { Icon } from "@/components/ui/icon";
import { useWidgetStore } from "@/store";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

interface LoadingOrUnloadingCrewProps {
  stepType?: "loading" | "unloading";
  service: ServiceItem | null;
}

export function LoadingOrUnloadingCrew({
  stepType = "loading",
  service,
}: LoadingOrUnloadingCrewProps) {
  const { setValue, watch } = useFormContext<CustomizeFormData>();
  const selectedMoveOption = useWidgetStore((s) => s.selectedMoveOption);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const hasDifferentDates = useWidgetStore(
    (s) => s.movingDateData?.hasDifferentDates,
  );

  const prefix = stepType;
  const crewSize = watch(`${prefix}.crewSize`) ?? service?.movers;
  const hours = watch(`${prefix}.hours`) ?? service?.hours;
  const recommendedValuesRef = useRef<{
    hours: number;
    crewSize: number;
  } | null>(null);

  const handleCustomize = () => {
    recommendedValuesRef.current = {
      hours,
      crewSize,
    };

    setIsCustomizing(true);
  };

  const handleBackToRecommended = () => {
    const recommended = recommendedValuesRef.current;

    if (recommended) {
      setValue(`${prefix}.hours`, recommended.hours, {
        shouldValidate: true,
      });

      setValue(`${prefix}.crewSize`, recommended.crewSize, {
        shouldValidate: true,
      });
    }

    setIsCustomizing(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-bold text-[#2e343e]">
        Confirm your {hasDifferentDates ? stepType : ""} crew
      </h3>
      <div className="flex items-start gap-2">
        <Stepper
          icon="clock"
          value={hours}
          editable={isCustomizing}
          min={service?.minHours}
          onChange={(v) =>
            setValue(`${prefix}.hours`, v, { shouldValidate: true })
          }
          displayText={(v) => `hour${v > 1 ? "s" : ""}`}
        />
        <Stepper
          icon="movers-icon"
          editable={isCustomizing}
          value={crewSize}
          min={2}
          onChange={(v) =>
            setValue(`${prefix}.crewSize`, v, {
              shouldValidate: true,
            })
          }
          displayText={(v) => `mover${v > 1 ? "s" : ""}`}
        />
        {selectedMoveOption === "movers-truck" && (
          <Stepper
            editable={isCustomizing}
            icon="truck"
            value={crewSize}
            min={2}
            onChange={(v) =>
              setValue(`${prefix}.crewSize`, v, {
                shouldValidate: true,
              })
            }
            displayText={() => `Truck (20')`}
          />
        )}
      </div>

      {isCustomizing ? (
        <Button
          className="text-teal-600 cursor-pointer !text-base !p-0 min-h-fit w-fit"
          onClick={handleBackToRecommended}
        >
          Back to recommended
        </Button>
      ) : (
        <Button
          className="text-teal-600 cursor-pointer !text-base !p-0 min-h-fit w-fit"
          onClick={handleCustomize}
        >
          Customize your plan
        </Button>
      )}

      <div className="flex flex-col gap-1 items-center">
        {selectedMoveOption === "movers-only" && (
          <div className="flex items-start gap-2 rounded-lg">
            <Icon
              name="truck-slash"
              size={16}
              className="text-red-400 shrink-0"
            />
            <span className="text-xs text-[#2e343e]">
              You provide transportation for your move
            </span>
          </div>
        )}
        <span className="text-xs text-[#677890]">
          Mover's minimum crew: {service?.movers} movers × {service?.hours}{" "}
          hours
        </span>
      </div>
    </div>
  );
}
