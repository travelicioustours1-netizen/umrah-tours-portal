import { getResend } from "@/lib/email/resend";

type BookingEmailData = {
  customerName: string;
  email: string;
  bookingNumber: string;
  totalAmount: number;

  package: {
    title: string;
  };

  travelDate?: Date | null;
  adults?: number;
  children?: number;
  infants?: number;

  paymentStatus?: string;
  status?: string;
};

function formatDate(date?: Date | null) {
  if (!date) {
    return "Not specified";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatAmount(amount: number) {
  return `AED ${amount.toLocaleString("en-AE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ======================================================
// BOOKING RECEIVED EMAIL
// ======================================================

export async function sendBookingReceivedEmail(
  booking: BookingEmailData
) {
  try {
    const result = await getResend().emails.send({
      from: process.env.EMAIL_FROM!,
      to: booking.email,

      subject: `Booking Received - ${booking.bookingNumber}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 0 auto;
            color: #333333;
            line-height: 1.6;
          "
        >

          <h2 style="color: #111827;">
            Umrah Tours - Booking Received
          </h2>

          <p>
            Assalamu Alaikum ${booking.customerName},
          </p>

          <p>
            Thank you for choosing
            <strong>Umrah Tours</strong>.
          </p>

          <p>
            We have received your booking request successfully.
          </p>

          <div
            style="
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
            "
          >

            <p>
              <strong>Booking Number:</strong>
              ${booking.bookingNumber}
            </p>

            <p>
              <strong>Package:</strong>
              ${booking.package.title}
            </p>

            <p>
              <strong>Travel Date:</strong>
              ${formatDate(booking.travelDate)}
            </p>

            <p>
              <strong>Adults:</strong>
              ${booking.adults ?? 0}
            </p>

            <p>
              <strong>Children:</strong>
              ${booking.children ?? 0}
            </p>

            <p>
              <strong>Infants:</strong>
              ${booking.infants ?? 0}
            </p>

            <p>
              <strong>Total Amount:</strong>
              ${formatAmount(booking.totalAmount)}
            </p>

            <p>
              <strong>Booking Status:</strong>
              PENDING
            </p>

            <p>
              <strong>Payment Status:</strong>
              UNPAID
            </p>

          </div>

          <p>
            Our team will review your booking and contact you shortly
            regarding confirmation and payment.
          </p>

          <p>
            Please keep your booking number for future reference.
          </p>

          <br />

          <p>
            Regards,<br />
            <strong>Umrah Tours Team</strong>
          </p>

          <p style="font-size: 12px; color: #6b7280;">
            Your Trusted Partner For Umrah & International Holidays
          </p>

        </div>
      `,
    });

    console.log(
      "RESEND BOOKING RECEIVED RESULT:",
      result
    );

    if (result.error) {
      console.error(
        "RESEND BOOKING RECEIVED ERROR:",
        result.error
      );
    }

    return result;
  } catch (error) {
    console.error(
      "RESEND BOOKING RECEIVED EXCEPTION:",
      error
    );

    throw error;
  }
}

// ======================================================
// BOOKING CONFIRMED EMAIL
// ======================================================

export async function sendBookingConfirmationEmail(
  booking: BookingEmailData
) {
  console.log(
    "CONFIRMATION EMAIL FUNCTION CALLED:",
    booking.bookingNumber,
    booking.email
  );

  try {
    const result = await getResend().emails.send({
      from: process.env.EMAIL_FROM!,
      to: booking.email,

      subject: `Booking Confirmed - ${booking.bookingNumber}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 0 auto;
            color: #333333;
            line-height: 1.6;
          "
        >

          <h2 style="color: #15803d;">
            Umrah Tours - Booking Confirmed
          </h2>

          <p>
            Assalamu Alaikum ${booking.customerName},
          </p>

          <p>
            <strong>
              Your Umrah Tours booking has been confirmed.
            </strong>
          </p>

          <div
            style="
              background: #f0fdf4;
              border: 1px solid #bbf7d0;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
            "
          >

            <p>
              <strong>Booking Number:</strong>
              ${booking.bookingNumber}
            </p>

            <p>
              <strong>Package:</strong>
              ${booking.package.title}
            </p>

            <p>
              <strong>Travel Date:</strong>
              ${formatDate(booking.travelDate)}
            </p>

            <p>
              <strong>Adults:</strong>
              ${booking.adults ?? 0}
            </p>

            <p>
              <strong>Children:</strong>
              ${booking.children ?? 0}
            </p>

            <p>
              <strong>Infants:</strong>
              ${booking.infants ?? 0}
            </p>

            <p>
              <strong>Total Amount:</strong>
              ${formatAmount(booking.totalAmount)}
            </p>

            <p>
              <strong>Payment Status:</strong>
              ${booking.paymentStatus ?? "UNPAID"}
            </p>

            <p>
              <strong>Booking Status:</strong>
              CONFIRMED
            </p>

          </div>

          <p>
            Your booking has now been confirmed by our team.
          </p>

          <p>
            Our team will contact you regarding the next steps,
            payment, documents and travel arrangements.
          </p>

          <p>
            Please keep your booking number
            <strong>${booking.bookingNumber}</strong>
            for future reference.
          </p>

          <br />

          <p>
            Regards,<br />
            <strong>Umrah Tours Team</strong>
          </p>

          <p style="font-size: 12px; color: #6b7280;">
            Your Trusted Partner For Umrah & International Holidays
          </p>

        </div>
      `,
    });

    console.log(
      "RESEND CONFIRMATION RESULT:",
      result
    );

    if (result.error) {
      console.error(
        "RESEND CONFIRMATION ERROR:",
        result.error
      );
    }

    return result;
  } catch (error) {
    console.error(
      "RESEND CONFIRMATION EXCEPTION:",
      error
    );

    throw error;
  }
}

// ======================================================
// PAYMENT RECEIVED EMAIL
// ======================================================

type PaymentReceivedEmailData = {
  customerName: string;
  email: string;
  bookingNumber: string;

  package: {
    title: string;
  };

  totalAmount: number;
  previousPaidAmount: number;
  currentPayment: number;
  paidAmount: number;
  remainingBalance: number;

  paymentStatus: string;
  provider: string;
  transactionId?: string | null;
};

export async function sendPaymentReceivedEmail(
  payment: PaymentReceivedEmailData
) {
  console.log(
    "PAYMENT RECEIVED EMAIL FUNCTION CALLED:",
    payment.bookingNumber,
    payment.email
  );

  try {
    const isFullyPaid =
      payment.paymentStatus === "PAID" ||
      payment.remainingBalance <= 0;

    const result = await getResend().emails.send({
      from: process.env.EMAIL_FROM!,
      to: payment.email,

      subject: isFullyPaid
        ? `Payment Completed - ${payment.bookingNumber}`
        : `Payment Received - ${payment.bookingNumber}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 0 auto;
            color: #333333;
            line-height: 1.6;
          "
        >

          <h2 style="color: #15803d;">
            Umrah Tours - Payment Received
          </h2>

          <p>
            Assalamu Alaikum ${payment.customerName},
          </p>

          <p>
            We have received your payment for booking
            <strong>${payment.bookingNumber}</strong>.
          </p>

          <div
            style="
              background: #f0fdf4;
              border: 1px solid #bbf7d0;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
            "
          >

            <p>
              <strong>Booking Number:</strong>
              ${payment.bookingNumber}
            </p>

            <p>
              <strong>Package:</strong>
              ${payment.package.title}
            </p>

            <p>
              <strong>Payment Received:</strong>
              ${formatAmount(payment.currentPayment)}
            </p>

            <p>
              <strong>Payment Provider:</strong>
              ${payment.provider}
            </p>

            <p>
              <strong>Transaction ID:</strong>
              ${payment.transactionId || "—"}
            </p>

            <hr style="border:0;border-top:1px solid #d1d5db;" />

            <p>
              <strong>Total Amount:</strong>
              ${formatAmount(payment.totalAmount)}
            </p>

            <p>
              <strong>Previous Paid Amount:</strong>
              ${formatAmount(payment.previousPaidAmount)}
            </p>

            <p>
              <strong>Total Paid:</strong>
              ${formatAmount(payment.paidAmount)}
            </p>

            <p>
              <strong>Remaining Balance:</strong>
              ${formatAmount(payment.remainingBalance)}
            </p>

            <p>
              <strong>Payment Status:</strong>
              ${payment.paymentStatus}
            </p>

          </div>

          ${
            isFullyPaid
              ? `
                <p style="color:#15803d;">
                  <strong>
                    Your booking has been fully paid.
                  </strong>
                </p>

                <p>
                  No further payment is currently required
                  for this booking.
                </p>
              `
              : `
                <p>
                  Your payment has been recorded successfully.
                </p>

                <p>
                  The remaining balance is
                  <strong>
                    ${formatAmount(payment.remainingBalance)}
                  </strong>.
                </p>
              `
          }

          <p>
            Please keep your booking number and payment details
            for future reference.
          </p>

          <br />

          <p>
            Regards,<br />
            <strong>Umrah Tours Team</strong>
          </p>

          <p style="font-size: 12px; color: #6b7280;">
            Your Trusted Partner For Umrah & International Holidays
          </p>

        </div>
      `,
    });

    console.log(
      "RESEND PAYMENT RECEIVED RESULT:",
      result
    );

    if (result.error) {
      console.error(
        "RESEND PAYMENT RECEIVED ERROR:",
        result.error
      );
    }

    return result;
  } catch (error) {
    console.error(
      "RESEND PAYMENT RECEIVED EXCEPTION:",
      error
    );

    throw error;
  }
}