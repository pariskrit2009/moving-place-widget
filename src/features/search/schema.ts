import { z } from "zod";

export const selectedPlaceSchema = z.object({
  fullAddress: z.string(),
  zip: z.string(),
});

// Full locations schema
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

export interface MoverQuote {
  id: string;
  company: string;
  price: number;
  rating: number;
  services: string[];
}
