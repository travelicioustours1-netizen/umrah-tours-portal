interface Props {
  initialData?: {
    price?: number;
    quadPrice?: number | null;
    triplePrice?: number | null;
    doublePrice?: number | null;
    singlePrice?: number | null;
    childBedPrice?: number | null;
    childNoBedPrice?: number | null;
    infantPrice?: number | null;
  };
}

export default function PricingSection({
  initialData,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Pricing
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <input
          type="number"
          name="price"
          placeholder="Base Price"
          defaultValue={initialData?.price}
          className="rounded border p-3"
        />

        <input
          type="number"
          name="quadPrice"
          placeholder="Quad Price"
          defaultValue={initialData?.quadPrice ?? ""}
          className="rounded border p-3"
        />

        <input
          type="number"
          name="triplePrice"
          placeholder="Triple Price"
          defaultValue={initialData?.triplePrice ?? ""}
          className="rounded border p-3"
        />

        <input
          type="number"
          name="doublePrice"
          placeholder="Double Price"
          defaultValue={initialData?.doublePrice ?? ""}
          className="rounded border p-3"
        />

        <input
          type="number"
          name="singlePrice"
          placeholder="Single Price"
          defaultValue={initialData?.singlePrice ?? ""}
          className="rounded border p-3"
        />

        <input
          type="number"
          name="childBedPrice"
          placeholder="Child With Bed"
          defaultValue={initialData?.childBedPrice ?? ""}
          className="rounded border p-3"
        />

        <input
          type="number"
          name="childNoBedPrice"
          placeholder="Child Without Bed"
          defaultValue={initialData?.childNoBedPrice ?? ""}
          className="rounded border p-3"
        />

        <input
          type="number"
          name="infantPrice"
          placeholder="Infant Price"
          defaultValue={initialData?.infantPrice ?? ""}
          className="rounded border p-3"
        />

      </div>

    </div>
  );
}