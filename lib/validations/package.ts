import { z } from "zod";

export const packageSchema = z.object({
  title: z.string().min(3, "Title is required"),

  duration: z.string().min(1),

  category: z.string().min(1),

  departureCity: z.string().min(1),

  airlineId: z.string().min(1),

  hotelMakkahId: z.string().min(1),

  hotelMadinahId: z.string().min(1),

  makkahNights: z.coerce.number().min(0),

  madinahNights: z.coerce.number().min(0),

  price: z.coerce.number().positive(),

  description: z.string().min(1),

  itinerary: z.string().min(1),

  inclusions: z.string().min(1),

  exclusions: z.string().min(1),

  image: z.string().url().optional().or(z.literal("")),
});

export type PackageFormValues = z.infer<typeof packageSchema>;