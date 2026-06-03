export interface Provider {
  name: string;
  moves: number;
  yearsInBusiness: number;
  rating: number;
  reviews: number;
  summary: string;
  avatar?: string;
}

export interface ServiceItem {
  type: "loading" | "unloading";
  date: string;
  location: string;
  startingPrice: number;
  provider: Provider;
  movers: number;
  hours: number;
  hasTruck: boolean;
  minHours: number;
}

export interface MoverQuote {
  id: string;
  totalPrice: number;
  lowestPrice: number;
  topRatedPrice: number;
  services: ServiceItem[];
}

export interface MoverItem {
  id: string;
  provider: Provider;
  price: number;
  priceLabel: string;
  movers: number;
  hours: number;
  hasTruck: boolean;
  avatar: string;
  availableEquipement: AvailableEquipment[];
}

export const SORT_ORDER = {
  BestMatch: "BestMatch",
  PriceLowToHigh: "PriceLowToHigh",
  PriceHighToLow: "PriceHighToLow",
  QualityRating: "QualityRating",
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export type ServiceType = "Standard" | "Elite" | "MoversPlusTruck";

export interface ServiceProviderParams {
  requestedDate: string;
  loadingZipCode: string;
  unloadingZipCode?: string;
  laborHours: number;
  crewSize: number;
  sortOrder: SortOrder;
  serviceType: ServiceType;
  flightsOfStairs: number;
  onlyAvailable: boolean;
  heavyItemsUprightPianosQty?: number;
  heavyItemsBabyGrandPianosQty?: number;
  heavyItemsBetweenThreeAndFourFiftyQty?: number;
  heavyItemsBetweenFourFiftyAndSixQty?: number;
  heavyItemsSixPlusQty?: number;
}

export interface ReviewStat {
  stars: number;
  count: number;
  percent: number;
}

export interface AvailableEquipment {
  name: string;
  description: string;
  price: number;
  additionalCosts: boolean;
}

export interface Credential {
  field: string;
  sortOrder: number;
  verifiedByHireAHelper: boolean;
  credentialName: string;
}

export interface ServiceProvider {
  providerId: number;
  workerLocationId: number;
  companyName: string;
  companyDescription: string;
  bookThisCompanyUrl: string;
  price: number;
  internal_GrandTotalWithoutFees: number;
  internal_GrandTotalWithFees: number;
  ranking: number;
  availabilityNotes: string;
  availableWorkerTimeSlotsDescription: string;
  availableArrivalWindows: string[];
  numberOfReviews: number;
  completedJobCount: number;
  ratingAverage: number;
  noShowJobCount: number;
  unusedTimePolicyRuleDesc: string;
  overTimePolicyRuleDesc: string;
  serviceMiniDescription: string;
  reviewStats: ReviewStat[];
  reasonsCantShow: string[];
  availableEquipment: AvailableEquipment[];
  credentials: Credential[];
  publicNotices: string[];
  minHours: number;
  actualNumHours: number;
  actualCrewSize: number;
  hasFlexibleScheduling: boolean;
  driveTimePolicyDescription: string;
  driveTimePolicy: string;
  extraHourRate: number;
  travelHours: number;
  profileImageUrl: string;
  isGenericProfileImage: boolean;
  transportOptionID: number;
  offersPacking: boolean;
}

export interface ServiceProviderListResponse {
  serviceProviders: ServiceProvider[];
  helperListUrl: string;
  success: boolean;
  resultMessage: string;
}
