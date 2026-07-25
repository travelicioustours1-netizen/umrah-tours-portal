"use server";

import { prisma } from "@/lib/prisma";
import { BookingSchema } from "@/lib/validations/booking";
import { generateBookingNumber } from "@/lib/booking-number";
import { redirect } from "next/navigation";

export async function createBooking(formData: FormData) {
  const parsed = BookingSchema.safeParse({
    customerName: formData.get("customerName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    adults: formData.get("adults"),
    children: formData.get("children"),
    infants: formData.get("infants"),
    packageId: formData.get("packageId"),
    totalAmount: formData.get("totalAmount"),
    travelDate: formData.get("travelDate"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  const bookingNumber = await generateBookingNumber();

  const booking = await prisma.booking.create({
  data: {
    bookingNumber,
    customerName: data.customerName,
    email: data.email,
    phone: data.phone,

    adults: data.adults,
    children: data.children,
    infants: data.infants,

    packageId: data.packageId,

    totalAmount: data.totalAmount,

    travelDate: data.travelDate
      ? new Date(data.travelDate)
      : null,
  },
});

  redirect(
  `/booking/success?booking=${booking.bookingNumber}`
);
}