import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/services/booking.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("BOOKING REQUEST:", body);

    const {
      customerName,
      email,
      phone,
      adults,
      children,
      infants,
      packageId,
      travelDate,
      roomType,
    } = body;

    if (!customerName || !email || !phone || !packageId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Customer name, email, phone and package are required.",
        },
        { status: 400 }
      );
    }

    if (!roomType) {
      return NextResponse.json(
        {
          success: false,
          message: "Room type is required.",
        },
        { status: 400 }
      );
    }

    const booking = await createBooking({
      packageId,
      customerName,
      email,
      phone,
      adults: Number(adults) || 1,
      children: Number(children) || 0,
      infants: Number(infants) || 0,
      roomType,
      travelDate: travelDate || null,
    });

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("BOOKING CREATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create booking.",
      },
      { status: 500 }
    );
  }
}