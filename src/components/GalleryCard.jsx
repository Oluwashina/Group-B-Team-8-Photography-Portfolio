const layoutClasses = {
  default: "row-span-[32]",
  tall: "row-span-[44]",
  wide: "col-span-1 sm:col-span-2 row-span-[28]",
};

export default function GalleryCard({ item }) {
  const layout = layoutClasses[item.layout] ?? layoutClasses.default;

  return (
    <figure
      className={`group relative m-0 overflow-hidden rounded-xl bg-stone-900 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:shadow-xl ${layout}`}
      tabIndex={0}
    >
      <div className="relative h-full min-h-40 overflow-hidden">
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />
        <figcaption className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[#0a0908]/95 via-[#0a0908]/40 to-transparent p-4 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[#ddc9a8]">
            {item.captionLabel}
          </span>
          <p className="mt-1 text-sm font-light leading-snug text-stone-100">
            {item.captionText}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}
