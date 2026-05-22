const PROPERTY_OPTIONS = [
  { value: "House", label: "House" },
  { value: "CondoApt", label: "Apartment / Condo" },
  { value: "StorageUnit", label: "Storage Unit" },
] as const;

const BEDROOM_OPTIONS = [
  { value: "400", label: "1" },
  { value: "500", label: "2" },
  { value: "600", label: "3" },
  { value: "700", label: "4" },
  { value: "800", label: "5+" },
] as const;

const FLOOR_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3+", label: "3+" },
] as const;

const ELEVATOR_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export { ELEVATOR_OPTIONS, FLOOR_OPTIONS, BEDROOM_OPTIONS, PROPERTY_OPTIONS };
