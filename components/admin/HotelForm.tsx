"use client";

import {
  createHotel,
  updateHotel,
} from "@/lib/actions/hotel";

interface Hotel {
  id: string;
  name: string;
  city: string;
  stars: number;
  distance: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  thumbnail: string | null;
  active: boolean;
}

export default function HotelForm({
  initialData,
}: {
  initialData?: Hotel;
}) {
  const action = initialData
    ? updateHotel.bind(null, initialData.id)
    : createHotel;

  return (
    <form action={action} className="space-y-6">

      <input
        name="name"
        placeholder="Hotel Name"
        defaultValue={initialData?.name}
        className="w-full rounded border p-3"
        required
      />

      <input
        name="city"
        placeholder="City"
        defaultValue={initialData?.city}
        className="w-full rounded border p-3"
        required
      />

      <input
        type="number"
        name="stars"
        min="1"
        max="5"
        placeholder="Stars"
        defaultValue={initialData?.stars}
        className="w-full rounded border p-3"
        required
      />

      <input
        name="distance"
        placeholder="Distance from Haram"
        defaultValue={initialData?.distance ?? ""}
        className="w-full rounded border p-3"
      />

      <input
        name="address"
        placeholder="Address"
        defaultValue={initialData?.address ?? ""}
        className="w-full rounded border p-3"
      />

      <input
        name="phone"
        placeholder="Phone"
        defaultValue={initialData?.phone ?? ""}
        className="w-full rounded border p-3"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        defaultValue={initialData?.email ?? ""}
        className="w-full rounded border p-3"
      />

      <input
        name="website"
        placeholder="Website"
        defaultValue={initialData?.website ?? ""}
        className="w-full rounded border p-3"
      />

      <input
        name="thumbnail"
        placeholder="Thumbnail URL"
        defaultValue={initialData?.thumbnail ?? ""}
        className="w-full rounded border p-3"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="active"
          defaultChecked={initialData?.active ?? true}
        />
        Active
      </label>

      <button
        type="submit"
        className="rounded bg-green-600 px-6 py-3 text-white"
      >
        {initialData ? "Update Hotel" : "Create Hotel"}
      </button>

    </form>
  );
}