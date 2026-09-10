"use client";

import { track } from "@vercel/analytics";
import { MessageCircle } from "lucide-react";

interface PromotionWhatsAppButtonProps {
  href: string;
  promotionTitle: string;
  slug: string;
}

export default function PromotionWhatsAppButton({
  href,
  promotionTitle,
  slug,
}: PromotionWhatsAppButtonProps) {
  const handleClick = () => {
    track("whatsapp_click", {
      location: "promotion_detail",
      promotion: promotionTitle,
      slug,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
    >
      <MessageCircle size={18} />
      Get Today's Best Price
    </a>
  );
}
