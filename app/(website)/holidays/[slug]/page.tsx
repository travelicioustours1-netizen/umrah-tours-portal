import HolidayItinerary from "@/components/packages/HolidayItinerary";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (!pkg || pkg.category !== "HOLIDAY") {
    return {
      title: "Holiday Packages | Umrah Tours",
      description:
        "Explore international holiday packages with Umrah Tours.",
    };
  }

  const title = `${pkg.title} | Umrah Tours`;

  const description =
    `Explore ${pkg.title} with Umrah Tours. Discover holiday pricing, itinerary, hotels, inclusions and complete travel support from UAE.`;

  return {
    title,
    description,

    alternates: {
      canonical: `https://www.umrahtours.co/holidays/${pkg.slug}`,
    },

    openGraph: {
      title,
      description,
      url: `https://www.umrahtours.co/holidays/${pkg.slug}`,
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

  return (
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

            {/* Holiday Itinerary */}
            <HolidayItinerary
              itinerary={pkg.itinerary}
              title={pkg.title}
            />

            {/* Holiday Inclusions / Exclusions */}
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
                Related Holidays
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
  );
}
