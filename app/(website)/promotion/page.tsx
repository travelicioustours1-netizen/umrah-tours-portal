import Image from "next/image";
import Link from "next/link";

import { getPromotions } from "@/lib/promotion-service";

export const metadata = {
  title: "Promotions",
  description:
    "Discover the latest Umrah, holiday and travel promotions from Umrah Tours.",
};

export default async function PromotionPage() {
  const promotions = await getPromotions({
    activeOnly: true,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="bg-emerald-700 px-4 py-14 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-100">
            Umrah Tours
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Special Promotions
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-emerald-50 md:text-lg">
            Explore our latest travel offers,
            special deals and promotional packages.
          </p>
        </div>
      </section>

      {/* =================================================
          PROMOTIONS
      ================================================= */}

      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          {promotions.length === 0 ? (
            <div className="rounded-2xl border border-dashed bg-white px-6 py-16 text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                No active promotions right now
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Please check back soon for our latest
                Umrah and holiday offers.
              </p>

              <Link
                href="/"
                className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Back to Home
              </Link>
            </div>
          ) : (
  <>
    <div className="grid gap-8 md:grid-cols-2">
              {promotions.map((promotion) => (
                <article
                  key={promotion.id}
                  className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* =================================================
                      CLICKABLE PROMOTION
                  ================================================= */}

                  {promotion.slug ? (
                    <Link
                      href={`/promotion/${promotion.slug}`}
                      className="block"
                    >
                      {/* Flyer */}

                      <div className="relative bg-gray-100">
                        <Image
                        src={promotion.imageUrl}
                        alt={promotion.title}
                        width={1600}
                        height={1200}
                        className="h-auto max-h-[650px] w-full object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="eager"
                        unoptimized
                        />
                      </div>

                      {/* Content */}

                      <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {promotion.title}
                        </h2>

                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-600">
                          {promotion.description}
                        </p>

                        <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                          View Promotion →
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <>
                      {/* Fallback for old promotion without slug */}

                      <div className="relative bg-gray-100">
                        <Image
                        src={promotion.imageUrl}
                        alt={promotion.title}
                        width={1600}
                        height={1200}
                        className="h-auto max-h-[650px] w-full object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="eager"
                        unoptimized
                        />
                      </div>

                      <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {promotion.title}
                        </h2>

                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-600">
                          {promotion.description}
                        </p>
                      </div>
                    </>
                  )}

                  {/* =================================================
                      WHATSAPP BUTTON
                      Outside Link to avoid nested links
                  ================================================= */}

                  {promotion.buttonText &&
                    promotion.whatsappUrl && (
                      <div className="px-6 pb-6">
                        <a
                          href={promotion.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
                        >
                          {promotion.buttonText}
                        </a>
                      </div>
                    )}
                </article>
                            ))}
            </div>

            {/* =================================================
                AZERBAIJAN INTERNAL LINK CLUSTER
            ================================================= */}

            <section className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 md:p-8">

              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Planning an Azerbaijan Trip?
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Azerbaijan Visa & Holiday Packages
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-gray-600">
                Planning a trip to Azerbaijan from the UAE?
                Explore our Azerbaijan holiday package starting
                from AED 999 and check our Azerbaijan Tourist Visa
                assistance for eligible travellers.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/holidays/azerbaijan-highlights-5-days-4-nights"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Explore Azerbaijan Holiday
                </Link>

                <Link
                  href="/visa/azerbaijan-tourist-visa"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-600 bg-white px-5 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-100"
                >
                  Check Azerbaijan Tourist Visa
                </Link>

              </div>

                        </section>

          </>
          )}
        </div>
      </section>
    </main>
  );
}