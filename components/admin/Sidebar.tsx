"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  Hotel,
  Plane,
  BookOpen,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Packages",
    href: "/dashboard/packages",
    icon: Package,
  },
  {
    title: "Hotels",
    href: "/dashboard/hotels",
    icon: Hotel,
  },
  {
    title: "Airlines",
    href: "/dashboard/airlines",
    icon: Plane,
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: BookOpen,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-64 border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-emerald-600">
          Umrah Tours
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Admin Dashboard
        </p>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    active
                      ? "bg-emerald-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />

                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}