import TravelpayoutsWidget from "@/components/common/TravelpayoutsWidget";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airport Transfers UAE | Dubai & Sharjah | Umrah Tours",
  description:
    "Book reliable airport transfers from Dubai, Sharjah and across the UAE. Compare private airport transfers, taxis, shuttles and city transfers worldwide with Umrah Tours.",
  alternates: {
    canonical: "https://umrahtours.co/airport-transfers",
  },
  openGraph: {
    title: "Airport Transfers UAE | Dubai & Sharjah | Umrah Tours",
    description:
      "Book reliable airport transfers from Dubai, Sharjah and across the UAE. Compare private transfers, taxis and shuttle services worldwide.",
    url: "https://umrahtours.co/airport-transfers",
    siteName: "Umrah Tours",
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airport Transfers UAE | Dubai & Sharjah",
    description:
      "Compare and book airport transfers, private cars and shuttle services from Dubai, Sharjah and worldwide.",
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

const airportTransfersSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Airport Transfers UAE | Dubai & Sharjah",
  description:
    "Compare and book airport transfers, private cars, taxis and shuttle services from Dubai, Sharjah and destinations worldwide.",
  url: "https://umrahtours.co/airport-transfers",
  isPartOf: {
    "@type": "WebSite",
    name: "Umrah Tours",
    url: "https://umrahtours.co",
  },
  about: {
    "@type": "Thing",
    name: "Airport Transfers",
  },
  provider: {
    "@id": "https://umrahtours.co/#organization",
  },
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },
  mainEntity: {
    "@type": "Service",
    name: "Airport Transfer Services",
    serviceType: "Airport Transfers",
    description:
      "Airport transfer, private car, taxi and shuttle booking services for travellers from Dubai, Sharjah and worldwide destinations.",
    provider: {
      "@id": "https://umrahtours.co/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
  },
};

function WidgetCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>

      <div className="w-full overflow-hidden">{children}</div>
    </div>
  );
}

