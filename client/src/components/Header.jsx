import { brand, navLinks } from "../data/siteContent";

export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <a
        href="#main-content"
        className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded focus:bg-[#ddc9a8] focus:px-4 focus:py-2 focus:font-semibold focus:text-[#0a0908]"
      >
        Skip to main content
      </a>
      <div className="pointer-events-auto mx-auto max-w-6xl">
        <div className="flex flex-col items-stretch gap-3 rounded-2xl border border-white/10 bg-[#100e0c]/80 p-3 shadow-lg shadow-black/40 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:px-4 sm:py-2">
          <p className="m-0 text-center sm:text-left">
            <a
              href="#main-content"
              className="inline-flex items-center justify-center gap-3 text-stone-100 no-underline transition hover:opacity-90 sm:justify-start"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#ddc9a8] to-[#c8b08a] font-serif text-sm font-semibold text-[#0a0908]"
                aria-hidden="true"
              >
                {brand.monogram}
              </span>
              <span className="flex flex-col leading-tight text-left">
                <span className="font-serif text-lg font-semibold">{brand.title}</span>
                <span className="text-[0.625rem] font-medium uppercase tracking-[0.22em] text-stone-400">
                  {brand.subtitle}
                </span>
              </span>
            </a>
          </p>
          <nav aria-label="Primary" className="w-full sm:w-auto">
            <ul className="m-0 flex list-none flex-wrap justify-center gap-1 rounded-full bg-black/25 p-1 sm:justify-end">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-full px-3 py-2 text-xs font-medium tracking-wide text-stone-400 no-underline transition hover:bg-white/10 hover:text-stone-100 sm:px-4 sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
