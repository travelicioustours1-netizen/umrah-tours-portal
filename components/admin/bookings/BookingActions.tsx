"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  bookingId: string;
}

export default function BookingActions({
  bookingId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function updateBooking(data: object) {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/admin/bookings/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Unable to update booking.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        disabled={loading}
        onClick={() =>
          updateBooking({
            status: "CONFIRMED",
          })
        }
        className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
      >
        Confirm Booking
      </button>

      <button
        disabled={loading}
        onClick={() =>
          updateBooking({
            status: "CANCELLED",
          })
        }
        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
      >
        Cancel Booking
      </button>

      <button
        disabled={loading}
        onClick={() =>
          updateBooking({
            paymentStatus: "PAID",
          })
        }
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        Mark Paid
      </button>

      <button
        disabled={loading}
        onClick={() =>
          updateBooking({
            paymentStatus: "PARTIAL",
          })
        }
        className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 disabled:opacity-50"
      >
        Partial Payment
      </button>
    </div>
  );
}