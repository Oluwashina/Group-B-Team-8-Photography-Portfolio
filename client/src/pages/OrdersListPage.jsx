import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrdersForUser } from "../api/orders.js";
import Footer from "../components/Footer";
import OrderStatusBadge from "../components/OrderStatusBadge.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import ShopPageLayout from "../components/ShopPageLayout.jsx";
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
    return <p className="text-center text-stone-400">Loading orders…</p>;
  }

  return (
    <>
      <h1 className="font-serif text-3xl text-stone-100">My orders</h1>
      <p className="mt-2 text-stone-400">Print orders tied to your account.</p>
      {orders.length === 0 ? (
        <p className="mt-8 text-stone-500">No orders yet.</p>
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
    <>
      <ShopPageLayout narrow>
        <RequireAuth title="Sign in to view your orders">
          <OrdersContent />
        </RequireAuth>
      </ShopPageLayout>
      <Footer />
    </>
  );
}
