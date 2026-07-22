import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}