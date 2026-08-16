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

  if (!pkg) {
    return {
      title: "Umrah Package | Umrah Tours",
      description:
        "Explore Umrah packages with Umrah Tours.",
    };
  }

  const title = `${pkg.title} | Umrah Tours`;

  const description =
    `Book ${pkg.title} with Umrah Tours. Explore package pricing, hotels, itinerary, flights and complete Umrah travel services from UAE.`;

  return {
    title,
    description,

    alternates: {
      canonical: `https://www.umrahtours.co/umrah/${pkg.slug}`,
    },

    openGraph: {
      title,
      description,
      url: `https://www.umrahtours.co/umrah/${pkg.slug}`,
      siteName: "Umrah Tours",
      locale: "en_AE",
      type: "website",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
export default async function PackageDetails({ params }: Props) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const relatedPackages = await getRelatedPackages(
    pkg.category ?? "",
    pkg.id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <PackageHero
  title={pkg.title}
  images={pkg.images}
/>

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          <PackageOverview pkg={pkg} />

          <PackageHotels
            makkahHotel={pkg.makkahHotel}
            madinahHotel={pkg.madinahHotel}
          />

          <PackagePricing pkg={pkg} />

          {pkg.itinerary && (
            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-4">
                Itinerary
              </h2>

              <div className="whitespace-pre-line text-gray-700">
                {pkg.itinerary}
              </div>
            </section>
          )}

          {pkg.inclusions && (
            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-4">
                Inclusions
              </h2>

              <div className="whitespace-pre-line text-gray-700">
                {pkg.inclusions}
              </div>
            </section>
          )}

          {pkg.exclusions && (
            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-4">
                Exclusions
              </h2>

              <div className="whitespace-pre-line text-gray-700">
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
          <h2 className="text-3xl font-bold mb-6">
            Related Packages
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}

