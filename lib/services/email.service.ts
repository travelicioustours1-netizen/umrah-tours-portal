import { resend } from "@/lib/email/resend";


export async function sendBookingConfirmationEmail(
  booking: {
    customerName: string;
    email: string;
    bookingNumber: string;
    totalAmount: number;
    package: {
      title: string;
    };
  }
) {

  await resend.emails.send({

    from:
      process.env.EMAIL_FROM!,

    to:
      booking.email,

    subject:
      `Booking Confirmation - ${booking.bookingNumber}`,

    html: `
      <h2>Umrah Tours Booking Confirmation</h2>

      <p>Assalamu Alaikum ${booking.customerName},</p>

      <p>
        Your booking has been received successfully.
      </p>

      <p>
        <strong>Booking Number:</strong>
        ${booking.bookingNumber}
      </p>

      <p>
        <strong>Package:</strong>
        ${booking.package.title}
      </p>

      <p>
        <strong>Total Amount:</strong>
        AED ${booking.totalAmount}
      </p>

      <p>
        Our team will contact you shortly.
      </p>

      <br/>

      <p>
        Umrah Tours Team
      </p>
    `,
  });
}