"use client";

import { track } from "@vercel/analytics";
import { MessageCircle } from "lucide-react";

interface PromotionListingWhatsAppButtonProps {
  promotionTitle: string;
}

export default function PromotionListingWhatsAppButton({
  promotionTitle,
}: PromotionListingWhatsAppButtonProps) {
  const whatsappNumber = "971525657940";

  const message = `Assalamu Alaikum,

I'm interested in the ${promotionTitle}.

Please share today's best price, availability, travel dates, complete package details and booking procedure.

Thank you.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    track("whatsapp_click", {
      location: "promotion_listing",
      promotion: promotionTitle,
    });
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
    >
      <MessageCircle size={18} />
      Get Today's Best Price
    </a>
  );
}