import { notFound } from "next/navigation";
import type { Metadata } from "next";

import PackageHero from "@/components/packages/PackageHero";
import PackageOverview from "@/components/packages/PackageOverview";
import PackagePricing from "@/components/packages/PackagePricing";
import PackageHotels from "@/components/packages/PackageHotels";
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

  if (!pkg || pkg.status !== "ACTIVE") {
    return {
      title: "Umrah Package | Umrah Tours",
      description:
        "Explore Umrah packages, hotels, flights and visa assistance with Umrah Tours from the UAE.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = `${pkg.title} | Umrah Tours`;

  const description =
    `Book ${pkg.title} with Umrah Tours. Explore Umrah package pricing, Makkah and Madinah hotels, itinerary, flights and travel assistance from the UAE.`;

  const image =
    pkg.images?.[0]?.url ||
    `${SITE_URL}/images/hero/umrah-hero.jpg`;

  return {
    title,
    description,

    keywords: [
      pkg.title,
      "Umrah packages UAE",
      "Umrah packages Dubai",
      "Umrah packages Sharjah",
      "Umrah package from UAE",
      "Umrah travel agency UAE",
      "Umrah visa UAE",
      "Makkah Madinah Umrah package",
    ],

    alternates: {
      canonical: `${SITE_URL}/umrah/${pkg.slug}`,
    },

    openGraph: {
      title,
      description,
      url: `${SITE_URL}/umrah/${pkg.slug}`,
      siteName: "Umrah Tours",
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: image,
          alt: pkg.title,
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
    },
  };
}

export default async function PackageDetails({
  params,
}: Props) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (!pkg || pkg.status !== "ACTIVE") {
    notFound();
  }

  const relatedPackages = await getRelatedPackages(
    pkg.category ?? "",
    pkg.id
  );

  const packageUrl = `${SITE_URL}/umrah/${pkg.slug}`;

  const packageImage =
    pkg.images?.[0]?.url ||
    `${SITE_URL}/images/hero/umrah-hero.jpg`;

  const packagePrice =
    pkg.quadPrice ??
    pkg.price ??
    undefined;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${packageUrl}#product`,
    name: pkg.title,
    description:
      pkg.description ||
      `Book ${pkg.title} with Umrah Tours. Explore package pricing, hotels and complete Umrah travel arrangements.`,
    image: [packageImage],
    url: packageUrl,

    brand: {
      "@type": "Brand",
      name: "Umrah Tours",
    },

    category: "Umrah Travel Package",

    ...(packagePrice && Number(packagePrice) > 0
      ? {
          offers: {
            "@type": "Offer",
            url: packageUrl,
            priceCurrency: "AED",
            price: String(packagePrice),
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "TravelAgency",
              name: "Umrah Tours",
              url: SITE_URL,
            },
          },
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Hero */}
        <PackageHero
          title={pkg.title}
          images={pkg.images}
          price={pkg.price}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            <PackageOverview pkg={pkg} />

            <PackageHotels
              makkahHotel={pkg.makkahHotel}
              madinahHotel={pkg.madinahHotel}
            />

            <PackagePricing pkg={pkg} />

            {pkg.itinerary && (
              <section className="rounded-xl bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold">
                  Umrah Itinerary
                </h2>

                <div className="whitespace-pre-line leading-7 text-gray-700">
                  {pkg.itinerary}
                </div>
              </section>
            )}

            {pkg.inclusions && (
              <section className="rounded-xl bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold">
                  Package Inclusions
                </h2>

                <div className="whitespace-pre-line leading-7 text-gray-700">
                  {pkg.inclusions}
                </div>
              </section>
            )}

            {pkg.exclusions && (
              <section className="rounded-xl bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold">
                  Package Exclusions
                </h2>

                <div className="whitespace-pre-line leading-7 text-gray-700">
                  {pkg.exclusions}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <PackageSidebar pkg={pkg} />
          </div>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <section className="mt-16">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                Explore More
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Related Umrah Packages
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
    </>
  );
}