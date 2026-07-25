interface Props {
  booking: {
    bookingNumber: string;
    adults: number;
    children: number;
    infants: number;
    travelDate: Date | null;
  };
}

export default function BookingInfo({
  booking,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        Booking Information
      </h2>

      <div className="space-y-3">
        <p>
          <strong>Booking #:</strong>{" "}
          {booking.bookingNumber}
        </p>

        <p>
          <strong>Adults:</strong>{" "}
          {booking.adults}
        </p>

        <p>
          <strong>Children:</strong>{" "}
          {booking.children}
        </p>

        <p>
          <strong>Travel Date:</strong>{" "}
          {booking.travelDate
            ? new Date(
                booking.travelDate
              ).toLocaleDateString()
            : "-"}
        </p>

        
      </div>
    </div>
  );
}