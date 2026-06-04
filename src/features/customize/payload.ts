import { useWidgetStore } from "@/store";
import type {
  CustomizeFormData,
  MarketplaceLFSQuoteRequest,
  MarketplaceLOQuoteRequest,
} from "./schema";
import { formatIsoDate } from "@/lib/utils";
import type { ServiceProvider } from "../movers";

type StoreContext = {
  loadingDate: string;
  unloadingDate: string;
  loadingServiceProvider: ServiceProvider | null;
  unloadingServiceProvider: ServiceProvider | null;
};

export const buildLFSPayload = (
  data: CustomizeFormData,
  storeContext: StoreContext,
): MarketplaceLFSQuoteRequest => {
  return {
    origin: {
      flightsOfStairs: Number(
        useWidgetStore.getState().locations?.loadingDetails?.floors ?? 0,
      ),
      bedrooms: 2, //TODO
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
      bedrooms: 2, //TODO
      street: data.unloading.address ?? "",
      streetLineTwo: data.unloading.aptSuite ?? "",
      city: data.unloading.city ?? "",
      state: data.unloading.state ?? "",
      zip: data.unloading.zipCode ?? "",
    },

    requestedDate:
      formatIsoDate(storeContext.loadingDate ?? storeContext.unloadingDate) ??
      "",
    desiredArrivalWindow:
      data.loading.arrivalTime ?? data.unloading.arrivalTime ?? "",

    laborHours: data.loading.hours ?? data.unloading?.hours ?? 2,
    crewSize: data.loading.crewSize ?? data.unloading?.crewSize ?? 2,

    providerLocationId:
      storeContext.loadingServiceProvider?.workerLocationId ??
      storeContext.unloadingServiceProvider?.workerLocationId ??
      0,
    transportOptionId:
      storeContext.loadingServiceProvider?.transportOptionID ??
      storeContext.unloadingServiceProvider?.transportOptionID ??
      0,

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
};

export const buildLOPayload = (
  data: CustomizeFormData,
  storeContext: StoreContext,
): MarketplaceLOQuoteRequest => {
  return {
    load: {
      address: {
        street: data.loading.address ?? "",
        city: data.loading.city ?? "",
        state: data.loading.state ?? "",
        zip: data.loading.zipCode ?? "",
        streetLineTwo: data.loading.aptSuite ?? "",
      },
      desiredArrivalWindow: data.loading.arrivalTime ?? "",
      // notes: "string",
      requestedDate: formatIsoDate(storeContext.loadingDate) ?? "",
      laborHours: data.loading.hours ?? 2,
      workerLocationID:
        storeContext.loadingServiceProvider?.workerLocationId ?? 0,
      crewSize: data.loading.crewSize ?? 2,
      flightsOfStairs: Number(
        useWidgetStore.getState().locations?.loadingDetails?.floors ?? 0,
      ),
    },
    unload: {
      address: {
        street: data.unloading.address ?? "",
        city: data.unloading.city ?? "",
        state: data.unloading.state ?? "",
        zip: data.unloading.zipCode ?? "",
        streetLineTwo: data.unloading.aptSuite ?? "",
      },
      desiredArrivalWindow: data.unloading.arrivalTime ?? "",
      // notes: "string",
      requestedDate: formatIsoDate(storeContext.unloadingDate) ?? "",
      laborHours: data.unloading.hours ?? 2,
      workerLocationID:
        storeContext.unloadingServiceProvider?.workerLocationId ?? 0,
      crewSize: data.unloading.crewSize ?? 2,
      flightsOfStairs: Number(
        useWidgetStore.getState().locations?.unloadingDetails?.floors ?? 0,
      ),
    },
    // transports: {
    //   areWeMovingRentalTruck: true, //TODO
    //   areWeMovingContainer: true,
    //   areWeMovingFreightTrailer: true,
    // },
    // customReference: "string",
    // bookingAgent: "string",
    // partnerPostBookingUrl: "string",
    contactInformation: {
      secondaryPhoneNumber: data.contactInfo.phone ?? "",
      firstName: data.contactInfo.firstName ?? "",
      lastName: data.contactInfo.lastName ?? "",
      emailAddress: data.contactInfo.email ?? "",
      phoneNumber: data.contactInfo.phone ?? "",
    },
    // heavyItems: [
    //   {
    //     itemType: "Unknown",
    //     quantity: 100,
    //   },
    // ],
    // serviceType: "Unknown",
  };
};
