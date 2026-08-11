interface Props {
  status: "UNPAID" | "PARTIAL" | "PAID" | "REFUNDED";
}

export default function PaymentBadge({ status }: Props) {
  const styles = {
    UNPAID: "bg-red-100 text-red-700",
    PARTIAL: "bg-orange-100 text-orange-700",
    PAID: "bg-green-100 text-green-700",
    REFUNDED: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}