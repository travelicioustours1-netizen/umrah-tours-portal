import { PaymentProvider } from "@prisma/client";

export type CreatePaymentInput = {
  bookingId: string;
  amount: number;
  provider: PaymentProvider;
  transactionId?: string;
};

export type PaymentResult = {
  id: string;
  amount: number;
  provider: PaymentProvider;
  transactionId: string | null;
  bookingId: string;
  createdAt: Date;
};