"use client";

import { track } from "@vercel/analytics";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    track("whatsapp_click", {
      location: "floating_button",
    });
  };

  return (
    <a
      href="https://wa.me/971525657940"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-green-600 p-4 text-white shadow-lg transition hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}