import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPromotionBySlug } from "@/lib/promotion-service";
import PromotionWhatsAppButton from "@/components/promotion/PromotionWhatsAppButton";

interface PromotionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: PromotionPageProps
): Promise<Metadata> {
  const { slug } = await params;

  const promotion = await getPromotionBySlug(slug);

  if (!promotion) {
    return {
      title: "Promotion Not Found",
      description: "The requested promotion could not be found.",
    };
  }

  const canonicalUrl = `https://www.umrahtours.co/promotion/${promotion.slug}`;

  return {
    title: promotion.title,
    description: promotion.description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: promotion.title,
      description: promotion.description,
      url: canonicalUrl,
      siteName: "Umrah Tours",
      type: "website",

      images: promotion.imageUrl
        ? [
            {
              url: promotion.imageUrl,
              width: 1600,
              height: 1200,
              alt: promotion.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: promotion.title,
      description: promotion.description,

      images: promotion.imageUrl
        ? [promotion.imageUrl]
        : undefined,
    },
  };
}

export default async function PromotionPage({
  params,
}: PromotionPageProps) {
  const { slug } = await params;

  const promotion = await getPromotionBySlug(slug);

  if (!promotion) {
    notFound();
  }

  const whatsappNumber = "971525657940";

  const whatsappMessage = `Assalamu Alaikum,

I'm interested in the ${promotion.title}.

Please share today's best price, availability, travel dates, complete package details and booking procedure.

Thank you.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* =================================================
          HEADER / BREADCRUMB
      ================================================= */}

      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/promotion"
            className="inline-flex items-center text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
          >
            ← Back to Promotions
          </Link>
        </div>
      </section>

      {/* =================================================
          PROMOTION
      ================================================= */}

      <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border bg-white shadow-sm">
          {/* =================================================
              FLYER
          ================================================= */}

          {promotion.imageUrl && (
            <div className="relative bg-gray-100">
              <img
                src={promotion.imageUrl}
                alt={promotion.title}
                className="mx-auto block h-auto max-h-[800px] w-full object-contain"
                loading="eager"
              />
            </div>
          )}

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-4xl">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {promotion.title}
              </h1>

              {promotion.description && (
                <div className="mt-6 whitespace-pre-line text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                  {promotion.description}
                </div>
              )}

              {/* =================================================
                  PRIMARY CTA
              ================================================= */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PromotionWhatsAppButton
                  href={whatsappUrl}
                  promotionTitle={promotion.title}
                  slug={promotion.slug}
                />

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  {promotion.buttonText || "Get a Quote"}
                </Link>
              </div>

              {/* =================================================
                  LOWER CTA
              ================================================= */}

              <div className="mt-8 rounded-xl border border-green-100 bg-green-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Ready to plan your trip?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                      Message us on WhatsApp for today's best price,
                      availability and booking details.
                    </p>
                  </div>

                  <PromotionWhatsAppButton
                    href={whatsappUrl}
                    promotionTitle={promotion.title}
                    slug={promotion.slug}
                  />
                </div>
              </div>

              {/* =================================================
                  BACK LINK
              ================================================= */}

              <div className="mt-8 border-t pt-6">
                <Link
                  href="/promotion"
                  className="text-sm font-medium text-gray-600 transition hover:text-emerald-700"
                >
                  ← View all promotions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}