"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { ArrowRight } from "lucide-react";

interface DestinationLinkProps {
  href: string;
  label: string;
  destination: string;
}

export default function DestinationLink({
  href,
  label,
  destination,
}: DestinationLinkProps) {
  const handleClick = () => {
    track("destination_click", {
      location: "homepage_destinations",
      destination,
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
    >
      {label}
      <ArrowRight size={17} />
    </Link>
  );
}
