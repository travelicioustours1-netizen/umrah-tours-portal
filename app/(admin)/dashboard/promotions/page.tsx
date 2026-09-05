    import Link from "next/link";
import Image from "next/image";

import { getPromotions } from "@/lib/promotion-service";
import { deletePromotion } from "@/lib/actions/promotion";

export default async function PromotionsPage() {
  const promotions = await getPromotions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Promotions
          </h1>

          <p className="text-gray-500">
            Manage promotional flyers and offers
          </p>
        </div>

        <Link
          href="/dashboard/promotions/new"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          + Add Promotion
        </Link>
      </div>

      {/* Promotions */}
      {promotions.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-12 text-center">
          <h2 className="text-lg font-semibold">
            No promotions yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Create your first promotional flyer.
          </p>

          <Link
            href="/dashboard/promotions/new"
            className="mt-5 inline-block rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            + Add Promotion
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Flyer
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Promotion
                  </th>

                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Order
                  </th>

                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Schedule
                  </th>

                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {promotions.map((promotion) => {
                  const now = new Date();

                  const hasStarted =
                    !promotion.startDate ||
                    promotion.startDate <= now;

                  const hasNotEnded =
                    !promotion.endDate ||
                    promotion.endDate >= now;

                  const currentlyRunning =
                    promotion.isActive &&
                    hasStarted &&
                    hasNotEnded;

                  return (
                    <tr
                      key={promotion.id}
                      className="hover:bg-gray-50"
                    >
                      {/* Flyer */}
                      <td className="px-4 py-4">
                        <div className="relative h-24 w-20 overflow-hidden rounded-lg border bg-gray-100">
                          <Image
                            src={promotion.imageUrl}
                            alt={promotion.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      </td>

                      {/* Promotion */}
                      <td className="max-w-md px-4 py-4">
                        <div className="font-semibold">
                          {promotion.title}
                        </div>

                        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                          {promotion.description}
                        </p>

                        {promotion.buttonText && (
                          <span className="mt-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                            CTA: {promotion.buttonText}
                          </span>
                        )}
                      </td>

                      {/* Order */}
                      <td className="px-4 py-4 text-center">
                        {promotion.displayOrder}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 text-center">
                        {currentlyRunning ? (
                          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Active
                          </span>
                        ) : promotion.isActive ? (
                          <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                            Scheduled
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Schedule */}
                      <td className="px-4 py-4 text-center text-sm text-gray-500">
                        <div>
                          {promotion.startDate
                            ? promotion.startDate.toLocaleDateString()
                            : "Now"}
                        </div>

                        <div>
                          →
                        </div>

                        <div>
                          {promotion.endDate
                            ? promotion.endDate.toLocaleDateString()
                            : "No expiry"}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/promotions/${promotion.id}`}
                            className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
                          >
                            Edit
                          </Link>

                          <form
                            action={deletePromotion.bind(
                              null,
                              promotion.id
                            )}
                          >
                            <button
                              type="submit"
                              className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}