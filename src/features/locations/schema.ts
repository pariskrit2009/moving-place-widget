import { z } from "zod";

const propertyTypeEnum = z.enum(["House", "CondoApt", "StorageUnit"]);

const pianoDetailsSchema = z.object({
  baby_or_grand_pianos: z.string(),
  upright_pianos: z.string(),
  "300_to_450_lbs": z.string(),
  "450_to_600_lbs": z.string(),
  over_600_lbs: z.string(),
});

const locationDetailsSchema = z.object({
  bedrooms: z.union([z.number(), z.string()]),
  floors: z.string(),
  elevator: z.string(),
});

interface SchemaOptions {
  showLoading?: boolean;
  showUnloading?: boolean;
}

export function createLocationsSchema(options?: SchemaOptions) {
  const showLoading = options?.showLoading !== false;
  const showUnloading = options?.showUnloading !== false;

  return z
    .object({
      loadingPropertyType: propertyTypeEnum.optional(),
      unloadingPropertyType: propertyTypeEnum.optional(),

      loadingDetails: locationDetailsSchema.optional(),
      unloadingDetails: locationDetailsSchema.optional(),

      needsPacking: z.boolean(),
      needsHeavyItems: z.boolean(),

      pianoDetails: pianoDetailsSchema.optional(),
    })
    .superRefine((data, ctx) => {
      const validate = (
        type: z.infer<typeof propertyTypeEnum>,
        details: typeof data.loadingDetails,
        basePath: "loadingDetails" | "unloadingDetails",
      ) => {
        const needsBasic = type === "House" || type === "CondoApt";

        if (needsBasic) {
          if (!details?.bedrooms) {
            ctx.addIssue({
              code: "custom",
              path: [basePath, "bedrooms"],
              message: `Please select the number of bedrooms`,
            });
          }

          if (!details?.floors) {
            ctx.addIssue({
              code: "custom",
              path: [basePath, "floors"],
              message: `Please select the number of floors`,
            });
          }

          if (!details?.elevator && type == "CondoApt") {
            ctx.addIssue({
              code: "custom",
              path: [basePath, "elevator"],
              message: `Please select the number of elevator`,
            });
          }
        }
      };
      if (showLoading) {
        validate(
          data.loadingPropertyType!,
          data.loadingDetails,
          "loadingDetails",
        );
      }

      if (showUnloading) {
        validate(
          data.unloadingPropertyType!,
          data.unloadingDetails,
          "unloadingDetails",
        );
      }
    });
}

export const locationsSchema = createLocationsSchema();

export type LocationsFormData = z.infer<
  ReturnType<typeof createLocationsSchema>
>;
