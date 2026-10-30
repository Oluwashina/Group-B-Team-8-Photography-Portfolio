import { shopPageAside } from "../data/siteContent.js";

export default function ShopPageAside() {
  return (
    <aside
      className="mt-12 border-t border-line bg-surface"
      aria-label="Print shop information"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6 sm:py-14">
        {shopPageAside.map((item) => (
          <div key={item.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {item.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
