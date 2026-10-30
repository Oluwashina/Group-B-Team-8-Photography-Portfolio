import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchGalleryItems } from "../api/gallery";
import Footer from "../components/Footer";
import ShopPageLayout from "../components/ShopPageLayout";
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
      <>
        <ShopPageLayout>
          <p className="text-center text-stone-400">Loading print…</p>
        </ShopPageLayout>
        <Footer />
      </>
    );
  }

  if (loadState === "missing" || loadState === "error" || !product) {
    return (
      <>
        <ShopPageLayout narrow>
          <h1 className="font-serif text-2xl text-stone-100">Print not found</h1>
          <Link to="/#gallery" className="mt-4 inline-block text-[#ddc9a8]">
            Back to gallery
          </Link>
        </ShopPageLayout>
        <Footer />
      </>
    );
  }

  const priceCents = product.priceCents ?? 0;

  return (
    <>
      <ShopPageLayout>
        <nav className="mb-6 text-sm text-stone-500">
          <Link to="/#gallery" className="text-stone-400 hover:text-stone-200">
            Gallery
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-300">{product.captionLabel}</span>
        </nav>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-stone-900 shadow-xl">
            <img
              src={product.src}
              alt={product.alt}
              className="aspect-[4/5] w-full object-cover lg:aspect-auto lg:min-h-[28rem]"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
              {product.category}
            </p>
            <h1 className="mt-2 font-serif text-3xl text-stone-100 sm:text-4xl">
              {product.captionLabel}
            </h1>
            <p className="mt-4 font-serif text-3xl text-[#ddc9a8]">
              {priceCents > 0 ? formatUsd(priceCents) : "—"}
            </p>
            <p className="mt-4 text-stone-300">{product.captionText}</p>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              {product.printDescription}
            </p>
            {!isAuthenticated && (
              <p className="mt-4 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-stone-400">
                Sign in to add prints to your cart.
              </p>
            )}
            <div className="mt-8">
              <button
                type="button"
                onClick={handleAddToCart}
                className="rounded-full bg-[#ddc9a8] px-6 py-3 text-sm font-semibold text-[#0a0908] transition hover:bg-[#c8b08a]"
              >
                {added ? "Added to cart" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </ShopPageLayout>
      <Footer />
    </>
  );
}
