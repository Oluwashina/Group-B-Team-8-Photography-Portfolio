import { shopPageAside } from "../data/siteContent.js";

export default function ShopPageAside() {
  return (
    <aside
      className="border-t border-white/10 bg-[#0d0c0a]/80"
      aria-label="Print shop information"
    >
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 sm:py-12">
        {shopPageAside.map((item) => (
          <div key={item.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8b08a]/90">
              {item.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
