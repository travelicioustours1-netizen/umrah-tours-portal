import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const hotels = await prisma.hotel.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(hotels);
}