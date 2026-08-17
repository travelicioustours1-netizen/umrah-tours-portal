import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import type { CreatePaymentInput } from "@/lib/types/payment";
import { sendPaymentReceivedEmail } from "@/lib/services/email.service";

// ==========================
// CREATE PAYMENT
// ==========================

export async function createPayment(data: CreatePaymentInput) {
  // ==========================
  // BASIC INPUT VALIDATION
  // ==========================

  if (!data.bookingId) {
    throw new Error("Booking ID is required");
  }

  if (
    typeof data.amount !== "number" ||
    !Number.isFinite(data.amount) ||
    data.amount <= 0
  ) {
    throw new Error("Payment amount must be greater than zero");
  }

  // ==========================
  // ATOMIC PAYMENT TRANSACTION
  // ==========================
  //
  // Important:
  // The booking and payment records are checked again
  // INSIDE the transaction.
  //
  // This protects against two payment requests being
  // submitted at almost the same time.

  const result = await prisma.$transaction(
    async (tx) => {
      const booking = await tx.booking.findUnique({
        where: {
          id: data.bookingId,
        },
        include: {
          package: true,
          payment: true,
        },
      });

      if (!booking) {
        throw new Error("Booking not found");
      }

      // ==========================
      // CANCELLED BOOKING PROTECTION
      // ==========================

      if (booking.status === "CANCELLED") {
        throw new Error(
          "Payment cannot be recorded for a cancelled booking."
        );
      }

      // ==========================
      // CALCULATE CURRENTLY PAID
      // ==========================

      const alreadyPaid = booking.payment.reduce(
        (total, payment) => total + payment.amount,
        0
      );

      const remainingBalance = Math.max(
        booking.totalAmount - alreadyPaid,
        0
      );

      // ==========================
      // FULLY PAID PROTECTION
      // ==========================

      if (remainingBalance <= 0) {
        throw new Error(
          "This booking is already fully paid."
        );
      }

      // ==========================
      // OVERPAYMENT PROTECTION
      // ==========================

      if (data.amount > remainingBalance) {
        throw new Error(
          `Payment exceeds the remaining balance. Maximum payment allowed: AED ${remainingBalance.toFixed(
            2
          )}`
        );
      }

      // ==========================
      // CALCULATE NEW PAYMENT STATUS
      // ==========================

      const newPaidAmount =
        alreadyPaid + data.amount;

      const paymentStatus: PaymentStatus =
        newPaidAmount >= booking.totalAmount
          ? PaymentStatus.PAID
          : PaymentStatus.PARTIAL;

      // ==========================
      // CREATE PAYMENT
      // ==========================

      const payment = await tx.payment.create({
        data: {
          amount: data.amount,
          provider: data.provider,
          transactionId:
            data.transactionId || null,
          bookingId: data.bookingId,
        },
      });

      // ==========================
      // UPDATE BOOKING PAYMENT STATUS
      // ==========================

      await tx.booking.update({
        where: {
          id: data.bookingId,
        },
        data: {
          paymentStatus,
        },
      });

      // ==========================
      // RETURN EVERYTHING NEEDED
      // FOR EMAIL
      // ==========================

      return {
        payment,
        booking,
        alreadyPaid,
        newPaidAmount,
        remainingBalance: Math.max(
          booking.totalAmount - newPaidAmount,
          0
        ),
        paymentStatus,
      };
    },
    {
      isolationLevel: "Serializable",
    }
  );

  // ==========================
  // SEND PAYMENT EMAIL
  // ==========================
  //
  // Email is deliberately outside the database
  // transaction.
  //
  // If Resend fails, the payment remains successful.

  try {
    await sendPaymentReceivedEmail({
      customerName: result.booking.customerName,
      email: result.booking.email,
      bookingNumber: result.booking.bookingNumber,

      package: {
        title: result.booking.package.title,
      },

      totalAmount: result.booking.totalAmount,
      previousPaidAmount: result.alreadyPaid,
      currentPayment: data.amount,
      paidAmount: result.newPaidAmount,
      remainingBalance: result.remainingBalance,

      paymentStatus: result.paymentStatus,
      provider: data.provider,

      transactionId:
        data.transactionId || null,
    });

    console.log(
      "PAYMENT EMAIL SENT:",
      result.booking.bookingNumber
    );
  } catch (error) {
    console.error(
      "PAYMENT EMAIL ERROR:",
      error
    );

    // Payment remains successful even if
    // email delivery fails.
  }

  return result.payment;
}

// ==========================
// GET BOOKING PAYMENTS
// ==========================

export async function getBookingPayments(
  bookingId: string
) {
  if (!bookingId) {
    throw new Error("Booking ID is required");
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    select: {
      id: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return prisma.payment.findMany({
    where: {
      bookingId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ==========================
// GET PAYMENT SUMMARY
// ==========================

export async function getPaymentSummary(
  bookingId: string
) {
  if (!bookingId) {
    throw new Error("Booking ID is required");
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      payment: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const paidAmount = booking.payment.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  const balance = Math.max(
    booking.totalAmount - paidAmount,
    0
  );

  return {
    totalAmount: booking.totalAmount,
    paidAmount,
    balance,
    paymentStatus: booking.paymentStatus,
    bookingStatus: booking.status,
    payments: booking.payment,
  };
}
