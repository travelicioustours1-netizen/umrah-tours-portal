import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function AdminCard({
  title,
  children,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
      <div className="border-b bg-gray-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}