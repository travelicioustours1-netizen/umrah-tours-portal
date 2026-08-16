"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import GetQuoteModal from "@/components/common/GetQuoteModal";

export default function VisaQuoteButton({
  service = "Visa Assistance",
  className = "",
  children = "Get a Visa Quote",
}: {
  service?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        {children}
      </button>

      <GetQuoteModal
        isOpen={open}
        service={service}
        onClose={() => setOpen(false)}
      />
    </>
  );
}