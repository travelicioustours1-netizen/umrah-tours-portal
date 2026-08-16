import Link from "next/link";
import {
  Package,
  Hotel,
  Plane,
  CalendarCheck,
  MessageSquare,
  Users,
  CreditCard,
  UserRound,
  ClipboardList,
} from "lucide-react";

const adminSections = [
  {
    title: "Packages",
    description: "Manage Umrah and holiday packages.",
    href: "/dashboard/packages",
    icon: Package,
  },
  {
    title: "Bookings",
    description: "View and manage customer bookings.",
    href: "/admin/bookings",
    icon: CalendarCheck,
  },
  {
    title: "Enquiries",
    description: "Manage customer enquiries and leads.",
    href: "/admin/enquiries",
    icon: MessageSquare,
  },
  {
    title: "Sales",
    description: "Manage your sales pipeline and opportunities.",
    href: "/admin/sales",
    icon: ClipboardList,
  },
  {
    title: "Follow-ups",
    description: "Track pending customer follow-ups.",
    href: "/admin/follow-ups",
    icon: Users,
  },
  {
    title: "Hotels",
    description: "Manage hotels and accommodation.",
    href: "/dashboard/hotels",
    icon: Hotel,
  },
  {
    title: "Airlines",
    description: "Manage airline information.",
    href: "/dashboard/airlines",
    icon: Plane,
  },
  {
    title: "Payments",
    description: "Review booking payment information.",
    href: "/dashboard/bookings",
    icon: CreditCard,
  },
  {
    title: "Users",
    description: "Manage admin and portal users.",
    href: "/dashboard/users",
    icon: UserRound,
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
            Umrah Tours
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-gray-600">
            Manage packages, bookings, enquiries, sales and travel
            operations from one place.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {adminSections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.title}
                href={section.href}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {section.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {section.description}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-emerald-600">
                      Open →
                    </p>
                  </div>

                </div>
              </Link>
            );
          })}

        </div>

        {/* Website */}
        <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                View Public Website
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Open the customer-facing Umrah Tours website.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Visit Website
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}