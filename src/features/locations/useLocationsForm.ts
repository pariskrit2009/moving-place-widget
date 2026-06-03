import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createLocationsSchema,
  type LocationsFormData,
} from "./schema";
import { LOCATIONS_DEFAULT_VALUES } from "./constant";

interface FormOptions {
  showLoading?: boolean;
  showUnloading?: boolean;
}

export function useLocationsForm(
  defaultValues?: LocationsFormData,
  options?: FormOptions,
) {
  return useForm<LocationsFormData>({
    mode: "onChange",
    resolver: zodResolver(createLocationsSchema(options)),
    defaultValues: defaultValues ?? LOCATIONS_DEFAULT_VALUES,
  });
}
