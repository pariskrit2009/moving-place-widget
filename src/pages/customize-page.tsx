import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { useWidgetStore } from "@/store";
import { useCustomizeForm } from "@/features/customize/useCustomizeForm";
import {
  ContactInfoSection,
  OneAddressWithOneDateOnlyCard,
  TwoAddressWithOneDateOnlyCard,
} from "@/features/customize/components";
import { Icon } from "@/components/ui/icon";

import { HeaderWithQuote } from "@/components/layout/HeaderWithQuote";
import { TrustBadge } from "@/components/layout/TrustBadge";
import { FormProvider } from "react-hook-form";
import { toServiceItem } from "@/features/movers";
import {
  useCreateMarketplaceQuoteCheckoutLFS,
  useCreateMarketplaceQuoteCheckoutLO,
} from "@/features/customize/mutations";

import { buildLFSPayload, buildLOPayload } from "@/features/customize/payload";
import { buildLocation } from "@/features/customize/helper";

export default function CustomizePage() {
  const { navigateWithParams } = useNavigateWithParams();
  const isLFS = useWidgetStore((s) => s.selectedMoveOption);
  const form = useCustomizeForm();
  const { mutate: mutateLFS } = useCreateMarketplaceQuoteCheckoutLFS();
  const { mutate: mutateLO } = useCreateMarketplaceQuoteCheckoutLO();

  const customization = useWidgetStore((s) => s.customization);
  const storeSetCustomization = useWidgetStore((s) => s.setCustomization);
  const loadingServiceProvider = useWidgetStore(
    (s) => s.selectedLoadingProvider,
  );
  const unloadingServiceProvider = useWidgetStore(
    (s) => s.selectedUnloadingProvider,
  );
  const movingDateData = useWidgetStore((s) => s.movingDateData);
  const hasLoadingAddress = useWidgetStore(
    (s) => s.selectedPlaces?.startLocation?.fullAddress,
  );
  const hasUnloadingAddress = useWidgetStore(
    (s) => s.selectedPlaces?.endLocation?.fullAddress,
  );

  const startDate = movingDateData?.hasDifferentDates
    ? movingDateData.loadingDate
    : movingDateData?.movingDate;

  const endDate = movingDateData?.hasDifferentDates
    ? movingDateData?.unloadingDate
    : movingDateData?.movingDate;

  const loadingLocation = buildLocation(
    customization?.loading,
    hasLoadingAddress,
  );

  const unloadingLocation = buildLocation(
    customization?.unloading,
    hasUnloadingAddress,
  );

  const context = {
    loadingDate: startDate ?? "",
    unloadingDate: endDate ?? "",
    loadingLocation: loadingLocation,
    unloadingLocation: unloadingLocation,
  };

  const loadingService = loadingServiceProvider
    ? toServiceItem(loadingServiceProvider, "loading", context)
    : null;

  const unloadingService = unloadingServiceProvider
    ? toServiceItem(unloadingServiceProvider, "unloading", context)
    : null;

  const storeContextForPayload = {
    loadingDate: startDate ?? "",
    unloadingDate: endDate ?? "",
    loadingServiceProvider: loadingServiceProvider ?? null,
    unloadingServiceProvider: unloadingServiceProvider ?? null,
  };

  const onSubmit = form.handleSubmit((data) => {
    storeSetCustomization(data);
    if (isLFS === "movers-truck")
      mutateLFS(buildLFSPayload(data, storeContextForPayload));
    else mutateLO(buildLOPayload(data, storeContextForPayload));
  });

  return (
    <WidgetLayout
      onContinue={onSubmit}
      navigateBack={() => navigateWithParams("/movers")}
      continueLabel={
        <>
          <span className="hidden sm:inline">Proceed to</span> Checkout
        </>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Page header */}
        <div className="flex flex-col gap-4">
          <HeaderWithQuote
            header={`Add contact details and review your move to finalize \n your transparent quote.`}
          />
          <div className="flex flex-wrap items-center sm:gap-6">
            <TrustBadge label="Free cancellation & rescheduling up to 48 hours">
              <Icon name="clock" size={13.33} className="text-teal-500" />
            </TrustBadge>
            <TrustBadge label="Support available 7 days a week">
              <Icon name="support" size={20} className="text-teal-500" />
            </TrustBadge>
          </div>
        </div>
        <FormProvider {...form}>
          {/* Contact info */}
          <ContactInfoSection form={form} />

          {/* - both loading and unloading address, two different dates, movers only -> two sections 
          - only loading or unloading, two different dates, movers only -> only one section
          - both loading and unloading, one date, movers only || both loading and unloading, one date, movers + truck(same design except the crew member section with and without truck) -> one section including addressinfosection */}

          {movingDateData?.hasDifferentDates ? (
            <>
              {/* Loading step card */}
              {hasLoadingAddress && loadingService && (
                <OneAddressWithOneDateOnlyCard
                  stepType="loading"
                  service={loadingService}
                />
              )}
              {/* Unloading step card */}
              {hasUnloadingAddress && unloadingService && (
                <OneAddressWithOneDateOnlyCard
                  stepType="unloading"
                  service={unloadingService}
                />
              )}
            </>
          ) : (
            <>
              {(loadingService || unloadingService) && (
                <TwoAddressWithOneDateOnlyCard
                  loadingService={loadingService}
                  unloadingService={unloadingService}
                />
              )}
            </>
          )}
        </FormProvider>
      </div>
    </WidgetLayout>
  );
}
