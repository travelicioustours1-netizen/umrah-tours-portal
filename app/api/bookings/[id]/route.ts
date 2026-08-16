import { NextResponse } from "next/server";
import {
  updateBookingStatus,
  updatePaymentStatus,
} from "@/lib/services/booking.service";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    console.log("BOOKING PATCH BODY:", body);
    console.log("BOOKING PATCH ID:", id);

    let booking;

    if (body.status) {
      console.log(
        "CALLING updateBookingStatus:",
        id,
        body.status
      );

      booking = await updateBookingStatus(
        id,
        body.status
      );

      console.log(
        "BOOKING STATUS UPDATED:",
        booking?.status
      );
    }

    if (body.paymentStatus) {
      console.log(
        "CALLING updatePaymentStatus:",
        id,
        body.paymentStatus
      );

      booking = await updatePaymentStatus(
        id,
        body.paymentStatus
      );

      console.log(
        "PAYMENT STATUS UPDATED:",
        booking?.paymentStatus
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(
      "PATCH /api/bookings/[id] ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to update booking",
      },
      {
        status: 500,
      }
    );
  }
}