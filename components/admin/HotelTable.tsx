"use client";

import Link from "next/link";
import DeleteHotel from "@/components/admin/DeleteHotel";

interface Hotel {
  id: string;
  name: string;
  city: string;
  stars: number;
  distance: string | null;
  active: boolean;
}

export default function HotelTable({
  hotels,
}: {
  hotels: Hotel[];
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Hotel</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">Stars</th>
            <th className="p-3 text-left">Distance</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>

          {hotels.map((hotel) => (

            <tr
              key={hotel.id}
              className="border-t"
            >

              <td className="p-3">
                {hotel.name}
              </td>

              <td className="p-3">
                {hotel.city}
              </td>

              <td className="p-3">
                {"★".repeat(hotel.stars)}
              </td>

              <td className="p-3">
                {hotel.distance || "-"}
              </td>

              <td className="p-3">
                {hotel.active ? (
                  <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                    Active
                  </span>
                ) : (
                  <span className="rounded bg-red-100 px-2 py-1 text-red-700">
                    Inactive
                  </span>
                )}
              </td>

              <td className="space-x-3 p-3 text-right">

                <Link
                  href={`/dashboard/hotels/${hotel.id}/edit`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Link>

                <DeleteHotel id={hotel.id} />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}