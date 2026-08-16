interface Props {
  initialData?: {
    category?: string | null;

    price?: number;

    // Umrah pricing
    quadPrice?: number | null;
    triplePrice?: number | null;
    doublePrice?: number | null;
    singlePrice?: number | null;
    childBedPrice?: number | null;
    childNoBedPrice?: number | null;
    infantPrice?: number | null;

    // Holiday hotel-category pricing
    hotel3Price?: number | null;
    hotel4Price?: number | null;
    hotel5Price?: number | null;
  };
}

export default function PricingSection({
  initialData,
}: Props) {
  const isHoliday = initialData?.category === "HOLIDAY";

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Pricing
      </h2>

      {/* Base Price */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          Base Price (AED)
        </label>

        <input
          type="number"
          name="price"
          min="0"
          step="0.01"
          placeholder="2499"
          defaultValue={initialData?.price ?? ""}
          className="w-full rounded-lg border p-3"
        />

        <p className="mt-1 text-xs text-gray-500">
          Main advertised package price.
        </p>
      </div>

      {/* Holiday Pricing */}
      <div className="mb-8 rounded-lg border bg-gray-50 p-5">
        <h3 className="mb-4 text-lg font-semibold">
          Holiday Hotel Category Pricing
        </h3>

        <p className="mb-5 text-sm text-gray-600">
          Use these fields for holiday packages such as Azerbaijan,
          Georgia, Dubai and international holidays.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* 3 Star */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              3★ Hotel Price (AED)
            </label>

            <input
              type="number"
              name="hotel3Price"
              min="0"
              step="0.01"
              placeholder="3★ price"
              defaultValue={initialData?.hotel3Price ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* 4 Star */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              4★ Hotel Price (AED)
            </label>

            <input
              type="number"
              name="hotel4Price"
              min="0"
              step="0.01"
              placeholder="4★ price"
              defaultValue={initialData?.hotel4Price ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* 5 Star */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              5★ Hotel Price (AED)
            </label>

            <input
              type="number"
              name="hotel5Price"
              min="0"
              step="0.01"
              placeholder="5★ price"
              defaultValue={initialData?.hotel5Price ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>
      </div>

      {/* Umrah Pricing */}
      <div className="rounded-lg border bg-gray-50 p-5">
        <h3 className="mb-4 text-lg font-semibold">
          Umrah Room Pricing
        </h3>

        <p className="mb-5 text-sm text-gray-600">
          These fields are used for Umrah packages with room occupancy
          pricing.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Quad */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Quad Price (AED)
            </label>

            <input
              type="number"
              name="quadPrice"
              min="0"
              step="0.01"
              placeholder="Quad Price"
              defaultValue={initialData?.quadPrice ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Triple */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Triple Price (AED)
            </label>

            <input
              type="number"
              name="triplePrice"
              min="0"
              step="0.01"
              placeholder="Triple Price"
              defaultValue={initialData?.triplePrice ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Double */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Double Price (AED)
            </label>

            <input
              type="number"
              name="doublePrice"
              min="0"
              step="0.01"
              placeholder="Double Price"
              defaultValue={initialData?.doublePrice ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Single */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Single Price (AED)
            </label>

            <input
              type="number"
              name="singlePrice"
              min="0"
              step="0.01"
              placeholder="Single Price"
              defaultValue={initialData?.singlePrice ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Child with bed */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Child With Bed (AED)
            </label>

            <input
              type="number"
              name="childBedPrice"
              min="0"
              step="0.01"
              placeholder="Child With Bed"
              defaultValue={initialData?.childBedPrice ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Child without bed */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Child Without Bed (AED)
            </label>

            <input
              type="number"
              name="childNoBedPrice"
              min="0"
              step="0.01"
              placeholder="Child Without Bed"
              defaultValue={initialData?.childNoBedPrice ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Infant */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Infant Price (AED)
            </label>

            <input
              type="number"
              name="infantPrice"
              min="0"
              step="0.01"
              placeholder="Infant Price"
              defaultValue={initialData?.infantPrice ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}