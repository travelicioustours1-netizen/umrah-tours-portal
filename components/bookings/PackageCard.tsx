interface Props {
  booking: {
    package: {
      title: string;
      duration: string;
      price: number;
    };
  };
}

export default function PackageCard({
  booking,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        Package
      </h2>

      <div className="space-y-3">
        <p>
          <strong>Title:</strong>{" "}
          {booking.package.title}
        </p>

        <p>
          <strong>Duration:</strong>{" "}
          {booking.package.duration}
        </p>

        <p>
          <strong>Price:</strong>{" "}
          ₹
          {booking.package.price.toLocaleString(
            "en-IN"
          )}
        </p>
      </div>
    </div>
  );
}