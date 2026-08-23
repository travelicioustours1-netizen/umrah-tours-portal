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
    <section className="relative z-20 mb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Find Your Perfect Journey
          </h2>

          <div className="grid gap-5 md:grid-cols-4">
            {/* Travel Type */}
            <select
              value={packageType}
              onChange={(event) =>
                setPackageType(event.target.value)
              }
              className="rounded-xl border px-5 py-4 text-gray-700 outline-none focus:border-emerald-600"
            >
              <option value="">
                Select Package
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

            {/* Destination */}
            <select
              value={destination}
              onChange={(event) =>
                setDestination(event.target.value)
              }
              className="rounded-xl border px-5 py-4 text-gray-700 outline-none focus:border-emerald-600"
            >
              <option value="">
                Destination
              </option>

              <option value="Makkah">
                Makkah
              </option>

              <option value="Madinah">
                Madinah
              </option>

              <option value="Dubai">
                Dubai
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

            {/* Date */}
            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
              className="rounded-xl border px-5 py-4 text-gray-700 outline-none focus:border-emerald-600"
            />

            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearch}
              className="flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Search Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}