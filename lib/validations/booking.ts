import { z } from "zod";

export const BookingSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Customer name is required"),

  email: z.email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(8, "Phone number is required"),

  adults: z.coerce.number().min(1),

  children: z.coerce.number().min(0),

  infants: z.coerce.number().min(0),

  packageId: z.string().min(1),

  totalAmount: z.coerce.number().min(0),

  travelDate: z.string().optional(),
});

export type BookingInput = z.infer<typeof BookingSchema>;