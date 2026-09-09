import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ProductSchema from "@/components/SEO/ProductSchema";
import PackageHero from "@/components/packages/PackageHero";
import PackageSidebar from "@/components/packages/PackageSidebar";
import PackageCard from "@/components/packages/PackageCard";

import {
  getPackageBySlug,
  getRelatedPackages,
} from "@/lib/package-service";

const SITE_URL = "https://umrahtours.co";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (
    !pkg ||
    pkg.category?.toLowerCase() !== "umrah" ||
    pkg.status !== "ACTIVE"
  ) {
    return {
      title: "Umrah Package",
      description:
        "Explore Umrah packages from the UAE with accommodation, flights, visa assistance and pilgrimage travel services.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const packageUrl = `${SITE_URL}/umrah/${pkg.slug}`;

  const image =
    pkg.images?.[0]?.url ||
    `${SITE_URL}/images/hero/umrah-hero.jpg`;

  /*
   * SEO title:
   * Use the package-specific SEO title when available.
   *
   * Do NOT add "| Umrah Tours" here because the global
   * metadata title template in app/layout.tsx already adds
   * the brand suffix.
   */
  const title =
    pkg.seoTitle?.trim() ||
    `${pkg.title} | Umrah Package UAE`;

  const fallbackDescription =
    `Explore ${pkg.title} with Umrah Tours. ` +
    `Discover Umrah accommodation, flights, visa assistance ` +
    `and pilgrimage travel arrangements from the UAE.`;

  const rawDescription =
  pkg.seoDescription?.trim() ||
  pkg.description?.trim() ||
  fallbackDescription;

/*
 * Clean Markdown formatting before using the text
 * as the HTML meta description.
 */
const cleanDescription = rawDescription
  .replace(/^#{1,6}\s+/gm, "")
  .replace(/\*\*(.*?)\*\*/g, "$1")
  .replace(/\*(.*?)\*/g, "$1")
  .replace(/`(.*?)`/g, "$1")
  .replace(/\r?\n+/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const description =
  cleanDescription.length > 160
    ? `${cleanDescription.substring(0, 157).trim()}...`
    : cleanDescription;

  return {
    title,
    description,

    keywords: [
      ...(pkg.seoKeywords
        ? pkg.seoKeywords
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean)
        : []),

      pkg.title,

      "Umrah package UAE",
      "Umrah packages UAE",
      "Umrah packages Dubai",
      "Umrah packages Sharjah",
      "Umrah package from UAE",
      "Umrah travel UAE",
      "Umrah tours UAE",
      "Umrah visa UAE",
      "Makkah Umrah package",
      "Madinah Umrah package",
      "Makkah Madinah Umrah package",
    ],

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
          url: image,
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
      images: [image],
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

/* =========================================================
   PAGE
========================================================= */

export default async function UmrahPackageDetails({
  params,
}: Props) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (
    !pkg ||
    pkg.category?.toLowerCase() !== "umrah" ||
    pkg.status !== "ACTIVE"
  ) {
    notFound();
  }

  const relatedPackages = await getRelatedPackages(
    pkg.category ?? "UMRAH",
    pkg.id
  );

  const packageUrl = `${SITE_URL}/umrah/${pkg.slug}`;

  const packageImage =
    pkg.images?.[0]?.url ||
    `${SITE_URL}/images/hero/umrah-hero.jpg`;

  /*
   * Determine the lowest available package price.
   *
   * Priority:
   * 1. General package price
   * 2. Quad occupancy price
   */
  const packagePrice =
    pkg.price && Number(pkg.price) > 0
      ? Number(pkg.price)
      : pkg.quadPrice && Number(pkg.quadPrice) > 0
        ? Number(pkg.quadPrice)
        : undefined;

  const packageDescription =
    pkg.seoDescription?.trim() ||
    pkg.description?.trim() ||
    `Explore ${pkg.title} with Umrah Tours. ` +
      `Book Umrah travel arrangements from the UAE with ` +
      `Makkah and Madinah accommodation, flights and visa assistance.`;

  return (
    <>
      {/* =======================================================
          PRODUCT SCHEMA
      ======================================================= */}

      <ProductSchema
        name={pkg.title}
        description={packageDescription}
        url={packageUrl}
        image={packageImage}
        price={packagePrice}
        currency="AED"
        sku={pkg.slug}
      />

     

      {/* =======================================================
          BREADCRUMB SCHEMA
      ======================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "Umrah Packages",
                item: `${SITE_URL}/umrah`,
              },

              {
                "@type": "ListItem",
                position: 3,
                name: pkg.title,
                item: packageUrl,
              },
            ],
          }),
        }}
      />

      {/* =======================================================
          MAIN
      ======================================================= */}

      <main className="bg-gray-50">
        {/* =====================================================
            HERO
        ===================================================== */}

        <PackageHero
          title={pkg.title}
          images={pkg.images}
          price={pkg.price}
        />

        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="space-y-8 lg:col-span-2">

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              {pkg.description && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                    Umrah Package
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {pkg.title}
                  </h2>

                  <div className="mt-6 whitespace-pre-line leading-8 text-gray-700">
                    {pkg.description}
                  </div>
                </section>
              )}

              {/* =================================================
                  ITINERARY
              ================================================= */}

              {pkg.itinerary && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Umrah Itinerary
                  </h2>

                  <div className="whitespace-pre-line leading-8 text-gray-700">
                    {pkg.itinerary}
                  </div>
                </section>
              )}

              {/* =================================================
                  INCLUSIONS
              ================================================= */}

              {pkg.inclusions && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Package Inclusions
                  </h2>

                  <div className="whitespace-pre-line leading-8 text-gray-700">
                    {pkg.inclusions}
                  </div>
                </section>
              )}

              {/* =================================================
                  EXCLUSIONS
              ================================================= */}

              {pkg.exclusions && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Package Exclusions
                  </h2>

                  <div className="whitespace-pre-line leading-8 text-gray-700">
                    {pkg.exclusions}
                  </div>
                </section>
              )}

              {/* =================================================
                  UMRAH INFORMATION
              ================================================= */}

              <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Important Umrah Information
                </h2>

                <p className="mt-4 leading-7 text-gray-700">
                  Package availability, hotel accommodation,
                  flights, transportation, visa requirements and
                  travel arrangements may vary according to the
                  selected package, travel dates and applicable
                  Saudi Arabian regulations.
                </p>

                <p className="mt-4 leading-7 text-gray-700">
                  Please contact Umrah Tours for current
                  availability, pricing, travel requirements and
                  booking assistance before making your travel
                  arrangements.
                </p>
              </section>
            </div>

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <div>
              <PackageSidebar pkg={pkg} />
            </div>
          </div>

          {/* =====================================================
              RELATED UMRAH PACKAGES
          ===================================================== */}

          {relatedPackages.length > 0 && (
            <section className="mt-16">
              <div className="mb-7">
                <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                  Explore More
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  Related Umrah Packages
                </h2>

                <p className="mt-3 max-w-3xl text-gray-600">
                  Explore more Umrah packages from the UAE and
                  compare available accommodation, travel
                  arrangements and package options.
                </p>
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
