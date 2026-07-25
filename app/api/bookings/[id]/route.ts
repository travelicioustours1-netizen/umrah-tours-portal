import { NextResponse } from "next/server";
import { getBooking } from "@/lib/services/booking.service";


export async function GET(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  const { id } = await context.params;


  const booking = await getBooking(id);


  if (!booking) {
    return NextResponse.json(
      {
        error: "Booking not found",
      },
      {
        status: 404,
      }
    );
  }


  return NextResponse.json(booking);
}