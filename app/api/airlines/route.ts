import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// GET ALL AIRLINES
export async function GET() {
  try {
    const airlines = await prisma.airline.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            packages: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      airlines,
    });

  } catch (error) {
    console.error("GET airlines error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch airlines",
      },
      {
        status: 500,
      }
    );
  }
}


// CREATE AIRLINE
export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const {
      name,
      code,
      logo,
    } = body;


    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Airline name is required",
        },
        {
          status: 400,
        }
      );
    }


    const airline = await prisma.airline.create({
      data: {
        name,
        code: code || null,
        logo: logo || null,
      },
    });


    return NextResponse.json(
      {
        success: true,
        airline,
      },
      {
        status: 201,
      }
    );


  } catch (error) {
    console.error("POST airline error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create airline",
      },
      {
        status: 500,
      }
    );
  }
}