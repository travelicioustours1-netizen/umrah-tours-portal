interface Props {
  initialData?: any;
  hotels: {
    id: string;
    name: string;
    city: string;
  }[];
}

export default function HotelSection({
  initialData,
  hotels,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Hotel Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">
            Makkah Hotel
          </label>

          <select
            name="hotelMakkahId"
            defaultValue={initialData?.hotelMakkahId ?? ""}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Makkah Hotel</option>

            {hotels
              .filter((hotel) => hotel.city === "Makkah")
              .map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Madinah Hotel
          </label>

          <select
            name="hotelMadinahId"
            defaultValue={initialData?.hotelMadinahId ?? ""}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Madinah Hotel</option>

            {hotels
              .filter((hotel) => hotel.city === "Madinah")
              .map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Makkah Nights
          </label>

          <input
            type="number"
            name="makkahNights"
            defaultValue={initialData?.makkahNights ?? 0}
            className="w-full border rounded-lg p-3"
            min={0}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Madinah Nights
          </label>

          <input
            type="number"
            name="madinahNights"
            defaultValue={initialData?.madinahNights ?? 0}
            className="w-full border rounded-lg p-3"
            min={0}
          />
        </div>
      </div>
    </div>
  );
}