"use client";

import { useState } from "react";
import { createHotel, updateHotel } from "@/lib/actions/hotel";

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
  const [thumbnail, setThumbnail] = useState(
    initialData?.thumbnail ?? ""
  );

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const action = initialData
    ? updateHotel.bind(null, initialData.id)
    : createHotel;

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "hotel-images");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed.");
      }

      setThumbnail(result.url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={action} className="space-y-5">

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

      {/* Hotel Image */}
      <div className="space-y-3 rounded-lg border p-4">

        <label className="block font-semibold">
          Hotel Image
        </label>

        {thumbnail && (
          <div className="overflow-hidden rounded-lg border">
            <img
              src={thumbnail}
              alt="Hotel preview"
              className="h-48 w-full object-cover"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="w-full rounded border p-3"
        />

        {uploading && (
          <p className="text-sm text-blue-600">
            Uploading image...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <input
          type="hidden"
          name="thumbnail"
          value={thumbnail}
          readOnly
        />

        {thumbnail && (
          <p className="break-all text-xs text-gray-500">
            {thumbnail}
          </p>
        )}

      </div>

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
        disabled={uploading}
        className="rounded bg-green-600 px-6 py-3 text-white disabled:opacity-50"
      >
        {uploading
          ? "Uploading..."
          : initialData
            ? "Update Hotel"
            : "Create Hotel"}
      </button>

    </form>
  );
}
