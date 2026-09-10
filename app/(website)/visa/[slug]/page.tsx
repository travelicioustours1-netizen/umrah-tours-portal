import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ProductSchema from "@/components/SEO/ProductSchema";
import PackageHero from "@/components/packages/PackageHero";
import PackageSidebar from "@/components/packages/PackageSidebar";
import PackageCard from "@/components/packages/PackageCard";

import {
  getPackageBySlug,
  getRelatedPackages,
} from "@/lib/package-service";

const SITE_URL = "https://umrahtours.co";

const azerbaijanFaqs = [
  {
    question: "Can I apply for an Azerbaijan Tourist Visa from the UAE?",
    answer:
      "Yes. UAE-based travellers may be able to apply for an Azerbaijan eVisa or another applicable visa route depending on their nationality, passport and current Azerbaijan visa rules. Our team can help you check the applicable route and document requirements.",
  },
  {
    question: "Can Indian passport holders apply for an Azerbaijan eVisa?",
    answer:
      "Indian citizens are currently listed on the official Azerbaijan ASAN Visa website among the nationalities eligible to apply for an eVisa. Eligibility and visa conditions remain subject to the applicable Azerbaijani rules.",
  },
  {
    question: "Can Pakistani passport holders apply for an Azerbaijan eVisa?",
    answer:
      "Pakistani citizens are currently listed on the official Azerbaijan ASAN Visa website among the nationalities eligible to apply for an eVisa. Eligibility and visa conditions remain subject to the applicable Azerbaijani rules.",
  },
  {
    question: "How long does an Azerbaijan eVisa take?",
    answer:
      "According to the official Azerbaijan ASAN Visa portal, a standard eVisa is issued within 3 working days. An urgent eVisa can be issued within 3 hours, subject to eligibility and the official system.",
  },
  {
    question: "How long can I stay in Azerbaijan with an eVisa?",
    answer:
      "An Azerbaijan eVisa is valid for 90 days and permits a stay of up to 30 days. The eVisa is issued for single entry.",
  },
  {
    question: "How much passport validity is required for an Azerbaijan eVisa?",
    answer:
      "The official Azerbaijan eVisa conditions state that the travel document should remain valid for at least 3 months beyond the expiry date of the eVisa to be issued.",
  },
  {
    question: "What documents are required for an Azerbaijan Tourist Visa?",
    answer:
      "The required documents depend on your nationality and the applicable visa route. Applicants should provide the required passport and application information and may need additional supporting documents depending on their circumstances. Our team can guide you through the applicable document checklist.",
  },
  {
    question: "Can Umrah Tours help with an Azerbaijan Tourist Visa from Dubai or Sharjah?",
    answer:
      "Yes. Umrah Tours can assist UAE-based travellers with Azerbaijan visa eligibility guidance, document preparation, application procedure guidance and travel preparation. Visa approval remains subject to the relevant Azerbaijani authorities.",
  },
];

