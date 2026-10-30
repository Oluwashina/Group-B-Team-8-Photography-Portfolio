const styles = {
  paid: "border-[#c8b08a]/50 bg-[#c8b08a]/15 text-[#ddc9a8]",
  pending: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  failed: "border-red-400/40 bg-red-400/10 text-red-200",
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
