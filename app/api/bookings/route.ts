import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      customerName,
      email,
      phone,
      adults,
      children,
      infants,
      packageId,
      travelDate,
    }: {
      customerName: string;
      email: string;
      phone: string;
      adults: number;
      children: number;
      infants: number;
      packageId: string;
      travelDate?: string;
    } = await req.json();

    if (
      !customerName ||
      !email ||
      !phone ||
      !packageId
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        { status: 400 }
      );
    }

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

    const booking = await prisma.booking.create({
      data: {
        bookingNumber,

        customerName,
        email,
        phone,

        adults,
        children,
        infants,

        travelDate: travelDate
          ? new Date(travelDate)
          : null,

        totalAmount: 0,

        package: {
          connect: {
            id: packageId,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      booking,
    });
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