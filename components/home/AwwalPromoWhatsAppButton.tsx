"use client";

import { track } from "@vercel/analytics";
import { MessageCircle } from "lucide-react";

export default function AwwalPromoWhatsAppButton() {
  const whatsappNumber = "971525657940";

  const message = `Assalamu Alaikum,

I'm interested in the Awwal Umrah Package.

Please share today's best price, availability, travel dates, complete package details and booking procedure.

Thank you.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    track("whatsapp_click", {
      location: "homepage_awwal_promo",
      package: "Awwal Umrah Package",
    });
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition duration-200 hover:bg-green-700 hover:shadow-lg"
    >
      <MessageCircle size={20} />
      Get Today's Best Price
    </a>
  );
}
