interface PackagePricingProps {
  pkg: {
    category?: string | null;

    price: number;

    quadPrice: number | null;
    triplePrice: number | null;
    doublePrice: number | null;
    singlePrice: number | null;

    childBedPrice: number | null;
    childNoBedPrice: number | null;
    infantPrice: number | null;
  };
}

const formatPrice = (price: number | null) =>
  price == null
    ? "-"
    : `AED ${price.toLocaleString("en-AE")}`;

export default function PackagePricing({
  pkg,
}: PackagePricingProps) {
  const isHoliday = pkg.category === "HOLIDAY";

  /*
   * HOLIDAY PRICING
   *
   * Example:
   * Azerbaijan Relaxation Holiday
   * AED 2,499
   */
  if (isHoliday) {
    return (
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
            Holiday Package
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Package Price
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Package price per person.
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Starting From
              </p>

              <p className="mt-1 text-4xl font-bold text-emerald-700">
                {formatPrice(pkg.price)}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Per Person
              </p>
            </div>

            <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
              <p className="text-sm text-gray-500">
                Package Type
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                International Holiday
              </p>
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm text-gray-500">
          Final availability and pricing are subject to confirmation at
          the time of booking.
        </p>
      </section>
    );
  }

  /*
   * UMRAH PRICING
   */

  const rows = [
    ["Starting From", pkg.price],
    ["Quad Sharing", pkg.quadPrice],
    ["Triple Sharing", pkg.triplePrice],
    ["Double Sharing", pkg.doublePrice],
    ["Single Sharing", pkg.singlePrice],
    ["Child With Bed", pkg.childBedPrice],
    ["Child Without Bed", pkg.childNoBedPrice],
    ["Infant", pkg.infantPrice],
  ];

  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
          Umrah Package
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Package Pricing
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Prices are per person and shown in AED.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden rounded-lg border border-gray-200">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">
                Room Type
              </th>

              <th className="px-4 py-3 text-right">
                Price
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(([label, value], index) => (
              <tr
                key={label}
                className={
                  index !== rows.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }
              >
                <td className="px-4 py-3 text-gray-700">
                  {label}
                </td>

                <td className="px-4 py-3 text-right font-semibold text-gray-900">
                  {formatPrice(value as number | null)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}