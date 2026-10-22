import { heroContent } from "../data/siteContent";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[min(92vh,54rem)] items-end overflow-hidden border-b border-white/10 pb-12 pt-28 sm:pb-16 sm:pt-32"
      aria-labelledby="page-title"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src={heroContent.image}
          alt=""
          className="h-full w-full object-cover object-[center_35%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/92 via-[#0a0908]/40 to-[#0a0908]/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908]/88 via-[#0a0908]/35 to-[#0a0908]/78" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl justify-center px-4 sm:px-6 lg:justify-start">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0c0b0a]/45 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-md sm:p-8 lg:max-w-xl lg:text-left">
          <p className="m-0 text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-[#ddc9a8]">
            {heroContent.eyebrow}
          </p>
          <h1
            id="page-title"
            className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight text-stone-50 sm:text-5xl lg:text-[clamp(2.5rem,7.5vw,4.5rem)]"
          >
            {heroContent.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base font-light leading-relaxed text-stone-300 sm:text-lg lg:mx-0 lg:max-w-lg">
            {heroContent.tagline}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href={heroContent.primaryCta.href}
              className="inline-block rounded-full bg-[#ddc9a8] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#0a0908] no-underline transition hover:bg-[#ebe3d4]"
            >
              {heroContent.primaryCta.label}
            </a>
            <a
              href={heroContent.secondaryCta.href}
              className="inline-block rounded-full border border-[#c8b08a]/45 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-100 no-underline transition hover:border-[#ddc9a8] hover:text-[#ddc9a8]"
            >
              {heroContent.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
