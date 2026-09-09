import UmrahFAQ from "@/components/SEO/UmrahFAQ";
import type { Metadata } from "next";
import Link from "next/link";

import { getPackageFilters } from "@/lib/filter-service";
import { getPackages } from "@/lib/package-service";
import PackageCard from "@/components/packages/PackageCard";
import PackageFilters from "@/components/packages/PackageFilters";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";

interface Props {
  searchParams: Promise<{
    search?: string;
    category?: string;
    departureCity?: string;
    airline?: string;
    featured?: string;
    sort?: string;
    page?: string;
  }>;
}

const baseUrl = "https://www.umrahtours.co";

export const metadata: Metadata = {
  title: "Umrah Packages from UAE | Dubai, Sharjah & Abu Dhabi",

  description:
    "Explore Umrah packages from UAE with options for travellers from Dubai, Sharjah and Abu Dhabi. Compare Makkah and Madinah hotels, flights, transportation, visa assistance and Umrah packages.",

  keywords: [
    "Umrah packages UAE",
    "Umrah packages from UAE",
    "Umrah packages Dubai",
    "Umrah package from Dubai",
    "Umrah packages Sharjah",
    "Umrah package from Sharjah",
    "Umrah packages Abu Dhabi",
    "Umrah package from Abu Dhabi",
    "Umrah travel agency UAE",
    "Umrah travel agency Dubai",
    "Umrah travel agency Sharjah",
    "Umrah visa UAE",
    "Umrah tours UAE",
    "Umrah trip from Dubai",
    "Umrah trip from Sharjah",
    "Makkah Umrah packages",
    "Madinah Umrah packages",
    "Makkah Madinah Umrah packages",
    "Umrah hotels Makkah Madinah",
    "Umrah flights from UAE",
  ],

  authors: [
    {
      name: "Umrah Tours",
    },
  ],

  creator: "Umrah Tours",
  publisher: "Umrah Tours",

  alternates: {
    canonical: `${baseUrl}/umrah`,
  },

  openGraph: {
    title: "Umrah Packages from UAE | Dubai, Sharjah & Abu Dhabi",

    description:
      "Compare Umrah packages from Dubai, Sharjah, Abu Dhabi and across the UAE with Makkah and Madinah hotels, flights, transportation and visa assistance.",

    url: `${baseUrl}/umrah`,

    siteName: "Umrah Tours",

    locale: "en_AE",

    type: "website",

    images: [
      {
        url: `${baseUrl}/images/hero/umrah-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Umrah Packages from UAE - Umrah Tours",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Umrah Packages from UAE | Dubai, Sharjah & Abu Dhabi",

    description:
      "Explore Umrah packages from UAE with hotels, flights, transportation and visa assistance for your pilgrimage journey.",

    images: [`${baseUrl}/images/hero/umrah-hero.jpg`],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function UmrahPackagesPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const [result, filters] = await Promise.all([
    getPackages({
      search: params.search,

      // Show both existing Umrah categories:
      // UMRAH and economy
      category: "UMRAH_ALL",

      departureCity: params.departureCity,

      airlineId: params.airline,

      featured:
        params.featured === "true"
          ? true
          : undefined,

      sort: params.sort as
        | "departure"
        | "price-low"
        | "price-high"
        | "newest"
        | undefined,

      page: Number(params.page ?? 1),
    }),

    getPackageFilters(),
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    name: "Umrah Packages from UAE | Dubai, Sharjah & Abu Dhabi",

    description:
      "Explore Umrah packages from Dubai, Sharjah, Abu Dhabi and across the UAE with Makkah and Madinah hotels, flights, transportation, visa assistance and pilgrimage travel services.",

    url: `${baseUrl}/umrah`,

    isPartOf: {
      "@type": "WebSite",
      name: "Umrah Tours",
      url: baseUrl,
    },

    about: {
      "@type": "Thing",
      name: "Umrah Packages",
    },

    provider: {
      "@id": `${baseUrl}/#organization`,
    },

    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },

    mainEntity: {
      "@type": "ItemList",

      name: "Umrah Packages from UAE",

      numberOfItems: result.total,

      itemListElement: result.packages.map((pkg, index) => ({
        "@type": "ListItem",

        position: index + 1,

        url: `${baseUrl}/umrah/${pkg.slug}`,

        name: pkg.title,
      })),
    },
  };

  return (
    <>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <main className="bg-gray-50">

        {/* =========================================================
            SEO HERO
        ========================================================= */}
        <section className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
              Umrah Travel from UAE
            </p>

            <h1 className="max-w-5xl text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Umrah Packages from Dubai, Sharjah & Across the UAE
            </h1>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-600">
              Explore Umrah packages from Dubai, Sharjah, Abu Dhabi and
              across the UAE. Compare available packages with Makkah and
              Madinah accommodation, flights, transportation, visa
              assistance and other pilgrimage travel services.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                Umrah Packages Dubai
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                Umrah Packages Sharjah
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                Umrah Packages Abu Dhabi
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                Makkah Hotels
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                Madinah Hotels
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                Umrah Visa Assistance
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#umrah-packages"
                className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                View Umrah Packages
              </Link>

              <Link
                href="/contact"
                className="rounded-lg border border-emerald-600 px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Request a Quote
              </Link>
            </div>

          </div>
        </section>

        {/* =========================================================
            INTERNAL LINK / SERVICE BAR
        ========================================================= */}
        <section className="border-b bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-6">

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

              <Link
                href="/visa"
                className="rounded-lg border bg-white px-5 py-4 transition hover:border-emerald-500 hover:shadow-sm"
              >
                <span className="block font-semibold text-gray-900">
                  Umrah Visa
                </span>
                <span className="mt-1 block text-sm text-gray-600">
                  Visa assistance for UAE travellers
                </span>
              </Link>

              <Link
                href="/hotels"
                className="rounded-lg border bg-white px-5 py-4 transition hover:border-emerald-500 hover:shadow-sm"
              >
                <span className="block font-semibold text-gray-900">
                  Hotels
                </span>
                <span className="mt-1 block text-sm text-gray-600">
                  Makkah & Madinah accommodation
                </span>
              </Link>

              <Link
                href="/flights"
                className="rounded-lg border bg-white px-5 py-4 transition hover:border-emerald-500 hover:shadow-sm"
              >
                <span className="block font-semibold text-gray-900">
                  Flights
                </span>
                <span className="mt-1 block text-sm text-gray-600">
                  Compare flight options
                </span>
              </Link>

              <Link
                href="/airport-transfers"
                className="rounded-lg border bg-white px-5 py-4 transition hover:border-emerald-500 hover:shadow-sm"
              >
                <span className="block font-semibold text-gray-900">
                  Transfers
                </span>
                <span className="mt-1 block text-sm text-gray-600">
                  Airport & destination transfers
                </span>
              </Link>

              <Link
                href="/contact"
                className="rounded-lg border bg-white px-5 py-4 transition hover:border-emerald-500 hover:shadow-sm"
              >
                <span className="block font-semibold text-gray-900">
                  Get a Quote
                </span>
                <span className="mt-1 block text-sm text-gray-600">
                  Ask about your Umrah journey
                </span>
              </Link>

            </div>

          </div>
        </section>

        {/* =========================================================
            PACKAGE LISTING
        ========================================================= */}
        <section
          id="umrah-packages"
          className="mx-auto max-w-7xl px-4 py-10 md:py-14"
        >

          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Umrah Packages from UAE
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Browse available Umrah packages and compare the options
              currently offered by Umrah Tours. Package inclusions,
              accommodation, flights, transportation, travel dates and
              pricing can vary depending on the selected package.
            </p>
          </div>

          <PackageFilters filters={filters} />

          <div className="mb-6 mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">
                {result.packages.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold">
                {result.total}
              </span>{" "}
              packages
            </p>
          </div>

          {result.packages.length === 0 ? (
            <EmptyState
              title="No Umrah packages found"
              description="Try adjusting your search or filters."
              actionHref="/umrah"
              actionLabel="Clear Filters"
            />
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {result.packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                />
              ))}
            </div>
          )}

          <div className="mt-10">
            <Pagination
              page={result.page}
              totalPages={result.totalPages}
            />
          </div>

        </section>

        {/* =========================================================
            UMRAH FROM DIFFERENT UAE CITIES
        ========================================================= */}
        <section className="border-t bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">

            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                Travel from the UAE
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Umrah Travel from Dubai, Sharjah & Abu Dhabi
              </h2>

              <p className="mt-4 leading-8 text-gray-600">
                Pilgrims travelling from different parts of the UAE can
                explore Umrah package options based on their preferred
                travel dates, accommodation requirements and budget.
                Whether you are travelling from Dubai, Sharjah, Abu Dhabi
                or another emirate, our team can help you understand the
                available package arrangements.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">

              <div className="rounded-xl border bg-white p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Umrah Packages from Dubai
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Explore Umrah travel options for pilgrims departing
                  from Dubai, including packages with accommodation,
                  flights, transportation and visa assistance depending
                  on the selected package.
                </p>

                <Link
                  href="#umrah-packages"
                  className="mt-4 inline-block font-semibold text-emerald-700 hover:underline"
                >
                  View Dubai Umrah Packages →
                </Link>
              </div>

              <div className="rounded-xl border bg-white p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Umrah Packages from Sharjah
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Compare available Umrah packages for travellers from
                  Sharjah and nearby areas. Choose from available package
                  options according to your travel dates and preferred
                  accommodation.
                </p>

                <Link
                  href="#umrah-packages"
                  className="mt-4 inline-block font-semibold text-emerald-700 hover:underline"
                >
                  View Sharjah Umrah Packages →
                </Link>
              </div>

              <div className="rounded-xl border bg-white p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Umrah Packages from Abu Dhabi
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Travelling from Abu Dhabi? Explore the available Umrah
                  package options and contact our team for assistance
                  with package availability, travel arrangements and
                  quotation requests.
                </p>

                <Link
                  href="#umrah-packages"
                  className="mt-4 inline-block font-semibold text-emerald-700 hover:underline"
                >
                  Explore Umrah Options →
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================
            WHAT IS INCLUDED
        ========================================================= */}
        <section className="border-t bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">

            <h2 className="text-3xl font-bold text-gray-900">
              What Can an Umrah Package from UAE Include?
            </h2>

            <div className="mt-6 space-y-5 leading-8 text-gray-600">

              <p>
                Umrah package inclusions vary depending on the selected
                package, travel dates, accommodation category and other
                arrangements. Depending on the package, pilgrims may
                receive a combination of flights, Makkah and Madinah
                accommodation, transportation and visa assistance.
              </p>

              <p>
                Accommodation is an important part of planning an Umrah
                journey. Packages may include hotels in Makkah, Madinah
                or both cities. The hotel category, location, room type
                and number of nights depend on the selected package.
              </p>

              <p>
                Flights and transportation arrangements can also differ
                between packages. Before confirming your journey, check
                the individual package details for the included services,
                travel dates and applicable terms.
              </p>

              <p>
                If you need additional travel arrangements, you can also
                explore our{" "}
                <Link
                  href="/flights"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  flight services
                </Link>
                ,{" "}
                <Link
                  href="/hotels"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  hotel options
                </Link>{" "}
                and{" "}
                <Link
                  href="/airport-transfers"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  airport transfer services
                </Link>
                .
              </p>

            </div>

          </div>
        </section>

        {/* =========================================================
            UMRAH VISA
        ========================================================= */}
        <section className="border-t bg-gray-50">
          <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">

            <h2 className="text-3xl font-bold text-gray-900">
              Umrah Visa Assistance for UAE Travellers
            </h2>

            <div className="mt-5 space-y-5 leading-8 text-gray-600">

              <p>
                Travellers planning Umrah from the UAE may also need
                assistance with their visa and travel documentation.
                Visa requirements and eligibility can vary depending on
                nationality, residency status and current regulations.
              </p>

              <p>
                Our{" "}
                <Link
                  href="/visa"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  visa services
                </Link>{" "}
                provide a convenient starting point for travellers who
                need assistance understanding available visa options.
              </p>

              <p>
                For package-specific visa information, availability and
                current requirements, contact our team before making your
                travel arrangements.
              </p>

            </div>

            <div className="mt-7">
              <Link
                href="/visa"
                className="inline-flex rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Explore Visa Services
              </Link>
            </div>

          </div>
        </section>

        {/* =========================================================
            FAQ
        ========================================================= */}
        <UmrahFAQ />

        {/* =========================================================
            SEO CONTENT
        ========================================================= */}
        <section className="border-t bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">

            <h2 className="text-3xl font-bold text-gray-900">
              Umrah Packages from Dubai, Sharjah & Across the UAE
            </h2>

            <div className="mt-6 space-y-5 leading-8 text-gray-600">

              <p>
                Umrah Tours provides Umrah travel services for pilgrims
                travelling from Dubai, Sharjah, Abu Dhabi and other parts
                of the UAE to Makkah and Madinah. Browse our available
                Umrah packages to compare accommodation, flights,
                transportation and other pilgrimage travel arrangements.
              </p>

              <p>
                Travellers searching for an{" "}
                <strong>Umrah package from Dubai</strong> or an{" "}
                <strong>Umrah package from Sharjah</strong> can browse the
                available options on this page. Package availability,
                pricing and inclusions depend on the selected travel dates
                and package.
              </p>

              <p>
                Our Umrah packages from the UAE can be suitable for
                individuals, couples, families and groups. Depending on
                the selected package, services may include Makkah and
                Madinah accommodation, flights, transportation and visa
                assistance.
              </p>

              <p>
                Travellers looking for an{" "}
                <Link
                  href="/visa"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  Umrah visa
                </Link>{" "}
                can explore our visa services. Pilgrims who need
                accommodation can also learn more about our{" "}
                <Link
                  href="/hotels"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  hotel options
                </Link>
                .
              </p>

              <p>
                If you are comparing flights for your pilgrimage, explore
                our{" "}
                <Link
                  href="/flights"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  flight options
                </Link>
                . For airport and destination transportation, you can
                also use our{" "}
                <Link
                  href="/airport-transfers"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  airport transfer services
                </Link>
                .
              </p>

              <p>
                For current package availability, pricing and booking
                assistance, you can{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  contact Umrah Tours
                </Link>{" "}
                and request a quote.
              </p>

              <p>
                Whether you are travelling from Dubai, Sharjah, Abu Dhabi
                or elsewhere in the UAE, compare the available{" "}
                <Link
                  href="#umrah-packages"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  Umrah packages
                </Link>{" "}
                and choose an option that suits your travel dates,
                accommodation preferences and group requirements.
              </p>

            </div>

          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================= */}
        <section className="border-t bg-emerald-700">
          <div className="mx-auto max-w-5xl px-4 py-12 text-center md:py-16">

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Planning Your Umrah from the UAE?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-emerald-50">
              Explore available Umrah packages or contact our team for
              assistance with your travel dates, accommodation and
              package requirements.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">

              <Link
                href="#umrah-packages"
                className="rounded-lg bg-white px-7 py-3 font-semibold text-emerald-800 transition hover:bg-gray-100"
              >
                View Packages
              </Link>

              <Link
                href="/contact"
                className="rounded-lg border border-white px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-emerald-800"
              >
                Request a Quote
              </Link>

            </div>

          </div>
        </section>

      </main>
    </>
  );
}