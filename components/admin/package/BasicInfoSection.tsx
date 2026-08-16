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
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
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
          <label className="mb-2 block font-medium">
            Slug
          </label>

          <input
            type="text"
            name="slug"
            defaultValue={initialData?.slug ?? ""}
            className="w-full rounded-lg border p-3"
            placeholder="dubai-holiday-package"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Duration
          </label>

          <input
            type="text"
            name="duration"
            defaultValue={initialData?.duration ?? ""}
            className="w-full rounded-lg border p-3"
            placeholder="5 Days / 4 Nights"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            name="category"
            defaultValue={initialData?.category ?? ""}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Select Category</option>
            <option value="UMRAH">Umrah</option>
            <option value="HOLIDAY">Holiday</option>
            <option value="VISA">Visa</option>
            <option value="HOTEL">Hotel</option>
            <option value="FLIGHT">Flight</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Departure City
          </label>

          <input
            type="text"
            name="departureCity"
            defaultValue={initialData?.departureCity ?? ""}
            className="w-full rounded-lg border p-3"
            placeholder="Dubai"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
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
    </div>
  );
}
