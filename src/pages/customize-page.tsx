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
import { useCreateMarketplaceQuoteCheckout } from "@/features/customize/mutations";
import { formatIsoDate } from "@/lib/utils";

export default function CustomizePage() {
  const { navigateWithParams } = useNavigateWithParams();
  const storeSetCustomization = useWidgetStore((s) => s.setCustomization);
  const form = useCustomizeForm();
  const { mutate } = useCreateMarketplaceQuoteCheckout();
  const loadingServiceProvider = useWidgetStore(
    (s) => s.selectedLoadingProvider,
  );

  const movingDateData = useWidgetStore((s) => s.movingDateData);
  const hasLoadingAddress = useWidgetStore(
    (s) => s.selectedPlaces?.startLocation?.fullAddress,
  );
  const hasUnloadingAddress = useWidgetStore(
    (s) => s.selectedPlaces?.endLocation?.fullAddress,
  );
  const loadingProvider = useWidgetStore((s) => s.selectedLoadingProvider);
  const unloadingProvider = useWidgetStore((s) => s.selectedUnloadingProvider);
  const startDate = movingDateData?.hasDifferentDates
    ? movingDateData.loadingDate
    : movingDateData?.movingDate;

  const endDate = movingDateData?.hasDifferentDates
    ? movingDateData?.unloadingDate
    : movingDateData?.movingDate;

  const context = {
    loadingDate: startDate ?? "",
    unloadingDate: endDate ?? "",
    loadingLocation: hasLoadingAddress ?? "",
    unloadingLocation: hasUnloadingAddress ?? "",
  };

  const loadingService = loadingProvider
    ? toServiceItem(loadingProvider, "loading", context)
    : null;

  const unloadingService = unloadingProvider
    ? toServiceItem(unloadingProvider, "unloading", context)
    : null;

  const onSubmit = form.handleSubmit((data) => {
    storeSetCustomization(data);
    const payload = {
      origin: {
        flightsOfStairs: Number(
          useWidgetStore.getState().locations?.loadingDetails?.floors ?? 0,
        ),
        bedrooms: 2,
        street: data.loading.address ?? "",
        city: data.loading.city ?? "",
        state: data.loading.state ?? "",
        zip: data.loading.zipCode ?? "",
        streetLineTwo: data.loading.aptSuite ?? "",
      },

      destination: {
        flightsOfStairs: Number(
          useWidgetStore.getState().locations?.unloadingDetails?.floors ?? 0,
        ),
        bedrooms: 2,
        street: data.unloading.address ?? "",
        streetLineTwo: data.unloading.aptSuite ?? "",
        city: data.unloading.city ?? "",
        state: data.unloading.state ?? "",
        zip: data.unloading.zipCode ?? "",
      },

      requestedDate: startDate
        ? formatIsoDate(startDate)
        : endDate
          ? formatIsoDate(endDate)
          : "",
      desiredArrivalWindow: data.loading.arrivalTime ?? "",

      laborHours: data.loading.hours ?? 2,
      crewSize: data.loading.crewSize ?? 2,

      providerLocationId: loadingServiceProvider?.workerLocationId ?? 0,
      transportOptionId: loadingServiceProvider?.transportOptionID ?? 0,

      contactInformation: {
        secondaryPhoneNumber: data.contactInfo.phone ?? "",
        firstName: data.contactInfo.firstName ?? "",
        lastName: data.contactInfo.lastName ?? "",
        emailAddress: data.contactInfo.email ?? "",
        phoneNumber: data.contactInfo.phone ?? "",
      },
      // notes: "",
      // customReference: "string",
      // bookingAgent: "string",
      // partnerPostBookingUrl: "https://www.movingplace.com",
    };
    mutate(payload);
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
              {loadingService && (
                <TwoAddressWithOneDateOnlyCard service={loadingService} />
              )}
            </>
          )}
        </FormProvider>
      </div>
    </WidgetLayout>
  );
}
