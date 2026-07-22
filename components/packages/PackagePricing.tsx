interface PackagePricingProps {
  pkg: {
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
  price == null ? "-" : `₹${price.toLocaleString("en-IN")}`;

export default function PackagePricing({
  pkg,
}: PackagePricingProps) {
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
    <section className="rounded-xl bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Package Pricing
      </h2>

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
                    ? "border-b"
                    : ""
                }
              >
                <td className="px-4 py-3">
                  {label}
                </td>

                <td className="px-4 py-3 text-right font-medium">
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