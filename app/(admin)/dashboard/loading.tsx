export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        <p className="mt-4 text-sm text-gray-500">
          Loading dashboard...
        </p>
      </div>
    </div>
  );
}