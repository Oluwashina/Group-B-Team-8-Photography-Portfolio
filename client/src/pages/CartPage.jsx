import { useState } from "react";
import { Link } from "react-router-dom";
import { startCheckout } from "../api/checkout.js";
import CartLineItem from "../components/CartLineItem.jsx";
import Footer from "../components/Footer";
import RequireAuth from "../components/RequireAuth.jsx";
import ShopPageLayout from "../components/ShopPageLayout.jsx";
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
      <div className="py-8 text-center">
        <h1 className="font-serif text-3xl text-stone-100">Your cart</h1>
        <p className="mt-4 text-stone-400">No prints yet.</p>
        <Link
          to="/#gallery"
          className="mt-6 inline-block rounded-full bg-[#ddc9a8] px-6 py-2.5 text-sm font-semibold text-[#0a0908] hover:bg-[#c8b08a]"
        >
          Browse gallery
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-serif text-3xl text-stone-100">Your cart</h1>
      <p className="mt-2 text-stone-400">Review your prints before checkout.</p>
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
      <div className="mt-8 flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-white/10 bg-[#161412] p-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-stone-500">Subtotal</p>
          <p className="font-serif text-2xl text-[#ddc9a8]">
            {formatUsd(subtotalCents)}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Secure checkout powered by Stripe (test mode).
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          {checkoutError && (
            <p className="text-sm text-red-300" role="alert">
              {checkoutError}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/#gallery"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-stone-300 hover:bg-white/5"
            >
              Continue browsing
            </Link>
            <button
              type="button"
              disabled={checkingOut}
              onClick={handleCheckout}
              className="rounded-full bg-[#ddc9a8] px-6 py-2.5 text-sm font-semibold text-[#0a0908] disabled:opacity-60 hover:bg-[#c8b08a]"
            >
              {checkingOut ? "Redirecting to Stripe…" : "Proceed to checkout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CartPage() {
  return (
    <>
      <ShopPageLayout narrow>
        <RequireAuth title="Sign in to view your cart">
          <CartContent />
        </RequireAuth>
      </ShopPageLayout>
      <Footer />
    </>
  );
}