export default function AirportTransfersPage() {
  return (
    <main className="bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(airportTransfersSchema),
        }}
      />

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="bg-emerald-700">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-100">
              Airport Transfers
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Airport Transfers Made Easy
            </h1>

            <p className="mt-5 text-lg leading-8 text-emerald-50">
              Book airport transfers, private cars and shuttle services for
              your next journey. Compare available transfer options and travel
              comfortably from the airport to your destination.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================== */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="mb-3 text-2xl" aria-hidden="true">
                ✈️
              </div>

              <h2 className="font-semibold text-gray-900">
                Airport Pickups
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Arrange your airport transportation before you travel.
              </p>
            </div>

            <div>
              <div className="mb-3 text-2xl" aria-hidden="true">
                🌍
              </div>

              <h2 className="font-semibold text-gray-900">
                Worldwide Coverage
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Explore transfer options across destinations around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN SEARCH
      ========================================================== */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Search Transfers
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Find Your Airport Transfer
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Search for airport transfers and shuttle services for your
              journey.
            </p>
          </div>

          <WidgetCard
            title="Airport Transfer Search"
            description="Search available airport transfer options."
          >
            <TravelpayoutsWidget
              src="https://tpemb.com/content?trs=571731&powered_by=true&shmarker=775245&from=dubai&language=ru&display_currency=USD&transfer_type=any&hide_form_extras=true&hide_external_links=true&disable_currency_selector=true&campaign_id=1&promo_id=691"
            />
          </WidgetCard>
        </div>
      </section>

      {/* =========================================================
          KIWITAXI
      ========================================================== */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Kiwitaxi
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Kiwitaxi Transfer Options
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Explore different Kiwitaxi transfer and shuttle options.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <WidgetCard
              title="Kiwitaxi White Label"
              description="Full transfer search experience."
            >
              <TravelpayoutsWidget
                src="https://tpemb.com/content?currency=USD&trs=571731&shmarker=775245&locale=en&from=dubai&to=&country=&powered_by=true&height=&wtype=true&transfers_limit=10&bg_color=%23f5f5f5&button_color=%23239a54&button_font_color=%23ffffff&button_hover_color=%230274da&border_color=%23f9ac1a&input_font_color=%23c8ced4&input_bg_color=%23ffffff&input_label_color=%23c8ced4&icon_bg_color=%23ffffff&icon_arrow_color=%236c7c8c&icon_bg_color_mobile=%23f9ac1a&icon_arrow_color_mobile=%23ffffff&autocomplete_font_color=%23373f47&autocomplete_bg_color=%23ffffff&autocomplete_font_color_active=%23ffffff&autocomplete_bg_color_active=%23239a54&loader_color=%23f9ac1a&empty_color=%23373f47&info_bg_color=%23fff0cc&info_icon_color=%234a4a4a&info_caption_color=%234a4a4a&class_background=%23ffffff&class_font_color=%23373f47&class_header_color=%236c7c8c&class_button_background=%2326a65b&class_button_font_color=%23ffffff&class_button_background_hover=%230274da&class_comment_background=%23bfc0c4&class_comment_font=%23bfc0c4&more_background=&more_background_hover=&more_font_color=%230267c1&notification_background=%23f6f1ec&notification_border_color=%23e37f17&notification_color=%23373f47&transfer_background=%23f6f7f8&transfer_background_hover=%23f6f7f8&transfer_font_color=%23373f47&campaign_id=1&promo_id=2949"
              />
            </WidgetCard>

            <WidgetCard
              title="Kiwitaxi Shuttles"
              description="Search shuttle transfer options."
            >
              <TravelpayoutsWidget
                src="https://tpemb.com/content?currency=USD&trs=571731&shmarker=775245&locale=en&from=dubai&powered_by=true&transfer_options_limit=10&transfer_options=MCR&disable_currency_selector=true&hide_form_extras=true&hide_external_links=true&campaign_id=1&promo_id=3879"
              />
            </WidgetCard>
          </div>
        </div>
      </section>

      {/* =========================================================
          WELCOME PICKUPS
      ========================================================== */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <WidgetCard
            title="Welcome Pickups"
            description="Airport shuttle and transfer options for Dubai."
          >
            <TravelpayoutsWidget
              src="https://tpemb.com/content?trs=571731&shmarker=775245&locale=en&city=Dubai&show_header=true&powered_by=true&campaign_id=627&promo_id=8951"
            />
          </WidgetCard>
        </div>
      </section>

      {/* =========================================================
          INTUI.TRAVEL
      ========================================================== */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              intui.travel
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              More Transfer Options
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Browse additional shuttle and airport transfer options from
              intui.travel.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <WidgetCard
              title="Top 3 Transfer Options"
              description="Compare the top available options."
            >
              <TravelpayoutsWidget
                src="https://tpemb.com/content?trs=571731&shmarker=775245&powered_by=true&locale=en&curr=AED&color=basic&pbi=0&ag=18&ap=34&rid=481&campaign_id=22&promo_id=3507"
              />
            </WidgetCard>

            <WidgetCard
              title="Top Countries"
              description="Explore transfer options by destination country."
            >
              <TravelpayoutsWidget
                src="https://tpemb.com/content?currency=USD&trs=571731&shmarker=775245&locale=en&powered_by=true&campaign_id=22&promo_id=8598"
              />
            </WidgetCard>

            <WidgetCard
              title="Top Destinations"
              description="Explore popular transfer destinations."
            >
              <TravelpayoutsWidget
                src="https://tpemb.com/content?currency=AED&trs=571731&shmarker=775245&locale=en&powered_by=true&campaign_id=22&promo_id=8597"
              />
            </WidgetCard>

            <WidgetCard
              title="Quick Transfer Search"
              description="A simple one-field transfer search."
            >
              <TravelpayoutsWidget
                src="https://tpemb.com/content?trs=571731&shmarker=775245&locale=en&color_scheme=basic&pbi=0&powered_by=true&campaign_id=22&promo_id=3506"
              />
            </WidgetCard>

            <WidgetCard
              title="Short & Tidy Search"
              description="A compact transfer search form."
            >
              <TravelpayoutsWidget
                src="https://tpemb.com/content?trs=571731&shmarker=775245&locale=en&powered_by=true&border_radius=5&plain=true&color_background=%23f6f6f6&color_button=%23209432&promo_id=4674&campaign_id=22"
              />
            </WidgetCard>

            <WidgetCard
              title="Transfer Bookings"
              description="Compact shuttle search form."
            >
              <TravelpayoutsWidget
                src="https://tpemb.com/content?trs=571731&shmarker=775245&locale=en&color_scheme=basic&view=compact&h=Transfer%20bookings&powered_by=true&promo_id=1586&campaign_id=22"
              />
            </WidgetCard>
          </div>
        </div>
      </section>

      {/* =========================================================
          SPECIFIC TRANSFERS
      ========================================================== */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Destination Transfers
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Specific Transfer Options
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <WidgetCard
              title="Specific Route"
              description="Transfer options for a specific route."
            >
              <TravelpayoutsWidget
                src="https://tpemb.com/content?trs=571731&shmarker=775245&powered_by=true&locale=en&color_scheme=basic&pbi=0&ag=18&ap=34&re=1081&promo_id=3466&campaign_id=22"
              />
            </WidgetCard>

            <WidgetCard
              title="Specific Destination"
              description="Transfer options for a selected destination."
            >
              <TravelpayoutsWidget
                src="https://tpemb.com/content?currency=EUR&trs=571731&shmarker=775245&locale=en&ResortID=481&countryID=18&color=basic&pbi=0&powered_by=true&promo_id=3465&campaign_id=22"
              />
            </WidgetCard>

            <WidgetCard
              title="intui.travel White Label"
              description="Full airport transfer experience."
            >
              <TravelpayoutsWidget
                src="//tpemb.com/content?trs=571731&shmarker=775245&locale=en&n_ap=dubai&n_re=atlantis&header=Airport%20transfers%20executed%20by%20local%20Professional%20companies&powered_by=true&color_scheme=bg&b_counter=true&b_benefit=true&b_descr=true&b_about=true&b_map=true&b_reviews=true&b_breadcrumbs=true&b_poweredby=true&b_numbers=true&b_trustpilot=true&b_assortment=true&b_reliable=true&b_extended=true&b_how=true&b_faq=true&b_why=true&b_easybook=true&campaign_id=22&promo_id=1504"
              />
            </WidgetCard>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY BOOK
      ========================================================== */}
      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Arrange Your Transfer in Advance?
            </h2>

            <p className="mt-4 text-gray-600">
              Pre-booking your airport transfer can make your arrival smoother,
              especially when travelling with family, luggage or during busy
              travel periods.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Convenient Arrival
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Arrange transportation before leaving home.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Multiple Options
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Compare different transfer and shuttle solutions.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Less Stress
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Start your trip with your airport transportation already
                arranged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}
      <section className="bg-emerald-700 py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Planning Your Next Trip?
          </h2>

          <p className="mt-4 text-emerald-50">
            Arrange your airport transfer before you travel and enjoy a
            smoother arrival.
          </p>

          <a
            href="/contact"
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-emerald-800 transition hover:bg-gray-100"
          >
            Enquire Now
          </a>
        </div>
      </section>
    </main>
  );
}