import { z } from "zod";

export const selectedPlaceSchema = z.object({
  fullAddress: z.string(),
  zip: z.string(),
  street: z.string().optional(),
  street2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

export const searchSchema = z
  .object({
    startLocation: selectedPlaceSchema.optional(),
    endLocation: selectedPlaceSchema.optional(),
  })
  .refine(
    (data) =>
      data.startLocation?.fullAddress.trim() !== "" ||
      data.endLocation?.fullAddress.trim() !== "",
    {
      message: "At least one location is required",
      path: ["startLocation"],
    },
  );
export type SearchFormData = z.infer<typeof searchSchema>;
export type SelectedPlace = z.infer<typeof selectedPlaceSchema>;
