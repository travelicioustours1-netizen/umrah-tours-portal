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

  function formatAED(value: number) {
    return value.toLocaleString("en-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case "PAID":
        return "PAID";

      case "PARTIAL":
        return "PARTIAL";

      case "REFUNDED":
        return "REFUNDED";

      case "UNPAID":
      default:
        return "UNPAID";
    }
  }

  function getStatusClasses(status: string) {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PARTIAL":
        return "bg-yellow-100 text-yellow-700";

      case "REFUNDED":
        return "bg-purple-100 text-purple-700";

      case "UNPAID":
      default:
        return "bg-red-100 text-red-700";
    }
  }

  useEffect(() => {
    async function loadPaymentSummary() {
      try {
        setLoading(true);
        setError("");

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
        `Maximum payment allowed is ${formatAED(
          summary.balance
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

  const paymentStatus =
    getStatusLabel(summary.paymentStatus);

  const isFullyPaid =
    summary.balance <= 0 ||
    paymentStatus === "PAID";

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-8">

      {/* Header */}

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

      {/* Payment Status */}

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Payment Status
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Payment status is calculated from
              recorded payments.
            </p>
          </div>

          <span
            className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusClasses(
              paymentStatus
            )}`}
          >
            {paymentStatus}
          </span>

        </div>
      </div>

      {/* Payment Summary */}

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Amount
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatAED(summary.totalAmount)}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Paid Amount
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {formatAED(summary.paidAmount)}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Remaining Balance
          </p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            {formatAED(summary.balance)}
          </p>
        </div>

      </div>

      {/* Payment Status Explanation */}

      <div className="rounded-xl border bg-gray-50 p-5">

        <div className="grid gap-4 sm:grid-cols-3">

          <div>
            <p className="text-sm font-medium text-gray-700">
              UNPAID
            </p>

            <p className="mt-1 text-sm text-gray-500">
              No payment has been recorded.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">
              PARTIAL
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Payment received, but balance remains.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">
              PAID
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Full booking amount has been received.
            </p>
          </div>

        </div>

      </div>

      {/* Add Payment */}

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold">
          Record Payment
        </h2>

        {isFullyPaid ? (
          <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-5 text-green-700">
            <p className="font-semibold">
              Fully Paid
            </p>

            <p className="mt-1 text-sm">
              This booking has no remaining payment
              balance.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            {/* Payment Amount */}

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

              <p className="mt-2 text-sm text-gray-500">
                Maximum payment:
                {" "}
                {formatAED(summary.balance)}
              </p>
            </div>

            {/* Provider */}

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

            {/* Transaction ID */}

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

            {/* Errors */}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Success */}

            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Buttons */}

            <div className="flex gap-3">

              <Link
                href={`/admin/bookings/${bookingId}`}
                className="rounded-lg border border-gray-300 px-5 py-3 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Recording..."
                  : "Record Payment"}
              </button>

            </div>

          </form>
        )}

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
                        {payment.transactionId || "—"}
                      </td>

                      <td className="px-3 py-3 text-right font-semibold">
                        {formatAED(payment.amount)}
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
