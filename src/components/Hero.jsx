import { heroContent } from "../data/siteContent";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[88vh] items-end justify-center overflow-hidden border-b border-white/10 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32"
      aria-labelledby="page-title"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src={heroContent.image}
          alt=""
          className="h-full w-full object-cover object-[center_35%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/90 via-[#0a0908]/50 to-[#0a0908]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908]/85 via-[#0a0908]/35 to-[#0a0908]/80" />
      </div>

      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0c0b0a]/50 p-6 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-8 lg:mr-auto lg:max-w-xl">
        <p className="m-0 text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-[#ddc9a8]">
          {heroContent.eyebrow}
        </p>
        <h1
          id="page-title"
          className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight text-stone-50 sm:text-5xl lg:text-6xl"
        >
          {heroContent.title}
        </h1>
        <p className="mt-4 text-base font-light leading-relaxed text-stone-300 sm:text-lg">
          {heroContent.tagline}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
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
    </section>
  );
}
