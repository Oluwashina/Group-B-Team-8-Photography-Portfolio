import { Link } from "react-router-dom";
import { formatUsd } from "../utils/formatMoney.js";
import FavoriteToggle from "./FavoriteToggle";

const layoutClasses = {
  default: "row-span-[32]",
  tall: "row-span-[44]",
  wide: "col-span-1 sm:col-span-2 row-span-[28]",
};

export default function GalleryCard({ item, isSaved, onToggleFavorite }) {
  const layout = layoutClasses[item.layout] ?? layoutClasses.default;

  return (
    <figure
      className={`group relative m-0 overflow-hidden rounded-xl bg-stone-900 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:shadow-xl ${layout}`}
      tabIndex={0}
    >
      <div className="relative h-full min-h-40 overflow-hidden">
        <FavoriteToggle
          isSaved={isSaved}
          onChange={onToggleFavorite}
          itemLabel={item.captionLabel}
        />
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />
        <figcaption className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[#0a0908]/95 via-[#0a0908]/40 to-transparent p-4 pt-14 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[#ddc9a8]">
            {item.captionLabel}
          </span>
          <p className="mt-1 text-sm font-light leading-snug text-stone-100">
            {item.captionText}
          </p>
          {item.priceCents > 0 && (
            <p className="mt-2 font-serif text-sm text-[#ddc9a8]">
              {formatUsd(item.priceCents)}
            </p>
          )}
        </figcaption>
        <Link
          to={`/prints/${item.id}`}
          className="absolute inset-0 z-[1] rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        >
          <span className="sr-only">View print details for {item.captionLabel}</span>
        </Link>
        <Link
          to={`/prints/${item.id}`}
          className="pointer-events-none absolute bottom-3 left-3 z-[2] rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-stone-100 opacity-100 backdrop-blur-sm transition group-hover:pointer-events-auto sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
        >
          View print
        </Link>
      </div>
    </figure>
  );
}
