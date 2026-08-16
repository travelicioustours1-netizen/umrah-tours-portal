import Link from "next/link";
import { getSalesDashboardData } from "@/lib/services/sales-dashboard.service";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value);
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
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

function statusLabel(status: string) {
  return status.replaceAll("_", " ");
}

export default async function SalesDashboardPage() {
  const {
    metrics,
    overdueFollowUps,
    upcomingFollowUps,
  } = await getSalesDashboardData();

  const metricCards = [
    {
      label: "Total Enquiries",
      value: metrics.total,
      detail: "All website enquiries",
    },
    {
      label: "New",
      value: metrics.newCount,
      detail: "Requires initial contact",
    },
    {
      label: "Qualified",
      value: metrics.qualifiedCount,
      detail: "Sales opportunities",
    },
    {
      label: "Quotes Sent",
      value: metrics.quoteSentCount,
      detail: "Awaiting customer decision",
    },
    {
      label: "Follow-Ups",
      value: metrics.followUpCount,
      detail: "Active follow-up prospects",
    },
    {
      label: "Won",
      value: metrics.wonCount,
      detail: "Converted enquiries",
    },
    {
      label: "Lost",
      value: metrics.lostCount,
      detail: "Closed lost enquiries",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sales Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Monitor enquiries, sales opportunities and follow-ups.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/enquiries"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            All Enquiries
          </Link>

          <Link
            href="/admin/follow-ups"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Follow-Ups
          </Link>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {metricCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {card.label}
            </div>

            <div className="mt-2 text-3xl font-bold text-gray-900">
              {card.value}
            </div>

            <div className="mt-1 text-xs text-gray-500">
              {card.detail}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Pipeline Value
          </div>

          <div className="mt-2 text-3xl font-bold text-gray-900">
            {formatCurrency(metrics.pipelineValue)}
          </div>

          <div className="mt-1 text-xs text-gray-500">
            Qualified + Quote Sent + Follow-Up
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Won Value
          </div>

          <div className="mt-2 text-3xl font-bold text-green-700">
            {formatCurrency(metrics.wonValue)}
          </div>

          <div className="mt-1 text-xs text-gray-500">
            Estimated value of won enquiries
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Overdue Follow-Ups
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Customers requiring immediate attention.
              </p>
            </div>

            <div className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-700">
              {metrics.overdueCount}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {overdueFollowUps.length === 0 ? (
              <p className="text-sm text-gray-500">
                No overdue follow-ups.
              </p>
            ) : (
              overdueFollowUps.slice(0, 5).map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="rounded-lg border border-red-100 bg-red-50/40 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {enquiry.name}
                      </div>

                      <div className="mt-1 text-sm text-gray-600">
                        {enquiry.phone || "No phone"}
                      </div>

                      <div className="mt-1 text-sm text-gray-600">
                        {enquiry.service || "General Enquiry"}
                      </div>

                      <div className="mt-2 text-xs font-medium text-red-700">
                        Due: {formatDateTime(enquiry.nextFollowUpAt)}
                      </div>
                    </div>

                    <Link
                      href={`/admin/enquiries/${enquiry.id}`}
                      className="shrink-0 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {overdueFollowUps.length > 5 && (
            <Link
              href="/admin/follow-ups"
              className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              View all overdue follow-ups →
            </Link>
          )}
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Upcoming Follow-Ups
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Scheduled customer follow-ups.
              </p>
            </div>

            <div className="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-700">
              {metrics.upcomingCount}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {upcomingFollowUps.length === 0 ? (
              <p className="text-sm text-gray-500">
                No upcoming follow-ups.
              </p>
            ) : (
              upcomingFollowUps.slice(0, 5).map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="rounded-lg border bg-gray-50 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {enquiry.name}
                      </div>

                      <div className="mt-1 text-sm text-gray-600">
                        {enquiry.phone || "No phone"}
                      </div>

                      <div className="mt-1 text-sm text-gray-600">
                        {enquiry.service || "General Enquiry"}
                      </div>

                      <div className="mt-2 text-xs font-medium text-orange-700">
                        Follow-Up:{" "}
                        {formatDateTime(enquiry.nextFollowUpAt)}
                      </div>
                    </div>

                    <Link
                      href={`/admin/enquiries/${enquiry.id}`}
                      className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {upcomingFollowUps.length > 5 && (
            <Link
              href="/admin/follow-ups"
              className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              View all upcoming follow-ups →
            </Link>
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Sales Pipeline
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current distribution of your sales opportunities.
            </p>
          </div>

          <Link
            href="/admin/enquiries"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            Manage Enquiries →
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["New", metrics.newCount, "NEW"],
            ["Contacted", metrics.contactedCount, "CONTACTED"],
            ["Qualified", metrics.qualifiedCount, "QUALIFIED"],
            ["Quote Sent", metrics.quoteSentCount, "QUOTE_SENT"],
            ["Follow-Up", metrics.followUpCount, "FOLLOW_UP"],
            ["Won", metrics.wonCount, "WON"],
            ["Lost", metrics.lostCount, "LOST"],
          ].map(([label, count, status]) => (
            <div
              key={status}
              className="rounded-lg border p-4"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(
  String(status)
)}`}
                >
                  {label}
                </span>

                <span className="text-xl font-bold text-gray-900">
                  {count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
