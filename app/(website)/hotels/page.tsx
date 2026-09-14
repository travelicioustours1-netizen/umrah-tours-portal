import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";

const baseUrl = "https://www.umrahtours.co";

const stay22HotelLink =
  "https://agoda.stay22.com/umrahtours/zMQhU4GnlS";

export const metadata: Metadata = {
  title: "Makkah & Madinah Hotels | Umrah Tours",

  description:
    "Find hotels in Makkah, Madinah, Dubai and other destinations. Explore comfortable hotel options for Umrah and international holidays with Umrah Tours.",

  keywords: [
    "Makkah hotels",
    "Madinah hotels",
    "Makkah hotels near Haram",
    "Madinah hotels near Masjid Nabawi",
    "Umrah hotels",
    "Umrah hotels UAE",
    "Dubai hotels",
    "hotel booking UAE",
    "hotel booking Dubai",
    "hotel booking Sharjah",
  ],

  authors: [
    {
      name: "Umrah Tours",
    },
  ],

  creator: "Umrah Tours",
  publisher: "Umrah Tours",

  alternates: {
    canonical: `${baseUrl}/hotels`,
  },

  openGraph: {
    title: "Makkah & Madinah Hotels | Umrah Tours",

    description:
      "Explore Makkah and Madinah hotels for your Umrah journey, plus hotel options for Dubai and international holidays.",

    url: `${baseUrl}/hotels`,

    siteName: "Umrah Tours",

    locale: "en_AE",

    type: "website",

    images: [
      {
        url: `${baseUrl}/images/hero/umrah-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Makkah and Madinah Hotels - Umrah Tours",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Makkah & Madinah Hotels | Umrah Tours",

    description:
      "Find hotels in Makkah, Madinah, Dubai and other destinations with Umrah Tours.",

    images: [`${baseUrl}/images/hero/umrah-hero.jpg`],
  },
};

const hotels = [
  {
    name: "Premium Makkah Hotel",
    location: "Makkah, Saudi Arabia",
    description:
      "Comfortable accommodation options for pilgrims looking to stay close to the holy sites.",
    image: "/images/hotels/makkah.jpg",
  },
  {
    name: "Comfort Makkah Stay",
    location: "Makkah, Saudi Arabia",
    description:
      "Practical hotel options suitable for families, couples and Umrah travellers.",
    image: "/images/hotels/makkah.jpg",
  },
  {
    name: "Madinah Blessed Hotel",
    location: "Madinah, Saudi Arabia",
    description:
      "Stay comfortably in Madinah while visiting Masjid an-Nabawi and surrounding attractions.",
    image: "/images/hotels/madinah.jpg",
  },
];

const benefits = [
  {
    title: "Makkah & Madinah",
    description:
      "Hotel options for pilgrims travelling to Makkah and Madinah.",
  },
  {
    title: "Flexible Options",
    description:
      "Explore accommodation choices for different budgets and travel needs.",
  },
  {
    title: "Hotel Booking Assistance",
    description:
      "Need help choosing your hotel? Contact our travel team for assistance.",
  },
];

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Makkah & Madinah Hotels",
  description:
    "Hotel options in Makkah, Madinah and other destinations for Umrah and holiday travellers.",
  url: `${baseUrl}/hotels`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: hotels.map((hotel, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: hotel.name,
      description: hotel.description,
      url: `${baseUrl}/hotels`,
    })),
  },
};

export default function HotelsPage() {
  return (
    <main className="bg-gray-50">
      {/* Stay22 LetMeAllez */}
      <Script id="stay22-letmeallez" strategy="afterInteractive">
        {`
          (function (s, t, a, y, twenty, two) {
            s.Stay22 = s.Stay22 || {};
            s.Stay22.params = { lmaID: '6aa82064f4418a015b77cc70' };
            twenty = t.createElement(a);
            two = t.getElementsByTagName(a)[0];
            twenty.async = 1;
            twenty.src = y;
            two.parentNode.insertBefore(twenty, two);
          })(window, document, 'script', 'https://scripts.stay22.com/letmeallez.js');
        `}
      </Script>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hotelSchema),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/umrah-hero.jpg"
            alt="Makkah and Madinah hotels"
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-24 text-white">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-300">
              Hotel Booking
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Makkah, Madinah & International Hotels
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-200">
              Explore hotel options for Umrah, holidays and international
              travel. Find accommodation that suits your location, budget and
              travel needs.
            </p>
          </div>
        </div>
      </section>

      {/* Hotel Booking CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                Hotel Booking
              </p>

              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Find & Book Your Hotel
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                Search and compare accommodation options for your next trip.
                Book hotels through our hotel booking partner and explore
                available options for your destination.
              </p>

              <p className="mt-3 text-sm text-gray-500">
                Hotel booking is provided through our accommodation partner.
              </p>
            </div>

            <a
              href={stay22HotelLink}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Search Hotels
            </a>
          </div>
        </div>
      </section>

      {/* Featured Hotel Options */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Hotel Options for Your Journey
          </h2>

          <p className="mt-2 max-w-2xl text-gray-600">
            Whether you are travelling for Umrah or planning an international
            holiday, we can help you find suitable accommodation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {hotels.map((hotel) => (
            <article
              key={hotel.name}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200"
            >
              <div className="relative h-56">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <p className="text-sm font-medium text-blue-600">
                  {hotel.location}
                </p>

                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {hotel.name}
                </h3>

                <p className="mt-3 leading-6 text-gray-600">
                  {hotel.description}
                </p>

                <a
                  href={stay22HotelLink}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  className="mt-5 inline-flex font-semibold text-blue-600 hover:text-blue-700"
                >
                  Search Hotels →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-gray-200 p-6"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-6 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white">
          <h2 className="text-3xl font-bold">
            Need Help Choosing a Hotel?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-300">
            Speak with Umrah Tours for hotel recommendations, Umrah
            accommodation and customized travel assistance.
          </p>

          <a
            href="https://wa.me/971525657940?text=Assalamu%20Alaikum%2C%20I%20need%20help%20with%20hotel%20booking."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-green-600 px-7 py-3.5 font-semibold text-white transition hover:bg-green-700"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </main>
  );
}