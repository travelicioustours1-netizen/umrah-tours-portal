"use client";

import { useState } from "react";
import GetQuoteModal from "@/components/common/GetQuoteModal";

const services = [
  {
    icon: "🕋",
    title: "Umrah",
    service: "Umrah Packages",
    description:
      "Complete Umrah packages with accommodation, visa assistance, transport and travel support.",
    href: "/umrah",
    button: "Get a Quote",
  },
  {
    icon: "✈️",
    title: "Flights",
    service: "Flights",
    description:
      "International and domestic flight booking with options tailored to your travel dates and budget.",
    href: "/flights",
    button: "Get a Quote",
  },
  {
    icon: "🏨",
    title: "Hotels",
    service: "Hotels",
    description:
      "Hotel accommodation in Makkah, Madinah and destinations around the world.",
    href: "/hotels",
    button: "Get a Quote",
  },
  {
    icon: "🌍",
    title: "Holidays",
    service: "Holiday Packages",
    description:
      "Complete holiday experiences including flights, hotels, transfers and travel arrangements.",
    href: "/holidays",
    button: "Get a Quote",
  },
  {
    icon: "🛂",
    title: "Visa",
    service: "Visa Assistance",
    description:
      "Visa assistance for eligible destinations and travel requirements through our travel partner.",
    href: "/visa",
    button: "Get a Quote",
  },
];

export default function Services() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  function openQuote(service: string) {
    setSelectedService(service);
    setQuoteOpen(true);
  }

  function closeQuote() {
    setQuoteOpen(false);
    setSelectedService("");
  }

  return (
    <>
      <section className="py-16 md:py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 mb-3">
              Our Travel Services
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need for Your Journey
            </h2>

            <p className="mt-4 text-gray-600 text-base md:text-lg">
              From Umrah and flights to hotels, holidays and visa assistance,
              we help make your travel planning simple and convenient.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {services.map((service) => (
              <div
                key={service.title}
                className="group h-full"
              >
                <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg">
                  {/* Icon */}
                  <div className="mx-auto mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-50 text-3xl transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-amber-600">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={() => openQuote(service.service)}
                    className="mt-5 inline-flex items-center justify-center text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700"
                  >
                    {service.button}
                    <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Partner Disclosure */}
          <div className="mt-10 text-center">
            <p className="mx-auto max-w-3xl text-xs leading-6 text-gray-500 md:text-sm">
              Travel services are provided and fulfilled through our licensed
              travel-agency partner, Al Afeef Travels &amp; Tourism.
            </p>
          </div>
        </div>
      </section>

      {/* Universal Quote Modal */}
      <GetQuoteModal
        isOpen={quoteOpen}
        service={selectedService}
        onClose={closeQuote}
      />
    </>
  );
}