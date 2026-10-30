import { heroContent } from "../data/siteContent";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-line bg-linear-to-b from-canvas to-sand pb-14 pt-28 sm:pb-20 sm:pt-36"
      aria-labelledby="page-title"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-accent">
            {heroContent.eyebrow}
          </p>
          <h1
            id="page-title"
            className="mt-4 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[clamp(3rem,6vw,4.75rem)]"
          >
            {heroContent.title}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base font-light leading-relaxed text-body sm:text-lg lg:mx-0 lg:max-w-lg">
            {heroContent.tagline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href={heroContent.primaryCta.href}
              className="inline-block rounded-full bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white no-underline shadow-md shadow-stone-900/10 transition hover:bg-accent-strong"
            >
              {heroContent.primaryCta.label}
            </a>
            <a
              href={heroContent.secondaryCta.href}
              className="inline-block rounded-full border border-ink/20 bg-surface px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink no-underline transition hover:border-accent hover:text-accent"
            >
              {heroContent.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="absolute -inset-3 rounded-[2.25rem] bg-accent-soft/70 sm:-inset-4"
            aria-hidden="true"
          />
          <img
            src={heroContent.image}
            alt=""
            className="relative aspect-[4/5] w-full rounded-[1.75rem] object-cover object-[center_35%] shadow-2xl shadow-stone-900/15"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