const malaysiaFaqs = [
  {
    question: "Do UAE residents need a visa to visit Malaysia?",
    answer:
      "Malaysia visa requirements depend on the traveller's nationality and passport, not simply UAE residency. Some nationalities can enter Malaysia without a visa for tourism, while others may need a visa or eVisa. Check the current Malaysian immigration requirements for your passport before travelling.",
  },
  {
    question: "Do Indian passport holders need a Malaysia Tourist Visa in 2026?",
    answer:
      "Indian passport holders are currently eligible for visa-free entry to Malaysia for tourism until 31 December 2026, subject to the applicable Malaysian immigration conditions. UAE residence does not change the passport-based eligibility rules.",
  },
  {
    question: "Do Pakistani passport holders need a visa for Malaysia?",
    answer:
      "Pakistani passport holders are currently listed among nationalities that require a visa to enter Malaysia. Depending on eligibility and the purpose of travel, an eVisa or another applicable visa process may be required.",
  },
  {
    question: "What documents are commonly required for a Malaysia visa from the UAE?",
    answer:
      "Requirements vary by nationality and visa type. Depending on the application, documents can include a passport valid for more than six months, UAE residence or Emirates ID documentation, return or onward flight details, accommodation or invitation documents, photographs and financial or other supporting documents.",
  },
  {
    question: "How long does a Malaysia visa application take from the UAE?",
    answer:
      "Processing time depends on nationality, visa type and the application route. Applicants should confirm the current processing timeline before applying because processing times can change and additional checks may sometimes be required.",
  },
  {
    question: "What is the Malaysia Digital Arrival Card (MDAC)?",
    answer:
      "The Malaysia Digital Arrival Card is an online arrival form required for applicable foreign travellers entering Malaysia. Malaysian authorities state that it should generally be completed online within three days before arrival.",
  },
  {
    question: "Can Umrah Tours help with a Malaysia Tourist Visa from Dubai or Sharjah?",
    answer:
      "Yes. Umrah Tours provides Malaysia visa guidance and application assistance for eligible travellers in the UAE, including document guidance, application procedure support and pre-travel requirement guidance. Visa approval remains subject to the relevant Malaysian authorities.",
  },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (
    !pkg ||
    pkg.category?.toLowerCase() !== "visa" ||
    pkg.status !== "ACTIVE"
  ) {
    return {
      title: "Visa Package | Umrah Tours",
      description:
        "Explore visa services and visa packages from Umrah Tours.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const packageUrl = `${SITE_URL}/visa/${pkg.slug}`;

  const image =
    pkg.images?.[0]?.url ||
    `${SITE_URL}/images/hero/umrah-hero.jpg`;

  const title =
    pkg.seoTitle?.trim() ||
    `${pkg.title} - Visa Services UAE`;

  const fallbackDescription =
    `Explore ${pkg.title} with Umrah Tours. Get professional visa assistance and travel support from the UAE.`;

  const rawDescription =
    pkg.seoDescription?.trim() ||
    pkg.description?.trim() ||
    fallbackDescription;

  const description =
    rawDescription.length > 160
      ? `${rawDescription.substring(0, 157).trim()}...`
      : rawDescription;

  return {
    title,
    description,

    keywords: pkg.seoKeywords
      ? pkg.seoKeywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean)
      : [],

    authors: [
      {
        name: "Umrah Tours",
      },
    ],

    creator: "Umrah Tours",
    publisher: "Umrah Tours",

    alternates: {
      canonical: packageUrl,
    },

    openGraph: {
      title,
      description,
      url: packageUrl,
      siteName: "Umrah Tours",
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${pkg.title} - Umrah Tours`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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
}

export default async function VisaPackageDetails({
  params,
}: Props) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (
    !pkg ||
    pkg.category?.toLowerCase() !== "visa" ||
    pkg.status !== "ACTIVE"
  ) {
    notFound();
  }

  const relatedPackages = await getRelatedPackages(
    pkg.category ?? "VISA",
    pkg.id
  );

  const packageUrl = `${SITE_URL}/visa/${pkg.slug}`;

  const packageImage =
    pkg.images?.[0]?.url ||
    `${SITE_URL}/images/hero/umrah-hero.jpg`;

  const packagePrice =
    pkg.price && Number(pkg.price) > 0
      ? Number(pkg.price)
      : pkg.quadPrice && Number(pkg.quadPrice) > 0
        ? Number(pkg.quadPrice)
        : undefined;

  const isMalaysiaVisa =
  pkg.slug === "malaysia-tourist-visa";

const isAzerbaijanVisa =
  pkg.slug === "azerbaijan-tourist-visa";

const isEnquiryOnlyVisa =
  pkg.category?.toUpperCase() === "VISA" &&
  Number(pkg.price) <= 0;

    const faqSchema = isMalaysiaVisa
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: malaysiaFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : isAzerbaijanVisa
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: azerbaijanFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Visa Services",
        item: `${SITE_URL}/visa`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pkg.title,
        item: packageUrl,
      },
    ],
  };

  return (
  <>
    {faqSchema && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    )}

    {!isEnquiryOnlyVisa && (
      <ProductSchema
        name={pkg.title}
        description={
          pkg.description ||
          `Book ${pkg.title} with Umrah Tours. Get professional visa assistance and travel support from the UAE.`
        }
        url={packageUrl}
        image={packageImage}
        price={packagePrice}
        currency="AED"
        sku={pkg.slug}
      />
    )}

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />

    <main className="bg-gray-50">
      <PackageHero
        title={pkg.title}
        images={pkg.images}
        price={pkg.price}
      />

        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              {/* Main Visa Description */}
              <section className="rounded-2xl bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                  Visa Service
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {pkg.title}
                </h2>

                <div className="mt-6 whitespace-pre-line leading-8 text-gray-700">
                  {pkg.description}
                </div>
              </section>

              {/* Visa Highlights */}
              <section className="rounded-2xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900">
                  Visa Service Highlights
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-emerald-50 p-5">
                    <h3 className="font-bold text-gray-900">
                      Professional Assistance
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Get guidance throughout the visa application
                      process.
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-5">
                    <h3 className="font-bold text-gray-900">
                      Document Guidance
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Receive guidance on the documents required for
                      your application.
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-5">
                    <h3 className="font-bold text-gray-900">
                      Convenient Processing
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Our team helps make the application process
                      simple and convenient.
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-5">
                    <h3 className="font-bold text-gray-900">
                      Travel Support
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Get travel-focused support before your journey.
                    </p>
                  </div>
                </div>
              </section>

              {/* Visa Process */}
              {pkg.itinerary && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Visa Process & Details
                  </h2>

                  <div className="mt-6 whitespace-pre-line leading-8 text-gray-700">
                    {pkg.itinerary}
                  </div>
                </section>
              )}

              {/* Inclusions */}
              {pkg.inclusions && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Service Inclusions
                  </h2>

                  <div className="mt-6 whitespace-pre-line leading-8 text-gray-700">
                    {pkg.inclusions}
                  </div>
                </section>
              )}

              {/* Exclusions */}
              {pkg.exclusions && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Service Exclusions
                  </h2>

                  <div className="mt-6 whitespace-pre-line leading-8 text-gray-700">
                    {pkg.exclusions}
                  </div>
                </section>
              )}

              {/* Important Information */}
              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Important Visa Information
                </h2>

                <p className="mt-4 leading-7 text-gray-700">
                  Visa issuance, validity, entry requirements, permitted
                  stay and approval are subject to the immigration
                  regulations of the destination country and the
                  applicant&apos;s nationality. Requirements, documents,
                  fees and processing times may vary and can change
                  without notice.
                </p>
              </section>

              {/* Malaysia FAQ */}
              {isMalaysiaVisa && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                    Malaysia Visa FAQ
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    Malaysia Tourist Visa from UAE – Frequently Asked
                    Questions
                  </h2>

                  <div className="mt-8 space-y-6">
                    {malaysiaFaqs.map((faq) => (
                      <div
                        key={faq.question}
                        className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                      >
                        <h3 className="text-lg font-bold text-gray-900">
                          {faq.question}
                        </h3>

                        <p className="mt-2 leading-7 text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
                            {/* Azerbaijan FAQ */}
              {isAzerbaijanVisa && (
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                    Azerbaijan Visa FAQ
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    Azerbaijan Tourist Visa from UAE – Frequently Asked
                    Questions
                  </h2>

                  <div className="mt-8 space-y-6">
                    {azerbaijanFaqs.map((faq) => (
                      <div
                        key={faq.question}
                        className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                      >
                        <h3 className="text-lg font-bold text-gray-900">
                          {faq.question}
                        </h3>

                        <p className="mt-2 leading-7 text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
                            {isAzerbaijanVisa && (
                <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
                  <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                    Planning Your Azerbaijan Trip?
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    Explore Our Azerbaijan Holiday Package
                  </h2>

                  <p className="mt-3 leading-7 text-gray-600">
                    Looking for more than visa assistance? Explore our
                    Azerbaijan holiday package featuring Baku sightseeing,
                    accommodation, transfers and selected experiences.
                  </p>

                  <Link
                    href="/holidays/azerbaijan-highlights-5-days-4-nights"
                    className="mt-5 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Explore Azerbaijan Holiday
                  </Link>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <PackageSidebar pkg={pkg} />
            </div>
          </div>

          {/* Related Visa Services */}
          {relatedPackages.length > 0 && (
            <section className="mt-16">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                  More Visa Services
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  Related Visa Services
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPackages.map((relatedPackage) => (
                  <PackageCard
                    key={relatedPackage.id}
                    package={relatedPackage}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
