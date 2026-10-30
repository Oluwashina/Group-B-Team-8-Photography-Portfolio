import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShimmerBlock } from "./Shimmer.jsx";
import { useAuth } from "../context/useAuth.js";

function welcomeShort(user) {
  const name = user.name?.trim();
  if (name) return name.split(" ")[0];
  return user.email.split("@")[0];
}

export default function ProfileMenu() {
  const { user, status, logout, openAuth } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  if (status === "loading") {
    return (
      <span role="status" aria-label="Loading account">
        <ShimmerBlock className="h-9 w-9 rounded-full" />
      </span>
    );
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => openAuth("login")}
        className="flex h-9 w-9 items-center justify-center rounded-full text-body transition hover:bg-sand hover:text-ink"
        aria-label="Sign in"
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
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent-strong ring-1 ring-accent/30 transition hover:bg-accent/15"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label="Account menu"
      >
        <span className="font-serif text-sm font-semibold uppercase">
          {welcomeShort(user).slice(0, 2)}
        </span>
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-[12rem] overflow-hidden rounded-2xl border border-line bg-surface py-2 shadow-xl shadow-stone-900/10"
        >
          <p className="border-b border-line px-4 py-2 text-sm text-body">
            Welcome, {welcomeShort(user)}
          </p>
          <Link
            to="/orders"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-ink no-underline hover:bg-sand"
          >
            My orders
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="block w-full px-4 py-2.5 text-left text-sm text-muted hover:bg-sand hover:text-ink"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
