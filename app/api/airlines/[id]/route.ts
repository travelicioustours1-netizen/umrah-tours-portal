import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}


// GET SINGLE AIRLINE
export async function GET(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const airline = await prisma.airline.findUnique({
      where: {
        id,
      },
    });

    if (!airline) {
      return NextResponse.json(
        {
          success: false,
          message: "Airline not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      airline,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}


// UPDATE AIRLINE
export async function PUT(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const airline = await prisma.airline.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        code: body.code || null,
        logo: body.logo || null,
      },
    });

    return NextResponse.json({
      success: true,
      airline,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}


// DELETE AIRLINE
export async function DELETE(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    await prisma.airline.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Airline deleted",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}