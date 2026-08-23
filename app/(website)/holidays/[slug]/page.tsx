import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getPackageBySlug,
  getRelatedPackages,
} from "@/lib/package-service";

import PackageHero from "@/components/packages/PackageHero";
import PackageOverview from "@/components/packages/PackageOverview";
import PackagePricing from "@/components/packages/PackagePricing";
import PackageSidebar from "@/components/packages/PackageSidebar";
import PackageCard from "@/components/packages/PackageCard";
import HolidayItinerary from "@/components/packages/HolidayItinerary";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================================================
   SITE URL
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.umrahtours.co";

/* =========================================================
   SEO DESCRIPTION CLEANER
========================================================= */

function createSeoDescription(
  description: string | null | undefined,
  fallback: string
) {
  if (!description) {
    return fallback;
  }

  const cleanDescription = description
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (cleanDescription.length <= 160) {
    return cleanDescription;
  }

  return `${cleanDescription.slice(0, 157)}...`;
}

/* =========================================================
   TEXT FORMATTER
   Converts textarea content into readable bullet/list items.
========================================================= */

function formatContentItems(
  content: string | null | undefined
): string[] {
  if (!content?.trim()) {
    return [];
  }

  return content
    .split(/\r?\n/)
    .map((item) =>
      item
        .replace(/^[\s•●▪◦*-]+/, "")
        .trim()
    )
    .filter(Boolean);
}

