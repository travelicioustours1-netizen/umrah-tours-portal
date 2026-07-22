import { notFound } from "next/navigation";

import { getBooking } from "@/lib/booking-service";

import CustomerCard from "@/components/bookings/CustomerCard";
import PackageCard from "@/components/bookings/PackageCard";
import BookingInfo from "@/components/bookings/BookingInfo";
import BookingActions from "@/components/bookings/BookingActions";
import BookingStatusBadge from "@/components/bookings/BookingStatusBadge";
import PaymentStatusBadge from "@/components/bookings/PaymentStatusBadge";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookingDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const booking = await getBooking(id);

  if (!booking) {
    notFound();
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            {booking.bookingNumber}
          </h1>

          <p className="mt-2 text-gray-500">
            Booking Details
          </p>
        </div>

        <div className="flex gap-3">
          <BookingStatusBadge
            status={booking.status}
          />

          <PaymentStatusBadge
            status={booking.paymentStatus}
          />
        </div>

      </div>

      {/* Content */}

      <div className="grid gap-8 lg:grid-cols-2">

        <CustomerCard booking={booking} />

        <PackageCard booking={booking} />

        <BookingInfo booking={booking} />

        <BookingActions
          bookingId={booking.id}
        />

      </div>

    </div>
  );
}