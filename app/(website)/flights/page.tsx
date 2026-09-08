import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Globe2,
  Map,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.umrahtours.co";

export const metadata = {
  title: "Flight Booking from UAE",
  description:
    "Search and compare flights from Dubai, Sharjah and across the UAE with Aviasales. Explore popular destinations, low fare calendars, flight prices on the map and flight schedules.",
  keywords: [
    "flight booking UAE",
    "flight booking Dubai",
    "cheap flights Dubai",
    "cheap flights UAE",
    "flights from Sharjah",
    "flights from Dubai",
    "international flights UAE",
    "Aviasales UAE",
    "flight tickets Dubai",
  ],
  alternates: {
    canonical: `${baseUrl}/flights`,
  },
  openGraph: {
    title: "Flight Booking from Dubai, Sharjah & UAE | Umrah Tours",
    description:
      "Search and compare international flights from the UAE. Explore popular destinations, low fare calendars, flight prices and schedules.",
    url: `${baseUrl}/flights`,
    siteName: "Umrah Tours",
    type: "website",
  },
};

/*
|--------------------------------------------------------------------------
| Flights Page
|--------------------------------------------------------------------------
*/

export default function FlightsPage() {
  /*
  |--------------------------------------------------------------------------
  | CollectionPage / WebPage Schema
  |--------------------------------------------------------------------------
  */

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Flight Booking from Dubai, Sharjah & UAE",
    description:
      "Search and compare international flights from Dubai, Sharjah and across the UAE with Umrah Tours.",
    url: `${baseUrl}/flights`,

    isPartOf: {
      "@type": "WebSite",
      name: "Umrah Tours",
      url: baseUrl,
    },

    provider: {
      "@id": `${baseUrl}/#organization`,
    },

    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },

    about: {
      "@type": "Thing",
      name: "Flight Booking",
    },

    mainEntity: {
      "@type": "Service",
      name: "International Flight Booking",
      serviceType: "Flight Booking",
      provider: {
        "@id": `${baseUrl}/#organization`,
      },
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
    },
  };

  return (
    <>
      {/* =========================================================
          SEO SCHEMA
      ========================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <main className="bg-gray-50">
        {/* =========================================================
            HERO
        ========================================================== */}

        <section className="relative min-h-[560px] overflow-hidden">
          <div className="absolute inset-0">
            <div className="h-full w-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-gray-950" />
          </div>

          {/* Decorative background */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-20">
            <div className="w-full">
              <div className="max-w-3xl text-white">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                  <Plane size={17} />
                  International Flight Booking
                </div>

                <p className="mt-6 uppercase tracking-[5px] text-emerald-300">
                  Fly Further. Travel Smarter.
                </p>

                <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                  Search Flights
                  <span className="block text-emerald-300">
                    From Dubai, Sharjah & UAE
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
                  Search international flights, compare available fares and
                  discover popular destinations from the UAE with our flight
                  search tools.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#flight-search"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Search Flights
                    <Search size={19} />
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-gray-900"
                  >
                    Flight Assistance
                    <ArrowRight size={19} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            TRUST BAR
        ========================================================== */}

        <section className="border-b bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <Search size={24} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Compare Flights
                </p>

                <p className="text-sm text-gray-500">
                  Search available flight options
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <Globe2 size={24} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Worldwide Destinations
                </p>

                <p className="text-sm text-gray-500">
                  Explore international routes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <ShieldCheck size={24} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Travel Assistance
                </p>

                <p className="text-sm text-gray-500">
                  Support when you need it
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            MAIN FLIGHT SEARCH
        ========================================================== */}

        <section
          id="flight-search"
          className="scroll-mt-24 bg-white py-16"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                <Plane size={16} />
                Flight Search
              </div>

              <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
                Search & Compare Flights
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
                Enter your travel details below to search available flights
                and compare options for your journey.
              </p>
            </div>

            {/* W24 — Aviasales Flight Search Form */}
            <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-xl md:p-6">
              <Script
                id="aviasales-flight-search"
                async
                src="https://tpemb.com/content?currency=aed&trs=571731&shmarker=775245&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&no_labels=&plain=true&promo_id=7879&campaign_id=100"
                charSet="utf-8"
              />
            </div>

            <p className="mt-4 text-center text-xs text-gray-500">
              Flight search results are provided through our travel partner.
            </p>
          </div>
        </section>

        {/* =========================================================
            POPULAR DESTINATIONS
        ========================================================== */}

        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                <Globe2 size={16} />
                Popular Destinations
              </div>

              <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
                Explore Popular Flight Destinations
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
                Discover popular destinations and explore flight options
                from Dubai and the UAE.
              </p>
            </div>

            {/* W25 — Aviasales Popular Routes */}
            <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-lg md:p-6">
              <Script
                id="aviasales-popular-routes"
                async
                src="https://tpemb.com/content?currency=aed&trs=571731&shmarker=775245&destination=DXB&target_host=www.aviasales.com%2Fsearch&locale=en&limit=6&powered_by=true&primary=%230085FF&promo_id=4044&campaign_id=100"
                charSet="utf-8"
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            LOW PRICE CALENDAR
        ========================================================== */}

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  <CalendarDays size={16} />
                  Flexible Travel Dates
                </div>

                <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
                  Find Lower Fare Dates
                </h2>

                <p className="mt-5 text-lg leading-8 text-gray-600">
                  Flexible with your travel dates? Use the pricing calendar
                  to explore fare options across different dates and identify
                  potentially better-value travel periods.
                </p>

                <div className="mt-7 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle
                      size={21}
                      className="mt-1 shrink-0 text-emerald-600"
                    />

                    <p className="text-gray-700">
                      Compare prices across different travel dates.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle
                      size={21}
                      className="mt-1 shrink-0 text-emerald-600"
                    />

                    <p className="text-gray-700">
                      Plan your trip around available fares.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle
                      size={21}
                      className="mt-1 shrink-0 text-emerald-600"
                    />

                    <p className="text-gray-700">
                      Useful for flexible holidays and long trips.
                    </p>
                  </div>
                </div>
              </div>

              {/* W28 — Aviasales Pricing Calendar */}
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-xl md:p-6">
                <Script
                  id="aviasales-pricing-calendar"
                  async
                  src="https://tpemb.com/content?currency=aed&trs=571731&shmarker=775245&searchUrl=www.aviasales.com%2Fsearch&locale=en&powered_by=true&origin=DXB&destination=BAK&one_way=false&only_direct=true&period=year&range=7%2C14&primary=%230C73FE&color_background=%23FFFFFF&dark=%23000000&light=%23FFFFFF&achieve=%2345AD35&promo_id=4041&campaign_id=100"
                  charSet="utf-8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PRICES ON MAP
        ========================================================== */}

        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                <Map size={16} />
                Flight Prices Map
              </div>

              <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
                Explore Flight Prices on the Map
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
                Explore destinations visually and see available flight price
                options from your selected departure city.
              </p>
            </div>

            {/* W26 — Aviasales Prices on Map */}
            <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white p-3 shadow-xl md:p-5">
              <div className="overflow-hidden rounded-2xl">
                <Script
                  id="aviasales-prices-map"
                  async
                  src="https://tpemb.com/content?currency=aed&trs=571731&shmarker=775245&lat=51.5073509&lng=-0.1277583&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%233FABDB&secondary=%233FABDB&light=%23ffffff&width=1500&height=500&zoom=2&promo_id=4054&campaign_id=100"
                  charSet="utf-8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FLIGHT SCHEDULE
        ========================================================== */}

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  <CalendarDays size={16} />
                  Flight Schedule
                </div>

                <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
                  Explore Flight Schedules
                </h2>

                <p className="mt-5 text-lg leading-8 text-gray-600">
                  Check available flight schedules between selected
                  destinations and use the information to plan your journey.
                </p>

                <div className="mt-7 rounded-2xl bg-gray-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                      <Plane size={23} />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Current Example Route
                      </h3>

                      <p className="mt-1 text-gray-600">
                        London → Bangkok
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        The schedule widget below uses the route configured
                        in your Travelpayouts widget.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* W27 — Aviasales Flight Schedule */}
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-xl md:p-6">
                <Script
                  id="aviasales-flight-schedule"
                  async
                  src="https://tpemb.com/content?currency=aed&trs=571731&shmarker=775245&color_button=%23FF0000&target_host=www.aviasales.com%2Fsearch&locale=en&powered_by=true&origin=LON&destination=BKK&with_fallback=false&non_direct_flights=true&min_lines=5&border_radius=0&color_background=%23FFFFFF&color_text=%23000000&color_border=%23FFFFFF&promo_id=2811&campaign_id=100"
                  charSet="utf-8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHY USE FLIGHT SEARCH
        ========================================================== */}

        <section className="bg-emerald-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-300">
                Plan With Confidence
              </p>

              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                Everything You Need to Plan Your Flight
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-emerald-50">
                Use our flight tools to search, compare, explore destinations
                and plan your travel dates before booking.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                  <Search size={28} />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Search Available Flights
                </h3>

                <p className="mt-3 leading-7 text-emerald-50/80">
                  Search flight options based on your preferred departure,
                  destination and travel dates.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                  <Sparkles size={28} />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Discover Destinations
                </h3>

                <p className="mt-3 leading-7 text-emerald-50/80">
                  Explore popular routes and discover destinations that fit
                  your travel plans.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                  <CalendarDays size={28} />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Plan Flexible Dates
                </h3>

                <p className="mt-3 leading-7 text-emerald-50/80">
                  Explore pricing across different dates and plan your trip
                  around your preferred travel period.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SEO CONTENT
        ========================================================== */}

        <section className="border-t bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-600">
                Flight Booking From UAE
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                Flight Booking from Dubai, Sharjah & Across the UAE
              </h2>
            </div>

            <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600">
              <p>
                Umrah Tours provides flight search and travel assistance for
                passengers travelling from Dubai, Sharjah and across the
                United Arab Emirates. Our flight tools help travellers explore
                international routes, compare available flight options and
                plan their journeys.
              </p>

              <p>
                Whether you are travelling for Umrah, an international holiday,
                a family trip, business travel or a long-distance journey,
                you can use the flight search above to explore available
                options based on your travel requirements.
              </p>

              <p>
                Flexible travellers can also explore our pricing calendar,
                popular destinations and interactive flight price map. These
                tools can help you discover different destinations and travel
                dates before making your final booking decision.
              </p>

              <p>
                Travellers can combine their flight planning with our{" "}
                <Link
                  href="/hotels"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  hotel services
                </Link>{" "}
                and{" "}
                <Link
                  href="/holidays"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  international holiday packages
                </Link>
                . For personalized assistance, contact our travel team through
                our{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  contact page
                </Link>
                .
              </p>

              <p>
                Flight schedules, availability and fares can change depending
                on airline availability, travel dates, season and booking
                conditions. Always review the final fare, baggage allowance,
                schedule and booking conditions before completing your
                reservation.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================== */}

        <section className="bg-gray-100 py-16 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Need Help Booking Your Flight?
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Tell us your destination, travel dates and passenger
              requirements. Our travel team can help you plan your journey.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                Get a Quote
                <ArrowRight size={18} />
              </Link>

              <a
                href="https://aviasales.tpo.mx/I7xeUixi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-white px-8 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Search Flights
                <Plane size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
