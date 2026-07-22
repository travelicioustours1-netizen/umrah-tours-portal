"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <div className="font-medium">
          Administrator
        </div>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}