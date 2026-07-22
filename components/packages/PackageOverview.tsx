"use client";

import {
  Calendar,
  Clock3,
  MapPin,
  Plane,
} from "lucide-react";

interface Props {
  pkg: {
    duration: string;
    departureCity: string | null;
    departureDate: Date | string | null;
    description: string;
    airline: {
      name: string;
    } | null;
  };
}

export default function PackageOverview({ pkg }: Props) {
  return (
    <section className="rounded-xl bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Package Overview
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div className="flex items-center gap-3">
          <Clock3 className="text-emerald-600" />

          <div>
            <p className="text-sm text-gray-500">
              Duration
            </p>

            <p className="font-semibold">
              {pkg.duration}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="text-emerald-600" />

          <div>
            <p className="text-sm text-gray-500">
              Departure
            </p>

            <p className="font-semibold">
              {pkg.departureCity || "-"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="text-emerald-600" />

          <div>
            <p className="text-sm text-gray-500">
              Departure Date
            </p>

            <p className="font-semibold">
              {pkg.departureDate
                ? new Date(pkg.departureDate).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Plane className="text-emerald-600" />

          <div>
            <p className="text-sm text-gray-500">
              Airline
            </p>

            <p className="font-semibold">
              {pkg.airline?.name || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="prose mt-8 max-w-none">
        <p>{pkg.description}</p>
      </div>
    </section>
  );
}