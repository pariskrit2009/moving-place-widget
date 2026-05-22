import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationsSchema, type LocationsFormData } from "./schema";
import { LOCATIONS_DEFAULT_VALUES } from "./constant";

export function useLocationsForm(defaultValues?: LocationsFormData) {
  return useForm<LocationsFormData>({
    resolver: zodResolver(locationsSchema),
    defaultValues: defaultValues ?? LOCATIONS_DEFAULT_VALUES,
  });
}
