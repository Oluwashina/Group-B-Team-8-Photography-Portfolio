export default function SectionHeader({
  eyebrow,
  title,
  lede,
  titleId,
  align = "center",
}) {
  const alignClass =
    align === "left"
      ? "mx-0 mb-6 max-w-none text-left"
      : "mx-auto mb-10 max-w-xl text-center";

  return (
    <header className={alignClass}>
      {eyebrow ? (
        <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#ddc9a8]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={titleId}
        className="font-serif text-3xl font-medium tracking-tight text-stone-100 sm:text-4xl"
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-3 text-base font-light text-stone-400">{lede}</p>
      ) : null}
    </header>
  );
}
