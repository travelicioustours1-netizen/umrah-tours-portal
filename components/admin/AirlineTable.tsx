"use client";

import Link from "next/link";
import DeleteAirline from "@/components/admin/DeleteAirline";

interface Airline {
  id: string;
  name: string;
  code: string | null;
  logo: string | null;
}

export default function AirlineTable({
  airlines,
}: {
  airlines: Airline[];
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Logo</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>

          {airlines.map((airline) => (
            <tr
              key={airline.id}
              className="border-t"
            >

              <td className="p-3">
                {airline.logo ? (
                  <img
                    src={airline.logo}
                    className="h-10 w-10 rounded object-cover"
                    alt={airline.name}
                  />
                ) : (
                  "-"
                )}
              </td>

              <td className="p-3">
                {airline.name}
              </td>

              <td className="p-3">
                {airline.code}
              </td>

              <td className="p-3 text-right space-x-3">

                <Link
                  href={`/dashboard/airlines/${airline.id}/edit`}
                  className="text-blue-600"
                >
                  Edit
                </Link>

                <DeleteAirline id={airline.id} />

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}