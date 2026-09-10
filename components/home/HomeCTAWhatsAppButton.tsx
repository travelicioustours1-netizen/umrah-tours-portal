"use client";

import { track } from "@vercel/analytics";
import { MessageCircle } from "lucide-react";

export default function HomeCTAWhatsAppButton() {
  const whatsappNumber = "971525657940";

  const message = `Assalamu Alaikum,

I'm interested in an Umrah package.

Please share today's best price, availability, travel dates, hotel options, complete package details and booking procedure.

Thank you.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    track("whatsapp_click", {
      location: "homepage_bottom_cta",
    });
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-green-800 transition hover:bg-gray-100"
    >
      <MessageCircle size={18} />
      Get Today&apos;s Best Price on WhatsApp
    </a>
  );
}