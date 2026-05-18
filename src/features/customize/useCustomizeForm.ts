import { useForm } from "react-hook-form";
import { customizeSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CustomizeFormData } from "./schema";
import { useWidgetStore } from "@/store";

export function useCustomizeForm() {
  const storedCustomization = useWidgetStore((s) => s.customization);

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
        address: "",
        aptSuite: "",
        crewSize: 2,
        arrivalTime: "",
      },
      unloading: {
        address: "",
        aptSuite: "",
        crewSize: 2,
        arrivalTime: "",
      },
    },
  });
}
