import { useEffect } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movingDateSchema, type MovingDateFormData } from "./schema";

export type MovingFormFields = {
  hasDifferentDates: boolean;
  movingDate?: string;
  loadingDate?: string;
  unloadingDate?: string;
};

const DEFAULT_VALUES: MovingFormFields = {
  hasDifferentDates: false,
  movingDate: "",
};

export function useMovingDateForm(defaultValues?: MovingDateFormData) {
  const form = useForm<MovingFormFields>({
    mode: "onChange",
    resolver: zodResolver(movingDateSchema) as Resolver<MovingFormFields>,
    defaultValues: defaultValues ?? DEFAULT_VALUES,
  });

  const { control, getValues, setValue } = form;
  const hasDifferentDates = useWatch({ control, name: "hasDifferentDates" });

  useEffect(() => {
    if (hasDifferentDates) {
      setValue("movingDate", "");
    } else {
      setValue("loadingDate", "");
      setValue("unloadingDate", "");
    }
  }, [hasDifferentDates, getValues, setValue]);

  return form;
}
