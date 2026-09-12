"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import GetQuoteModal from "@/components/common/GetQuoteModal";

const services = [
  {
    icon: "umrah",
    title: "Umrah",
    service: "Umrah Packages",
    description:
      "Complete Umrah packages with accommodation, visa assistance, transport and travel support.",
    href: "/umrah",
    button: "Get a Quote",
  },
  {
    icon: "flight",
    title: "Flights",
    service: "Flights",
    description:
      "International and domestic flight booking with options tailored to your travel dates and budget.",
    href: "/flights",
    button: "Get a Quote",
  },
  {
    icon: "hotel",
    title: "Hotels",
    service: "Hotels",
    description:
      "Hotel accommodation in Makkah, Madinah and destinations around the world.",
    href: "/hotels",
    button: "Get a Quote",
  },
  {
    icon: "holiday",
    title: "Holidays",
    service: "Holiday Packages",
    description:
      "Complete holiday experiences including flights, hotels, transfers and travel arrangements.",
    href: "/holidays",
    button: "Get a Quote",
  },
  {
    icon: "visa",
    title: "Visa",
    service: "Visa Assistance",
    description:
      "Visa assistance for eligible destinations and travel requirements through our travel partner.",
    href: "/visa",
    button: "Get a Quote",
  },
  {
    icon: "transfer",
    title: "Airport Transfers",
    service: "Airport Transfers",
    description:
      "Convenient airport pickup and drop-off services to help you travel comfortably from the airport to your destination.",
    href: "/airport-transfers",
    button: "Explore Transfers",
  },
];

function ServiceIcon({ type }: { type: string }) {
  const commonProps = {
    className: "h-8 w-8",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "umrah":
      return (
        <svg {...commonProps}>
          <path d="M4 20h16" />
          <path d="M6 20V9h12v11" />
          <path d="M8 9V6h8v3" />
          <path d="M10 6V4h4v2" />
          <path d="M8 12h8" />
          <path d="M9 15h6" />
        </svg>
      );

    case "flight":
      return (
        <svg {...commonProps}>
          <path d="M2 16l20-8-8 20-3-9-9-3z" />
          <path d="M11 19l-2-5" />
        </svg>
      );

    case "hotel":
      return (
        <svg {...commonProps}>
          <path d="M4 20V6h16v14" />
          <path d="M4 10h16" />
          <path d="M8 6v4" />
          <path d="M12 6v4" />
          <path d="M16 6v4" />
          <path d="M8 14h3v3H8z" />
          <path d="M14 14h3v3h-3z" />
        </svg>
      );

    case "holiday":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M4.93 19.07l1.41-1.41" />
          <path d="M17.66 6.34l1.41-1.41" />
        </svg>
      );

    case "visa":
      return (
        <svg {...commonProps}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8" />
          <path d="M8 11h8" />
          <path d="M8 15h4" />
          <path d="M15 15h1" />
        </svg>
      );

    case "transfer":
      return (
        <svg {...commonProps}>
          <path d="M3 17h18" />
          <path d="M5 17l1.5-6h11L19 17" />
          <path d="M7 11l2-4h6l2 4" />
          <circle cx="7.5" cy="17.5" r="1.5" />
          <circle cx="16.5" cy="17.5" r="1.5" />
          <path d="M3 8h5" />
          <path d="M6 5l2 3-2 3" />
        </svg>
      );

    default:
      return null;
  }
}

export default function Services() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  function openQuote(service: string) {
    track("service_quote_started", {
      service,
      location: "homepage_services",
    });

    setSelectedService(service);
    setQuoteOpen(true);
  }

  function closeQuote() {
    setQuoteOpen(false);
    setSelectedService("");
  }

  return (
    <>
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">
              Our Travel Services
            </p>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Everything You Need for Your Journey
            </h2>

            <p className="mt-4 text-base text-gray-600 md:text-lg">
              From Umrah and flights to hotels, holidays, visas and airport
              transfers, we help make your travel planning simple and
              convenient.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-6">
            {services.map((service) => (
              <div key={service.title} className="group h-full">
                <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg">
                  <div className="mx-auto mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-transform duration-300 group-hover:scale-110">
                    <ServiceIcon type={service.icon} />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-amber-600">
                    {service.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                    {service.description}
                  </p>

                  {service.title === "Airport Transfers" ? (
                    <a
                      href={service.href}
                      className="mt-5 inline-flex items-center justify-center text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700"
                    >
                      {service.button}

                      <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  ) : (
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
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="mx-auto max-w-3xl text-xs leading-6 text-gray-500 md:text-sm">
              Travel services are provided and fulfilled through our licensed
              travel-agency partner, Al Afeef Travels &amp; Tourism.
            </p>
          </div>
        </div>
      </section>

      <GetQuoteModal
        isOpen={quoteOpen}
        service={selectedService}
        onClose={closeQuote}
      />
    </>
  );
}