"use client";

import { deleteAirline } from "@/lib/actions/airline";

interface Props {
  id: string;
}

export default function DeleteAirline({ id }: Props) {
  const deleteAction = deleteAirline.bind(null, id);

  return (
    <form
      action={deleteAction}
      className="inline"
      onSubmit={(e) => {
        if (!confirm("Delete this airline?")) {
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