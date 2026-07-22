import HotelForm from "@/components/admin/HotelForm";

export default function NewHotelPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Add Hotel
      </h1>

      <HotelForm />

    </div>
  );
}