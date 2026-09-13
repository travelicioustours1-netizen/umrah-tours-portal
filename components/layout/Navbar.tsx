"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Umrah", href: "/umrah" },
  { label: "Flights", href: "/flights" },
  { label: "Holidays", href: "/holidays" },
  { label: "Visa", href: "/visa" },
  { label: "Hotels", href: "/hotels" },
  { label: "Promotions", href: "/promotion" },
  { label: "Contact", href: "/contact" },
];

const otherServices = [
  {
    title: "Airport Transfers",
    icon: "transfer",
    services: [
      {
        label: "Klook",
        href: "https://klook.tpo.mx/psfziOaf",
        description: "Tours and activities",
      },
      {
        label: "Tiqets",
        href: "https://tiqets.tpo.mx/tFQy2xay",
        description: "Attractions and experiences",
      },
      {
        label: "WeGoTrip",
        href: "https://wegotrip.tpo.mx/KSFL26vH",
        description: "Self-guided tours",
      },
      {
        label: "KKday",
        href: "https://kkday.tpo.mx/hdU8OldL",
        description: "Travel experiences",
      },
      {
        label: "Go City",
        href: "https://gocity.tpo.mx/0wy4wLd3",
        description: "City passes and attractions",
      },
    ],
  },
  {
    title: "Travel Essentials",
    icon: "essentials",
    services: [
      {
        label: "Airalo",
        href: "https://airalo.tpo.mx/gsL7tF18",
        description: "International eSIM",
      },
      {
        label: "Yesim",
        href: "https://yesim.tpo.mx/XDKGvDzp",
        description: "Travel eSIM",
      },
      {
        label: "Drimsim",
        href: "https://drimsim.tpo.mx/5Ue3lZeP",
        description: "Global SIM and eSIM",
      },
      {
        label: "Saily",
        href: "https://saily.tpo.mx/31BxqJFp",
        description: "Travel eSIM plans",
      },
      {
        label: "Trip.com Long Stay",
        href: "https://ru.trip.com/sale/w/lwp8tnnrrrfk3qhp/rulongstay.html?locale=ru-RU&transparentBar=1&wkp=1",
        description: "Long-stay hotel deals",
      },
      {
        label: "Ekta",
        href: "https://ektatraveling.tpo.mx/X2qttxKG",
        description: "Travel insurance",
      },
    ],
  },
  {
    title: "Travel Support",
    icon: "support",
    services: [
      {
        label: "AirHelp",
        href: "https://airhelp.tpo.mx/IspctlDW",
        description: "Flight compensation",
      },
      {
        label: "Compensair",
        href: "https://compensair.tpo.mx/qaOWvVEc",
        description: "Flight compensation claims",
      },
      {
        label: "Radical Storage",
        href: "https://radicalstorage.tpo.mx/51qzMdWG",
        description: "Luggage storage worldwide",
      },
      {
        label: "BikesBooking",
        href: "https://bikesbooking.tpo.mx/WQZ824RN",
        description: "Bike and scooter rentals",
      },
    ],
  },
];

