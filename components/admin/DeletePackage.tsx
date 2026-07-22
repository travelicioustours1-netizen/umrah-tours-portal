"use client";

import { deletePackage } from "@/lib/actions/package";

interface Props {
  id: string;
}

export default function DeletePackage({ id }: Props) {
  const action = deletePackage.bind(null, id);

  return (
    <form
      action={action}
      className="inline"
      onSubmit={(e) => {
        if (!confirm("Delete this package?")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </form>
  );
}