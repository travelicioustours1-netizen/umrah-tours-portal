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

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (
    !pkg ||
    pkg.category?.toLowerCase() !== "visa" ||
    pkg.status !== "ACTIVE"
  ) {
    return {
      title: "Visa Package | Umrah Tours",
      description:
        "Explore visa services and visa packages from Umrah Tours.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const packageUrl = `${SITE_URL}/visa/${pkg.slug}`;

  const image =
    pkg.images?.[0]?.url ||
    `${SITE_URL}/images/hero/umrah-hero.jpg`;

  const title =
  pkg.seoTitle?.trim() ||
  `${pkg.title} - Visa Services UAE`;

  const fallbackDescription =
  `Explore ${pkg.title} with Umrah Tours. Get professional visa assistance and travel support from the UAE.`;

const rawDescription =
  pkg.seoDescription?.trim() ||
  pkg.description?.trim() ||
  fallbackDescription;

const description =
  rawDescription.length > 160
    ? `${rawDescription.substring(0, 157).trim()}...`
    : rawDescription;

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
  "visa services UAE",
  "visa assistance UAE",
  "visa services Dubai",
  "visa services Sharjah",
  "Umrah visa UAE",
  "Umrah visa from UAE",
  "Saudi visa UAE",
  "visa package UAE",
  "Umrah Tours",
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

export default async function VisaPackageDetails({
  params,
}: Props) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (
    !pkg ||
    pkg.category?.toLowerCase() !== "visa" ||
    pkg.status !== "ACTIVE"
  ) {
    notFound();
  }

  const relatedPackages = await getRelatedPackages(
    pkg.category ?? "VISA",
    pkg.id
  );

  const packageUrl = `${SITE_URL}/visa/${pkg.slug}`;

  const packageImage =
    pkg.images?.[0]?.url ||
    `${SITE_URL}/images/hero/umrah-hero.jpg`;

  const packagePrice =
    pkg.price && Number(pkg.price) > 0
      ? Number(pkg.price)
      : pkg.quadPrice && Number(pkg.quadPrice) > 0
        ? Number(pkg.quadPrice)
        : undefined;

  return (
    <>
      {/* =========================================================
          PRODUCT SCHEMA
      ========================================================= */}
      <ProductSchema
        name={pkg.title}
        description={
          pkg.description ||
          `Book ${pkg.title} with Umrah Tours. Get professional visa assistance and travel support from the UAE.`
        }
        url={packageUrl}
        image={packageImage}
        price={packagePrice}
        currency="AED"
        sku={pkg.slug}
      />

      {/* =========================================================
          BREADCRUMB SCHEMA
      ========================================================= */}
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
                name: "Visa Services",
                item: `${SITE_URL}/visa`,
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

      {/* =========================================================
          MAIN
      ========================================================= */}
      <main className="bg-gray-50">

        {/* Hero */}
        <PackageHero
          title={pkg.title}
          images={pkg.images}
          price={pkg.price}
        />

        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">

            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}
            <div className="space-y-8 lg:col-span-2">

              {/* Description */}
              <section className="rounded-2xl bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                  Visa Service
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {pkg.title}
                </h2>

                <div className="mt-6 whitespace-pre-line leading-8 text-gray-700">
                  {pkg.description}
                </div>
              </section>

              {/* Visa Highlights */}
              <section className="rounded-2xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900">
                  Visa Service Highlights
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  <div className="rounded-xl bg-emerald-50 p-5">
                    <h3 className="font-bold text-gray-900">
                      Professional Assistance
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Get guidance throughout the visa application process.
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-5">
                    <h3 className="font-bold text-gray-900">
                      Document Guidance
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Receive guidance on the documents required for your
                      application.
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-5">
                    <h3 className="font-bold text-gray-900">
                      Convenient Processing
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Our team helps make the application process simple and
                      convenient.
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-5">
                    <h3 className="font-bold text-gray-900">
                      Travel Support
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Get travel-focused support before your journey.
                    </p>
                  </div>

                </div>
              </section>

              {/* Itinerary / Process */}
              {pkg.itinerary && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Visa Process & Details
                  </h2>

                  <div className="whitespace-pre-line leading-8 text-gray-700">
                    {pkg.itinerary}
                  </div>
                </section>
              )}

              {/* Inclusions */}
              {pkg.inclusions && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Service Inclusions
                  </h2>

                  <div className="whitespace-pre-line leading-8 text-gray-700">
                    {pkg.inclusions}
                  </div>
                </section>
              )}

              {/* Exclusions */}
              {pkg.exclusions && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Service Exclusions
                  </h2>

                  <div className="whitespace-pre-line leading-8 text-gray-700">
                    {pkg.exclusions}
                  </div>
                </section>
              )}

              {/* Important Note */}
              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Important Visa Information
                </h2>

                <p className="mt-4 leading-7 text-gray-700">
                  Visa issuance, validity, entry requirements, permitted stay
                  and approval are subject to the applicable Saudi Arabian
                  immigration and government regulations. Requirements and
                  processing times may vary according to nationality and visa
                  type.
                </p>
              </section>
            </div>

            {/* =====================================================
                SIDEBAR
            ===================================================== */}
            <div>
              <PackageSidebar pkg={pkg} />
            </div>
          </div>

          {/* =======================================================
              RELATED VISA PACKAGES
          ======================================================= */}
          {relatedPackages.length > 0 && (
            <section className="mt-16">
              <div className="mb-7">
                <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                  Explore More
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  Related Visa Services
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