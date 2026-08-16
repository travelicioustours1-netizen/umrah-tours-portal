import { prisma } from "@/lib/prisma";
import {
  sendBookingConfirmationEmail,
  sendBookingReceivedEmail,
} from "@/lib/services/email.service";

// ==========================
// GET ALL BOOKINGS
// ==========================

export async function getAllBookings() {
  return prisma.booking.findMany({
    include: {
      package: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ==========================
// GET SINGLE BOOKING BY ID
// ==========================

export async function getBookingById(id: string) {
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

export async function getBookingByNumber(bookingNumber: string) {
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

export async function getRecentBookings(limit = 10) {
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
// UPDATE BOOKING STATUS
// ==========================

export async function updateBookingStatus(
  id: string,
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
) {
  const existingBooking = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  if (!existingBooking) {
    throw new Error("Booking not found.");
  }

  console.log(
    "EXISTING BOOKING STATUS:",
    existingBooking.status
  );

  console.log(
    "REQUESTED BOOKING STATUS:",
    status
  );

  const booking = await prisma.booking.update({
    where: {
      id,
    },
    data: {
      status,
    },
    include: {
      package: true,
      payments: true,
    },
  });

  console.log(
    "BOOKING UPDATED:",
    booking.status
  );

  if (
    status === "CONFIRMED" &&
    existingBooking.status !== "CONFIRMED"
  ) {
    console.log(
      "CONFIRMATION EMAIL FUNCTION CALLED:"
    );

    try {
      await sendBookingConfirmationEmail({
        customerName: booking.customerName,
        email: booking.email,
        bookingNumber: booking.bookingNumber,
        totalAmount: booking.totalAmount,
        package: booking.package,
        travelDate: booking.travelDate,
        adults: booking.adults,
        children: booking.children,
        infants: booking.infants,
        paymentStatus: booking.paymentStatus,
        status: booking.status,
      });

      console.log(
        "CONFIRMATION EMAIL COMPLETED SUCCESSFULLY"
      );
    } catch (emailError) {
      console.error(
        "CONFIRMATION EMAIL FAILED:",
        emailError
      );

      // Do not undo the booking confirmation
      // just because email delivery failed.
    }
  } else {
    console.log(
      "CONFIRMATION EMAIL NOT SENT. Condition:",
      {
        requestedStatus: status,
        previousStatus: existingBooking.status,
      }
    );
  }

  return booking;
}
// ==========================
// CREATE BOOKING
// ==========================

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
}) {
  // ==========================
  // GET PACKAGE
  // ==========================

  const pkg = await prisma.package.findUnique({
    where: {
      id: data.packageId,
    },
  });

  if (!pkg) {
    throw new Error("Package not found.");
  }

  // ==========================
  // DETERMINE ADULT PRICE
  // ==========================

  let adultPrice = pkg.price;

  switch (data.roomType) {
    case "QUAD":
      adultPrice = pkg.quadPrice ?? pkg.price;
      break;

    case "TRIPLE":
      adultPrice = pkg.triplePrice ?? pkg.price;
      break;

    case "DOUBLE":
      adultPrice = pkg.doublePrice ?? pkg.price;
      break;

    case "SINGLE":
      adultPrice = pkg.singlePrice ?? pkg.price;
      break;
  }

  // ==========================
  // CALCULATE TOTAL
  // ==========================

  const totalAmount =
    adultPrice * data.adults +
    (pkg.childBedPrice ?? 0) * data.children +
    (pkg.infantPrice ?? 0) * data.infants;

  // ==========================
  // CREATE BOOKING
  // ==========================

  const booking = await prisma.booking.create({
    data: {
      bookingNumber: `UMR-${Date.now()}`,

      packageId: data.packageId,

      customerName: data.customerName,

      email: data.email,

      phone: data.phone,

      adults: data.adults,

      children: data.children,

      infants: data.infants,

      roomType: data.roomType,

      travelDate: data.travelDate
        ? new Date(data.travelDate)
        : null,

      totalAmount,

      paymentStatus: "UNPAID",

      status: "PENDING",
    },

    include: {
      package: true,
    },
  });

  // ==========================
  // SEND CONFIRMATION EMAIL
  // ==========================

  await sendBookingReceivedEmail({
    customerName: booking.customerName,

    email: booking.email,

    bookingNumber: booking.bookingNumber,

    totalAmount: booking.totalAmount,

    package: booking.package,
  });

  return booking;
}

// ==========================
// UPDATE PAYMENT STATUS
// ==========================

export async function updatePaymentStatus(
  id: string,
  paymentStatus:
    | "UNPAID"
    | "PARTIAL"
    | "PAID"
    | "REFUNDED"
) {
  return prisma.booking.update({
    where: {
      id,
    },
    data: {
      paymentStatus,
    },
  });
}

