import { prisma } from "@/lib/prisma";
import { PaymentProvider, PaymentStatus } from "@prisma/client";
import type { CreatePaymentInput } from "@/lib/types/payment";

export async function createPayment(
  data: CreatePaymentInput
) {
  if (!data.bookingId) {
    throw new Error("Booking ID is required");
  }

  if (!data.amount || data.amount <= 0) {
    throw new Error("Payment amount must be greater than zero");
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: data.bookingId,
    },
    include: {
      payments: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const alreadyPaid = booking.payments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  const newPaidAmount = alreadyPaid + data.amount;

  if (newPaidAmount > booking.totalAmount) {
    throw new Error(
      `Payment exceeds remaining balance. Remaining balance: ${
        booking.totalAmount - alreadyPaid
      }`
    );
  }

  const paymentStatus: PaymentStatus =
    newPaidAmount >= booking.totalAmount
      ? PaymentStatus.PAID
      : PaymentStatus.PARTIAL;

  const result = await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.create({
      data: {
        amount: data.amount,
        provider: data.provider,
        transactionId: data.transactionId || null,
        bookingId: data.bookingId,
      },
    });

    await tx.booking.update({
      where: {
        id: data.bookingId,
      },
      data: {
        paymentStatus,
      },
    });

    return payment;
  });

  return result;
}

export async function getBookingPayments(
  bookingId: string
) {
  return prisma.payment.findMany({
    where: {
      bookingId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPaymentSummary(
  bookingId: string
) {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      payments: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const paidAmount = booking.payments.reduce(
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
    payments: booking.payments,
  };
}