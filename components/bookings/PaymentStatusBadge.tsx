import { PaymentStatus } from "@prisma/client";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export default function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  const styles: Record<
    PaymentStatus,
    {
      label: string;
      className: string;
    }
  > = {
    UNPAID: {
      label: "Unpaid",
      className:
        "bg-red-100 text-red-800 border border-red-200",
    },
    PARTIAL: {
      label: "Partial",
      className:
        "bg-yellow-100 text-yellow-800 border border-yellow-200",
    },
    PAID: {
      label: "Paid",
      className:
        "bg-green-100 text-green-800 border border-green-200",
    },
    REFUNDED: {
      label: "Refunded",
      className:
        "bg-gray-100 text-gray-800 border border-gray-200",
    },
  };

  const badge = styles[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}
    >
      {badge.label}
    </span>
  );
}