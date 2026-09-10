"use client";

import { track } from "@vercel/analytics";
import { MessageCircle } from "lucide-react";

interface Props {
  href: string;
  packageTitle: string;
  category?: string | null;
}

export default function PackageCardWhatsApp({
  href,
  packageTitle,
  category,
}: Props) {
  const handleClick = () => {
    track("whatsapp_click", {
      location: "package_card",
      package: packageTitle,
      category: category?.toUpperCase() || "UNKNOWN",
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
    >
      <MessageCircle size={17} />
      Get a Quote
    </a>
  );
}
