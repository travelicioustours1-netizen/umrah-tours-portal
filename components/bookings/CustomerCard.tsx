interface Props {
  booking: {
    customerName: string;
    email: string;
    phone: string;
  };
}

export default function CustomerCard({
  booking,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        Customer Details
      </h2>

      <div className="space-y-3">
        <p>
          <strong>Name:</strong>{" "}
          {booking.customerName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {booking.email}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {booking.phone}
        </p>
      </div>
    </div>
  );
}