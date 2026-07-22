import Link from "next/link";

import {
  getBookings,
} from "@/lib/booking-service";

import BookingStatusBadge from "@/components/bookings/BookingStatusBadge";
import PaymentStatusBadge from "@/components/bookings/PaymentStatusBadge";

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Bookings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage customer bookings.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left">
                Booking No
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Package
              </th>

              <th className="px-6 py-4 text-left">
                Travel Date
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Payment
              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >
                  No bookings found.
                </td>

              </tr>

            ) : (

              bookings.map((booking) => (

                <tr
                  key={booking.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <Link
                      href={`/dashboard/bookings/${booking.id}`}
                      className="font-semibold text-emerald-600 hover:underline"
                    >
                      {booking.bookingNumber}
                    </Link>

                  </td>

                  <td className="px-6 py-4">
                    {booking.customerName}
                  </td>

                  <td className="px-6 py-4">
                    {booking.package.title}
                  </td>

                  <td className="px-6 py-4">
                    {booking.travelDate
                      ? new Date(
                          booking.travelDate
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  <td className="px-6 py-4">
                    <BookingStatusBadge
                      status={booking.status}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <PaymentStatusBadge
                      status={booking.paymentStatus}
                    />
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}