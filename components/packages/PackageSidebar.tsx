"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@vercel/analytics";
import {
  CheckCircle,
  Download,
  MessageCircle,
  FileText,
  CalendarCheck,
  ShieldCheck,
  Headphones,
} from "lucide-react";

import GetQuoteModal from "@/components/common/GetQuoteModal";

interface Props {
  pkg: {
    slug: string;
    title: string;
    price: number;
    brochure?: string | null;
    category?: string | null;

    visa: boolean;
    meals: boolean;
    transport: boolean;
  };
}

export default function PackageSidebar({ pkg }: Props) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const whatsappNumber = "971525657940";

  const category = pkg.category?.toUpperCase();

  const isHoliday = category === "HOLIDAY";
  const isVisa = category === "VISA";
  const isEnquiryOnlyVisa = isVisa && Number(pkg.price) <= 0;

  const serviceLabel = isHoliday
    ? "International Holiday"
    : isVisa
      ? "Visa Service"
      : "Umrah Package";

  /*
   * Create a relevant WhatsApp message for each service type.
   * This avoids sending visa-style questions for holidays and Umrah.
   */
  const whatsappMessage = isVisa
    ? `Assalamu Alaikum,

I'm interested in the ${pkg.title}.

Please share the visa requirements, applicable fee, processing time, availability, complete service details and application procedure.

My nationality/passport country is:

Thank you.`
    : isHoliday
      ? `Assalamu Alaikum,

I'm interested in the ${pkg.title}.

Please share today's best price, availability, travel dates, complete package details and booking procedure.

Thank you.`
      : `Assalamu Alaikum,

I'm interested in the ${pkg.title}.

Please share the latest availability, package price, travel dates, hotel details, complete package inclusions and booking procedure.

Thank you.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const handlePrimaryWhatsAppClick = () => {
    track("whatsapp_click", {
      location: "package_sidebar_primary",
      package: pkg.title,
      category: category || "UNKNOWN",
    });
  };

  const handleVisaWhatsAppClick = () => {
    track("whatsapp_click", {
      location: "package_sidebar_visa",
      package: pkg.title,
      category: category || "VISA",
    });
  };

  const handleCustomizedWhatsAppClick = () => {
    track("whatsapp_click", {
      location: "package_sidebar_customized",
      package: pkg.title,
      category: "HOLIDAY",
    });
  };

  const whatsappButtonLabel = isEnquiryOnlyVisa
    ? "Get Visa Assistance"
    : isHoliday
      ? "Get Today's Best Price"
      : "Check Availability";

  const quoteButtonLabel = isHoliday
    ? "Request Holiday Quote"
    : isVisa
      ? "Request Visa Quote"
      : "Request Umrah Quote";

  return (
    <aside className="lg:sticky lg:top-6">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">

        {/* Header */}
        <div className="border-b bg-gray-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[2px] text-emerald-600">
            {serviceLabel}
          </p>

          <h2 className="mt-2 text-xl font-bold leading-tight text-gray-900">
            {pkg.title}
          </h2>
        </div>

        <div className="space-y-6 p-6">

          {/* Price */}
          <div>
            {isEnquiryOnlyVisa ? (
              <>
                <p className="text-sm text-gray-500">
                  Visa Fee
                </p>

                <div className="mt-1">
                  <span className="text-3xl font-bold text-emerald-600">
                    Contact for Price
                  </span>
                </div>

                <p className="mt-2 text-sm leading-5 text-gray-500">
                  Fees vary by nationality, visa type and applicable
                  government charges.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  Starting From
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-4xl font-bold text-emerald-600">
                    AED {Number(pkg.price).toLocaleString("en-AE")}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {isVisa ? "Per applicant" : "Per person"}
                </p>

                {isHoliday && (
                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Contact us for today's availability and best available
                    package price.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Primary WhatsApp CTA */}
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePrimaryWhatsAppClick}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-4 font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              <MessageCircle size={21} />
              {whatsappButtonLabel}
            </a>

            <p className="mt-2 text-center text-xs text-gray-500">
              Quick response from our travel team
            </p>
          </div>

          {/* Quote CTA */}
          <button
            type="button"
            onClick={() => setIsQuoteModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 px-5 py-3.5 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            <FileText size={19} />
            {quoteButtonLabel}
          </button>

          <GetQuoteModal
            isOpen={isQuoteModalOpen}
            service={pkg.title}
            onClose={() => setIsQuoteModalOpen(false)}
          />

          {/* Booking / Visa CTA */}
          {isEnquiryOnlyVisa ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleVisaWhatsAppClick}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              <ShieldCheck size={19} />
              Check Visa Requirements
            </a>
          ) : (
            <Link
              href={`/booking/${pkg.slug}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              <CalendarCheck size={19} />
              Book Now
            </Link>
          )}

          {/* Holiday trust */}
          {isHoliday && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Travel Support Included
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    Our team can assist with flights, hotels, transfers and
                    travel requirements.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Visa trust */}
          {isVisa && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Visa Assistance
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    Get guidance with visa requirements, documentation and
                    application procedures.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Package Includes */}
          <div className="border-t pt-5">
            <p className="mb-4 text-sm font-semibold text-gray-900">
              Service Includes
            </p>

            <div className="space-y-3">
              <Feature
                enabled={pkg.visa}
                title={
                  isVisa
                    ? "Visa Assistance"
                    : isHoliday
                      ? "Visa Assistance"
                      : "Visa Included"
                }
              />

              {!isVisa && (
                <>
                  <Feature
                    enabled={pkg.transport}
                    title="Airport & Local Transport"
                  />

                  <Feature
                    enabled={pkg.meals}
                    title="Meals Included"
                  />
                </>
              )}
            </div>
          </div>

          {/* Brochure */}
          {pkg.brochure && (
            <Link
              href={pkg.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <Download size={18} />
              Download Brochure
            </Link>
          )}

          {/* Customized holiday */}
          {isHoliday && (
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <Headphones
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Need a Customized Holiday?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Tell us your preferred dates, flights, hotels or
                    sightseeing requirements.
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCustomizedWhatsAppClick}
                    className="mt-3 inline-flex text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    Chat with our team â†’
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Company */}
          <div className="border-t pt-5 text-center">
            <p className="text-sm font-semibold text-gray-800">
              AL AFEEF TRAVELS AND TOURS
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Premium Umrah & Holiday Experiences
            </p>

            <p className="mt-3 text-sm text-gray-600">
              +971 52 565 7940
            </p>
          </div>

        </div>
      </div>
    </aside>
  );
}

function Feature({
  enabled,
  title,
}: {
  enabled: boolean;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle
        size={19}
        className={enabled ? "text-green-600" : "text-gray-300"}
      />

      <span
        className={
          enabled
            ? "text-sm text-gray-700"
            : "text-sm text-gray-400"
        }
      >
        {title}
      </span>
    </div>
  );
}
