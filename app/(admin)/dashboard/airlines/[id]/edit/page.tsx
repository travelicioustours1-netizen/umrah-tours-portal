import { prisma } from "@/lib/prisma";
import AirlineForm from "@/components/admin/AirlineForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAirlinePage({
  params,
}: Props) {
  const { id } = await params;

  const airline = await prisma.airline.findUnique({
    where: { id },
  });

  if (!airline) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Airline
      </h1>

      <AirlineForm initialData={airline} />
    </div>
  );
}