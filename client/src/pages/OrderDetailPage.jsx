import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOrderById } from "../api/orders.js";
import OrderStatusBadge from "../components/OrderStatusBadge.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import ShopPageLayout from "../components/ShopPageLayout.jsx";
import { OrderDetailShimmer } from "../components/Shimmer.jsx";
import { formatUsd } from "../utils/formatMoney.js";

function OrderDetailContent() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await fetchOrderById(id);
      if (!cancelled) {
        setOrder(result);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <OrderDetailShimmer />;
  }

  if (!order) {
    return (
      <div className="flex min-h-[50vh] flex-col justify-center">
        <h1 className="font-serif text-2xl text-stone-100">Order not found</h1>
        <Link to="/orders" className="mt-4 inline-block text-[#ddc9a8]">
          All orders
        </Link>
      </div>
    );
  }

  return (
    <>
      <Link to="/orders" className="text-sm text-stone-500 hover:text-stone-300">
        ← All orders
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-3xl text-stone-100">Order details</h1>
        <OrderStatusBadge status={order.status} />
      </div>
      <p className="mt-2 font-mono text-sm text-stone-400">{order.id}</p>
      <p className="mt-1 text-sm text-stone-500">
        {new Date(order.createdAt).toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "short",
        })}
      </p>
      <ul className="mt-8 space-y-4">
        {order.items.map((item) => (
          <li
            key={`${item.galleryItemId}-${item.title}`}
            className="flex gap-4 rounded-xl border border-white/10 bg-[#161412] p-4"
          >
            <img
              src={item.src}
              alt=""
              className="h-20 w-20 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <Link
                to={`/prints/${item.galleryItemId}`}
                className="font-medium text-stone-100 no-underline hover:text-[#ddc9a8]"
              >
                {item.title}
              </Link>
              <p className="text-sm text-stone-500">
                Qty {item.quantity} · {formatUsd(item.unitPriceCents)} each
              </p>
            </div>
            <p className="font-serif text-lg text-[#ddc9a8]">
              {formatUsd(item.unitPriceCents * item.quantity)}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-right font-serif text-2xl text-[#ddc9a8]">
        Total {formatUsd(order.totalCents)}
      </p>
    </>
  );
}

export default function OrderDetailPage() {
  return (
    <ShopPageLayout narrow>
      <RequireAuth title="Sign in to view this order">
        <OrderDetailContent />
      </RequireAuth>
    </ShopPageLayout>
  );
}
