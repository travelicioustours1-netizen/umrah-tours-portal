import HolidayItinerary from "@/components/packages/HolidayItinerary";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductSchema from "@/components/SEO/ProductSchema";
import PackageHero from "@/components/packages/PackageHero";
import PackageSidebar from "@/components/packages/PackageSidebar";
import PackageCard from "@/components/packages/PackageCard";
import HolidayInclusions from "@/components/packages/HolidayInclusions";

import {
  getPackageBySlug,
  getRelatedPackages,
} from "@/lib/package-service";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const SITE_URL = "https://umrahtours.co";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (
    !pkg ||
    pkg.category !== "HOLIDAY" ||
    pkg.status !== "ACTIVE"
  ) {
    return {
      title: "Holiday Packages from UAE | Umrah Tours",
      description:
        "Explore international holiday packages from the UAE with Umrah Tours, including family holidays, tours, hotels and complete travel assistance.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const packageUrl = `${SITE_URL}/holidays/${pkg.slug}`;

  const imageUrl =
    pkg.images?.[0]?.url ||
    `${SITE_URL}/images/holidays/holiday-hero.jpg`;

  /*
   * Keep SEO title concise and keyword-focused.
   */
  const title = `${pkg.title} | Holiday Package from UAE`;

  /*
   * Use package description when available, but keep it
   * suitable for search-engine snippets.
   */
  const rawDescription =
    pkg.description?.trim() ||
    `Explore ${pkg.title} with Umrah Tours. Discover holiday itinerary, hotels, pricing and complete travel support from the UAE.`;

  const description =
    rawDescription.length > 160
      ? `${rawDescription.substring(0, 157).trim()}...`
      : rawDescription;

  /*
   * Destination-specific keywords based on package title.
   */
  const keywords = [
    pkg.title,
    "holiday packages UAE",
    "holiday packages from UAE",
    "holiday packages Dubai",
    "holiday packages Sharjah",
    "international holiday packages UAE",
    "international tours from UAE",
    "family holiday packages UAE",
    "tour packages from UAE",
    "travel packages UAE",
    "Umrah Tours",
  ];

  return {
    title,
    description,

    keywords,

    authors: [
      {
        name: "Umrah Tours",
      },
    ],

    creator: "Umrah Tours",
    publisher: "Umrah Tours",

    alternates: {
      canonical: packageUrl,
    },

    openGraph: {
      title,
      description,
      url: packageUrl,
      siteName: "Umrah Tours",
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${pkg.title} - Umrah Tours`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
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
}

export default async function HolidayDetails({
  params,
}: Props) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (
    !pkg ||
    pkg.category !== "HOLIDAY" ||
    pkg.status !== "ACTIVE"
  ) {
    notFound();
  }

  const relatedPackages = await getRelatedPackages(
    pkg.category,
    pkg.id
  );

  const packageUrl = `${SITE_URL}/holidays/${pkg.slug}`;

  const packageImage =
    pkg.images?.[0]?.url ||
    `${SITE_URL}/images/holidays/holiday-hero.jpg`;

  const price =
    typeof pkg.price === "number" && pkg.price > 0
      ? pkg.price
      : pkg.quadPrice && pkg.quadPrice > 0
        ? pkg.quadPrice
        : undefined;

  
  const touristTripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${packageUrl}#trip`,
    name: pkg.title,
    description:
      pkg.description ||
      `Explore ${pkg.title} with Umrah Tours, including holiday travel services from the UAE.`,
    url: packageUrl,
    image: [packageImage],

    touristType: [
      "Leisure Travelers",
      "Family Travelers",
      "International Tourists",
    ],

    provider: {
      "@type": "TravelAgency",
      name: "Umrah Tours",
      url: SITE_URL,
    },

    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },

    ...(pkg.duration
      ? {
          duration: pkg.duration,
        }
      : {}),
  };

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
        name: "Holiday Packages",
        item: `${SITE_URL}/holidays`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pkg.title,
        item: packageUrl,
      },
    ],
  };

  return (
    <>
      <ProductSchema
  name={pkg.title}
  description={
    pkg.description ||
    `Book ${pkg.title} with Umrah Tours. Explore holiday itinerary, accommodation and travel arrangements from the UAE.`
  }
  url={packageUrl}
  image={packageImage}
  price={price}
  currency="AED"
  sku={pkg.slug}
/>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(touristTripSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <main className="bg-gray-50">
        {/* Hero */}
        <PackageHero
          title={pkg.title}
          images={pkg.images}
          price={pkg.price}
        />

        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              <HolidayItinerary
                itinerary={pkg.itinerary}
                title={pkg.title}
              />

              <HolidayInclusions
                inclusions={pkg.inclusions}
                exclusions={pkg.exclusions}
                destination={pkg.title}
              />
            </div>

            {/* Sidebar */}
            <div>
              <PackageSidebar
                pkg={{
                  ...pkg,
                  category: pkg.category,
                }}
              />
            </div>
          </div>

          {/* Related Holidays */}
          {relatedPackages.length > 0 && (
            <section className="mt-16">
              <div className="mb-7">
                <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                  Explore More
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  Related Holiday Packages
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPackages.map((item) => (
                  <PackageCard
                    key={item.id}
                    package={item}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
