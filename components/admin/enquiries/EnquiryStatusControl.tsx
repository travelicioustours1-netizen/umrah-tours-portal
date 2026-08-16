"use client";

import { useState } from "react";

const statuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "QUOTE_SENT",
  "FOLLOW_UP",
  "WON",
  "LOST",
] as const;

type Status = (typeof statuses)[number];

type Props = {
  enquiryId: string;
  initialStatus: string;
};

const statusLabels: Record<Status, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  QUOTE_SENT: "Quote Sent",
  FOLLOW_UP: "Follow-Up",
  WON: "Won",
  LOST: "Lost",
};

export default function EnquiryStatusControl({
  enquiryId,
  initialStatus,
}: Props) {
  const normalizedInitialStatus: Status =
    initialStatus === "CONVERTED"
      ? "WON"
      : initialStatus === "CLOSED"
        ? "LOST"
        : statuses.includes(initialStatus as Status)
          ? (initialStatus as Status)
          : "NEW";

  const [status, setStatus] = useState<Status>(
    normalizedInitialStatus
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function updateStatus(nextStatus: Status) {
    if (nextStatus === status) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/enquiries/${enquiryId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to update enquiry status."
        );
      }

      setStatus(nextStatus);
      setMessage("Status updated.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to update enquiry status."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 lg:col-span-3">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Sales Pipeline
      </h2>

      <div className="flex flex-wrap items-center gap-3">
        {statuses.map((item) => {
          const active = status === item;

          return (
            <button
              key={item}
              type="button"
              disabled={saving}
              onClick={() => updateStatus(item)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {statusLabels[item]}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Current stage:{" "}
        <span className="font-semibold text-gray-900">
          {statusLabels[status]}
        </span>
      </div>

      {message && (
        <div className="mt-3 text-sm text-gray-600">
          {message}
        </div>
      )}
    </div>
  );
}