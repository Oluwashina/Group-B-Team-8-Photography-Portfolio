import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import { useCart } from "../context/useCart.js";
import { brand, navLinks } from "../data/siteContent";
import ProfileMenu from "./ProfileMenu.jsx";

function CartNavLink() {
  const { itemCount } = useCart();

  return (
    <Link
      to="/cart"
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-stone-300 transition hover:bg-white/10 hover:text-stone-100"
      aria-label={itemCount ? `Cart, ${itemCount} items` : "Cart"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ddc9a8] px-1 text-[0.625rem] font-bold text-[#0a0908]">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <a
        href="#main-content"
        className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded focus:bg-[#ddc9a8] focus:px-4 focus:py-2 focus:font-semibold focus:text-[#0a0908]"
      >
        Skip to main content
      </a>
      <div className="pointer-events-auto mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-[#100e0c]/80 px-3 py-2 shadow-lg shadow-black/40 backdrop-blur-md sm:px-4">
          <Link
            to="/"
            className="inline-flex min-w-0 items-center gap-2.5 text-stone-100 no-underline transition hover:opacity-90 sm:gap-3"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#ddc9a8] to-[#c8b08a] font-serif text-sm font-semibold text-[#0a0908]"
              aria-hidden="true"
            >
              {brand.monogram}
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-serif text-lg font-semibold">{brand.title}</span>
              <span className="text-[0.625rem] font-medium uppercase tracking-[0.22em] text-stone-400">
                {brand.subtitle}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="min-w-0 flex-1 px-2">
            <ul className="m-0 flex list-none justify-center gap-0.5 sm:gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-full px-2.5 py-2 text-xs font-medium tracking-wide text-stone-400 no-underline transition hover:bg-white/10 hover:text-stone-100 sm:px-3.5 sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="flex shrink-0 items-center gap-1 sm:gap-2"
            aria-label="Cart and account"
          >
            {user && <CartNavLink />}
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
