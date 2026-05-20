import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationsSchema, type LocationsFormData } from "./schema";

const DEFAULT_VALUES: LocationsFormData = {
  loadingPropertyType:
    undefined as unknown as LocationsFormData["loadingPropertyType"],
  unloadingPropertyType:
    undefined as unknown as LocationsFormData["unloadingPropertyType"],
  needsPacking: false,
  needsHeavyItems: false,
  loadingDetails: {
    bedrooms: 0,
    floors: "",
    elevator: "",
  },
  unloadingDetails: {
    bedrooms: 0,
    floors: "",
    elevator: "",
  },
  pianoDetails: {
    baby_or_grand_pianos: "",
    upright_pianos: "",
    "300_to_450_lbs": "",
    "450_to_600_lbs": "",
    over_600_lbs: "",
  },
};

export function useLocationsForm(defaultValues?: LocationsFormData) {
  return useForm<LocationsFormData>({
    resolver: zodResolver(locationsSchema),
    defaultValues: defaultValues ?? DEFAULT_VALUES,
  });
}
