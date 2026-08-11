import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("RAW BODY:", body);
    console.log("customerName:", body.customerName);
    console.log("Is Array?", Array.isArray(body.customerName));

    const {
      customerName,
      email,
      phone,
      adults,
      children,
      infants,
      packageId,
      travelDate,
    } = body;

    const pkg = await prisma.package.findUnique({
      where: {
        id: packageId,
      },
    });

    if (!pkg) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found.",
        },
        { status: 404 }
      );
    }

    const year = new Date().getFullYear();
    const totalBookings = await prisma.booking.count();

    const bookingNumber = `UT-${year}${String(
      totalBookings + 1
    ).padStart(5, "0")}`;

try {
  console.log("Booking payload:", {
    bookingNumber,
    customerName,
    email,
    phone,
    adults,
    children,
    infants,
    packageId,
    travelDate,
  });

  const booking = await prisma.booking.create({
    data: {
      bookingNumber,
      customerName,
      email,
      phone,
      adults,
      children,
      infants,
      travelDate: travelDate ? new Date(travelDate) : null,
      totalAmount: 0,
      packageId,
    },
  });

  return NextResponse.json({
    success: true,
    booking,
  });

} catch (error) {
  console.error("BOOKING CREATE ERROR:");
  console.error(error);

  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  }

  return NextResponse.json(
    {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : String(error),
    },
    { status: 500 }
  );
}
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}