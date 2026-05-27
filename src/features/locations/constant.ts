import type { LocationsFormData } from "./schema";

const PROPERTY_OPTIONS = [
  { value: "House", label: "House" },
  { value: "CondoApt", label: "Apartment / Condo" },
  { value: "StorageUnit", label: "Storage Unit" },
] as const;

const BEDROOM_OPTIONS = [
  { value: "300", label: "No Bedrooms" },
  { value: "400", label: "1 Bedroom" },
  { value: "500", label: "2 Bedrooms" },
  { value: "600", label: "3 Bedrooms" },
  { value: "700", label: "4 Bedrooms" },
  { value: "800", label: "5 Bedrooms" },
] as const;

const FLOOR_OPTIONS = [
  { value: "0", label: "1 Floor / No Stairs" },
  { value: "1", label: "2 Floors / 1 Flight of Stairs" },
  { value: "2", label: "3 Floors / 2 Flight of Stairs" },
  { value: "3", label: "4 Floors / 3 Flight of Stairs" },
  { value: "4", label: "5 Floors / 4 Flight of Stairs" },
  { value: "5", label: "6 Floors / 5 Flight of Stairs" },
] as const;

const ELEVATOR_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

const PIANOS_OPTIONS = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5+",
  },
];

const LOCATIONS_DEFAULT_VALUES: LocationsFormData = {
  loadingPropertyType:
    undefined as unknown as LocationsFormData["loadingPropertyType"],
  unloadingPropertyType:
    undefined as unknown as LocationsFormData["unloadingPropertyType"],
  needsPacking: false,
  needsHeavyItems: false,
  loadingDetails: {
    bedrooms: "",
    floors: "",
    elevator: "",
  },
  unloadingDetails: {
    bedrooms: "",
    floors: "",
    elevator: "",
  },
  pianoDetails: {
    baby_or_grand_pianos: "0",
    upright_pianos: "0",
    "300_to_450_lbs": "0",
    "450_to_600_lbs": "0",
    over_600_lbs: "0",
  },
};

export {
  ELEVATOR_OPTIONS,
  FLOOR_OPTIONS,
  BEDROOM_OPTIONS,
  PROPERTY_OPTIONS,
  PIANOS_OPTIONS,
  LOCATIONS_DEFAULT_VALUES,
};
