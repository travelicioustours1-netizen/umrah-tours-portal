"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  pkg: {
    id: string;
    title: string;
  };
}

export default function BookingForm({ pkg }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    adults: 1,
    children: 0,
    infants: 0,
    travelDate: "",
      });

  function updateField(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        [name === "adults" ||
 name === "children" ||
 
 name === "infants"
  ? Number(value)
  : value]
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          packageId: pkg.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Booking failed.");
        return;
      }

      router.push(
        `/booking/success?booking=${data.booking.bookingNumber}`
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-2xl font-bold">
        Traveller Details
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Name *
          </label>

          <input
            required
            name="customerName"
            value={form.customerName}
            onChange={updateField}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email *
          </label>

          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone *
          </label>

          <input
            required
            name="phone"
            value={form.phone}
            onChange={updateField}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Travel Date
          </label>

          <input
            type="date"
            name="travelDate"
            value={form.travelDate}
            onChange={updateField}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Adults
          </label>

          <input
            type="number"
            min={1}
            name="adults"
            value={form.adults}
            onChange={updateField}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Children
          </label>

          <input
            type="number"
            min={0}
            name="children"
            value={form.children}
            onChange={updateField}
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>

<div>
  <label className="mb-2 block text-sm font-medium">
    Infants
  </label>

  <input
    type="number"
    min={0}
    name="infants"
    value={form.infants}
    onChange={updateField}
    className="w-full rounded-lg border p-3"
  />
</div>
      

      <button
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Confirm Booking"}
      </button>
    </form>
  );
}