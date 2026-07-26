export const dynamic = "force-dynamic";

import Link from "next/link";

import { getBookings } from "@/lib/booking-service";

import BookingStatusBadge from "@/components/bookings/BookingStatusBadge";
import PaymentStatusBadge from "@/components/bookings/PaymentStatusBadge";

export default async function BookingsPage() {
  try {
    const bookings = await getBookings();

    return (
      <>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Bookings
          </h1>

          <p className="text-gray-500">
            Manage customer bookings.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  Booking
                </th>

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Package
                </th>

                <th className="p-4 text-left">
                  Travel Date
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Payment
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">
                    <Link
                      href={`/dashboard/bookings/${booking.id}`}
                      className="font-semibold text-emerald-600"
                    >
                      {booking.bookingNumber}
                    </Link>
                  </td>

                  <td className="p-4">
                    {booking.customerName}
                  </td>

                  <td className="p-4">
                    {booking.package.title}
                  </td>

                  <td className="p-4">
                    {booking.travelDate
                      ? booking.travelDate.toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4">
                    <BookingStatusBadge
                      status={booking.status}
                    />
                  </td>

                  <td className="p-4">
                    <PaymentStatusBadge
                      status={booking.paymentStatus}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  } catch (error) {
    console.error(
      "BookingsPage Error:",
      error
    );

    throw error;
  }
}