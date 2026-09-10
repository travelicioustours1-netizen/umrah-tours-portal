"use client";

import { track } from "@vercel/analytics";
import { MessageCircle } from "lucide-react";

export default function HeroWhatsAppButton() {
  const whatsappNumber = "971525657940";

  const message = `Assalamu Alaikum,

I'm interested in Umrah or a holiday package.

Please share today's best price, availability, travel dates and suitable package options.

Thank you.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    track("whatsapp_click", {
      location: "homepage_hero",
    });
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-7 py-4 font-semibold text-white shadow-lg transition hover:bg-green-700"
    >
      <MessageCircle size={19} />
      Get Today's Best Price
    </a>
  );
}