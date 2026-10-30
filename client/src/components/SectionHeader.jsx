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
      : "mx-auto mb-12 max-w-xl text-center";

  return (
    <header className={alignClass}>
      {eyebrow ? (
        <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={titleId}
        className="font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl"
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-base font-light leading-relaxed text-muted">{lede}</p>
      ) : null}
    </header>
  );
}
