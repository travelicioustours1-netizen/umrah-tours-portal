import { prisma } from "@/lib/prisma";


// ==========================
// GET ALL BOOKINGS
// ==========================

export async function getBookings() {
  return prisma.booking.findMany({
    include: {
      package: true,
      payments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}



// ==========================
// GET SINGLE BOOKING BY ID
// ==========================

export async function getBooking(id: string) {
  return prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      package: true,
      payments: true,
    },
  });
}



// ==========================
// GET BOOKING BY NUMBER
// ==========================

export async function getBookingByNumber(
  bookingNumber: string
) {
  return prisma.booking.findUnique({
    where: {
      bookingNumber,
    },
    include: {
      package: true,
      payments: true,
    },
  });
}



// ==========================
// RECENT BOOKINGS
// ==========================

export async function getRecentBookings(
  limit = 10
) {
  return prisma.booking.findMany({
    include: {
      package: true,
      payments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}



// ==========================
// BOOKING STATISTICS
// ==========================

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



// ==========================
// CREATE BOOKING
// ==========================

export async function createBooking(data: {

  packageId: string;

  customerName: string;

  email: string;

  phone: string;


  adults: number;

  children: number;

  infants: number;


  roomType:
    | "QUAD"
    | "TRIPLE"
    | "DOUBLE"
    | "SINGLE";


  travelDate?: string | Date | null;


  notes?: string | null;

}) {


  return prisma.booking.create({
  data: {
    bookingNumber: `UMR-${Date.now()}`,

    packageId: data.packageId,

    customerName: data.customerName,

    email: data.email,

    phone: data.phone,

    adults: data.adults,

    children: data.children,

    infants: data.infants,

    travelDate: data.travelDate
  ? new Date(data.travelDate)
  : null,

totalAmount: 0,

    paymentStatus: "UNPAID",

    status: "PENDING",
  },
});
}