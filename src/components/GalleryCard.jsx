import Rating from "./Rating";

export default function GalleryCard({ item, rating, onRatingChange }) {
  const ratingLabelId = `rating-label-${item.id}`;
  const wideClass = item.layout === "wide" ? "sm:col-span-2" : "";
  const aspectClass =
    item.layout === "tall"
      ? "aspect-[3/4]"
      : item.layout === "wide"
        ? "aspect-[16/9]"
        : "aspect-[4/3]";

  return (
    <figure
      className={`group flex flex-col overflow-hidden rounded-xl bg-stone-900 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:shadow-xl ${wideClass}`}
      tabIndex={0}
    >
      <div className={`relative w-full overflow-hidden ${aspectClass}`}>
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />
        <figcaption className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0a0908]/95 via-[#0a0908]/40 to-transparent p-4 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[#ddc9a8]">
            {item.captionLabel}
          </span>
          <p className="mt-1 text-sm font-light leading-snug text-stone-100">
            {item.captionText}
          </p>
        </figcaption>
      </div>
      <div className="border-t border-white/10 bg-[#141412] px-4 py-3">
        <Rating
          value={rating}
          onChange={onRatingChange}
          labelId={ratingLabelId}
        />
      </div>
    </figure>
  );
}
