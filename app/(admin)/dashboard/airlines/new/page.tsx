import AirlineForm from "@/components/admin/AirlineForm";

export default function NewAirlinePage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Add Airline
      </h1>

      <AirlineForm />
    </div>
  );
}