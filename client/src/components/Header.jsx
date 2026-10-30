import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import { useCart } from "../context/useCart.js";
import { brand, navLinks } from "../data/siteContent";

function displayEmail(email) {
  const at = email.indexOf("@");
  if (at <= 0) return email;
  const local = email.slice(0, at);
  if (local.length <= 12) return email;
  return `${local.slice(0, 10)}…${email.slice(at)}`;
}

function welcomeLabel(user) {
  const name = user.name?.trim();
  if (name) {
    return `Welcome, ${name}`;
  }
  return `Welcome, ${displayEmail(user.email)}`;
}

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
  const { user, status, logout, openAuth } = useAuth();

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
            <Link
              to="/"
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
            </Link>
          </p>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
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
                {user && (
                  <li>
                    <NavLink
                      to="/orders"
                      className={({ isActive }) =>
                        `block rounded-full px-3 py-2 text-xs font-medium tracking-wide no-underline transition sm:px-4 sm:text-sm ${
                          isActive
                            ? "bg-[#ddc9a8] text-[#0a0908]"
                            : "text-stone-400 hover:bg-white/10 hover:text-stone-100"
                        }`
                      }
                    >
                      Orders
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
            <div
              className="flex flex-wrap items-center justify-center gap-2 border-t border-white/10 pt-2 sm:border-t-0 sm:pt-0"
              aria-label="Account and cart"
            >
              <CartNavLink />
              {status === "loading" && (
                <span className="px-2 text-xs text-stone-500">…</span>
              )}
              {status === "ready" && user && (
                <>
                  <span
                    className="max-w-[14rem] truncate text-xs text-stone-300 sm:max-w-[16rem] sm:text-sm"
                    title={user.name?.trim() || user.email}
                  >
                    {welcomeLabel(user)}
                  </span>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="rounded-full border border-white/15 px-3 py-2 text-xs font-medium text-stone-200 transition hover:border-[#c8b08a]/50 hover:bg-white/5 sm:text-sm"
                  >
                    Sign out
                  </button>
                </>
              )}
              {status === "ready" && !user && (
                <>
                  <button
                    type="button"
                    onClick={() => openAuth("login")}
                    className="rounded-full px-3 py-2 text-xs font-medium text-stone-300 transition hover:bg-white/10 hover:text-stone-100 sm:text-sm"
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuth("signup")}
                    className="rounded-full bg-[#ddc9a8] px-3 py-2 text-xs font-semibold text-[#0a0908] transition hover:bg-[#c8b08a] sm:text-sm"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
