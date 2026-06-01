import { useForm } from "react-hook-form";
import { customizeSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CustomizeFormData } from "./schema";
import { useWidgetStore } from "@/store";

export function useCustomizeForm() {
  const storedCustomization = useWidgetStore((s) => s.customization);
  // 1. Grab BOTH locations from the store
  const startLocation = useWidgetStore(
    (state) => state.selectedPlaces?.startLocation,
  );
  const endLocation = useWidgetStore(
    (state) => state.selectedPlaces?.endLocation,
  );

  return useForm<CustomizeFormData>({
    resolver: zodResolver(customizeSchema),
    defaultValues: storedCustomization ?? {
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      loading: {
        address: startLocation?.street || "",
        aptSuite: startLocation?.street2 || "",
        city: startLocation?.city || "",
        state: startLocation?.state || "",
        zipCode: startLocation?.zip || "",
        crewSize: 2,
        hours: 2,
        arrivalTime: "",
      },
      unloading: {
        address: endLocation?.street || "",
        aptSuite: endLocation?.street2 || "",
        city: endLocation?.city || "",
        state: endLocation?.state || "",
        zipCode: endLocation?.zip || "",
        crewSize: 2,
        hours: 2,
        arrivalTime: "",
      },
    },
  });
}
