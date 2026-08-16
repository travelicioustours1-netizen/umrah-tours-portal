interface Props {
  initialData?: {
    category?: string | null;

    departureDate?: Date | string | null;
    returnDate?: Date | string | null;

    departureCity?: string | null;
    flightNumber?: string | null;

    makkahHotelId?: string | null;
    madinahHotelId?: string | null;

    makkahNights?: number | null;
    madinahNights?: number | null;
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
  const isHoliday =
    initialData?.category === "HOLIDAY";

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
            defaultValue={
              initialData?.departureCity ?? ""
            }
            placeholder="Sharjah"
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Flight */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Flight / Airline
          </label>

          <input
            name="flightNumber"
            defaultValue={
              initialData?.flightNumber ?? ""
            }
            placeholder="Air Arabia"
            className="w-full rounded-lg border p-3"
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
                ? new Date(
                    initialData.departureDate
                  )
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            className="w-full rounded-lg border p-3"
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
                ? new Date(
                    initialData.returnDate
                  )
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Hotel 1 */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            {isHoliday
              ? "Primary Destination Hotel"
              : "Makkah Hotel"}
          </label>

          <select
            name="makkahHotelId"
            defaultValue={
              initialData?.makkahHotelId ?? ""
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="">
              {isHoliday
                ? "Select Primary Hotel"
                : "Select Makkah Hotel"}
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

        {/* Hotel 2 */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            {isHoliday
              ? "Secondary Destination Hotel"
              : "Madinah Hotel"}
          </label>

          <select
            name="madinahHotelId"
            defaultValue={
              initialData?.madinahHotelId ?? ""
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="">
              {isHoliday
                ? "Select Secondary Hotel"
                : "Select Madinah Hotel"}
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

        {/* Nights */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            {isHoliday
              ? "Primary Destination Nights"
              : "Makkah Nights"}
          </label>

          <input
            type="number"
            name="makkahNights"
            min="0"
            defaultValue={
              initialData?.makkahNights ?? 0
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            {isHoliday
              ? "Secondary Destination Nights"
              : "Madinah Nights"}
          </label>

          <input
            type="number"
            name="madinahNights"
            min="0"
            defaultValue={
              initialData?.madinahNights ?? 0
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

      </div>

      {isHoliday && (
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-900">
            Holiday package
          </p>

          <p className="mt-1 text-sm text-blue-700">
            Use the two hotel fields for the destinations included
            in this holiday. For example, Azerbaijan can use Baku
            and Quba.
          </p>
        </div>
      )}
    </div>
  );
}