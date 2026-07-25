import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    bookingNumber: string;
  }>;
}

async function getBooking(bookingNumber: string) {
  return await prisma.booking.findUnique({
    where: {
      bookingNumber,
    },
    include: {
      package: {
        include: {
          airline: true,
          makkahHotel: true,
          madinahHotel: true,
        },
      },
    },
  });
}

export default async function BookingConfirmationPage({
  params,
}: PageProps) {
  const { bookingNumber } = await params;

  const booking = await getBooking(bookingNumber);

  if (!booking) {
    notFound();
  }


  return (
    <div className="min-h-screen bg-gray-50 py-12">

      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">

        {/* Header */}
        <div className="text-center">

          <div className="mb-4 text-5xl">
            ✅
          </div>

          <h1 className="text-3xl font-bold text-green-700">
            Booking Received Successfully
          </h1>

          <p className="mt-3 text-gray-600">
            Thank you for choosing Umrah Tours.
            Your booking request has been submitted.
          </p>

        </div>


        {/* Booking Number */}
        <div className="mt-8 rounded-lg bg-gray-100 p-5 text-center">

          <p className="text-sm text-gray-500">
            Booking Reference
          </p>

          <h2 className="text-2xl font-bold tracking-wide">
            {booking.bookingNumber}
          </h2>

        </div>



        {/* Customer Details */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold">
            Customer Details
          </h3>


          <div className="grid gap-4 md:grid-cols-2">

            <Info
              label="Name"
              value={booking.customerName}
            />

            <Info
              label="Email"
              value={booking.email}
            />

            <Info
              label="Phone"
              value={booking.phone}
            />

            <Info
              label="Travel Date"
              value={
                booking.travelDate
                  ? new Date(
                      booking.travelDate
                    ).toDateString()
                  : "Not selected"
              }
            />

          </div>

        </section>



        {/* Package Details */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold">
            Package Details
          </h3>


          <div className="rounded-lg border p-5">

            <h4 className="text-lg font-bold">
              {booking.package.title}
            </h4>


            <p className="mt-2 text-gray-600">
              Duration:
              {" "}
              {booking.package.duration}
            </p>


            {booking.package.airline && (
              <p className="text-gray-600">
                Airline:
                {" "}
                {booking.package.airline.name}
              </p>
            )}


            {booking.package.makkahHotel && (
              <p className="text-gray-600">
                Makkah Hotel:
                {" "}
                {booking.package.makkahHotel.name}
              </p>
            )}


            {booking.package.madinahHotel && (
              <p className="text-gray-600">
                Madinah Hotel:
                {" "}
                {booking.package.madinahHotel.name}
              </p>
            )}

          </div>

        </section>



        {/* Payment */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold">
            Payment Status
          </h3>


          <div className="rounded-lg bg-yellow-50 p-5">

            <p>
              Status:
              {" "}
              <span className="font-bold">
                {booking.paymentStatus}
              </span>
            </p>


            <p className="mt-2 text-sm text-gray-600">
              Payment will be completed securely after
              confirmation of availability.
            </p>


          </div>


        </section>




        {/* Actions */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row">


          <Link
            href={`/payment/${booking.bookingNumber}`}
            className="rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white hover:bg-green-700"
          >
            Proceed To Payment
          </Link>



          <a
            href={`https://wa.me/917977127500?text=Hello%20Umrah%20Tours,%20my%20booking%20reference%20is%20${booking.bookingNumber}`}
            target="_blank"
            className="rounded-lg border border-green-600 px-6 py-3 text-center font-semibold text-green-700 hover:bg-green-50"
          >
            Contact WhatsApp
          </a>


        </div>


      </div>

    </div>
  );
}



function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (
    <div className="rounded-lg border p-4">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-medium">
        {value}
      </p>

    </div>
  );
}