function CategoryIcon({ type }: { type: string }) {
  const commonProps = {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
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

    case "essentials":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m4.93 19.07 1.41-1.41" />
          <path d="m17.66 6.34 1.41-1.41" />
        </svg>
      );

    case "support":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4l2.5 2.5" />
          <path d="M8 3.5 6.5 2" />
          <path d="m16 3.5 1.5-1.5" />
        </svg>
      );

    default:
      return null;
  }
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
      <path d="M8.5 9.5c.3 1.5 1.5 3 3 3.8" />
      <path d="M8.8 8.5c.3-.5.7-.5 1-.2l.8.9c.2.2.2.5 0 .8l-.4.5" />
      <path d="M15.3 14.8c-.4.3-.8.4-1.2.2l-.9-.4" />
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 20h16" />
      <path d="M6 20V9h12v11" />
      <path d="M8 9V6h8v3" />
      <path d="M10 6V4h4v2" />
      <path d="M8 12h8" />
      <path d="M9 15h6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m19 9-7 7-7-7" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [otherServicesOpen, setOtherServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeAllMenus = () => {
    setMobileOpen(false);
    setOtherServicesOpen(false);
    setMobileServicesOpen(false);
  };

  const whatsappNumber = "971525657940";

  const whatsappMessage = encodeURIComponent(
    `Assalamu Alaikum,

I'm interested in your travel services.

Please share today's best available price, availability and complete details.

Thank you.`
  );

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={closeAllMenus}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
            <LogoIcon />
          </div>

          <div>
            <p className="text-lg font-bold leading-tight text-gray-900">
              Umrah Tours
            </p>

            <p className="text-xs text-gray-500">
              Your Trusted Travel Partner
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive(item.href)
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Desktop Other Services */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOtherServicesOpen((prev) => !prev)}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                otherServicesOpen
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
              }`}
              aria-expanded={otherServicesOpen}
            >
              Other Services
              <ChevronIcon open={otherServicesOpen} />
            </button>

            {otherServicesOpen && (
              <>
                {/* Click outside overlay */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOtherServicesOpen(false)}
                />

                {/* Scrollable Desktop Dropdown */}
                <div className="absolute right-0 top-full z-50 mt-3 max-h-[calc(100vh-110px)] w-[760px] overflow-y-auto overscroll-contain rounded-2xl border border-gray-200 bg-white shadow-2xl">
                  <div className="p-6">

                    {/* Header */}
                    <div className="mb-5 border-b border-gray-100 pb-4">
                      <h3 className="text-base font-bold text-gray-900">
                        Travel Services
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Everything you need for your journey
                      </p>
                    </div>

                    {/* Categories */}
                    <div className="grid grid-cols-3 gap-6">
                      {otherServices.map((category) => (
                        <div key={category.title}>
                          <div className="mb-3 flex items-center gap-2">
                            <span className="text-emerald-600">
                              <CategoryIcon type={category.icon} />
                            </span>

                            <h4 className="text-sm font-bold text-gray-900">
                              {category.title}
                            </h4>
                          </div>

                          <div className="space-y-1">
                            {category.services.map((service) => (
                              <a
                                key={service.label}
                                href={service.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  setOtherServicesOpen(false)
                                }
                                className="group block rounded-lg p-2 transition hover:bg-emerald-50"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700">
                                    {service.label}
                                  </span>

                                  <span className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-emerald-600">
                                    <ArrowIcon />
                                  </span>
                                </div>

                                <p className="mt-0.5 text-xs text-gray-500">
                                  {service.description}
                                </p>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 border-t border-gray-100 pt-4">
                      <p className="text-center text-xs text-gray-500">
                        Trusted travel services from our global partners
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Remaining Desktop Navigation */}
          {navItems.slice(4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive(item.href)
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>

          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => {
            setMobileOpen((prev) => !prev);
            setMobileServicesOpen(false);
          }}
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-700 lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-20 z-50 overflow-y-auto overscroll-contain border-t border-gray-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">

            {/* Main Navigation */}
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeAllMenus}
                className={`block rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Other Services */}
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() =>
                  setMobileServicesOpen((prev) => !prev)
                }
                className="flex w-full items-center justify-between bg-white px-4 py-3 text-left text-sm font-semibold text-gray-700"
              >
                <span>Other Services</span>
                <ChevronIcon open={mobileServicesOpen} />
              </button>

              {mobileServicesOpen && (
                <div className="space-y-5 border-t border-gray-100 bg-gray-50 p-4">
                  {otherServices.map((category) => (
                    <div key={category.title}>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-emerald-600">
                          <CategoryIcon type={category.icon} />
                        </span>

                        <h4 className="text-sm font-bold text-gray-900">
                          {category.title}
                        </h4>
                      </div>

                      <div className="space-y-2">
                        {category.services.map((service) => (
                          <a
                            key={service.label}
                            href={service.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeAllMenus}
                            className="flex items-center justify-between rounded-lg bg-white px-3 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            <span>{service.label}</span>

                            <span className="text-gray-400">
                              <ArrowIcon />
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining Navigation */}
            {navItems.slice(4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeAllMenus}
                className={`block rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeAllMenus}
              className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3.5 text-center text-sm font-bold text-white shadow-sm transition hover:bg-green-700"
            >
              <WhatsAppIcon />
              WhatsApp Us — Get Today's Best Price
            </a>

            {/* Mobile Quote CTA */}
            <Link
              href="/contact"
              onClick={closeAllMenus}
              className="block rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Get a Quote
            </Link>

            <div className="h-6" />
          </nav>
        </div>
      )}
    </header>
  );
}