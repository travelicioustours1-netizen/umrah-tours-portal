"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Globe2,
  Headphones,
  Plane,
  ShieldCheck,
} from "lucide-react";

import GetQuoteModal from "@/components/common/GetQuoteModal";

const visaServices = [
  {
    title: "UAE Tourist Visa",
    description:
      "Tourist visa assistance for visitors planning to explore the UAE.",
    icon: Globe2,
  },
  {
    title: "Saudi Tourist Visa",
    description:
      "Assistance with Saudi tourist visa applications and travel preparation.",
    icon: Plane,
  },
  {
    title: "Umrah Visa Assistance",
    description:
      "Visa assistance as part of your complete Umrah travel arrangements.",
    icon: ShieldCheck,
  },
  {
    title: "International Visas",
    description:
      "Visa assistance for selected international destinations and tourist travel.",
    icon: Globe2,
  },
];

const process = [
  {
    number: "01",
    title: "Send Your Enquiry",
    description:
      "Tell us your destination, nationality, travel dates and number of travellers.",
  },
  {
    number: "02",
    title: "Document Assessment",
    description:
      "Our team reviews the basic requirements and advises you on the documents needed.",
  },
  {
    number: "03",
    title: "Application Processing",
    description:
      "We assist with the application process and keep you updated on its progress.",
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

export default function VisaPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState("Visa Assistance");

  function openQuote(service = "Visa Assistance") {
    setSelectedService(service);
    setQuoteOpen(true);
  }

  function closeQuote() {
    setQuoteOpen(false);
  }

  return (
    <main className="bg-white">
      {/* =========================================================
          HERO
      ========================================================= */}
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
                Visa Assistance
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-tight md:text-6xl">
                Travel With Confidence
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
                Professional visa assistance for UAE, Saudi Arabia and
                selected international destinations.
              </p>

              <button
                type="button"
                onClick={() => openQuote("Visa Assistance")}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                Get a Visa Quote
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VISA SERVICES
      ========================================================= */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-[4px] text-emerald-600">
              Visa Services
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              Visa Assistance Made Simple
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              From document guidance to application support, our travel team
              helps make the visa process easier and more convenient.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {visaServices.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="rounded-2xl border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {service.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => openQuote(service.title)}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Get a Quote
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY CHOOSE US
      ========================================================= */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-semibold uppercase tracking-[4px] text-emerald-600">
                Why Choose Us
              </p>

              <h2 className="mt-3 text-4xl font-bold text-gray-900">
                Support From Enquiry To Travel
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Our team provides practical guidance throughout the visa
                process so you know what information and documents are
                required.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <CheckCircle2
                    className="mt-1 shrink-0 text-emerald-600"
                    size={22}
                  />

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Clear document guidance
                    </h3>

                    <p className="mt-1 text-gray-600">
                      Understand the basic documents required before starting
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
                      Application assistance
                    </h3>

                    <p className="mt-1 text-gray-600">
                      Get assistance with the application process and
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
                      Travel-focused support
                    </h3>

                    <p className="mt-1 text-gray-600">
                      Combine visa assistance with flights, hotels, holidays
                      and Umrah travel arrangements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-emerald-800 p-8 text-white shadow-xl md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <Headphones size={28} />
              </div>

              <h3 className="mt-7 text-3xl font-bold">
                Need Help With Your Visa?
              </h3>

              <p className="mt-4 leading-8 text-emerald-50">
                Tell us your nationality, destination and intended travel
                dates. Our team can guide you on the next steps.
              </p>

              <button
                type="button"
                onClick={() => openQuote("Visa Assistance")}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-gray-100"
              >
                Get a Visa Quote
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROCESS
      ========================================================= */}
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

      {/* =========================================================
          DOCUMENTS
      ========================================================= */}
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

                  <span className="text-gray-700">{document}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DISCLAIMER
      ========================================================= */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Clock3 size={18} />

            <span className="font-semibold">
              Processing times and requirements vary
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Visa approval is subject to the relevant immigration, embassy or
            government authority. Requirements, fees and processing times may
            vary by destination, nationality and visa type.
          </p>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-emerald-800 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-4xl font-bold md:text-5xl">
            Ready To Start Your Visa Application?
          </h2>

          <p className="mt-5 text-lg leading-8 text-emerald-50">
            Send us your travel details and our team will help you with the
            next step.
          </p>

          <button
            type="button"
            onClick={() => openQuote("Visa Assistance")}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-emerald-800 transition hover:bg-gray-100"
          >
            Get a Visa Quote
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* =========================================================
          GET A QUOTE MODAL
      ========================================================= */}
      <GetQuoteModal
        isOpen={quoteOpen}
        onClose={closeQuote}
        service={selectedService}
      />
    </main>
  );
}