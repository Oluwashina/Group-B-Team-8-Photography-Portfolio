import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchGalleryItems } from "../api/gallery";
import ShopPageLayout from "../components/ShopPageLayout";
import { PrintDetailShimmer } from "../components/Shimmer.jsx";
import { enrichWithPrintMeta } from "../data/printCatalog.js";
import { useAuth } from "../context/useAuth.js";
import { useCart } from "../context/useCart.js";
import { formatUsd } from "../utils/formatMoney.js";

export default function PrintDetailPage() {
  const { id } = useParams();
  const { isAuthenticated, openAuth } = useAuth();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loadState, setLoadState] = useState("loading");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const items = await fetchGalleryItems();
        if (cancelled) return;
        const match = items.find((item) => item.id === id);
        setProduct(enrichWithPrintMeta(match));
        setLoadState(match ? "ready" : "missing");
      } catch {
        if (cancelled) return;
        setLoadState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    if (!isAuthenticated) {
      openAuth("login");
      return;
    }
    const ok = addItem(product);
    if (ok) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  }

  if (loadState === "loading") {
    return (
      <ShopPageLayout>
        <PrintDetailShimmer />
      </ShopPageLayout>
    );
  }

  if (loadState === "missing" || loadState === "error" || !product) {
    return (
      <ShopPageLayout narrow>
        <div className="flex min-h-[50vh] flex-col justify-center">
          <h1 className="font-serif text-2xl text-ink">Print not found</h1>
          <Link to="/#gallery" className="mt-4 inline-block text-accent">
            Back to gallery
          </Link>
        </div>
      </ShopPageLayout>
    );
  }

  const priceCents = product.priceCents ?? 0;

  return (
    <ShopPageLayout>
      <nav className="mb-6 text-sm text-muted">
        <Link to="/#gallery" className="text-muted hover:text-ink">
          Gallery
        </Link>
        <span className="mx-2">/</span>
        <span className="text-body">{product.captionLabel}</span>
      </nav>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-3xl border border-line bg-sand shadow-xl shadow-stone-900/10">
          <img
            src={product.src}
            alt={product.alt}
            className="aspect-[4/5] w-full object-cover lg:aspect-auto lg:min-h-[28rem]"
          />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {product.category}
          </p>
          <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            {product.captionLabel}
          </h1>
          <p className="mt-4 font-serif text-3xl text-accent">
            {priceCents > 0 ? formatUsd(priceCents) : "—"}
          </p>
          <p className="mt-4 text-body">{product.captionText}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {product.printDescription}
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-stone-900/10 transition hover:bg-accent-strong"
            >
              {added ? "Added to cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </ShopPageLayout>
  );
}
