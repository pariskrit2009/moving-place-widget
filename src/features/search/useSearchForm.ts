import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, type SearchFormData } from "./schema";

export function useSearchForm(defaultValues?: SearchFormData) {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: defaultValues,
  });

  return form;
}
