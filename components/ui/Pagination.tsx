"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
}

export default function Pagination({
  page,
  totalPages,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();

  function go(nextPage: number) {
    const query = new URLSearchParams(params);

    query.set("page", String(nextPage));

    router.push(`/umrah?${query.toString()}`);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-4">

      <button
        disabled={page === 1}
        onClick={() => go(page - 1)}
        className="rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <span className="flex items-center">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => go(page + 1)}
        className="rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}