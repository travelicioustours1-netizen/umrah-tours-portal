import { z } from "zod";

export const BookingSchema = z.object({
  packageId: z.string().min(1, "Package is required"),

  customerName: z
    .string()
    .min(2, "Customer name is required"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(5, "Phone number is required"),


  adults: z
    .number()
    .optional()
    .default(1),

  children: z
    .number()
    .optional()
    .default(0),

  infants: z
    .number()
    .optional()
    .default(0),


  roomType: z
    .enum([
      "QUAD",
      "TRIPLE",
      "DOUBLE",
      "SINGLE",
    ])
    .default("QUAD"),


  travelDate: z
    .string()
    .optional(),


  });