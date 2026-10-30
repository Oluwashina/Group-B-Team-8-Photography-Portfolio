import { Link } from "react-router-dom";
import { formatUsd } from "../utils/formatMoney.js";

export default function CartLineItem({ line, onRemove, onUpdateQuantity }) {
  const lineTotal = line.priceCents * line.quantity;

  return (
    <li className="flex gap-4 rounded-2xl border border-line bg-surface p-3 shadow-sm shadow-stone-900/5 sm:p-4">
      <Link
        to={`/prints/${line.galleryItemId}`}
        className="block h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24"
      >
        <img src={line.src} alt="" className="h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <Link
            to={`/prints/${line.galleryItemId}`}
            className="font-medium text-ink no-underline hover:text-accent"
          >
            {line.title}
          </Link>
          <p className="text-sm text-muted">{formatUsd(line.priceCents)} each</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
          <div
            className="flex items-center rounded-full border border-line bg-canvas"
            aria-label={`Quantity for ${line.title}`}
          >
            <button
              type="button"
              onClick={() => onUpdateQuantity(line.galleryItemId, -1)}
              className="flex h-8 w-8 items-center justify-center rounded-l-full text-body hover:bg-sand"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-[2rem] text-center text-sm text-ink">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(line.galleryItemId, 1)}
              disabled={line.quantity >= 3}
              className="flex h-8 w-8 items-center justify-center rounded-r-full text-body hover:bg-sand disabled:opacity-40"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <p className="font-serif text-xl text-ink">{formatUsd(lineTotal)}</p>
          <button
            type="button"
            onClick={() => onRemove(line.galleryItemId)}
            className="text-xs text-muted underline-offset-2 hover:text-ink hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
