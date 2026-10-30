import { Link } from "react-router-dom";
import { formatUsd } from "../utils/formatMoney.js";

export default function CartLineItem({ line, onRemove }) {
  const lineTotal = line.priceCents * line.quantity;

  return (
    <li className="flex gap-4 rounded-xl border border-white/10 bg-[#161412] p-3 sm:p-4">
      <Link
        to={`/prints/${line.galleryItemId}`}
        className="block h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24"
      >
        <img src={line.src} alt="" className="h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <Link
            to={`/prints/${line.galleryItemId}`}
            className="font-medium text-stone-100 no-underline hover:text-[#ddc9a8]"
          >
            {line.title}
          </Link>
          <p className="text-sm text-stone-500">
            Qty {line.quantity} · {formatUsd(line.priceCents)} each
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
          <p className="font-serif text-lg text-[#ddc9a8]">{formatUsd(lineTotal)}</p>
          <button
            type="button"
            onClick={() => onRemove(line.galleryItemId)}
            className="text-xs text-stone-400 underline-offset-2 hover:text-stone-200 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
