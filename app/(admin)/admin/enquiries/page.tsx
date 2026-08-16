import Link from "next/link";
import { getAllEnquiries } from "@/lib/services/enquiry.service";

const PIPELINE_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "QUOTE_SENT",
  "FOLLOW_UP",
  "WON",
  "LOST",
] as const;

function formatDate(date: Date | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date: Date | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatCurrency(value: number | null) {
  if (value === null || value === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value);
}

function statusClass(status: string) {
  switch (status) {
    case "NEW":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "CONTACTED":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";

    case "QUALIFIED":
      return "bg-purple-50 text-purple-700 border-purple-200";

    case "QUOTE_SENT":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";

    case "FOLLOW_UP":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "WON":
      return "bg-green-50 text-green-700 border-green-200";

    case "LOST":
      return "bg-red-50 text-red-700 border-red-200";

    case "CONVERTED":
      return "bg-green-50 text-green-700 border-green-200";

    case "CLOSED":
      return "bg-gray-100 text-gray-700 border-gray-200";

    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function statusLabel(status: string) {
  return status.replaceAll("_", " ");
}

export default async function AdminEnquiriesPage() {
  const enquiries = await getAllEnquiries();

  const pipelineCounts = PIPELINE_STATUSES.reduce(
    (acc, status) => {
      acc[status] = enquiries.filter(
        (enquiry) => enquiry.status === status
      ).length;

      return acc;
    },
    {} as Record<(typeof PIPELINE_STATUSES)[number], number>
  );

  const totalPipelineValue = enquiries
    .filter((enquiry) =>
      ["QUALIFIED", "QUOTE_SENT", "FOLLOW_UP"].includes(enquiry.status)
    )
    .reduce(
      (total, enquiry) => total + (enquiry.estimatedValue ?? 0),
      0
    );

  const wonValue = enquiries
    .filter((enquiry) => enquiry.status === "WON")
    .reduce(
      (total, enquiry) => total + (enquiry.estimatedValue ?? 0),
      0
    );

  const followUpsDue = enquiries.filter((enquiry) => {
    if (!enquiry.nextFollowUpAt) {
      return false;
    }

    return new Date(enquiry.nextFollowUpAt) <= new Date();
  }).length;

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sales Pipeline
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage website enquiries and move prospects through your sales
            pipeline.
          </p>
        </div>

        <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
          {enquiries.length}{" "}
          {enquiries.length === 1 ? "Enquiry" : "Enquiries"}
        </div>
      </div>

      {/* Pipeline summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {PIPELINE_STATUSES.map((status) => (
          <div
            key={status}
            className="rounded-xl border bg-white p-4 shadow-sm"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {statusLabel(status)}
            </div>

            <div className="mt-2 text-2xl font-bold text-gray-900">
              {pipelineCounts[status]}
            </div>
          </div>
        ))}
      </div>

      {/* Sales metrics */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Pipeline Value
          </div>

          <div className="mt-2 text-2xl font-bold text-gray-900">
            {formatCurrency(totalPipelineValue)}
          </div>

          <div className="mt-1 text-xs text-gray-500">
            Qualified + Quote Sent + Follow-Up
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Won Value
          </div>

          <div className="mt-2 text-2xl font-bold text-green-700">
            {formatCurrency(wonValue)}
          </div>

          <div className="mt-1 text-xs text-gray-500">
            Estimated value of won enquiries
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Follow-Ups Due
          </div>

          <div className="mt-2 text-2xl font-bold text-orange-600">
            {followUpsDue}
          </div>

          <div className="mt-1 text-xs text-gray-500">
  Requires sales action now
</div>
        </div>
      </div>

      {/* Enquiry table */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="w-full min-w-[1250px]">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>

              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Service
              </th>

              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Travel Date
              </th>

              <th className="p-3 text-center text-sm font-semibold text-gray-700">
                Travellers
              </th>

              <th className="p-3 text-right text-sm font-semibold text-gray-700">
                Est. Value
              </th>

              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Assigned
              </th>

              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Follow-Up
              </th>

              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {enquiries.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="p-10 text-center text-sm text-gray-500"
                >
                  No enquiries found.
                </td>
              </tr>
            ) : (
              enquiries.map((enquiry) => (
                <tr
                  key={enquiry.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="font-medium text-gray-900">
                      {enquiry.name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {enquiry.phone || "No phone"}
                    </div>

                    <div className="text-sm text-gray-500">
                      {enquiry.email || "No email"}
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="font-medium text-gray-900">
                      {enquiry.service || "General Enquiry"}
                    </div>

                    {enquiry.package && (
                      <div className="mt-1 text-xs text-gray-500">
                        Package: {enquiry.package.title}
                      </div>
                    )}
                  </td>

                  <td className="p-3 text-sm text-gray-700">
                    {formatDate(enquiry.travelDate)}
                  </td>

                  <td className="p-3 text-center text-sm text-gray-700">
                    {enquiry.travellers ?? "—"}
                  </td>

                  <td className="p-3 text-right text-sm font-medium text-gray-900">
                    {formatCurrency(enquiry.estimatedValue)}
                  </td>

                  <td className="p-3 text-sm text-gray-700">
                    {enquiry.assignedTo || "Unassigned"}
                  </td>

                  <td className="p-3 text-sm">
  {enquiry.nextFollowUpAt ? (
    (() => {
      const followUpDate = new Date(enquiry.nextFollowUpAt);
      const isDue = followUpDate <= new Date();

      return (
        <div>
          <div
            className={
              isDue
                ? "font-semibold text-red-600"
                : "text-gray-700"
            }
          >
            {formatDateTime(enquiry.nextFollowUpAt)}
          </div>

          {isDue && (
            <div className="mt-1 inline-flex rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">
              Follow-up due
            </div>
          )}
        </div>
      );
    })()
  ) : (
    <span className="text-gray-400">Not scheduled</span>
  )}
</td>

                  <td className="p-3">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(
                        enquiry.status
                      )}`}
                    >
                      {statusLabel(enquiry.status)}
                    </span>
                  </td>

                  <td className="p-3">
                    <Link
                      href={`/admin/enquiries/${enquiry.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}