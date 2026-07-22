"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-4 text-gray-600">
        {error.message}
      </p>

      <button
        onClick={() => reset()}
        className="mt-8 rounded-xl bg-emerald-600 px-6 py-3 text-white"
      >
        Try Again
      </button>
    </main>
  );
}