/* =========================================================
   DYNAMIC METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const packageData = await getPackageBySlug(slug);

  if (!packageData) {
    return {
      title: "Holiday Package Not Found",
      description:
        "The requested holiday package could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /*
   * Destination and region
   *
   * These values should come from the Package record.
   * They are intentionally NOT taken from the package title.
   */
  const destination =
    packageData.destination?.trim() ||
    "International";

  const region =
    packageData.region?.trim() ||
    "Holiday";

  /* =======================================================
     SEO TITLE
  ======================================================= */

  const title =
    packageData.seoTitle?.trim() ||
    `${packageData.title} | ${destination} Holiday Package`;

  /* =======================================================
     SEO DESCRIPTION
  ======================================================= */

  const fallbackDescription =
    `Book ${packageData.title}, a premium ${packageData.duration} ${destination} holiday package. Explore unforgettable destinations, experiences and travel services with Umrah Tours.`;

  const description = createSeoDescription(
    packageData.seoDescription,
    createSeoDescription(
      packageData.description,
      fallbackDescription
    )
  );

  /* =======================================================
     SEO KEYWORDS
  ======================================================= */

  const customKeywords = packageData.seoKeywords
    ? packageData.seoKeywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : [];

  const keywords = [
    ...customKeywords,

    packageData.title,

    `${destination} holiday package`,
    `${destination} tour package`,
    `${region} holiday packages`,
    `${destination} tours`,
    `${destination} holidays`,
    "international holiday packages",
    "holiday packages from UAE",
    "holiday packages from Dubai",
    "Umrah Tours holidays",
  ];

  /* =======================================================
     CANONICAL
  ======================================================= */

  const canonicalUrl =
    `${SITE_URL}/holidays/${packageData.slug}`;

  /* =======================================================
     FIRST IMAGE
  ======================================================= */

  const firstImage =
    packageData.images?.[0]?.url || "";

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Umrah Tours",
      type: "website",

      images: firstImage
        ? [
            {
              url: firstImage,
              width: 1200,
              height: 630,
              alt: packageData.title,
            },
          ]
        : [],
    },

    twitter: {
      card: firstImage
        ? "summary_large_image"
        : "summary",

      title,
      description,

      images: firstImage
        ? [firstImage]
        : [],
    },

    robots: {
      index:
        packageData.status === "ACTIVE",

      follow:
        packageData.status === "ACTIVE",
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function HolidayPackagePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const packageData =
    await getPackageBySlug(slug);

  if (
    !packageData ||
    packageData.status !== "ACTIVE"
  ) {
    notFound();
  }

  /* =======================================================
     RELATED PACKAGES
  ======================================================= */

  const relatedPackages =
    await getRelatedPackages(
      packageData.category || "HOLIDAY",
      packageData.id
    );

  const filteredRelatedPackages =
    relatedPackages.filter(
      (item) =>
        item.category?.toUpperCase() ===
        "HOLIDAY"
    );

  /* =======================================================
     DESTINATION / REGION
  ======================================================= */

  const destination =
    packageData.destination?.trim() ||
    "International";

  const region =
    packageData.region?.trim() ||
    "Holiday";

  /* =======================================================
     CANONICAL URL
  ======================================================= */

  const canonicalUrl =
    `${SITE_URL}/holidays/${packageData.slug}`;

  /* =======================================================
     PACKAGE IMAGE
  ======================================================= */

  const packageImage =
    packageData.images?.[0]?.url || "";

  /* =======================================================
     PRICE
  ======================================================= */

  const basePrice =
    packageData.price ??
    packageData.quadPrice ??
    0;

  /* =======================================================
     INCLUSIONS
  ======================================================= */

  const inclusionItems =
    formatContentItems(
      packageData.inclusions
    );

  /* =======================================================
     EXCLUSIONS
  ======================================================= */

  const exclusionItems =
    formatContentItems(
      packageData.exclusions
    );

  /* =======================================================
     PACKAGE JSON-LD
  ======================================================= */

  const packageSchema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: packageData.title,

    description:
      createSeoDescription(
        packageData.description,
        `${packageData.title} - ${destination} holiday package.`
      ),

    image:
      packageData.images?.map(
        (image) => image.url
      ) || [],

    url: canonicalUrl,

    category:
      `${region} Holiday Packages`,

    brand: {
      "@type": "Brand",
      name: "Umrah Tours",
    },

    offers: {
      "@type": "Offer",

      url: canonicalUrl,

      priceCurrency: "AED",

      price: basePrice,

      availability:
        "https://schema.org/InStock",

      seller: {
        "@type": "TravelAgency",
        name: "Umrah Tours",
        url: SITE_URL,
      },
    },
  };

  /* =======================================================
     BREADCRUMB JSON-LD
  ======================================================= */

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "Holidays",
        item: `${SITE_URL}/holidays`,
      },

      {
        "@type": "ListItem",
        position: 3,
        name: region,
        item:
          `${SITE_URL}/holidays?region=` +
          encodeURIComponent(region),
      },

      {
        "@type": "ListItem",
        position: 4,
        name: destination,
        item:
          `${SITE_URL}/holidays?destination=` +
          encodeURIComponent(destination),
      },

      {
        "@type": "ListItem",
        position: 5,
        name: packageData.title,
        item: canonicalUrl,
      },
    ],
  };

  /* =======================================================
     TOURIST TRIP JSON-LD
  ======================================================= */

  const travelSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",

    name: packageData.title,

    description:
      createSeoDescription(
        packageData.description,
        `${packageData.title} ${destination} holiday experience.`
      ),

    url: canonicalUrl,

    image: packageImage
      ? [packageImage]
      : [],

    touristType: [
      "Families",
      "Couples",
      "Groups",
      "Holiday Travelers",
    ],

    itinerary: {
      "@type": "ItemList",

      name:
        `${packageData.title} Itinerary`,
    },
  };

  return (
    <>
      {/* ===================================================
          STRUCTURED DATA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            packageSchema
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            travelSchema
          ),
        }}
      />

      {/* ===================================================
          BREADCRUMB
      =================================================== */}

      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">

          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-gray-500"
          >
            <Link
              href="/"
              className="transition hover:text-emerald-600"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/holidays"
              className="transition hover:text-emerald-600"
            >
              Holidays
            </Link>

            {region &&
              region !== "Holiday" && (
                <>
                  <span>/</span>

                  <Link
                    href={`/holidays?region=${encodeURIComponent(
                      region
                    )}`}
                    className="transition hover:text-emerald-600"
                  >
                    {region}
                  </Link>
                </>
              )}

            {destination &&
              destination !== "International" && (
                <>
                  <span>/</span>

                  <Link
                    href={`/holidays?destination=${encodeURIComponent(
                      destination
                    )}`}
                    className="transition hover:text-emerald-600"
                  >
                    {destination}
                  </Link>
                </>
              )}

            <span>/</span>

            <span className="font-medium text-gray-900">
              {packageData.title}
            </span>
          </nav>

        </div>
      </section>

      {/* ===================================================
          HERO
      =================================================== */}

      <PackageHero
        title={packageData.title}
        images={packageData.images}
        price={
          packageData.price ??
          packageData.quadPrice ??
          undefined
        }
      />

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <main className="bg-gray-50">

        <div className="container mx-auto px-4 py-10 lg:py-14">

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">

            {/* ===============================================
                LEFT CONTENT
            =============================================== */}

            <div className="space-y-8">

              {/* =============================================
                  PACKAGE OVERVIEW
              ============================================= */}

              <PackageOverview
                pkg={packageData}
              />

              {/* =============================================
                  DESTINATION CONTENT
              ============================================= */}

              <section className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">

                <div className="mb-5">

                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                    Explore {destination}
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {destination} Holiday Experience
                  </h2>

                </div>

                <div className="space-y-4 leading-7 text-gray-600">

                  <p>
                    Experience an unforgettable journey
                    with our carefully designed{" "}
                    <strong>
                      {packageData.title}
                    </strong>{" "}
                    package. Discover the beauty,
                    culture, landscapes and unique
                    experiences that make{" "}
                    <strong>
                      {destination}
                    </strong>{" "}
                    one of the most exciting travel
                    destinations in the{" "}
                    <strong>
                      {region}
                    </strong>{" "}
                    region.
                  </p>

                  <p>
                    This{" "}
                    <strong>
                      {packageData.duration}
                    </strong>{" "}
                    holiday package is designed for
                    travelers looking for a
                    comfortable and memorable journey.
                    Whether you are travelling with
                    family, friends, as a couple or in
                    a group, our team can help you
                    customize your travel arrangements
                    according to your requirements.
                  </p>

                  <p>
                    Explore more carefully selected{" "}
                    <Link
                      href={`/holidays?region=${encodeURIComponent(
                        region
                      )}`}
                      className="font-semibold text-emerald-600 hover:underline"
                    >
                      {region} holiday packages
                    </Link>{" "}
                    or browse our complete collection
                    of{" "}
                    <Link
                      href="/holidays"
                      className="font-semibold text-emerald-600 hover:underline"
                    >
                      international holiday packages
                    </Link>
                    .
                  </p>

                </div>

              </section>

              {/* =============================================
                  DAY-WISE ITINERARY
              ============================================= */}

              {packageData.itinerary?.trim() && (
                <HolidayItinerary
                  itinerary={packageData.itinerary}
                  title={packageData.title}
                />
              )}

              {/* =============================================
                  INCLUSIONS
              ============================================= */}

              {inclusionItems.length > 0 && (
                <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

                  <div className="mb-6">

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                      Package Benefits
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                      What's Included
                    </h2>

                    <p className="mt-2 text-gray-500">
                      Your holiday package includes the
                      following services and arrangements.
                    </p>

                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">

                    {inclusionItems.map(
                      (item, index) => (
                        <div
                          key={`inclusion-${index}`}
                          className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4"
                        >

                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                            ✓
                          </span>

                          <p className="text-sm leading-6 text-gray-700">
                            {item}
                          </p>

                        </div>
                      )
                    )}

                  </div>

                </section>
              )}

              {/* =============================================
                  EXCLUSIONS
              ============================================= */}

              {exclusionItems.length > 0 && (
                <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

                  <div className="mb-6">

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                      Please Note
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                      What's Excluded
                    </h2>

                    <p className="mt-2 text-gray-500">
                      The following items are not included
                      in the advertised package price.
                    </p>

                  </div>

                  <div className="space-y-3">

                    {exclusionItems.map(
                      (item, index) => (
                        <div
                          key={`exclusion-${index}`}
                          className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
                        >

                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
                            ×
                          </span>

                          <p className="text-sm leading-6 text-gray-700">
                            {item}
                          </p>

                        </div>
                      )
                    )}

                  </div>

                </section>
              )}

              {/* =============================================
                  PRICING
              ============================================= */}

              <PackagePricing
                pkg={packageData}
              />

              {/* =============================================
                  HOLIDAY ACCOMMODATION
                  
                  IMPORTANT:
                  Do NOT show Makkah/Madinah hotel fields here.
                  Those fields are specific to Umrah packages.
              ============================================= */}

              {/* Holiday accommodation is intentionally
                  omitted until destination-specific hotel
                  data is available. */}

              {/* =============================================
                  RELATED PACKAGES
              ============================================= */}

              {filteredRelatedPackages.length > 0 && (
                <section className="pt-4">

                  <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

                    <div>

                      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                        You May Also Like
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        More Holiday Packages
                      </h2>

                    </div>

                    <Link
                      href="/holidays"
                      className="font-semibold text-emerald-600 hover:underline"
                    >
                      View All Holidays
                    </Link>

                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {filteredRelatedPackages.map(
                      (item) => (
                        <PackageCard
                          key={item.id}
                          package={item}
                        />
                      )
                    )}

                  </div>

                </section>
              )}

              {/* =============================================
                  REGION INTERNAL LINK
              ============================================= */}

              <section className="rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 p-6 text-white md:p-8">

                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-100">
                  More Travel Inspiration
                </p>

                <h2 className="text-2xl font-bold">
                  Discover More {region} Holidays
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-emerald-50">
                  Looking for more destinations?
                  Explore our collection of carefully
                  selected holiday packages across the{" "}
                  {region} region and find your next
                  unforgettable journey.
                </p>

                <Link
                  href={`/holidays?region=${encodeURIComponent(
                    region
                  )}`}
                  className="mt-5 inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-emerald-700 transition hover:bg-gray-100"
                >
                  Explore {region} Packages
                </Link>

              </section>

            </div>

            {/* ===============================================
                RIGHT SIDEBAR
            =============================================== */}

            <aside className="lg:sticky lg:top-24 lg:self-start">

              <PackageSidebar
                pkg={packageData}
              />

            </aside>

          </div>

        </div>

      </main>
    </>
  );
}
