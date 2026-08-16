import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      service,
      travelDate,
      travellers,
      message,
      source,
      packageId,
    } = body;

    // Basic validation
    if (!name || !phone || !service) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, phone and service are required.",
        },
        { status: 400 }
      );
    }

    // Convert travel date safely
    let parsedTravelDate: Date | null = null;

    if (travelDate) {
      const date = new Date(`${travelDate}T00:00:00`);

      if (!Number.isNaN(date.getTime())) {
        parsedTravelDate = date;
      }
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : "",
        service: String(service).trim(),
        travelDate: parsedTravelDate,
        travellers: Number(travellers) || 1,
        message: message ? String(message).trim() : "",
        source: source ? String(source).trim() : "website",
        packageId: packageId ? String(packageId) : null,
        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully.",
        enquiry: {
          id: enquiry.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ENQUIRY CREATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your enquiry.",
      },
      { status: 500 }
    );
  }
}