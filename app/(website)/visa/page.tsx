import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe2,
  Headphones,
  ShieldCheck,
} from "lucide-react";

import PackageCard from "@/components/packages/PackageCard";
import { getPackages } from "@/lib/package-service";

export const metadata: Metadata = {
  title: "Visa Assistance UAE | UAE, Saudi & International Visas | Umrah Tours",

  description:
    "Get professional visa assistance from UAE for tourist, Schengen, Saudi Umrah and international visas. Document guidance and application support from Umrah Tours.",

  alternates: {
    canonical: "https://umrahtours.co/visa",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Visa Assistance UAE | UAE, Saudi & International Visas",
    description:
      "Professional visa assistance from UAE for tourist, Schengen, Saudi Umrah and international visas.",
    url: "https://umrahtours.co/visa",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Visa Assistance UAE | UAE, Saudi & International Visas",
    description:
      "Professional visa assistance from UAE for tourist, Schengen, Saudi Umrah and international visas.",
  },
};

const process = [
  {
    number: "01",
    title: "Send Your Enquiry",
    description:
      "Tell us your nationality, destination, travel dates and number of travellers.",
  },
  {
    number: "02",
    title: "Document Assessment",
    description:
      "Our team reviews your requirements and advises you on the documents needed.",
  },
  {
    number: "03",
    title: "Application Processing",
    description:
      "We assist with the visa application process and keep you updated.",
  },
  {
    number: "04",
    title: "Travel Preparation",
    description:
      "Once approved, we help you prepare for your journey and travel arrangements.",
  },
];

const documents = [
  "Valid passport",
  "Recent passport-size photograph",
  "Travel dates and destination",
  "Contact details",
  "Additional documents depending on visa type and nationality",
];

