interface Props {
  initialData?: {
    departureDate?: Date | null;
    returnDate?: Date | null;
    departureCity?: string | null;
    flightNumber?: string | null;
    makkahHotelId?: string | null;
    madinahHotelId?: string | null;
  };

  hotels: {
    id: string;
    name: string;
  }[];
}

export default function TravelSection({
  initialData,
  hotels,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Travel Details
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Departure City */}
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

        {/* Flight Number */}
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

        {/* Departure Date */}
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

        {/* Return Date */}
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

        {/* Makkah Hotel */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Makkah Hotel
          </label>

          <select
            name="makkahHotelId"
            defaultValue={initialData?.makkahHotelId ?? ""}
            className="w-full rounded border p-3"
          >
            <option value="">
              Select Makkah Hotel
            </option>

            {hotels.map((hotel) => (
              <option
                key={hotel.id}
                value={hotel.id}
              >
                {hotel.name}
              </option>
            ))}
          </select>
        </div>

        {/* Madinah Hotel */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Madinah Hotel
          </label>

          <select
            name="madinahHotelId"
            defaultValue={initialData?.madinahHotelId ?? ""}
            className="w-full rounded border p-3"
          >
            <option value="">
              Select Madinah Hotel
            </option>

            {hotels.map((hotel) => (
              <option
                key={hotel.id}
                value={hotel.id}
              >
                {hotel.name}
              </option>
            ))}
          </select>
        </div>

      </div>

    </div>
  );
}