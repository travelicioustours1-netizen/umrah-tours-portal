import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// GET HOTEL
export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const hotel = await prisma.hotel.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    if (!hotel) {
      return NextResponse.json(
        {
          success: false,
          message: "Hotel not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

// UPDATE HOTEL
export async function PUT(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const hotel = await prisma.hotel.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        city: body.city,
        stars: Number(body.stars),
        distance: body.distance || null,
        address: body.address || null,
        phone: body.phone || null,
        email: body.email || null,
        website: body.website || null,
        thumbnail: body.thumbnail || null,
        active:
          body.active === undefined
            ? true
            : Boolean(body.active),
      },
    });

    return NextResponse.json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update hotel",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE HOTEL
export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    await prisma.hotel.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete hotel",
      },
      {
        status: 500,
      }
    );
  }
}