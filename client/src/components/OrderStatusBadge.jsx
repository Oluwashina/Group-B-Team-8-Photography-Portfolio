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
      className={`inline-flex w-fit shrink-0 rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider ${styles[key]}`}
    >
      {label}
    </span>
  );
}
