import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrdersForUser } from "../api/orders.js";
import OrderStatusBadge from "../components/OrderStatusBadge.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import ShopPageLayout from "../components/ShopPageLayout.jsx";
import { OrdersListShimmer, PageHeaderShimmer } from "../components/Shimmer.jsx";
import { useAuth } from "../context/useAuth.js";
import { formatUsd } from "../utils/formatMoney.js";

function OrdersContent() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchOrdersForUser();
        if (!cancelled) setOrders(list);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  if (loading) {
    return (
      <>
        <PageHeaderShimmer />
        <OrdersListShimmer />
      </>
    );
  }

  return (
    <>
      <h1 className="font-serif text-3xl text-stone-100">My orders</h1>
      <p className="mt-2 text-stone-400">Print orders tied to your account.</p>
      {orders.length === 0 ? (
        <div className="flex min-h-[45vh] flex-col items-center justify-center py-12 text-center">
          <p className="text-stone-500">No orders yet.</p>
          <Link
            to="/#gallery"
            className="mt-6 inline-block rounded-full border border-white/15 px-6 py-2.5 text-sm text-stone-200 hover:bg-white/5"
          >
            Shop prints
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                to={`/orders/${order.id}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#161412] p-4 no-underline transition hover:border-[#c8b08a]/40"
              >
                <div>
                  <p className="font-mono text-sm text-stone-300">{order.id}</p>
                  <p className="text-xs text-stone-500">
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <OrderStatusBadge status={order.status} />
                  <span className="font-serif text-lg text-[#ddc9a8]">
                    {formatUsd(order.totalCents)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function OrdersListPage() {
  return (
    <ShopPageLayout narrow>
      <RequireAuth title="Sign in to view your orders">
        <OrdersContent />
      </RequireAuth>
    </ShopPageLayout>
  );
}
