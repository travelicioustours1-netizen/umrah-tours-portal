"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();

  const [packageType, setPackageType] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  function handleSearch() {
    if (packageType === "UMRAH") {
      const params = new URLSearchParams();

      if (destination) {
        params.set("search", destination);
      }

      if (date) {
        params.set("date", date);
      }

      router.push(
        params.toString()
          ? `/umrah?${params.toString()}`
          : "/umrah"
      );

      return;
    }

    if (packageType === "HOLIDAY") {
      const params = new URLSearchParams();

      if (destination) {
        params.set("search", destination);
      }

      if (date) {
        params.set("date", date);
      }

      router.push(
        params.toString()
          ? `/holidays?${params.toString()}`
          : "/holidays"
      );

      return;
    }

    if (packageType === "VISA") {
      router.push("/visa");
      return;
    }

    router.push("/contact");
  }

  return (
    <section className="relative z-20 -mt-16 mb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

          {/* Heading */}
          <div className="border-b border-gray-100 px-6 py-6 text-center md:px-10">
            <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-600">
              Plan Your Journey
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
              Find Your Perfect Travel Experience
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-500 md:text-base">
              Search Umrah packages, international holidays and visa services.
            </p>
          </div>

          {/* Search Form */}
          <div className="p-5 md:p-8">
            <div className="grid gap-4 lg:grid-cols-4">

              {/* Travel Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Travel Type
                </label>

                <select
                  value={packageType}
                  onChange={(event) =>
                    setPackageType(event.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-gray-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">
                    Select a service
                  </option>

                  <option value="UMRAH">
                    Umrah Package
                  </option>

                  <option value="HOLIDAY">
                    Holiday Package
                  </option>

                  <option value="VISA">
                    Visa Service
                  </option>
                </select>
              </div>

              {/* Destination */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Destination
                </label>

                <select
                  value={destination}
                  onChange={(event) =>
                    setDestination(event.target.value)
                  }
                  disabled={packageType === "VISA"}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-gray-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="">
                    Select destination
                  </option>

                  <option value="Makkah">
                    Makkah
                  </option>

                  <option value="Madinah">
                    Madinah
                  </option>

                  <option value="Georgia">
                    Georgia
                  </option>

                  <option value="Azerbaijan">
                    Azerbaijan
                  </option>

                  <option value="Turkey">
                    Turkey
                  </option>

                  <option value="Kazakhstan">
                    Kazakhstan
                  </option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Preferred Travel Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(event) =>
                    setDate(event.target.value)
                  }
                  disabled={packageType === "VISA"}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-gray-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="w-full rounded-xl bg-emerald-600 px-5 py-4 font-semibold text-white transition duration-200 hover:bg-emerald-700 hover:shadow-lg"
                >
                  Search Packages
                </button>
              </div>

            </div>
          </div>

          {/* Quick Links */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <span className="font-medium text-gray-500">
                Popular:
              </span>

              <button
                type="button"
                onClick={() => router.push("/umrah")}
                className="font-semibold text-emerald-700 transition hover:text-emerald-900"
              >
                Umrah Packages
              </button>

              <button
                type="button"
                onClick={() => router.push("/holidays")}
                className="font-semibold text-emerald-700 transition hover:text-emerald-900"
              >
                International Holidays
              </button>

              <button
                type="button"
                onClick={() => router.push("/visa")}
                className="font-semibold text-emerald-700 transition hover:text-emerald-900"
              >
                Visa Services
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}