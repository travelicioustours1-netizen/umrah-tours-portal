export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />

      <div className="mt-8 space-y-4">

        <div className="h-10 bg-gray-200 rounded animate-pulse w-2/3" />

        <div className="h-5 bg-gray-200 rounded animate-pulse w-full" />

        <div className="h-5 bg-gray-200 rounded animate-pulse w-4/5" />

      </div>

    </div>
  );
}