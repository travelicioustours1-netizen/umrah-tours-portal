interface Props {
  status:
    | "DRAFT"
    | "PENDING"
    | "PENDING_PAYMENT"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED";
}

export default function BookingStatusBadge({
  status,
}: Props) {

  const styles = {
    DRAFT:
      "bg-gray-100 text-gray-800",

    PENDING:
      "bg-yellow-100 text-yellow-800",

    PENDING_PAYMENT:
      "bg-orange-100 text-orange-800",

    CONFIRMED:
      "bg-green-100 text-green-800",

    COMPLETED:
      "bg-blue-100 text-blue-800",

    CANCELLED:
      "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}