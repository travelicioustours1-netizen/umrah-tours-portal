"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type PaymentProvider =
  | "STRIPE"
  | "RAZORPAY"
  | "PAYTABS"
  | "TELR";

type Payment = {
  id: string;
  amount: number;
  provider: PaymentProvider;
  transactionId: string | null;
  createdAt: string;
};

type PaymentSummary = {
  totalAmount: number;
  paidAmount: number;
  balance: number;
  paymentStatus: string;
  payments: Payment[];
};

export default function AddPaymentPage() {
  const params = useParams();
  const router = useRouter();

  const bookingId = params.id as string;

  const [summary, setSummary] =
    useState<PaymentSummary | null>(null);

  const [amount, setAmount] = useState("");
  const [provider, setProvider] =
    useState<PaymentProvider>("PAYTABS");

  const [transactionId, setTransactionId] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadPaymentSummary() {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/payments?bookingId=${bookingId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Failed to load payment information"
          );
        }

        setSummary(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load payment information"
        );
      } finally {
        setLoading(false);
      }
    }

    if (bookingId) {
      loadPaymentSummary();
    }
  }, [bookingId]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const paymentAmount = Number(amount);

    if (!paymentAmount || paymentAmount <= 0) {
      setError(
        "Please enter a valid payment amount."
      );
      return;
    }

    if (
      summary &&
      paymentAmount > summary.balance
    ) {
      setError(
        `Maximum payment allowed is ${summary.balance.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        )}.`
      );
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        "/api/payments",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            bookingId,
            amount: paymentAmount,
            provider,
            transactionId:
              transactionId.trim() || undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to record payment"
        );
      }

      setSuccess(
        "Payment recorded successfully."
      );

      setAmount("");
      setTransactionId("");

      const refreshed =
        await fetch(
          `/api/payments?bookingId=${bookingId}`
        );

      const refreshedData =
        await refreshed.json();

      if (refreshed.ok) {
        setSummary(refreshedData);
      }

      setTimeout(() => {
        router.push(
          `/admin/bookings/${bookingId}`
        );
        router.refresh();
      }, 800);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to record payment"
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-500">
          Loading payment information...
        </p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="p-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
          {error ||
            "Payment information could not be loaded."}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-8">

      <div>
        <Link
          href={`/admin/bookings/${bookingId}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Booking
        </Link>

        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          Add Payment
        </h1>

        <p className="mt-2 text-gray-600">
          Record a payment against this booking.
        </p>
      </div>


      {/* Payment Summary */}

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Amount
          </p>

          <p className="mt-2 text-2xl font-bold">
            {summary.totalAmount.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Paid Amount
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {summary.paidAmount.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Remaining Balance
          </p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            {summary.balance.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </p>
        </div>

      </div>


      {/* Add Payment */}

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold">
          Record Payment
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          <div>
            <label
              htmlFor="amount"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Payment Amount
            </label>

            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              max={summary.balance}
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="Enter payment amount"
              required
            />
          </div>


          <div>
            <label
              htmlFor="provider"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Payment Provider
            </label>

            <select
              id="provider"
              value={provider}
              onChange={(event) =>
                setProvider(
                  event.target
                    .value as PaymentProvider
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
            >
              <option value="PAYTABS">
                PayTabs
              </option>

              <option value="RAZORPAY">
                Razorpay
              </option>

              <option value="STRIPE">
                Stripe
              </option>

              <option value="TELR">
                Telr
              </option>
            </select>
          </div>


          <div>
            <label
              htmlFor="transactionId"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Transaction ID
            </label>

            <input
              id="transactionId"
              type="text"
              value={transactionId}
              onChange={(event) =>
                setTransactionId(
                  event.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="Optional transaction/reference ID"
            />
          </div>


          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}


          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {success}
            </div>
          )}


          <div className="flex gap-3">

            <Link
              href={`/admin/bookings/${bookingId}`}
              className="rounded-lg border border-gray-300 px-5 py-3 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                submitting ||
                summary.balance <= 0
              }
              className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Recording..."
                : summary.balance <= 0
                  ? "Fully Paid"
                  : "Record Payment"}
            </button>

          </div>

        </form>

      </div>


      {/* Payment History */}

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold">
          Payment History
        </h2>

        {summary.payments.length === 0 ? (

          <p className="mt-4 text-gray-500">
            No payments recorded yet.
          </p>

        ) : (

          <div className="mt-4 overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b text-left">

                  <th className="px-3 py-3">
                    Date
                  </th>

                  <th className="px-3 py-3">
                    Provider
                  </th>

                  <th className="px-3 py-3">
                    Transaction ID
                  </th>

                  <th className="px-3 py-3 text-right">
                    Amount
                  </th>

                </tr>
              </thead>

              <tbody>

                {summary.payments.map(
                  (payment) => (
                    <tr
                      key={payment.id}
                      className="border-b"
                    >

                      <td className="px-3 py-3">
                        {new Date(
                          payment.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-3 py-3">
                        {payment.provider}
                      </td>

                      <td className="px-3 py-3">
                        {payment.transactionId ||
                          "—"}
                      </td>

                      <td className="px-3 py-3 text-right font-semibold">
                        {payment.amount.toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "USD",
                          }
                        )}
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}