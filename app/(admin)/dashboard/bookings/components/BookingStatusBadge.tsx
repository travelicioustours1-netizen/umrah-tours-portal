interface Props {
  status: string;
}

const colors = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-blue-100 text-blue-700",
};

export default function BookingStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        colors[status as keyof typeof colors] ??
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}