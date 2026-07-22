"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(
  id: string,
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
) {
  await prisma.booking.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/dashboard/bookings");
  revalidatePath(`/dashboard/bookings/${id}`);
}

export async function updatePaymentStatus(
  id: string,
  paymentStatus: "UNPAID" | "PARTIAL" | "PAID"
) {
  await prisma.booking.update({
    where: { id },
    data: { paymentStatus },
  });

  revalidatePath("/dashboard/bookings");
  revalidatePath(`/dashboard/bookings/${id}`);
}