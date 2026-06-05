import { z } from "zod";

export const contactInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
});

export const moveStepSchema = z.object({
  address: z.string().min(1, "Address is required"),
  aptSuite: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  crewSize: z.number().min(2).max(3),
  hours: z.number().min(2),
  arrivalTime: z.string().optional(),
});

export const customizeSchema = z.object({
  contactInfo: contactInfoSchema,
  loading: moveStepSchema,
  unloading: moveStepSchema,
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type MoveStepData = z.infer<typeof moveStepSchema>;
export type CustomizeFormData = z.infer<typeof customizeSchema>;

type HeavyItem = {
  itemType: string;
  quantity: number;
};

type Address = {
  street: string;
  streetLineTwo?: string;
  city: string;
  state: string;
  zip: string;
  flightsOfStairs: number;
  bedrooms: number;
};

type ContactInformation = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  secondaryPhoneNumber?: string;
};

export type MarketplaceLFSQuoteRequest = {
  origin: Address;
  destination: Address;
  requestedDate: string;
  desiredArrivalWindow: string;
  laborHours: number;
  providerLocationId: number;
  crewSize: number;
  transportOptionId: number | null;
  customReference?: string;
  bookingAgent?: string;
  partnerPostBookingUrl?: string;
  contactInformation: ContactInformation;
  heavyItems?: HeavyItem[];
  notes?: string;
};

export type MarketplaceLOQuoteRequest = {
  load: {
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      streetLineTwo: string;
    };
    desiredArrivalWindow: string;
    notes?: string;
    requestedDate: string;
    laborHours: number;
    workerLocationID: number;
    crewSize: number;
    flightsOfStairs: number;
  };
  unload: {
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      streetLineTwo: string;
    };
    desiredArrivalWindow: string;
    notes?: string;
    requestedDate: string;
    laborHours: number;
    workerLocationID: number;
    crewSize: number;
    flightsOfStairs: number;
  };
  transports?: {
    areWeMovingRentalTruck: true;
    areWeMovingContainer: true;
    areWeMovingFreightTrailer: true;
  };
  // customReference: "string";
  // bookingAgent: "string";
  // partnerPostBookingUrl: "string";
  contactInformation: ContactInformation;
  heavyItems?: [
    {
      itemType: unknown;
      quantity: number;
    },
  ];
  serviceType?: unknown;
};

export type MarketplaceQuoteResponse = {
  quotePublicKey: string;
  grandTotal: number;
  finishCheckoutUrl: string;
};
