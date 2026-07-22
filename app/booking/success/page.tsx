interface SuccessPageProps {
  searchParams: Promise<{
    booking?: string;
  }>;
}

export default async function BookingSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { booking } = await searchParams;

  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      <div className="rounded-2xl border bg-white shadow-sm p-10 text-center">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <span className="text-4xl">✓</span>
        </div>

        <h1 className="text-3xl font-bold mb-4">
          Booking Submitted Successfully
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for your enquiry. Our travel consultant will contact you shortly.
        </p>

        {booking && (
          <div className="rounded-lg bg-emerald-50 p-5">
            <p className="text-sm text-gray-600">
              Booking Reference
            </p>

            <p className="text-2xl font-bold text-emerald-700">
              {booking}
            </p>
          </div>
        )}

      </div>
    </main>
  );
}