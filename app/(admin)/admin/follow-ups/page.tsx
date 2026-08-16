import Link from "next/link";
import { getFollowUpEnquiries } from "@/lib/services/followup.service";

function formatDateTime(date: Date | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-AE", {
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

type FollowUpEnquiry = Awaited<
  ReturnType<typeof getFollowUpEnquiries>
>["dueToday"][number];

function FollowUpTable({
  title,
  enquiries,
  emptyMessage,
}: {
  title: string;
  enquiries: FollowUpEnquiry[];
  emptyMessage: string;
}) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {enquiries.length}{" "}
          {enquiries.length === 1 ? "enquiry" : "enquiries"}
        </p>
      </div>

      {enquiries.length === 0 ? (
        <div className="p-8 text-center text-sm text-gray-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Customer
                </th>

                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Service
                </th>

                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Assigned
                </th>

                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Follow-Up
                </th>

                <th className="p-3 text-right text-sm font-semibold text-gray-700">
                  Est. Value
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
              {enquiries.map((enquiry) => (
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
                        {enquiry.package.title}
                      </div>
                    )}
                  </td>

                  <td className="p-3 text-sm text-gray-700">
                    {enquiry.assignedTo || "Unassigned"}
                  </td>

                  <td className="p-3 text-sm font-medium text-gray-900">
                    {formatDateTime(enquiry.nextFollowUpAt)}
                  </td>

                  <td className="p-3 text-right text-sm font-medium text-gray-900">
                    {formatCurrency(enquiry.estimatedValue)}
                  </td>

                  <td className="p-3">
                    <span className="inline-flex rounded-full border bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                      {enquiry.status.replaceAll("_", " ")}
                    </span>
                  </td>

                  <td className="p-3">
                    <Link
                      href={`/admin/enquiries/${enquiry.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default async function AdminFollowUpsPage() {
  const {
    dueToday,
    overdue,
    upcoming,
  } = await getFollowUpEnquiries();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Sales Follow-Ups
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage overdue, today, and upcoming customer follow-ups.
        </p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-red-50 p-5">
          <div className="text-sm font-medium text-red-700">
            Overdue
          </div>

          <div className="mt-2 text-3xl font-bold text-red-800">
            {overdue.length}
          </div>

          <div className="mt-1 text-xs text-red-600">
            Requires immediate sales action
          </div>
        </div>

        <div className="rounded-xl border bg-orange-50 p-5">
          <div className="text-sm font-medium text-orange-700">
            Due Today
          </div>

          <div className="mt-2 text-3xl font-bold text-orange-800">
            {dueToday.length}
          </div>

          <div className="mt-1 text-xs text-orange-600">
            Customer follow-ups scheduled today
          </div>
        </div>

        <div className="rounded-xl border bg-blue-50 p-5">
          <div className="text-sm font-medium text-blue-700">
            Upcoming
          </div>

          <div className="mt-2 text-3xl font-bold text-blue-800">
            {upcoming.length}
          </div>

          <div className="mt-1 text-xs text-blue-600">
            Future sales follow-ups
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <FollowUpTable
          title="Overdue Follow-Ups"
          enquiries={overdue}
          emptyMessage="No overdue follow-ups."
        />

        <FollowUpTable
          title="Today's Follow-Ups"
          enquiries={dueToday}
          emptyMessage="No follow-ups due today."
        />

        <FollowUpTable
          title="Upcoming Follow-Ups"
          enquiries={upcoming}
          emptyMessage="No upcoming follow-ups."
        />
      </div>
    </div>
  );
}
