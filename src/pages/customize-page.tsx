import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { useWidgetStore } from "@/store";
import { useCustomizeForm } from "@/features/customize/useCustomizeForm";
import {
  ContactInfoSection,
  MoveStepCard,
  QuoteTimer,
  JobBadge,
} from "@/features/customize/components";
import { Icon } from "@/components/ui/icon";
import type { ServiceItem } from "@/features/movers/types";

const mockLoadingService: ServiceItem = {
  type: "loading",
  date: "Apr 28",
  location: "San Francisco, CA 94109",
  startingPrice: 420,
  provider: {
    name: "ProLoad",
    moves: 34,
    yearsInBusiness: 12,
    rating: 4.6,
    reviews: 51,
    summary:
      "ProLoad stands out most for their reliability and flexibility.",
  },
  movers: 2,
  hours: 2,
};

const mockUnloadingService: ServiceItem = {
  type: "unloading",
  date: "May 3",
  location: "San Francisco, CA 94133",
  startingPrice: 420,
  provider: {
    name: "ProLoad",
    moves: 34,
    yearsInBusiness: 12,
    rating: 4.6,
    reviews: 51,
    summary:
      "ProLoad stands out most for their reliability and flexibility.",
  },
  movers: 2,
  hours: 2,
};

export default function CustomizePage() {
  const { navigateWithParams } = useNavigateWithParams();
  const storeSetCustomization = useWidgetStore((s) => s.setCustomization);
  const form = useCustomizeForm();

  const onSubmit = form.handleSubmit((data) => {
    storeSetCustomization(data);
    navigateWithParams("/quote");
  });

  return (
    <WidgetLayout
      onContinue={onSubmit}
      navigateBack={() => navigateWithParams("/movers")}
      continueLabel="Proceed to Checkout"
    >
      <div className="flex flex-col gap-6">
        {/* Page header */}
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-bold leading-7 text-[#2e343e]">
            Add contact details and review your move to finalize your
            transparent quote.
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <QuoteTimer />
            <JobBadge />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <Icon
                name="shieldcheck"
                size={14}
                className="text-[#3799a3]"
              />
              <span className="text-sm text-[#677890]">
                Free cancellation & rescheduling up to 48 hours
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="clock" size={14} className="text-[#3799a3]" />
              <span className="text-sm text-[#677890]">
                Support available 7 days a week
              </span>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <ContactInfoSection form={form} />

        {/* Loading step card */}
        <MoveStepCard
          stepType="loading"
          service={mockLoadingService}
          form={form}
        />

        {/* Unloading step card */}
        <MoveStepCard
          stepType="unloading"
          service={mockUnloadingService}
          form={form}
        />
      </div>
    </WidgetLayout>
  );
}
