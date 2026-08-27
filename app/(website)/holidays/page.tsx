import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Globe2,
  MapPin,
  MessageCircle,
  Plane,
  Sparkles,
} from "lucide-react";
import { getPackages } from "@/lib/package-service";

const whatsappNumber = "971525657940";

/*
|--------------------------------------------------------------------------
| WhatsApp
|--------------------------------------------------------------------------
*/

function getWhatsAppUrl(title: string) {
  const message = encodeURIComponent(
    `Assalamu Alaikum,

I'm interested in the ${title}.

Please share the availability, travel dates, complete package details and booking procedure.

Thank you.`
  );

  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

/*
|--------------------------------------------------------------------------
| Holiday Regions
|--------------------------------------------------------------------------
*/

const REGION_CONFIG = [
  {
    key: "CIS",
    title: "CIS Holiday Packages",
    subtitle: "Explore CIS",
    description:
      "Discover beautiful destinations across the CIS region, including Georgia, Azerbaijan, Kazakhstan, Russia and other Central Asian destinations.",
    icon: "🌍",
  },
  {
    key: "ASIA",
    title: "Asia Holiday Packages",
    subtitle: "Explore Asia",
    description:
      "Discover unforgettable holidays across Asia, from tropical escapes and beautiful beaches to vibrant cities, rich cultures and fascinating natural wonders.",
    icon: "🌏",
  },
  {
    key: "AFRICA",
    title: "Africa Holiday Packages",
    subtitle: "Explore Africa",
    description:
      "Experience unforgettable African adventures, from luxury Maasai Mara safaris and wildlife experiences to breathtaking beaches, cultural journeys and premium escapes across the continent.",
    icon: "🦁",
  },

  {
  key: "ISLANDS",
  title: "Island Holiday Packages",
  subtitle: "Explore Island Escapes",
  description:
    "Escape to breathtaking island destinations including the Maldives, Seychelles and Mauritius, with pristine beaches, crystal-clear waters, luxury resorts and unforgettable tropical experiences.",
  icon: "🏝️",
},

  {
    key: "FAR_EAST",
    title: "Far East Holiday Packages",
    subtitle: "Explore the Far East",
    description:
      "Discover vibrant cities, rich cultures, beautiful islands and unforgettable experiences across the Far East.",
    icon: "🌏",
  },
  {
    key: "EUROPE",
    title: "Europe Holiday Packages",
    subtitle: "Discover Europe",
    description:
      "Explore iconic European cities, scenic landscapes, cultural attractions and unforgettable experiences, including destinations such as Montenegro.",
    icon: "🏰",
  },
  {
    key: "SCANDINAVIA",
    title: "Scandinavia Holiday Packages",
    subtitle: "Explore Scandinavia",
    description:
      "Discover breathtaking Nordic landscapes, charming cities, dramatic fjords, Arctic adventures and unforgettable experiences across Scandinavia.",
    icon: "❄️",
  },
  {
    key: "MIDDLE_EAST",
    title: "Middle East Holiday Packages",
    subtitle: "Explore the Middle East",
    description:
      "Discover the Middle East's rich history, ancient wonders, breathtaking landscapes and vibrant cities, including unforgettable destinations such as Jordan.",
    icon: "🏜️",
  },
  {
    key: "USA",
    title: "USA Holiday Packages",
    subtitle: "Explore the USA",
    description:
      "Discover exciting cities, famous landmarks, entertainment and unforgettable experiences across the United States.",
    icon: "🇺🇸",
  },
  {
    key: "AUSTRALIA_NEW_ZEALAND",
    title: "Australia & New Zealand Holiday Packages",
    subtitle: "Australia & New Zealand",
    description:
      "Explore stunning cities, natural wonders, scenic landscapes and unforgettable experiences across Australia and New Zealand.",
    icon: "🌏",
  },
];

/*
|--------------------------------------------------------------------------
| Normalize Region
|--------------------------------------------------------------------------
*/

function normalizeRegion(region: unknown) {
  if (!region) {
    return "OTHER";
  }

  return String(region)
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
}

/*
|--------------------------------------------------------------------------
| Display Region Name
|--------------------------------------------------------------------------
*/

function formatRegionName(region: string) {
  return region
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/*
|--------------------------------------------------------------------------
| Group Packages By Region
|--------------------------------------------------------------------------
*/

function groupPackagesByRegion(packages: any[]) {
  const grouped: Record<string, any[]> = {};

  for (const holiday of packages) {
    const region = normalizeRegion(holiday.region);

    if (!grouped[region]) {
      grouped[region] = [];
    }

    grouped[region].push(holiday);
  }

  return grouped;
}

/*
|--------------------------------------------------------------------------
| Group Packages By Destination
|--------------------------------------------------------------------------
*/

function groupPackagesByDestination(packages: any[]) {
  const grouped: Record<string, any[]> = {};

  for (const holiday of packages) {
    const destination =
      String(holiday.destination || "").trim() ||
      "Other Destinations";

    if (!grouped[destination]) {
      grouped[destination] = [];
    }

    grouped[destination].push(holiday);
  }

  return grouped;
}

/*
|--------------------------------------------------------------------------
| Holidays Page
|--------------------------------------------------------------------------
*/

export default async function HolidaysPage() {
  const { packages } = await getPackages({
    category: "HOLIDAY",
    limit: 100,
    sort: "newest",
  });

  const groupedPackages = groupPackagesByRegion(packages);

  /*
  |--------------------------------------------------------------------------
  | Only show configured regions that actually contain packages
  |--------------------------------------------------------------------------
  */

  const availableRegions = REGION_CONFIG.filter(
    (region) => groupedPackages[region.key]?.length > 0
  );

  /*
  |--------------------------------------------------------------------------
  | Pick up any unexpected/custom region values
  |--------------------------------------------------------------------------
  */

  const configuredRegionKeys = new Set(
    REGION_CONFIG.map((region) => region.key)
  );

  const additionalRegions = Object.keys(groupedPackages)
    .filter(
      (region) =>
        !configuredRegionKeys.has(region) &&
        region !== "OTHER" &&
        groupedPackages[region]?.length > 0
    )
    .map((region) => ({
      key: region,
      title: `${formatRegionName(region)} Holiday Packages`,
      subtitle: `Explore ${formatRegionName(region)}`,
      description:
        "Explore our carefully selected international holiday packages.",
      icon: "🌍",
    }));

  /*
  |--------------------------------------------------------------------------
  | Packages without a region
  |--------------------------------------------------------------------------
  */

  const regionsWithPackages = [
    ...availableRegions,
    ...additionalRegions,
  ];

  if (groupedPackages.OTHER?.length > 0) {
    regionsWithPackages.push({
      key: "OTHER",
      title: "Other Holiday Packages",
      subtitle: "More International Destinations",
      description:
        "Explore additional international destinations and specially curated holiday experiences.",
      icon: "✈️",
    });
  }

  return (
    <main className="bg-gray-50">
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative min-h-[560px] overflow-hidden">
        <Image
          src="/images/hero/umrah-hero.jpg"
          alt="International holiday destinations"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-20">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Globe2 size={17} />
              International Holidays
            </div>

            <p className="mt-6 uppercase tracking-[5px] text-emerald-300">
              Travel Beyond Boundaries
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Explore The World
              <span className="block text-emerald-300">
                With Umrah Tours
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
              Discover carefully selected international holiday packages
              designed for families, couples, friends and groups.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#holiday-packages"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                Explore Packages
                <ArrowRight size={19} />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-gray-900"
              >
                Plan My Holiday
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST BAR
      ========================================================== */}

      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
              <Plane size={24} />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                International Flights
              </p>

              <p className="text-sm text-gray-500">
                Convenient flight options
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
              <CheckCircle size={24} />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Handpicked Packages
              </p>

              <p className="text-sm text-gray-500">
                Selected for quality and value
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
              <Globe2 size={24} />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Travel Assistance
              </p>

              <p className="text-sm text-gray-500">
                Support throughout your journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          REGION NAVIGATION
      ========================================================== */}

      {regionsWithPackages.length > 0 && (
        <section className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-600">
                Choose Your Region
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                Explore Holidays By Region
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                Browse our holiday packages by region and destination.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#holiday-packages"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
              >
                <Globe2 size={16} />
                All Holidays
              </a>

              {regionsWithPackages.map((region) => (
                <a
                  key={region.key}
                  href={`#region-${region.key.toLowerCase()}`}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <span>{region.icon}</span>
                  {region.title.replace(
                    " Holiday Packages",
                    ""
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          HOLIDAY PACKAGES
      ========================================================== */}

      <section
        id="holiday-packages"
        className="py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* =====================================================
              NO PACKAGES
          ====================================================== */}

          {packages.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Globe2 size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Holiday Packages Coming Soon
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-gray-600">
                Our holiday collection is currently being updated.
                Contact our travel experts for a customized international
                holiday.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Enquire Now
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <>
              {/* =================================================
                  REGION GROUPS
              ================================================== */}

              {regionsWithPackages.map((region) => {
                const regionPackages =
                  groupedPackages[region.key] || [];

                if (regionPackages.length === 0) {
                  return null;
                }

                /*
                |--------------------------------------------------------------------------
                | Group packages inside the region by destination
                |--------------------------------------------------------------------------
                */

                const packagesByDestination =
                  groupPackagesByDestination(
                    regionPackages
                  );

                return (
                  <section
                    key={region.key}
                    id={`region-${region.key.toLowerCase()}`}
                    className="mb-24 scroll-mt-24 last:mb-0"
                  >
                    {/* =================================================
                        REGION HEADER
                    ================================================== */}

                    <div className="mb-12">
                      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            <span className="text-lg">
                              {region.icon}
                            </span>

                            {region.subtitle}
                          </div>

                          <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
                            {region.title}
                          </h2>

                          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
                            {region.description}
                          </p>
                        </div>

                        <div className="shrink-0">
                          <span className="inline-flex rounded-full border bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
                            {regionPackages.length}{" "}
                            {regionPackages.length === 1
                              ? "Package"
                              : "Packages"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* =================================================
                        DESTINATION GROUPS
                    ================================================== */}

                    <div className="space-y-16">
                      {Object.entries(
                        packagesByDestination
                      ).map(
                        ([
                          destination,
                          destinationPackages,
                        ]) => {
                          const featuredPackages =
                            destinationPackages.filter(
                              (holiday) =>
                                holiday.featured
                            );

                          const regularPackages =
                            destinationPackages.filter(
                              (holiday) =>
                                !holiday.featured
                            );

                          return (
                            <div
                              key={destination}
                              className="scroll-mt-24"
                            >
                              {/* Destination Header */}

                              <div className="mb-7 flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                  <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                                    <MapPin size={16} />
                                    Destination
                                  </div>

                                  <h3 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
                                    {destination}
                                  </h3>
                                </div>

                                <div className="inline-flex w-fit rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
                                  {
                                    destinationPackages.length
                                  }{" "}
                                  {destinationPackages.length ===
                                  1
                                    ? "Package"
                                    : "Packages"}
                                </div>
                              </div>

                              {/* Featured Destination Packages */}

                              {featuredPackages.length >
                                0 && (
                                <div className="mb-10">
                                  <div className="mb-5 flex items-center gap-2">
                                    <Sparkles
                                      size={18}
                                      className="text-emerald-600"
                                    />

                                    <h4 className="text-xl font-bold text-gray-900">
                                      Featured{" "}
                                      {destination}{" "}
                                      Holidays
                                    </h4>
                                  </div>

                                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {featuredPackages.map(
                                      (holiday) => (
                                        <HolidayCard
                                          key={
                                            holiday.id
                                          }
                                          holiday={
                                            holiday
                                          }
                                          featured
                                        />
                                      )
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Regular Destination Packages */}

                              {regularPackages.length >
                                0 && (
                                <div>
                                  {featuredPackages.length >
                                    0 && (
                                    <div className="mb-5">
                                      <h4 className="text-xl font-bold text-gray-900">
                                        More{" "}
                                        {destination}{" "}
                                        Holidays
                                      </h4>
                                    </div>
                                  )}

                                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {regularPackages.map(
                                      (holiday) => (
                                        <HolidayCard
                                          key={
                                            holiday.id
                                          }
                                          holiday={
                                            holiday
                                          }
                                        />
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </section>
                );
              })}
            </>
          )}
        </div>
      </section>

      {/* =========================================================
          CUSTOM HOLIDAY CTA
      ========================================================== */}

      <section className="bg-emerald-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 p-8 text-white shadow-2xl md:p-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-300">
                  Can&apos;t Find What You&apos;re Looking For?
                </p>

                <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                  Let Us Plan Your Dream Holiday
                </h2>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
                  Tell us your destination, travel dates, number of
                  travellers and budget. Our travel team will create a
                  suitable holiday option for you.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-emerald-900 transition hover:bg-gray-100"
                >
                  Get a Quote
                  <ArrowRight size={18} />
                </Link>

                <a
                  href={getWhatsAppUrl(
                    "a customized international holiday"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-4 font-semibold text-white transition hover:bg-green-700"
                >
                  <MessageCircle size={19} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOLIDAY SERVICES
      ========================================================== */}

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-600">
              Travel Support
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900">
              Everything You Need For Your Holiday
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              From flights and hotels to transfers and customized tours,
              our team can help arrange your complete holiday.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ServiceCard
              icon={<Plane size={28} />}
              title="Flight Booking"
              description="International flight options tailored to your travel dates."
            />

            <ServiceCard
              icon={<Globe2 size={28} />}
              title="Hotel Reservation"
              description="Comfortable accommodation selected for your destination."
            />

            <ServiceCard
              icon={<CalendarDays size={28} />}
              title="Custom Holidays"
              description="Flexible itineraries designed around your preferences."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section className="bg-gray-100 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Ready For Your Next Adventure?
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Start planning your international holiday with Umrah Tours.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Start Planning
              <ArrowRight size={18} />
            </Link>

            <a
              href={getWhatsAppUrl("an international holiday")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-600 bg-white px-8 py-4 font-semibold text-green-700 transition hover:bg-green-50"
            >
              <MessageCircle size={19} />
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ===============================================================
   HOLIDAY CARD
================================================================ */

function HolidayCard({
  holiday,
  featured = false,
}: {
  holiday: any;
  featured?: boolean;
}) {
  const image =
    holiday.images?.[0]?.url ||
    "/images/package-placeholder.jpg";

  const whatsappUrl = getWhatsAppUrl(holiday.title);

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Image */}

      <div className="relative h-72 overflow-hidden">
        <Image
          src={image}
          alt={holiday.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Featured */}

        {featured && (
          <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            <Sparkles size={13} />
            Featured
          </div>
        )}

        {/* Region */}

        {holiday.region && (
          <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            {formatRegionName(
              normalizeRegion(holiday.region)
            )}
          </div>
        )}

        {/* Duration */}

        {holiday.duration && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 text-sm font-medium text-white backdrop-blur">
            <CalendarDays size={15} />
            {holiday.duration}
          </div>
        )}
      </div>

      {/* Content */}

      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[2px] text-emerald-600">
          {holiday.destination
            ? holiday.destination
            : "International Holiday"}
        </p>

        <h2 className="mt-2 min-h-[58px] text-2xl font-bold leading-tight text-gray-900">
          {holiday.title}
        </h2>

        {/* Description */}

        {holiday.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
            {holiday.description}
          </p>
        )}

        {/* Price */}

        <div className="mt-5 border-t pt-5">
          <p className="text-sm text-gray-500">
            Starting From
          </p>

          <div className="mt-1 flex items-end justify-between gap-3">
            <div>
              <p className="text-3xl font-bold text-emerald-600">
                AED{" "}
                {Number(
                  holiday.price || 0
                ).toLocaleString("en-AE")}
              </p>

              <p className="text-xs text-gray-500">
                Per Person
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href={`/holidays/${holiday.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            View Holiday
            <ArrowRight size={16} />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-600 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

/* ===============================================================
   SERVICE CARD
================================================================ */

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-gray-600">
        {description}
      </p>
    </div>
  );
}