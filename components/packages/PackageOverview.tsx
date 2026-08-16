"use client";

import {
  Calendar,
  Clock3,
  MapPin,
  Plane,
  Globe2,
} from "lucide-react";

interface Props {
  pkg: {
    title: string;
    duration: string;
    departureCity: string | null;
    departureDate: Date | string | null;
    description: string;
    airline: {
      name: string;
    } | null;
  };
}

function getDestination(title?: string | null) {
  if (!title) return "Holiday";

  return title
    .replace(/\brelaxation\b/gi, "")
    .replace(/\bholiday\b/gi, "")
    .replace(/\bpackage\b/gi, "")
    .replace(/\btour\b/gi, "")
    .replace(/\btravel\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function PackageOverview({ pkg }: Props) {
  const destination = getDestination(pkg.title);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
          Holiday Details
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
          {pkg.title}
        </h2>

        <p className="mt-2 text-gray-500">
          Everything you need for a comfortable international holiday.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          icon={<Globe2 size={21} />}
          label="Destination"
          value={destination}
        />

        <InfoCard
          icon={<Clock3 size={21} />}
          label="Duration"
          value={pkg.duration || "-"}
        />

        <InfoCard
          icon={<MapPin size={21} />}
          label="Departure"
          value={pkg.departureCity || "-"}
        />

        <InfoCard
          icon={<Calendar size={21} />}
          label="Travel Date"
          value={
            pkg.departureDate
              ? new Date(pkg.departureDate).toLocaleDateString("en-AE", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Flexible"
          }
        />
      </div>

      {pkg.airline?.name && (
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-gray-50 p-4">
          <Plane className="text-emerald-600" size={22} />

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Airline
            </p>

            <p className="font-semibold text-gray-900">
              {pkg.airline.name}
            </p>
          </div>
        </div>
      )}

      {pkg.description && (
        <div className="mt-7 border-t pt-7">
          <h3 className="text-xl font-bold text-gray-900">
            About This Holiday
          </h3>

          <div className="prose mt-3 max-w-none text-gray-600">
            <p>{pkg.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {label}
          </p>

          <p className="mt-1 truncate font-semibold text-gray-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
