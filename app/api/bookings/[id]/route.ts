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

    let booking;

    if (body.status) {
      booking = await updateBookingStatus(
        id,
        body.status
      );
    }

    if (body.paymentStatus) {
      booking = await updatePaymentStatus(
        id,
        body.paymentStatus
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update booking",
      },
      {
        status: 500,
      }
    );
  }
}