"use client";

import {
  createAirline,
  updateAirline,
} from "@/lib/actions/airline";

interface Airline {
  id: string;
  name: string;
  code: string | null;
  logo: string | null;
}

interface Props {
  initialData?: Airline;
}

export default function AirlineForm({
  initialData,
}: Props) {
  const action = initialData
    ? updateAirline.bind(null, initialData.id)
    : createAirline;

  return (
    <form
      action={action}
      className="bg-white rounded-xl shadow p-8 space-y-6"
    >
      <div>
        <label className="block mb-2 font-medium">
          Airline Name
        </label>

        <input
          name="name"
          defaultValue={initialData?.name}
          required
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Airline Code
        </label>

        <input
          name="code"
          defaultValue={initialData?.code ?? ""}
          placeholder="SV"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Logo URL
        </label>

        <input
          name="logo"
          defaultValue={initialData?.logo ?? ""}
          placeholder="https://..."
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        {initialData ? "Update Airline" : "Create Airline"}
      </button>
    </form>
  );
}