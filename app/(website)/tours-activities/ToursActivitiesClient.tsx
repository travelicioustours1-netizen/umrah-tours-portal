"use client";

import { useEffect, useRef } from "react";

function TravelpayoutsWidget({
  src,
}: {
  src: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Prevent duplicate widgets during React development / Fast Refresh
    container.innerHTML = "";

    const script = document.createElement("script");

    script.async = true;
    script.src = src;
    script.charset = "utf-8";

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[120px]"
    />
  );
}

function WidgetCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>

      <div className="mt-6 w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}

const TIQETS_FEATURED =
  "https://tpemb.com/content?currency=AED&trs=571731&shmarker=775245&product=977218&language=en&layout=horizontal&powered_by=true&campaign_id=89&promo_id=3948";

const TIQETS_AVAILABILITY =
  "https://tpemb.com/content?currency=AED&trs=571731&shmarker=775245&product=1056326&language=en&layout=compact&orientation=vertical&powered_by=true&campaign_id=89&promo_id=3984";

const TIQETS_POPULAR =
  "https://tpemb.com/content?currency=AED&trs=571731&shmarker=775245&language=en&locale=260932&layout=horizontal&cards=4&powered_by=true&campaign_id=89&promo_id=3947";

const KLOOK_ACTIVITIES =
  "https://tpemb.com/content?currency=AED&trs=571731&shmarker=775245&locale=en&city_id=78&category=3&amount=3&powered_by=true&campaign_id=137&promo_id=4497";

export default function ToursActivitiesClient() {
  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="bg-emerald-700">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
              Other Services
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Tours & Activities
            </h1>

            <p className="mt-5 text-lg leading-8 text-emerald-50">
              Discover exciting tours, attractions, experiences and activities
              for your next holiday. Compare options and book memorable
              experiences through our trusted travel partners.
            </p>

            <a
              href="#popular-tours-widget"
              className="mt-8 inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Open Tours & Attractions ↓
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="text-2xl">🎟️</div>

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              Attractions
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Discover museums, landmarks, attractions and popular experiences
              around the world.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="text-2xl">🌍</div>

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              Local Experiences
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Find activities and experiences to make every destination more
              memorable.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="text-2xl">📅</div>

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              Easy Booking
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Check availability and explore activities through our integrated
              travel partners.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Explore
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Find your experience
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Choose from popular attractions, featured tours, availability
              options and activities.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#popular-tours-widget"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Popular Tours ↓
            </a>

            <a
              href="#featured-tour-widget"
              className="inline-flex items-center rounded-lg border border-emerald-600 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Featured Tour ↓
            </a>

            <a
              href="#availability-widget"
              className="inline-flex items-center rounded-lg border border-emerald-600 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Check Availability ↓
            </a>

            <a
              href="#klook-widget"
              className="inline-flex items-center rounded-lg border border-emerald-600 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Klook Activities ↓
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Wide Selection
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Explore attractions, tours and activities across popular travel
                destinations.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Trusted Partners
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Access experiences through established international travel
                platforms.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Plan With Confidence
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Discover activities before your trip and build a better
                holiday itinerary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Travelpayouts Widgets */}
      <section
        id="travelpayouts-widgets"
        className="bg-white py-14"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Book Experiences
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Tours, Attractions & Activities
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Explore tours, attractions and activities through our trusted
              international travel partners.
            </p>
          </div>

          {/* Featured Tour */}
          <div
            id="featured-tour-widget"
            className="scroll-mt-24 mb-12"
          >
            <WidgetCard
              title="Featured Tour"
              description="Explore a featured attraction and discover memorable experiences."
            >
              <TravelpayoutsWidget src={TIQETS_FEATURED} />
            </WidgetCard>
          </div>

          {/* Availability */}
          <div
            id="availability-widget"
            className="scroll-mt-24 mb-12"
          >
            <WidgetCard
              title="Check Tour Availability"
              description="Check availability and explore booking options for selected tours."
            >
              <TravelpayoutsWidget src={TIQETS_AVAILABILITY} />
            </WidgetCard>
          </div>

          {/* Popular Tours */}
          <div
            id="popular-tours-widget"
            className="scroll-mt-24 mb-12"
          >
            <WidgetCard
              title="Popular Tours & Attractions"
              description="Browse popular tours and attractions selected for travelers looking for memorable activities."
            >
              <TravelpayoutsWidget src={TIQETS_POPULAR} />
            </WidgetCard>
          </div>

          {/* Klook */}
          <div
            id="klook-widget"
            className="scroll-mt-24"
          >
            <WidgetCard
              title="Klook Tours & Activities"
              description="Explore activities available for your destination."
            >
              <TravelpayoutsWidget src={KLOOK_ACTIVITIES} />
            </WidgetCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-700">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Planning your next holiday?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-emerald-50">
            Explore attractions, tours and activities and make your next trip
            even more memorable.
          </p>

          <a
            href="/contact"
            className="mt-7 inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Get a Quote
          </a>
        </div>
      </section>
    </main>
  );
}