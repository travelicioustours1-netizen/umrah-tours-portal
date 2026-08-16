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

  async function updateBooking(status: "CONFIRMED" | "CANCELLED") {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/bookings/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update booking"
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Booking status update error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to update booking."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        disabled={loading}
        onClick={() =>
          updateBooking("CONFIRMED")
        }
        className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Updating..."
          : "Confirm Booking"}
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={() =>
          updateBooking("CANCELLED")
        }
        className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Updating..."
          : "Cancel Booking"}
      </button>
    </div>
  );
}