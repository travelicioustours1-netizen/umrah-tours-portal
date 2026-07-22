interface Props {
  initialData?: {
    departureDate?: Date | null;
    returnDate?: Date | null;
    departureCity?: string | null;
    flightNumber?: string | null;
  };
}

export default function TravelSection({ initialData }: Props) {
  return (
    <div className="rounded-xl border bg-white p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Travel Details
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Departure City
          </label>

          <input
            name="departureCity"
            defaultValue={initialData?.departureCity ?? ""}
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Flight Number
          </label>

          <input
            name="flightNumber"
            defaultValue={initialData?.flightNumber ?? ""}
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Departure Date
          </label>

          <input
            type="date"
            name="departureDate"
            defaultValue={
              initialData?.departureDate
                ? new Date(initialData.departureDate)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Return Date
          </label>

          <input
            type="date"
            name="returnDate"
            defaultValue={
              initialData?.returnDate
                ? new Date(initialData.returnDate)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            className="w-full rounded border p-3"
          />
        </div>

      </div>

    </div>
  );
}