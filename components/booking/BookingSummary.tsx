interface Props {
  pkg: any;
}

export default function BookingSummary({
  pkg,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Package Summary
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">
            Package
          </p>

          <p className="font-semibold">
            {pkg.title}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Duration
          </p>

          <p>{pkg.duration}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Departure
          </p>

          <p>{pkg.departureCity || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Airline
          </p>

          <p>{pkg.airline?.name || "-"}</p>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Starting From
          </p>

          <p className="text-3xl font-bold text-emerald-600">
            ₹{pkg.price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}