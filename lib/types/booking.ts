export interface BookingSummary {
  id: string;
  bookingNumber: string;
  customerName: string;
  email: string;
  phone: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
}