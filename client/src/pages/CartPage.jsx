import { useState } from "react";
import { Link } from "react-router-dom";
import { startCheckout } from "../api/checkout.js";
import CartLineItem from "../components/CartLineItem.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import ShopPageLayout from "../components/ShopPageLayout.jsx";
import { CartLinesShimmer, PageHeaderShimmer } from "../components/Shimmer.jsx";
import { useAuth } from "../context/useAuth.js";
import { useCart } from "../context/useCart.js";
import { formatUsd } from "../utils/formatMoney.js";

function CartContent() {
  const { items, subtotalCents, removeItem, updateQuantity, clearCart } =
    useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  async function handleCheckout() {
    if (items.length === 0) return;
    setCheckoutError("");
    setCheckingOut(true);
    try {
      const { url } = await startCheckout(items);
      clearCart();
      window.location.href = url;
    } catch (err) {
      setCheckoutError(
        err instanceof Error ? err.message : "Could not start checkout",
      );
      setCheckingOut(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-8 text-center">
        <h1 className="font-serif text-3xl text-ink">Your cart</h1>
        <p className="mt-4 max-w-sm text-muted">
          No prints yet. Browse the gallery and add archival prints when you are
          ready.
        </p>
        <Link
          to="/#gallery"
          className="mt-6 inline-block rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-strong"
        >
          Browse gallery
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-serif text-3xl text-ink">Your cart</h1>
      <p className="mt-2 text-muted">Review your prints before checkout.</p>
      <ul className="mt-8 space-y-4">
        {items.map((line) => (
          <CartLineItem
            key={line.galleryItemId}
            line={line}
            onRemove={removeItem}
            onUpdateQuantity={updateQuantity}
          />
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-stretch justify-between gap-4 rounded-3xl border border-line bg-surface p-6 shadow-sm shadow-stone-900/5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-muted">Subtotal</p>
          <p className="font-serif text-2xl text-ink">
            {formatUsd(subtotalCents)}
          </p>
          <p className="mt-1 text-xs text-muted">
            Secure checkout powered by Stripe (test mode).
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          {checkoutError && (
            <p className="text-sm text-red-600" role="alert">
              {checkoutError}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/#gallery"
              className="rounded-full border border-line bg-surface px-5 py-3 text-sm text-body transition hover:border-accent hover:text-ink"
            >
              Continue browsing
            </Link>
            <button
              type="button"
              disabled={checkingOut}
              onClick={handleCheckout}
              className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition disabled:opacity-60 hover:bg-accent-strong"
            >
              {checkingOut ? "Redirecting to Stripe…" : "Proceed to checkout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function CartGate() {
  const { status } = useAuth();

  if (status === "loading") {
    return (
      <>
        <PageHeaderShimmer />
        <CartLinesShimmer />
      </>
    );
  }

  return (
    <RequireAuth title="Sign in to view your cart">
      <CartContent />
    </RequireAuth>
  );
}

export default function CartPage() {
  return (
    <ShopPageLayout narrow>
      <CartGate />
    </ShopPageLayout>
  );
}
