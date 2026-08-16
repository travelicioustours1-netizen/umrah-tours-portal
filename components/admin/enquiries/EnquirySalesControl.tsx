"use client";

import { useState } from "react";

type Props = {
  enquiryId: string;
  initialAssignedTo: string | null;
  initialEstimatedValue: number | null;
  initialNextFollowUpAt: Date | string | null;
  initialLostReason: string | null;
  initialStatus: string;
};

function formatDateTimeLocal(
  value: Date | string | null
): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function EnquirySalesControl({
  enquiryId,
  initialAssignedTo,
  initialEstimatedValue,
  initialNextFollowUpAt,
  initialLostReason,
  initialStatus,
}: Props) {
  const [assignedTo, setAssignedTo] = useState(
    initialAssignedTo ?? ""
  );

  const [estimatedValue, setEstimatedValue] = useState(
    initialEstimatedValue?.toString() ?? ""
  );

  const [nextFollowUpAt, setNextFollowUpAt] = useState(
    formatDateTimeLocal(initialNextFollowUpAt)
  );

  const [lostReason, setLostReason] = useState(
    initialLostReason ?? ""
  );

  const [status] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function saveSalesDetails() {
    if (status === "LOST" && !lostReason.trim()) {
      setMessage("Please enter a lost reason before saving.");
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
            assignedTo: assignedTo.trim() || null,
            estimatedValue:
              estimatedValue === ""
                ? null
                : Number(estimatedValue),
            nextFollowUpAt:
              nextFollowUpAt || null,
            lostReason:
              lostReason.trim() || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to save sales information."
        );
      }

      setMessage("Sales information saved.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save sales information."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 lg:col-span-3">
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Sales Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="assignedTo"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Assigned To
          </label>

          <input
            id="assignedTo"
            type="text"
            value={assignedTo}
            onChange={(event) =>
              setAssignedTo(event.target.value)
            }
            placeholder="Salesperson name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="estimatedValue"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Estimated Value (AED)
          </label>

          <input
            id="estimatedValue"
            type="number"
            min="0"
            step="100"
            value={estimatedValue}
            onChange={(event) =>
              setEstimatedValue(event.target.value)
            }
            placeholder="e.g. 5000"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="nextFollowUpAt"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Next Follow-Up
          </label>

          <input
            id="nextFollowUpAt"
            type="datetime-local"
            value={nextFollowUpAt}
            onChange={(event) =>
              setNextFollowUpAt(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="lostReason"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Lost Reason
          </label>

          <input
            id="lostReason"
            type="text"
            value={lostReason}
            onChange={(event) =>
              setLostReason(event.target.value)
            }
            placeholder="Why was this enquiry lost?"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          onClick={saveSalesDetails}
          disabled={saving}
          className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Sales Information"}
        </button>

        {message && (
          <span className="text-sm text-gray-600">
            {message}
          </span>
        )}
      </div>
    </div>
  );
}