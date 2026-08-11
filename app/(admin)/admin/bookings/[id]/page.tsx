import Link from "next/link";
import { notFound } from "next/navigation";

import DetailRow from "@/components/admin/common/DetailRow";
import AdminCard from "@/components/admin/common/AdminCard";
import StatusBadge from "@/components/admin/bookings/StatusBadge";
import PaymentBadge from "@/components/admin/bookings/PaymentBadge";
import BookingActions from "@/components/admin/bookings/BookingActions";

import { getBookingById } from "@/lib/services/booking.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookingDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const booking = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  const paymentPageUrl =
    "/admin/bookings/" + booking.id + "/payment";

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-8">

      {/* Header */}

      <div className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">

        <div>

          <Link
            href="/admin/bookings"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Bookings
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Booking #{booking.bookingNumber}
          </h1>

          <p className="mt-2 text-lg text-gray-600">
            {booking.package.title}
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Created on{" "}
            {booking.createdAt.toLocaleDateString()}
          </p>

        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={booking.status} />
          <PaymentBadge status={booking.paymentStatus} />
        </div>

      </div>


      {/* Information Cards */}

      <div className="grid gap-6 lg:grid-cols-2">


        {/* Booking Information */}

        <AdminCard title="Booking Information">

          <DetailRow
            label="Booking Number"
            value={booking.bookingNumber}
          />

          <DetailRow
            label="Status"
            value={booking.status}
          />

          <DetailRow
            label="Payment"
            value={booking.paymentStatus}
          />

          <DetailRow
            label="Created"
            value={booking.createdAt.toLocaleDateString()}
          />

          <DetailRow
            label="Updated"
            value={booking.updatedAt.toLocaleDateString()}
          />

        </AdminCard>


        {/* Customer Details */}

        <AdminCard title="Customer Details">

          <DetailRow
            label="Name"
            value={booking.customerName}
          />

          <DetailRow
            label="Email"
            value={booking.email}
          />

          <DetailRow
            label="Phone"
            value={booking.phone}
          />

        </AdminCard>


        {/* Package Details */}

        <AdminCard title="Package Details">

          <DetailRow
            label="Package"
            value={booking.package.title}
          />

          <DetailRow
            label="Travel Date"
            value={
              booking.travelDate
                ? booking.travelDate.toLocaleDateString()
                : "N/A"
            }
          />

          <DetailRow
            label="Total Amount"
            value={booking.totalAmount.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          />

        </AdminCard>


        {/* Passenger Summary */}

        <AdminCard title="Passenger Summary">

          <DetailRow
            label="Adults"
            value={booking.adults}
          />

          <DetailRow
            label="Children"
            value={booking.children}
          />

          <DetailRow
            label="Infants"
            value={booking.infants}
          />

        </AdminCard>


        {/* Payment Summary */}

        <AdminCard title="Payment Summary">

          <DetailRow
            label="Total Amount"
            value={booking.totalAmount.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          />

          <DetailRow
            label="Payment Status"
            value={booking.paymentStatus}
          />

          <DetailRow
            label="Payments Recorded"
            value={booking.payments.length}
          />

        </AdminCard>


        {/* Payment History */}

        <AdminCard title="Payment History">

          {booking.payments.length === 0 ? (

            <p className="text-gray-500">
              No payments recorded.
            </p>

          ) : (

            <table className="w-full text-sm">

              <thead>

                <tr className="border-b">

                  <th className="py-2 text-left">
                    Date
                  </th>

                  <th className="text-left">
                    Method
                  </th>

                  <th className="text-right">
                    Amount
                  </th>

                </tr>

              </thead>

              <tbody>

                {booking.payments.map((payment) => (

                  <tr
                    key={payment.id}
                    className="border-b"
                  >

                    <td className="py-3">
                      {payment.createdAt.toLocaleDateString()}
                    </td>

                    <td>
                      {payment.provider}
                    </td>

                    <td className="text-right font-semibold">
                      {payment.amount.toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "USD",
                        }
                      )}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </AdminCard>


        {/* Booking Actions */}

        <AdminCard title="Booking Actions">

          <BookingActions
            bookingId={booking.id}
          />

          <div className="mt-4">

            <Link
              href={paymentPageUrl}
              className="inline-flex rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
            >
              Add Payment
            </Link>

          </div>

        </AdminCard>

      </div>

    </div>
  );
}
