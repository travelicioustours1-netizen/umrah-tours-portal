import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Makkah & Madinah Hotels | Umrah Tours",
  description:
    "Explore comfortable hotel accommodation in Makkah and Madinah with Umrah Tours. Find suitable stays near the holy sites for your Umrah journey.",
  alternates: {
    canonical: "https://umrahtours.co/hotels",
  },
  openGraph: {
    title: "Makkah & Madinah Hotels | Umrah Tours",
    description:
      "Explore comfortable hotel accommodation in Makkah and Madinah with Umrah Tours.",
    url: "https://umrahtours.co/hotels",
    siteName: "Umrah Tours",
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Makkah & Madinah Hotels | Umrah Tours",
    description:
      "Explore hotel accommodation in Makkah and Madinah near Masjid Al Haram and Masjid An Nabawi for your Umrah journey.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const hotels = [
  {
    name: "Premium Makkah Hotel",
    location: "Near Masjid Al Haram, Makkah",
    category: "5 Star Accommodation",
    image: "/images/hotels/makkah-hotel.jpg",
  },
  {
    name: "Comfort Makkah Stay",
    location: "Makkah, Saudi Arabia",
    category: "3-4 Star Accommodation",
    image: "/images/hotels/makkah-hotel2.jpg",
  },
  {
    name: "Madinah Blessed Hotel",
    location: "Near Masjid An Nabawi, Madinah",
    category: "4 Star Accommodation",
    image: "/images/hotels/madinah-hotel.jpg",
  },
];

const benefits = [
  {
    title: "Quality Hotels",
    description:
      "Comfortable accommodation options selected for Umrah travellers.",
    icon: "★",
  },
  {
    title: "Best Rates",
    description:
      "Hotel options suitable for different budgets and travel requirements.",
    icon: "AED",
  },
  {
    title: "Prime Locations",
    description:
      "Stay options close to the holy sites and convenient travel areas.",
    icon: "LOC",
  },
];

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Makkah & Madinah Hotels",
  description:
    "Explore hotel accommodation in Makkah and Madinah near the holy sites for Umrah travellers.",
  url: "https://umrahtours.co/hotels",
  isPartOf: {
    "@type": "WebSite",
    name: "Umrah Tours",
    url: "https://umrahtours.co",
  },
  about: {
    "@type": "Thing",
    name: "Makkah and Madinah Hotel Accommodation",
  },
  provider: {
    "@id": "https://umrahtours.co/#organization",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Makkah",
      containedInPlace: {
        "@type": "Country",
        name: "Saudi Arabia",
      },
    },
    {
      "@type": "City",
      name: "Madinah",
      containedInPlace: {
        "@type": "Country",
        name: "Saudi Arabia",
      },
    },
  ],
  mainEntity: {
    "@type": "ItemList",
    name: "Makkah and Madinah Hotels",
    numberOfItems: hotels.length,
    itemListElement: hotels.map((hotel, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: hotel.name,
      description: hotel.location,
    })),
  },
};

export default function HotelsPage() {
  return (
    <main className="bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hotelSchema),
        }}
      />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[480px] overflow-hidden">
        <Image
          src="/images/hero/umrah-hero.jpg"
          alt="Makkah and Madinah hotel accommodation"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-3xl text-white">
              <p className="font-semibold uppercase tracking-[5px] text-emerald-300">
                Accommodation
              </p>

              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">
                Makkah &amp; Madinah Hotels
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
                Comfortable stays near the holy sites with accommodation
                options suitable for every budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-[4px] text-emerald-600">
              Hotel Accommodation
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              Stay Close To The Holy Sites
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Choose from accommodation options in Makkah and Madinah to make
              your Umrah journey comfortable and convenient.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <article
                key={hotel.name}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-64">
                  <Image
                    src={hotel.image}
                    alt={`${hotel.name} in ${hotel.location}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                    {hotel.category}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    {hotel.name}
                  </h3>

                  <p className="mt-3 text-gray-600">{hotel.location}</p>

                  <p className="mt-5 text-sm leading-6 text-gray-500">
                    Comfortable accommodation options for travellers visiting
                    the holy cities.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-emerald-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-[4px] text-emerald-600">
              Why Book With Us
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900">
              Comfortable Stays For Your Journey
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                  {benefit.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-800 py-16 text-center text-white md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-semibold uppercase tracking-[4px] text-emerald-200">
            Hotel Enquiries
          </p>

          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Need Help Choosing A Hotel?
          </h2>

          <p className="mt-5 text-lg leading-8 text-emerald-50">
            Contact Umrah Tours for hotel options in Makkah and Madinah based
            on your preferred location, category and budget.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-emerald-800 transition hover:bg-gray-100"
          >
            Enquire Now
          </a>
        </div>
      </section>
    </main>
  );
}