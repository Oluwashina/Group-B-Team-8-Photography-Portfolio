import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { pollOrderUntilPaid } from "../api/orders.js";
import OrderStatusBadge from "../components/OrderStatusBadge.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import ShopPageLayout from "../components/ShopPageLayout.jsx";
import { CheckoutSuccessShimmer } from "../components/Shimmer.jsx";
import { formatUsd } from "../utils/formatMoney.js";

function SuccessContent() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
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

  return (
    <div className="flex min-h-[50vh] flex-col justify-center py-8 text-center">
      <OrderStatusBadge status={order.status} />
      <h1 className="mt-4 font-serif text-3xl text-ink">
        {order.status === "paid" ? "Thank you for your order" : "Payment pending"}
      </h1>
      <p className="mt-2 text-muted">
        Order <span className="font-mono text-body">{order.id}</span>
      </p>
      <p className="mt-4 font-serif text-2xl text-accent">
        {formatUsd(order.totalCents)}
      </p>
      {phase === "pending" && (
        <p className="mt-4 text-sm text-amber-700">
          Still processing. Refresh in a few seconds or check My orders.
        </p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to={`/orders/${order.id}`}
          className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-strong"
        >
          View order details
        </Link>
        <Link
          to="/#gallery"
          className="rounded-full border border-line bg-surface px-7 py-3 text-sm text-ink transition hover:border-accent hover:text-accent"
        >
          Back to gallery
        </Link>
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
