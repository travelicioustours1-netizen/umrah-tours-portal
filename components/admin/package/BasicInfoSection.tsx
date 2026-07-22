import React from "react";

interface Props {
  initialData?: any;
  airlines: {
    id: string;
    name: string;
  }[];
}

export default function BasicInfoSection({
  initialData,
  airlines,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">
          Package Title
        </label>

        <input
          type="text"
          name="title"
          defaultValue={initialData?.title ?? ""}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Slug
        </label>

        <input
          type="text"
          name="slug"
          defaultValue={initialData?.slug ?? ""}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Duration
        </label>

        <input
          type="text"
          name="duration"
          defaultValue={initialData?.duration ?? ""}
          className="w-full rounded-lg border p-3"
          placeholder="7 Days"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Category
        </label>

        <input
          type="text"
          name="category"
          defaultValue={initialData?.category ?? ""}
          className="w-full rounded-lg border p-3"
          placeholder="Economy / Deluxe / Premium"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Departure City
        </label>

        <input
          type="text"
          name="departureCity"
          defaultValue={initialData?.departureCity ?? ""}
          className="w-full rounded-lg border p-3"
          placeholder="Delhi"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">
          Airline
        </label>

        <select
          name="airlineId"
          defaultValue={initialData?.airlineId ?? ""}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select Airline</option>

          {airlines.map((airline) => (
            <option key={airline.id} value={airline.id}>
              {airline.name}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}