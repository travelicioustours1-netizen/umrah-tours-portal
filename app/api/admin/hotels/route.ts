import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany({
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(hotels);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch hotels.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const hotel = await prisma.hotel.create({
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
          body.active === undefined ? true : body.active,
      },
    });

    return NextResponse.json(hotel);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create hotel",
      },
      {
        status: 500,
      }
    );
  }
}