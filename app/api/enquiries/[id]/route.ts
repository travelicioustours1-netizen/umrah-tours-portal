import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ALLOWED_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "QUOTE_SENT",
  "FOLLOW_UP",
  "WON",
  "LOST",
] as const;

type EnquiryStatusValue = (typeof ALLOWED_STATUSES)[number];

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const rawBody = await req.text();

    if (!rawBody.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Request body is empty.",
        },
        { status: 400 }
      );
    }

    let body: {
      status?: string;
      assignedTo?: string | null;
      estimatedValue?: number | null;
      nextFollowUpAt?: string | null;
      lostReason?: string | null;
    };

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON request body.",
        },
        { status: 400 }
      );
    }

    /*
     * STATUS UPDATE
     */
    if (body.status !== undefined) {
      const status = body.status as EnquiryStatusValue;

      if (!ALLOWED_STATUSES.includes(status)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid enquiry status.",
          },
          { status: 400 }
        );
      }

      const existingEnquiry =
        await prisma.enquiry.findUnique({
          where: {
            id,
          },
          select: {
            id: true,
          },
        });

      if (!existingEnquiry) {
        return NextResponse.json(
          {
            success: false,
            message: "Enquiry not found.",
          },
          { status: 404 }
        );
      }

      const enquiry = await prisma.enquiry.update({
        where: {
          id,
        },
        data: {
          status,
        },
        select: {
          id: true,
          status: true,
          updatedAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Enquiry status updated successfully.",
        enquiry,
      });
    }

    /*
     * SALES INFORMATION UPDATE
     */
    const updateData: {
      assignedTo?: string | null;
      estimatedValue?: number | null;
      nextFollowUpAt?: Date | null;
      lostReason?: string | null;
    } = {};

    if (body.assignedTo !== undefined) {
      updateData.assignedTo = body.assignedTo
        ? String(body.assignedTo).trim()
        : null;
    }

    if (body.estimatedValue !== undefined) {
      updateData.estimatedValue =
        body.estimatedValue === null
          ? null
          : Number(body.estimatedValue);
    }

    if (body.nextFollowUpAt !== undefined) {
      updateData.nextFollowUpAt =
        body.nextFollowUpAt
          ? new Date(body.nextFollowUpAt)
          : null;
    }

    if (body.lostReason !== undefined) {
      updateData.lostReason = body.lostReason
        ? String(body.lostReason).trim()
        : null;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No enquiry fields were provided.",
        },
        { status: 400 }
      );
    }

    const existingEnquiry =
      await prisma.enquiry.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });

    if (!existingEnquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Enquiry not found.",
        },
        { status: 404 }
      );
    }

    const enquiry = await prisma.enquiry.update({
      where: {
        id,
      },
      data: updateData,
      select: {
        id: true,
        assignedTo: true,
        estimatedValue: true,
        nextFollowUpAt: true,
        lostReason: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Sales information updated successfully.",
      enquiry,
    });
  } catch (error) {
    console.error(
      "ENQUIRY STATUS UPDATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update enquiry.",
      },
      { status: 500 }
    );
  }
}