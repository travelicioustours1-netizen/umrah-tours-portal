import { prisma } from "@/lib/prisma";

export async function getBookings() {
  return prisma.booking.findMany({
    include: {
      package: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getBooking(id: string) {
  return prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      package: true,
    },
  });
}

export async function getBookingByNumber(
  bookingNumber: string
) {
  return prisma.booking.findUnique({
    where: {
      bookingNumber,
    },
    include: {
      package: true,
    },
  });
}

export async function getRecentBookings(limit = 10) {
  return prisma.booking.findMany({
    include: {
      package: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}

export async function getBookingStats() {
  const [
    total,
    pending,
    confirmed,
    cancelled,
    paid,
    unpaid,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.booking.count({
      where: {
        status: "CONFIRMED",
      },
    }),
    prisma.booking.count({
      where: {
        status: "CANCELLED",
      },
    }),
    prisma.booking.count({
      where: {
        paymentStatus: "PAID",
      },
    }),
    prisma.booking.count({
      where: {
        paymentStatus: "UNPAID",
      },
    }),
  ]);

  return {
    total,
    pending,
    confirmed,
    cancelled,
    paid,
    unpaid,
  };
}