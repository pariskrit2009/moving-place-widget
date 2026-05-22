import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { useWidgetStore } from "@/store";
import { useCustomizeForm } from "@/features/customize/useCustomizeForm";
import { ContactInfoSection, MoveStepCard } from "@/features/customize/components";
import { Icon } from "@/components/ui/icon";
import type { ServiceItem } from "@/features/movers/types";

// Temporary mock data until service-providers API is wired
const mockLoadingService: ServiceItem = {
  type: "loading",
  date: "Apr 29",
  location: "San Francisco, CA 94109",
  startingPrice: 420,
  provider: {
    name: "Golden Movers",
    moves: 34,
    yearsInBusiness: 12,
    rating: 4.5,
    reviews: 31,
    summary:
      "Golden Movers stands out most for their reliability and flexibility.",
  },
  movers: 2,
  hours: 2,
};

const mockUnloadingService: ServiceItem = {
  type: "unloading",
  date: "May 3",
  location: "San Francisco, CA 94133",
  startingPrice: 200,
  provider: {
    name: "4 The Love of Moving",
    moves: 34,
    yearsInBusiness: 12,
    rating: 4.5,
    reviews: 31,
    summary:
      "Student Movers stands out most for their reliability and flexibility.",
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
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold leading-7 text-[#2e343e]">
            Add contact details and review your move to finalize your transparent quote
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Icon name="shieldcheck" size={14} className="text-[#3799a3]" />
              <span className="text-sm text-[#677890]">
                No cancellation fees
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="circle-dollar" size={14} className="text-[#3799a3]" />
              <span className="text-sm text-[#677890]">
                No hidden charges
              </span>
            </div>
            <span className="text-sm text-[#677890]">No surprises</span>
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
