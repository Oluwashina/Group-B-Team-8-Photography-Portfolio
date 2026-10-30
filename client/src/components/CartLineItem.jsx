import { Link } from "react-router-dom";
import { formatUsd } from "../utils/formatMoney.js";

export default function CartLineItem({ line, onRemove, onUpdateQuantity }) {
  const lineTotal = line.priceCents * line.quantity;

  return (
    <li className="flex gap-4 rounded-xl border border-white/10 bg-[#161412] p-3 sm:p-4">
      <Link
        to={`/prints/${line.galleryItemId}`}
        className="block h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24"
      >
        <img src={line.src} alt="" className="h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <Link
            to={`/prints/${line.galleryItemId}`}
            className="font-medium text-stone-100 no-underline hover:text-[#ddc9a8]"
          >
            {line.title}
          </Link>
          <p className="text-sm text-stone-500">{formatUsd(line.priceCents)} each</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
          <div
            className="flex items-center rounded-full border border-white/15 bg-black/30"
            aria-label={`Quantity for ${line.title}`}
          >
            <button
              type="button"
              onClick={() => onUpdateQuantity(line.galleryItemId, -1)}
              className="flex h-8 w-8 items-center justify-center rounded-l-full text-stone-300 hover:bg-white/10"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-[2rem] text-center text-sm text-stone-100">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(line.galleryItemId, 1)}
              disabled={line.quantity >= 3}
              className="flex h-8 w-8 items-center justify-center rounded-r-full text-stone-300 hover:bg-white/10 disabled:opacity-40"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
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
