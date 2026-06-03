import { z } from "zod";

export const contactInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
});

export const moveStepSchema = z.object({
  address: z.string().min(1, "Address is required"),
  aptSuite: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  crewSize: z.number().min(2).max(3),
  hours: z.number().min(2),
  arrivalTime: z.string().min(1, "Select an arrival time"),
});

export const customizeSchema = z.object({
  contactInfo: contactInfoSchema,
  loading: moveStepSchema,
  unloading: moveStepSchema,
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type MoveStepData = z.infer<typeof moveStepSchema>;
export type CustomizeFormData = z.infer<typeof customizeSchema>;
