import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { pollOrderUntilPaid } from "../api/orders.js";
import OrderStatusBadge from "../components/OrderStatusBadge.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import ShopPageLayout from "../components/ShopPageLayout.jsx";
import { CheckoutSuccessShimmer } from "../components/Shimmer.jsx";
import { useCart } from "../context/useCart.js";
import { formatUsd } from "../utils/formatMoney.js";

function SuccessIcon() {
  return (
    <span
      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-7 w-7"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </span>
  );
}

function SuccessContent() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;
    (async () => {
      const result = await pollOrderUntilPaid(orderId);
      if (cancelled) return;
      setOrder(result);
      setPhase(result?.status === "paid" ? "paid" : "pending");
    })();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  useEffect(() => {
    if (order?.status === "paid") {
      clearCart();
    }
  }, [order?.status, clearCart]);

  if (!orderId) {
    return (
      <div className="flex min-h-[50vh] flex-col justify-center text-center">
        <h1 className="font-serif text-2xl text-ink">Missing order</h1>
        <Link to="/orders" className="mt-4 inline-block text-accent">
          View orders
        </Link>
      </div>
    );
  }

  if (phase === "loading" || !order) {
    return (
      <div className="flex min-h-[50vh] flex-col justify-center py-8">
        <CheckoutSuccessShimmer />
        <p className="sr-only" role="status">
          Confirming payment
        </p>
      </div>
    );
  }

  const isPaid = order.status === "paid";

  return (
    <div className="flex min-h-[50vh] flex-col justify-center py-8">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-line bg-surface p-8 text-center shadow-lg shadow-stone-900/5 sm:p-10">
        {isPaid ? (
          <SuccessIcon />
        ) : (
          <div className="flex justify-center">
            <OrderStatusBadge status={order.status} />
          </div>
        )}

        <h1 className="mt-5 font-serif text-3xl text-ink">
          {isPaid ? "Thank you for your order" : "Payment pending"}
        </h1>

        {isPaid && (
          <p className="mt-2 text-sm text-muted">Your payment was confirmed.</p>
        )}

        <p className="mt-6 text-sm text-muted">
          Order reference
          <span className="mt-1 block font-mono text-xs text-body break-all">
            {order.id}
          </span>
        </p>

        <p className="mt-6 font-serif text-3xl text-ink">
          {formatUsd(order.totalCents)}
        </p>

        {phase === "pending" && (
          <p className="mt-4 text-sm text-amber-700">
            Still processing. Refresh in a few seconds or check My orders.
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to={`/orders/${order.id}`}
            className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white no-underline transition hover:bg-accent-strong"
          >
            View order details
          </Link>
          <Link
            to="/#gallery"
            className="rounded-full border border-line bg-canvas px-7 py-3 text-sm text-ink no-underline transition hover:border-accent hover:text-accent"
          >
            Back to gallery
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <ShopPageLayout narrow>
      <RequireAuth title="Sign in to view your receipt">
        <SuccessContent />
      </RequireAuth>
    </ShopPageLayout>
  );
}
