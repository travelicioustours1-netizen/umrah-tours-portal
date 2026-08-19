import UmrahFAQ from "@/components/SEO/UmrahFAQ";
import type { Metadata } from "next";

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

const baseUrl = "https://umrahtours.co";

export const metadata: Metadata = {
  title: "Umrah Packages UAE | Dubai & Sharjah | Umrah Tours",

  description:
    "Explore Umrah packages from Dubai, Sharjah and across the UAE with Umrah Tours. Compare Makkah and Madinah hotels, flights, visa assistance and complete Umrah travel services.",

  keywords: [
    "Umrah packages UAE",
    "Umrah packages Dubai",
    "Umrah packages Sharjah",
    "Umrah packages from UAE",
    "Umrah travel agency UAE",
    "Umrah travel agency Dubai",
    "Umrah travel agency Sharjah",
    "Umrah visa UAE",
    "Umrah tours UAE",
    "Makkah Umrah packages",
    "Madinah Umrah packages",
    "Makkah Madinah Umrah packages",
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
    title: "Umrah Packages UAE | Dubai & Sharjah | Umrah Tours",

    description:
      "Find Umrah packages from Dubai, Sharjah and across the UAE with Makkah and Madinah hotels, flights, visa assistance and pilgrimage travel support.",

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

    title: "Umrah Packages UAE | Dubai & Sharjah | Umrah Tours",

    description:
      "Explore Umrah packages from Dubai, Sharjah and across the UAE with Umrah Tours.",

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

    name: "Umrah Packages UAE | Dubai & Sharjah",

    description:
      "Explore Umrah packages from Dubai, Sharjah and across the UAE with Makkah and Madinah hotels, flights, visa assistance and pilgrimage travel services.",

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
        {/* SEO Hero */}
        <section className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
              Umrah Travel from UAE
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Umrah Packages UAE
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
              Explore Umrah packages from Dubai, Sharjah and across
              the UAE. Compare available packages with accommodation,
              flights, Makkah and Madinah hotels, visa assistance and
              complete pilgrimage travel services.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                Umrah Packages Dubai
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                Umrah Packages Sharjah
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                Makkah Hotels
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                Madinah Hotels
              </span>
            </div>
          </div>
        </section>

        {/* Package Listing */}
        <section className="mx-auto max-w-7xl px-4 py-10">
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

        {/* FAQ */}
        <UmrahFAQ />

        {/* SEO Content */}
        <section className="border-t bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Umrah Packages from Dubai & Sharjah
            </h2>

            <div className="mt-5 space-y-5 leading-8 text-gray-600">
              <p>
                Umrah Tours provides Umrah travel services for
                pilgrims travelling from the UAE to Makkah and
                Madinah. Explore available Umrah packages and
                compare accommodation, travel arrangements and
                package options according to your requirements.
              </p>

              <p>
                Our Umrah packages are designed for travellers
                looking for convenient pilgrimage arrangements
                from Dubai, Sharjah and other parts of the UAE.
                Depending on the package, services may include
                accommodation, flights, transportation and
                visa assistance.
              </p>

              <p>
                Whether you are travelling individually, as a
                couple, with family or as a group, you can browse
                our available Umrah packages and contact our team
                for current availability, pricing and booking
                assistance.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}