export default async function VisaPage() {
  /*
   * Fetch VISA packages from Prisma.
   *
   * IMPORTANT:
   * The category stored in your Package table should be:
   *
   * VISA
   */
  const visaPackagesResult = await getPackages({
    category: "VISA",
    page: 1,
    limit: 12,
    sort: "newest",
  });

  const visaPackages = visaPackagesResult.packages;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://umrahtours.co/visa#service",
    name: "Visa Assistance UAE",
    serviceType: "Visa Assistance",
    description:
      "Professional visa assistance from UAE for tourist, Schengen, Saudi Umrah and international visas, including document guidance and application support.",
    url: "https://umrahtours.co/visa",
    provider: {
      "@type": "TravelAgency",
      name: "Umrah Tours",
      url: "https://umrahtours.co",
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": "https://umrahtours.co",
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": "https://umrahtours.co/visa",
          name: "Visa",
        },
      },
    ],
  };

  return (
    <main className="bg-white">
      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[560px] overflow-hidden">
        <Image
          src="/images/hero/umrah-hero.jpg"
          alt="Visa assistance services"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 flex min-h-[560px] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 py-16">
            <div className="max-w-3xl text-white">
              <p className="font-semibold uppercase tracking-[5px] text-emerald-300">
                Visa Services
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-tight md:text-6xl">
                Visa Services Made Simple
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
                Explore visa services for travellers from the UAE with
                professional document guidance and application assistance.
              </p>

              <a
                href="https://wa.me/971525657940"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                Get Visa Assistance
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VISA PACKAGES
      ===================================================== */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-[4px] text-emerald-600">
              Visa Packages
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              Choose Your Visa Service
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Select the visa service that suits your travel requirements.
              Our team will assist you with the application process and
              required documentation.
            </p>
          </div>

          {visaPackages.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visaPackages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
              <FileText size={42} className="mx-auto text-gray-400" />

              <h3 className="mt-5 text-2xl font-bold text-gray-900">
                Visa Packages Coming Soon
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-gray-600">
                Our latest visa services are being updated. Contact our
                travel team for current visa availability, requirements
                and pricing.
              </p>

              <a
                href="https://wa.me/971525657940"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                <Headphones size={18} />
                Contact Us
              </a>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          MALAYSIA VISA
      ===================================================== */}
      <section className="bg-emerald-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-semibold uppercase tracking-[4px] text-emerald-600">
                Malaysia Visa From UAE
              </p>

              <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
                Malaysia Tourist Visa UAE
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Planning a trip to Malaysia from Dubai, Sharjah or elsewhere
                in the UAE? Get Malaysia Tourist Visa guidance, document
                assistance and application support from Umrah Tours.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Visa requirements depend on your nationality and passport.
                Our team can help UAE residents understand the applicable
                Malaysia visa requirements, eVisa options and travel
                documentation.
              </p>

              <Link
                href="/visa/malaysia-tourist-visa"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
              >
                Malaysia Tourist Visa
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
              <h3 className="text-2xl font-bold text-gray-900">
                Malaysia Visa Assistance
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-emerald-600"
                    size={20}
                  />
                  <span className="text-gray-700">
                    Malaysia Tourist Visa guidance from the UAE
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-emerald-600"
                    size={20}
                  />
                  <span className="text-gray-700">
                    Document and eligibility guidance
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-emerald-600"
                    size={20}
                  />
                  <span className="text-gray-700">
                    Malaysia eVisa guidance where applicable
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-emerald-600"
                    size={20}
                  />
                  <span className="text-gray-700">
                    Malaysia Digital Arrival Card guidance
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-emerald-600"
                    size={20}
                  />
                  <span className="text-gray-700">
                    Assistance for travellers from Dubai and Sharjah
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VISA SERVICE INTRO
      ===================================================== */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-semibold uppercase tracking-[4px] text-emerald-600">
                Visa Assistance
              </p>

              <h2 className="mt-3 text-4xl font-bold text-gray-900">
                Support From Application To Travel
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Our team provides practical assistance throughout your visa
                application journey, helping you understand the requirements
                and prepare the necessary documents.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <CheckCircle2
                    className="mt-1 shrink-0 text-emerald-600"
                    size={22}
                  />

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Clear Document Guidance
                    </h3>

                    <p className="mt-1 text-gray-600">
                      Understand the documents required before starting
                      your application.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2
                    className="mt-1 shrink-0 text-emerald-600"
                    size={22}
                  />

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Application Assistance
                    </h3>

                    <p className="mt-1 text-gray-600">
                      Get support with the application process and required
                      supporting information.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2
                    className="mt-1 shrink-0 text-emerald-600"
                    size={22}
                  />

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Travel-Focused Support
                    </h3>

                    <p className="mt-1 text-gray-600">
                      We can also assist with flights, hotels and other
                      travel arrangements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-emerald-800 p-8 text-white shadow-xl md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <ShieldCheck size={28} />
              </div>

              <h3 className="mt-7 text-3xl font-bold">
                Need Help With Your Visa?
              </h3>

              <p className="mt-4 leading-8 text-emerald-50">
                Tell us your nationality, destination and intended travel
                dates. Our team will guide you through the next steps.
              </p>

              <a
                href="https://wa.me/971525657940"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-gray-100"
              >
                Get Visa Assistance
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-[4px] text-emerald-600">
              Simple Process
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900">
              How It Works
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border bg-white p-7 shadow-sm"
              >
                <div className="text-4xl font-bold text-emerald-600">
                  {item.number}
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          DOCUMENTS
      ===================================================== */}
      <section className="bg-emerald-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <FileText size={28} />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                  Preparation
                </p>

                <h2 className="text-3xl font-bold text-gray-900">
                  Common Documents
                </h2>
              </div>
            </div>

            <p className="mt-6 text-gray-600">
              Requirements vary depending on the destination, visa type and
              applicant nationality. Commonly requested documents may include:
            </p>

            <div className="mt-7 space-y-4">
              {documents.map((document) => (
                <div
                  key={document}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-emerald-600"
                    size={20}
                  />

                  <span className="text-gray-700">
                    {document}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="bg-emerald-800 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-4xl font-bold md:text-5xl">
            Ready To Apply For Your Visa?
          </h2>

          <p className="mt-5 text-lg leading-8 text-emerald-50">
            Send us your travel details and our team will help you with
            the visa application process.
          </p>

          <a
            href="https://wa.me/971525657940"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-emerald-800 transition hover:bg-gray-100"
          >
            <Globe2 size={19} />
            Contact Visa Team
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
