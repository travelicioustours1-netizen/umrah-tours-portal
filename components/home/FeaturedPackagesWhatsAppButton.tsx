"use client";

import { track } from "@vercel/analytics";
import { MessageCircle } from "lucide-react";

export default function FeaturedPackagesWhatsAppButton() {
  const whatsappNumber = "971525657940";

  const message = `Assalamu Alaikum,

I'm looking for an Umrah package.

Please suggest the best available package based on my travel dates, number of travellers and preferred hotel level.

Thank you.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    track("whatsapp_click", {
      location: "homepage_featured_packages",
    });
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
    >
      <MessageCircle size={18} />
      Get Package Advice on WhatsApp
    </a>
  );
}