import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Plane, Building2 } from "lucide-react";

interface PackageCardProps {
  package: {
    id: string;
    slug: string;
    title: string;
    duration: string;
    price: number;
    featured: boolean;
    departureDate: Date | null;

    images: {
      url: string;
    }[];

    airline: {
      name: string;
    } | null;

    makkahHotel: {
      name: string;
    } | null;
  };
}

export default function PackageCard({
  package: pkg,
}: PackageCardProps) {
  const image =
    pkg.images[0]?.url || "/images/package-placeholder.jpg";

  return (
    <Link
      href={`/umrah/${pkg.slug}`}
      className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-60 overflow-hidden">
        <Image
  src={image}
  alt={pkg.title}
  fill
  sizes="(max-width:768px) 100vw, 33vw"
  loading="eager"
/>

        {pkg.featured && (
          <div className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </div>
        )}
      </div>

      <div className="space-y-4 p-6">
        <h3 className="line-clamp-2 text-xl font-bold">
          {pkg.title}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            {pkg.duration}
          </div>

          {pkg.airline && (
            <div className="flex items-center gap-2">
              <Plane size={16} />
              {pkg.airline.name}
            </div>
          )}

          {pkg.makkahHotel && (
            <div className="flex items-center gap-2">
              <Building2 size={16} />
              {pkg.makkahHotel.name}
            </div>
          )}

          {pkg.departureDate && (
            <div className="text-gray-500">
              Departure:{" "}
              {new Date(pkg.departureDate).toLocaleDateString()}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm text-gray-500">
              Starting From
            </p>

            <p className="text-2xl font-bold text-emerald-600">
              ₹{pkg.price.toLocaleString("en-IN")}
            </p>
          </div>

          <span className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-emerald-700">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}