"use client";

import { FormEvent, useEffect, useState } from "react";

type GetQuoteModalProps = {
  isOpen: boolean;
  service: string;
  onClose: () => void;
};

export default function GetQuoteModal({
  isOpen,
  service,
  onClose,
}: GetQuoteModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState("1");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          service,
          travelDate: travelDate || null,
          travellers: Number(travellers),
          message: message.trim() || null,
          source: "website",
        }),
      });

      const contentType = response.headers.get("content-type") || "";

      let data: {
        success?: boolean;
        message?: string;
      } = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          text || `Server returned HTTP ${response.status}`
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit your enquiry."
        );
      }

      setSuccess(true);
    } catch (err) {
      console.error("QUOTE SUBMISSION ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    if (submitting) {
      return;
    }

    setName("");
    setPhone("");
    setEmail("");
    setTravelDate("");
    setTravellers("1");
    setMessage("");
    setError("");
    setSuccess(false);

    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="get-quote-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">
              Get a Quote
            </p>

            <h2
              id="get-quote-title"
              className="mt-1 text-2xl font-bold text-gray-900"
            >
              {service}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Tell us what you need and our travel team will contact you.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Success */}
        {success ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl text-green-600">
              ✓
            </div>

            <h3 className="mt-5 text-2xl font-bold text-gray-900">
              Enquiry Received
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-600">
              Thank you. Your enquiry has been received successfully.
              Our travel team will contact you shortly.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-7 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            {/* Name */}
            <div>
              <label
                htmlFor="quote-name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>

              <input
                id="quote-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Your full name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="quote-phone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                WhatsApp / Phone <span className="text-red-500">*</span>
              </label>

              <input
                id="quote-phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                placeholder="+971 50 123 4567"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="quote-email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="quote-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Date + Travellers */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="quote-date"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Travel Date
                </label>

                <input
                  id="quote-date"
                  type="date"
                  value={travelDate}
                  onChange={(event) => setTravelDate(event.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label
                  htmlFor="quote-travellers"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Travellers
                </label>

                <input
                  id="quote-travellers"
                  type="number"
                  min="1"
                  max="50"
                  value={travellers}
                  onChange={(event) => setTravellers(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="quote-message"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Requirements
              </label>

              <textarea
                id="quote-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={4}
                placeholder="Tell us about your travel requirements..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-amber-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Request My Quote"}
            </button>

            <p className="text-center text-xs leading-5 text-gray-500">
              Your enquiry will be handled by our licensed travel-agency
              partner, Al Afeef Travels &amp; Tourism.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}