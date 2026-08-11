import { NextRequest, NextResponse } from "next/server";
import { PaymentProvider } from "@prisma/client";

import {
  createPayment,
  getPaymentSummary,
} from "@/lib/services/payment.service";

export async function GET(request: NextRequest) {
  try {
    const bookingId =
      request.nextUrl.searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json(
        {
          error: "Booking ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const summary = await getPaymentSummary(bookingId);

    return NextResponse.json(summary);
  } catch (error) {
    console.error("GET /api/payments error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load payment information",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      bookingId,
      amount,
      provider,
      transactionId,
    } = body;

    if (!bookingId) {
      return NextResponse.json(
        {
          error: "Booking ID is required",
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof amount !== "number" ||
      amount <= 0
    ) {
      return NextResponse.json(
        {
          error: "Payment amount must be greater than zero",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !provider ||
      !Object.values(PaymentProvider).includes(provider)
    ) {
      return NextResponse.json(
        {
          error: "Invalid payment provider",
        },
        {
          status: 400,
        }
      );
    }

    const payment = await createPayment({
      bookingId,
      amount,
      provider,
      transactionId:
        transactionId?.trim() || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        payment,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/payments error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create payment",
      },
      {
        status: 500,
      }
    );
  }
}