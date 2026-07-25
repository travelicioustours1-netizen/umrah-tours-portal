export default async function DashboardDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } = await params;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold">
        Dashboard Detail
      </h1>

      <p className="mt-3 text-gray-600">
        Record ID: {id}
      </p>

    </div>
  );
}