import Script from "next/script";

export const metadata = {
  title: "Tours & Activities",
  description:
    "Discover and book tours, attractions, activities and experiences around the world with Umrah Tours.",
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
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>

      <div className="w-full overflow-hidden">{children}</div>
    </div>
  );
}

export default function ToursActivitiesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-100">
              Tours & Activities
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Discover amazing tours & experiences
            </h1>

            <p className="mt-5 text-lg leading-8 text-emerald-50">
              Explore attractions, sightseeing tours, activities and memorable
              experiences for your next journey.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-3 text-3xl">🌍</div>
            <h2 className="text-lg font-semibold text-gray-900">
              Experiences worldwide
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Find exciting activities and attractions in destinations around
              the world.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-3 text-3xl">🎟️</div>
            <h2 className="text-lg font-semibold text-gray-900">
              Easy booking
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Discover tours and activities and book your preferred
              experiences online.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-3 text-3xl">⭐</div>
            <h2 className="text-lg font-semibold text-gray-900">
              Great experiences
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Choose from popular attractions, tours and activities for your
              trip.
            </p>
          </div>
        </div>
      </section>

      {/* Tiqets */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Tiqets
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Tours & attractions
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            Discover popular attractions and book unforgettable experiences
            with Tiqets.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Specific Tour Widget */}
          <WidgetCard
            title="Featured Tour"
            description="Explore this selected Tiqets experience."
          >
            <Script
              async
              src="https://tpemb.com/content?currency=AED&trs=571731&shmarker=775245&product=977218&language=en&layout=horizontal&powered_by=true&campaign_id=89&promo_id=3948"
              charSet="utf-8"
              strategy="afterInteractive"
            />
          </WidgetCard>

          {/* Availability Calendar Widget */}
          <WidgetCard
            title="Check Tour Availability"
            description="Check availability for this selected experience."
          >
            <Script
              async
              src="https://tpemb.com/content?currency=AED&trs=571731&shmarker=775245&product=1056326&language=en&layout=compact&orientation=vertical&powered_by=true&campaign_id=89&promo_id=3984"
              charSet="utf-8"
              strategy="afterInteractive"
            />
          </WidgetCard>
        </div>
      </section>

      {/* Popular Tours */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Popular experiences
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Popular tours
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Browse popular tours and attractions available through Tiqets.
            </p>
          </div>

          <WidgetCard
            title="Popular Tours"
            description="Discover popular experiences and attractions."
          >
            <Script
              async
              src="https://tpemb.com/content?currency=AED&trs=571731&shmarker=775245&language=en&locale=260932&layout=horizontal&cards=4&powered_by=true&campaign_id=89&promo_id=3947"
              charSet="utf-8"
              strategy="afterInteractive"
            />
          </WidgetCard>
        </div>
      </section>

      {/* Klook */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Klook
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Explore activities
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            Find tours and activities in selected destinations with Klook.
          </p>
        </div>

        <WidgetCard
          title="Tours & Activities"
          description="Explore activities available for your destination."
        >
          <Script
            async
            src="https://tpemb.com/content?currency=AED&trs=571731&shmarker=775245&locale=en&city_id=78&category=3&amount=3&powered_by=true&campaign_id=137&promo_id=4497"
            charSet="utf-8"
            strategy="afterInteractive"
          />
        </WidgetCard>
      </section>

      {/* Benefits */}
      <section className="bg-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Make more of your journey
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Plan memorable days
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Add sightseeing, attractions and activities to your travel
                  itinerary.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Discover local experiences
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Explore experiences that can make every destination more
                  enjoyable.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Book with confidence
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Compare available experiences and select activities that fit
                  your trip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-700">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to explore?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-emerald-100">
            Discover tours, attractions and activities for your next
            destination.
          </p>
        </div>
      </section>
    </main>
  );
}
