import { z } from "zod";

const singleDateSchema = z.object({
  hasDifferentDates: z.literal(false),
  movingDate: z.string().min(1, "Moving date is required"),
});

const separateDatesSchema = z.object({
  hasDifferentDates: z.literal(true),
  loadingDate: z.string().min(1, "Loading date is required"),
  unloadingDate: z.string().min(1, "Unloading date is required"),
});

export const movingDateSchema = z
  .discriminatedUnion("hasDifferentDates", [
    singleDateSchema,
    separateDatesSchema,
  ])
  .refine(
    (data) => {
      if (data.hasDifferentDates) {
        return (
          !data.loadingDate ||
          !data.unloadingDate ||
          new Date(data.loadingDate) <= new Date(data.unloadingDate)
        );
      }
      return true;
    },
    {
      message: "Loading date must be before or equal to unloading date",
      path: ["loadingDate"],
    },
  );

export type MovingDateFormData = z.infer<typeof movingDateSchema>;
