import Link from "next/link";

import {
  getBookings,
} from "@/lib/booking-service";

import BookingStatusBadge from "@/components/bookings/BookingStatusBadge";
import PaymentStatusBadge from "@/components/bookings/PaymentStatusBadge";

// This page requires the database at request time.
// Prevent Next.js from trying to prerender it during `next build`.
export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="space-y-8">

      {/* =========================================================
          PAGE HEADER
      ========================================================== */}
      <div>
        <h1 className="text-3xl font-bold">
          Bookings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage customer bookings.
        </p>
      </div>


      {/* =========================================================
          BOOKINGS TABLE
      ========================================================== */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

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
                    className="border-t transition hover:bg-gray-50"
                  >

                    {/* Booking Number */}
                    <td className="px-6 py-4">

                      <Link
                        href={`/dashboard/bookings/${booking.id}`}
                        className="font-semibold text-emerald-600 hover:underline"
                      >
                        {booking.bookingNumber}
                      </Link>

                    </td>


                    {/* Customer */}
                    <td className="px-6 py-4">
                      {booking.customerName}
                    </td>


                    {/* Package */}
                    <td className="px-6 py-4">
                      {booking.package?.title ?? "-"}
                    </td>


                    {/* Travel Date */}
                    <td className="px-6 py-4">

                      {booking.travelDate
                        ? new Date(
                            booking.travelDate
                          ).toLocaleDateString("en-IN")
                        : "-"}

                    </td>


                    {/* Booking Status */}
                    <td className="px-6 py-4">

                      <BookingStatusBadge
                        status={booking.status}
                      />

                    </td>


                    {/* Payment Status */}
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

    </div>
  );
}