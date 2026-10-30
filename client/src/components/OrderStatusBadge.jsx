const styles = {
  paid: "border-emerald-200 bg-emerald-50 text-emerald-800",
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  failed: "border-red-200 bg-red-50 text-red-700",
};

export default function OrderStatusBadge({ status }) {
  const key = styles[status] ? status : "pending";
  const label = status === "paid" ? "Paid" : status === "failed" ? "Failed" : "Pending";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${styles[key]}`}
    >
      {label}
    </span>
  );
}
