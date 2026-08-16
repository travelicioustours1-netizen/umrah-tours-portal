import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Plane,
  Building2,
  MapPin,
  MessageCircle,
} from "lucide-react";

interface PackageCardProps {
  package: {
    id: string;
    slug: string;
    title: string;
    duration: string;
    price: number;
    featured: boolean;
    category?: string | null;
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

function getDestination(title: string) {
  return title
    .replace(/\brelaxation\b/gi, "")
    .replace(/\bholiday\b/gi, "")
    .replace(/\bpackage\b/gi, "")
    .replace(/\btour\b/gi, "")
    .replace(/\btravel\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function PackageCard({
  package: pkg,
}: PackageCardProps) {
  const image =
    pkg.images[0]?.url ||
    "/images/package-placeholder.jpg";

  const isHoliday =
    pkg.category?.toLowerCase() === "holiday";

  const href = isHoliday
    ? `/holidays/${pkg.slug}`
    : `/umrah/${pkg.slug}`;

  const destination = isHoliday
    ? getDestination(pkg.title)
    : null;

  const whatsappNumber = "919797127500";

  const whatsappMessage = encodeURIComponent(
    `Assalamu Alaikum,

I'm interested in the ${pkg.title}.

Please share the availability, travel dates, complete package details and booking procedure.

Thank you.`
  );

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <Link href={href}>
        <div className="relative h-64 overflow-hidden">

          <Image
            src={image}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Featured */}
          {pkg.featured && (
            <div className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
              Featured
            </div>
          )}

          {/* Destination */}
          {isHoliday && destination && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-gray-800 shadow">
              <MapPin
                size={15}
                className="text-emerald-600"
              />
              {destination}
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="space-y-5 p-6">

        {/* Title */}
        <div>
          <h3 className="line-clamp-2 text-xl font-bold leading-tight text-gray-900">
            {pkg.title}
          </h3>

          {isHoliday && (
            <p className="mt-2 text-sm text-gray-500">
              International holiday experience
            </p>
          )}
        </div>

        {/* Package information */}
        <div className="space-y-2 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <CalendarDays
              size={17}
              className="shrink-0 text-emerald-600"
            />
            <span>{pkg.duration}</span>
          </div>

          {/* Umrah only */}
          {!isHoliday && pkg.airline && (
            <div className="flex items-center gap-2">
              <Plane
                size={17}
                className="shrink-0 text-emerald-600"
              />
              <span>{pkg.airline.name}</span>
            </div>
          )}

          {!isHoliday && pkg.makkahHotel && (
            <div className="flex items-center gap-2">
              <Building2
                size={17}
                className="shrink-0 text-emerald-600"
              />
              <span className="line-clamp-1">
                {pkg.makkahHotel.name}
              </span>
            </div>
          )}

          {!isHoliday && pkg.departureDate && (
            <div className="text-gray-500">
              Departure:{" "}
              {new Date(
                pkg.departureDate
              ).toLocaleDateString("en-AE")}
            </div>
          )}

        </div>

        {/* Price */}
        <div className="border-t pt-5">

          <p className="text-sm text-gray-500">
            Starting From
          </p>

          <p className="mt-1 text-2xl font-bold text-emerald-600">
            AED {pkg.price.toLocaleString("en-AE")}
          </p>

          <p className="text-xs text-gray-400">
            Per person
          </p>

        </div>

        {/* Actions */}
        {isHoliday ? (
          <div className="grid grid-cols-2 gap-3">

            <Link
              href={href}
              className="flex items-center justify-center rounded-xl border border-emerald-600 px-3 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              View Details
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <MessageCircle size={17} />
              Get a Quote
            </a>

          </div>
        ) : (
          <Link
            href={href}
            className="block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            View Details
          </Link>
        )}

      </div>
    </div>
  );
}
