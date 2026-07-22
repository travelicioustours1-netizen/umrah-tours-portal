import { notFound } from "next/navigation";

import { getPackageBySlug } from "@/lib/package-service";

import BookingSummary from "@/components/booking/BookingSummary";
import BookingForm from "@/components/booking/BookingForm";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BookingPage({
  params,
}: Props) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-10 text-4xl font-bold">
        Book Your Umrah Package
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <BookingSummary pkg={pkg} />
        </div>

        <div className="lg:col-span-2">
          <BookingForm pkg={pkg} />
        </div>
      </div>
    </main>
  );
}