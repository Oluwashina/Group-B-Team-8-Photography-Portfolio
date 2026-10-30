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
      className={`group relative m-0 overflow-hidden rounded-2xl bg-sand shadow-md shadow-stone-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/15 ${layout}`}
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
        <figcaption className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-t from-stone-950/75 via-stone-950/15 to-transparent p-5 pt-16 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-amber-100">
            {item.captionLabel}
          </span>
          <p className="mt-1 text-sm font-light leading-snug text-white">
            {item.captionText}
          </p>
          {item.priceCents > 0 && (
            <p className="mt-2 font-serif text-base text-amber-100">
              {formatUsd(item.priceCents)}
            </p>
          )}
        </figcaption>
        <Link
          to={`/prints/${item.id}`}
          className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="sr-only">View print details for {item.captionLabel}</span>
        </Link>
      </div>
    </figure>
  );
}
