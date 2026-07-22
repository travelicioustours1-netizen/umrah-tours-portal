"use client";

import Link from "next/link";
import DeletePackage from "@/components/admin/DeletePackage";

interface PackageRow {
  id: string;
  packageCode: string | null;
  title: string;
  airline: string;
  makkahHotel: string;
  madinahHotel: string;
  duration: string;
  departureCity: string;
  price: number;
  quadPrice: number | null;
  triplePrice: number | null;
  doublePrice: number | null;
  singlePrice: number | null;
  status: string;
  featured: boolean;
  createdAt: Date;
}

export default function PackageTable({
  packages,
}: {
  packages: PackageRow[];
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">Code</th>

            <th className="px-4 py-3 text-left">
              Package
            </th>

            <th className="px-4 py-3 text-left">
              Airline
            </th>

            <th className="px-4 py-3 text-left">
              Makkah Hotel
            </th>

            <th className="px-4 py-3 text-left">
              Madinah Hotel
            </th>

            <th className="px-4 py-3 text-center">
              Duration
            </th>

            <th className="px-4 py-3 text-center">
              Departure
            </th>

            <th className="px-4 py-3 text-right">
              Base
            </th>

            <th className="px-4 py-3 text-right">
              Quad
            </th>

            <th className="px-4 py-3 text-center">
              Status
            </th>

            <th className="px-4 py-3 text-center">
              Featured
            </th>

            <th className="px-4 py-3 text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {packages.length === 0 ? (

            <tr>

              <td
                colSpan={12}
                className="py-10 text-center text-gray-500"
              >
                No packages found.
              </td>

            </tr>

          ) : (

            packages.map((pkg) => (

              <tr
                key={pkg.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-4 py-3 font-medium">
                  {pkg.packageCode || "-"}
                </td>

                <td className="px-4 py-3">
                  {pkg.title}
                </td>

                <td className="px-4 py-3">
                  {pkg.airline}
                </td>

                <td className="px-4 py-3">
                  {pkg.makkahHotel}
                </td>

                <td className="px-4 py-3">
                  {pkg.madinahHotel}
                </td>

                <td className="px-4 py-3 text-center">
                  {pkg.duration}
                </td>

                <td className="px-4 py-3 text-center">
                  {pkg.departureCity}
                </td>

                <td className="px-4 py-3 text-right">
                  ₹{pkg.price.toLocaleString()}
                </td>

                <td className="px-4 py-3 text-right">
                  {pkg.quadPrice
                    ? `₹${pkg.quadPrice.toLocaleString()}`
                    : "-"}
                </td>

                <td className="px-4 py-3 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      pkg.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : pkg.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-700"
                        : pkg.status === "SOLD_OUT"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {pkg.status}
                  </span>

                </td>

                <td className="px-4 py-3 text-center">

                  {pkg.featured ? (
                    <span className="text-yellow-500">
                      ⭐
                    </span>
                  ) : (
                    "-"
                  )}

                </td>

                <td className="space-x-3 px-4 py-3 text-right">

                  <Link
                    href={`/dashboard/packages/${pkg.id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>

                  <DeletePackage id={pkg.id} />

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}