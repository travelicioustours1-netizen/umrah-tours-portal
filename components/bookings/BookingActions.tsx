"use client";

import { useTransition } from "react";
import {
  updateBookingStatus,
  updatePaymentStatus,
} from "@/app/(admin)/dashboard/bookings/actions";

interface Props {
  bookingId: string;
}

export default function BookingActions({
  bookingId,
}: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Actions
      </h2>

      <div className="grid gap-3">

        <button
          disabled={pending}
          onClick={() =>
            startTransition(() =>
              updateBookingStatus(
                bookingId,
                "CONFIRMED"
              )
            )
          }
          className="rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50"
        >
          Confirm Booking
        </button>

        <button
          disabled={pending}
          onClick={() =>
            startTransition(() =>
              updateBookingStatus(
                bookingId,
                "CANCELLED"
              )
            )
          }
          className="rounded-lg bg-red-600 py-3 font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          Cancel Booking
        </button>

        <button
          disabled={pending}
          onClick={() =>
            startTransition(() =>
              updatePaymentStatus(
                bookingId,
                "PAID"
              )
            )
          }
          className="rounded-lg bg-emerald-600 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          Mark Paid
        </button>

        <button
          disabled={pending}
          onClick={() =>
            startTransition(() =>
              updatePaymentStatus(
                bookingId,
                "UNPAID"
              )
            )
          }
          className="rounded-lg border py-3 font-medium hover:bg-gray-100 disabled:opacity-50"
        >
          Mark Unpaid
        </button>

      </div>
    </div>
  );
}