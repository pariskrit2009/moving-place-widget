import { z } from "zod";

const singleDateSchema = z.object({
  hasDifferentDates: z.literal(false),
  movingDate: z.string().min(1, "Moving date is required"),
});

const separateDatesSchema = z.object({
  hasDifferentDates: z.literal(true),
  loadingDate: z.string().min(1, "Loading date is required"),
  unloadingDate: z.string(),
});

export const movingDateSchema = z.discriminatedUnion("hasDifferentDates", [
  singleDateSchema,
  separateDatesSchema,
]);

export type MovingDateFormData = z.infer<typeof movingDateSchema>;
