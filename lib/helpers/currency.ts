export function formatCurrency(
  amount: number,
  currency: "INR" | "AED"
) {
  return new Intl.NumberFormat(
    currency === "INR" ? "en-IN" : "en-AE",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }
  ).format(amount);
}