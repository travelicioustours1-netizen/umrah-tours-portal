"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DeletePackage from "@/components/admin/DeletePackage";

interface PackageRow {
  id: string;
  packageCode: string | null;
  title: string;
  category: string;
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

  hotel3Price: number | null;
  hotel4Price: number | null;
  hotel5Price: number | null;

  status: string;
  featured: boolean;
  createdAt: Date;
}

function formatAED(value: number | null | undefined) {
  if (value === null || value === undefined || value === 0) {
    return "-";
  }

  return `AED ${value.toLocaleString("en-AE")}`;
}

function categoryLabel(category: string) {
  switch (category) {
    case "UMRAH":
      return "Umrah";

    case "HOLIDAY":
      return "Holiday";

    case "VISA":
      return "Visa";

    case "HOTEL":
      return "Hotel";

    case "FLIGHT":
      return "Flight";

    default:
      return category || "Other";
  }
}

function categoryClass(category: string) {
  switch (category) {
    case "UMRAH":
      return "bg-emerald-100 text-emerald-700";

    case "HOLIDAY":
      return "bg-blue-100 text-blue-700";

    case "VISA":
      return "bg-purple-100 text-purple-700";

    case "HOTEL":
      return "bg-orange-100 text-orange-700";

    case "FLIGHT":
      return "bg-cyan-100 text-cyan-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function PackageTable({
  packages,
}: {
  packages: PackageRow[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const filteredPackages = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return packages.filter((pkg) => {
      const matchesCategory =
        category === "ALL" || pkg.category === category;

      if (!matchesCategory) {
        return false;
      }

      if (!searchText) {
        return true;
      }

      return (
        pkg.title.toLowerCase().includes(searchText) ||
        (pkg.packageCode ?? "").toLowerCase().includes(searchText) ||
        pkg.category.toLowerCase().includes(searchText) ||
        pkg.departureCity.toLowerCase().includes(searchText) ||
        pkg.airline.toLowerCase().includes(searchText)
      );
    });
  }, [packages, search, category]);

  return (
    <div className="space-y-4">

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 md:flex-row">

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search package, code, city..."
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-500 md:flex-1"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-lg border px-4 py-3 outline-none focus:border-emerald-500"
        >
          <option value="ALL">
            All Categories
          </option>

          <option value="HOLIDAY">
            Holiday
          </option>

          <option value="UMRAH">
            Umrah
          </option>

          <option value="VISA">
            Visa
          </option>

          <option value="HOTEL">
            Hotel
          </option>

          <option value="FLIGHT">
            Flight
          </option>
        </select>

      </div>

      {/* Result count */}
      <div className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-700">
          {filteredPackages.length}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-700">
          {packages.length}
        </span>{" "}
        packages
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-[1400px]">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Code
              </th>

              <th className="px-4 py-3 text-left">
                Package
              </th>

              <th className="px-4 py-3 text-center">
                Category
              </th>

              <th className="px-4 py-3 text-left">
                Airline
              </th>

              <th className="px-4 py-3 text-left">
                Hotel
              </th>

              <th className="px-4 py-3 text-center">
                Duration
              </th>

              <th className="px-4 py-3 text-center">
                Departure
              </th>

              <th className="px-4 py-3 text-right">
                Base Price
              </th>

              <th className="px-4 py-3 text-right">
                Holiday 3★
              </th>

              <th className="px-4 py-3 text-right">
                Holiday 4★
              </th>

              <th className="px-4 py-3 text-right">
                Holiday 5★
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

            {filteredPackages.length === 0 ? (

              <tr>

                <td
                  colSpan={15}
                  className="py-12 text-center"
                >

                  <div className="text-lg font-semibold text-gray-700">
                    No packages found
                  </div>

                  <div className="mt-1 text-sm text-gray-500">
                    Try another search or category.
                  </div>

                </td>

              </tr>

            ) : (

              filteredPackages.map((pkg) => (

                <tr
                  key={pkg.id}
                  className="border-t hover:bg-gray-50"
                >

                  {/* Code */}
                  <td className="px-4 py-3 font-medium">
                    {pkg.packageCode || "-"}
                  </td>

                  {/* Package */}
                  <td className="px-4 py-3">

                    <div className="font-semibold text-gray-900">
                      {pkg.title}
                    </div>

                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-center">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${categoryClass(
                        pkg.category
                      )}`}
                    >
                      {categoryLabel(pkg.category)}
                    </span>

                  </td>

                  {/* Airline */}
                  <td className="px-4 py-3">
                    {pkg.airline}
                  </td>

                  {/* Hotel */}
                  <td className="px-4 py-3">

                    {pkg.category === "HOLIDAY" ? (

                      <div className="space-y-1 text-sm">

                        <div>
                          {pkg.hotel3Price ? "3★ available" : ""}
                        </div>

                        <div>
                          {pkg.hotel4Price ? "4★ available" : ""}
                        </div>

                        <div>
                          {pkg.hotel5Price ? "5★ available" : ""}
                        </div>

                        {!pkg.hotel3Price &&
                          !pkg.hotel4Price &&
                          !pkg.hotel5Price && (
                            <span className="text-gray-400">
                              Hotel category in itinerary
                            </span>
                          )}

                      </div>

                    ) : (

                      <div className="space-y-1 text-sm">

                        {pkg.makkahHotel !== "-" && (
                          <div>
                            Makkah: {pkg.makkahHotel}
                          </div>
                        )}

                        {pkg.madinahHotel !== "-" && (
                          <div>
                            Madinah: {pkg.madinahHotel}
                          </div>
                        )}

                        {pkg.makkahHotel === "-" &&
                          pkg.madinahHotel === "-" && (
                            <span className="text-gray-400">
                              -
                            </span>
                          )}

                      </div>

                    )}

                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3 text-center">
                    {pkg.duration}
                  </td>

                  {/* Departure */}
                  <td className="px-4 py-3 text-center">
                    {pkg.departureCity}
                  </td>

                  {/* Base */}
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatAED(pkg.price)}
                  </td>

                  {/* 3 Star */}
                  <td className="px-4 py-3 text-right">
                    {formatAED(pkg.hotel3Price)}
                  </td>

                  {/* 4 Star */}
                  <td className="px-4 py-3 text-right">
                    {formatAED(pkg.hotel4Price)}
                  </td>

                  {/* 5 Star */}
                  <td className="px-4 py-3 text-right">
                    {formatAED(pkg.hotel5Price)}
                  </td>

                  {/* Status */}
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

                  {/* Featured */}
                  <td className="px-4 py-3 text-center">

                    {pkg.featured ? (
                      <span className="text-yellow-500">
                        ★
                      </span>
                    ) : (
                      <span className="text-gray-300">
                        ☆
                      </span>
                    )}

                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">

                    <div className="flex items-center justify-end gap-2">

                      <Link
                        href={`/dashboard/packages/${pkg.id}/edit`}
                        className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
                      >
                        Edit
                      </Link>

                      <DeletePackage id={pkg.id} />

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}