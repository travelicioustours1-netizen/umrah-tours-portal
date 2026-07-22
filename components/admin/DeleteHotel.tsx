"use client";

import { deleteHotel } from "@/lib/actions/hotel";

interface Props {
  id: string;
}

export default function DeleteHotel({ id }: Props) {
  const deleteAction = deleteHotel.bind(null, id);

  return (
    <form
      action={deleteAction}
      className="inline"
      onSubmit={(e) => {
        if (!confirm("Delete this hotel?")) {
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