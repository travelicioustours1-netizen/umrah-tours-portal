import { prisma } from "@/lib/prisma";

export async function generateBookingNumber() {
  const year = new Date().getFullYear();

  const count = await prisma.booking.count();

  return `UMR-${year}-${String(count + 1).padStart(6, "0")}`;
}