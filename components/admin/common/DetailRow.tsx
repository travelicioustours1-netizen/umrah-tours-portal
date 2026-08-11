interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

export default function DetailRow({
  label,
  value,
}: DetailRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0">
      <span className="text-sm font-medium text-gray-500">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-gray-900">
        {value}
      </span>
    </div>
  );
}