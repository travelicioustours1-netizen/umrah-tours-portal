"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
  email,
  password,
  redirect: false,
  callbackUrl: "/dashboard",
});

setLoading(false);

if (result?.error) {
  setError("Invalid email or password");
  return;
}

router.push(result?.url || "/dashboard");
router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center">
          Umrah Tours Admin
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Sign in to your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
              placeholder="admin@umrahtours.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="rounded bg-red-100 p-3 text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}