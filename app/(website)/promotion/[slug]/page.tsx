import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPromotionBySlug } from "@/lib/promotion-service";

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
              <Image
                src={promotion.imageUrl}
                alt={promotion.title}
                width={1600}
                height={1200}
                priority
                className="mx-auto h-auto max-h-[800px] w-full object-contain"
                sizes="(max-width: 768px) 100vw, 1200px"
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
                  CTA BUTTONS
              ================================================= */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {promotion.whatsappUrl && (
                  <a
                    href={promotion.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    WhatsApp Us
                  </a>
                )}

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  {promotion.buttonText || "Get a Quote"}
                </Link>
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