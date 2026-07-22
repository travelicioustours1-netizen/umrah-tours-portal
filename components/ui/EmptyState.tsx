import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export default function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed bg-white p-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
        🔍
      </div>

      <h2 className="text-2xl font-semibold">{title}</h2>

      <p className="mt-2 text-gray-600">{description}</p>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex rounded-xl bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}