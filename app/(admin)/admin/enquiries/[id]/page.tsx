import EnquirySalesControl from "@/components/admin/enquiries/EnquirySalesControl";
import EnquiryStatusControl from "@/components/admin/enquiries/EnquiryStatusControl";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnquiryById } from "@/lib/services/enquiry.service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(date: Date | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default async function AdminEnquiryDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const enquiry = await getEnquiryById(id);

  if (!enquiry) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/enquiries"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to Enquiries
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Enquiry Details
          </h1>
        </div>

        <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          {enquiry.status}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer information */}
        <div className="rounded-xl border bg-white p-6 lg:col-span-2">
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            Customer Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="mt-1 font-medium text-gray-900">
                {enquiry.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="mt-1 font-medium text-gray-900">
                {enquiry.service || "General Enquiry"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone / WhatsApp</p>
              <p className="mt-1 font-medium text-gray-900">
                {enquiry.phone || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-1 font-medium text-gray-900">
                {enquiry.email || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Travel Date</p>
              <p className="mt-1 font-medium text-gray-900">
                {formatDate(enquiry.travelDate)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Travellers</p>
              <p className="mt-1 font-medium text-gray-900">
                {enquiry.travellers ?? "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Source</p>
              <p className="mt-1 font-medium text-gray-900">
                {enquiry.source || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="mt-1 font-medium text-gray-900">
                {formatDateTime(enquiry.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Related package */}
        <div className="rounded-xl border bg-white p-6">
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            Related Package
          </h2>

          {enquiry.package ? (
            <div>
              <p className="font-medium text-gray-900">
                {enquiry.package.title}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {enquiry.package.slug}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No package selected.
            </p>
          )}
        </div>

        {/* Requirements */}
        <div className="rounded-xl border bg-white p-6 lg:col-span-3">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Customer Requirements
          </h2>

          <div className="rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
            {enquiry.message || "No additional requirements provided."}
          </div>
        </div>

        {/* Customer actions */}
        <div className="rounded-xl border bg-white p-6 lg:col-span-3">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Customer Actions
          </h2>

          <div className="flex flex-wrap gap-3">
            {enquiry.phone && (
              <a
                href={`https://wa.me/${enquiry.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
              >
                WhatsApp
              </a>
            )}

            {enquiry.phone && (
              <a
                href={`tel:${enquiry.phone}`}
                className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Call Customer
              </a>
            )}

            {enquiry.email && (
              <a
                href={`mailto:${enquiry.email}`}
                className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Email Customer
              </a>
            )}
          </div>
        </div>
<EnquirySalesControl
  enquiryId={enquiry.id}
  initialAssignedTo={enquiry.assignedTo}
  initialEstimatedValue={enquiry.estimatedValue}
  initialNextFollowUpAt={enquiry.nextFollowUpAt}
  initialLostReason={enquiry.lostReason}
  initialStatus={enquiry.status}
/>
        {/* Status management */}
        <EnquiryStatusControl
          enquiryId={enquiry.id}
          initialStatus={enquiry.status}
        />
      </div>
    </div>
  );
}