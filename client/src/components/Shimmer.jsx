export function ShimmerBlock({ className = "", ...props }) {
  return (
    <div
      className={`animate-shimmer rounded-lg bg-stone-900 ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

export function GalleryGridShimmer() {
  const tiles = [
    "row-span-[32]",
    "row-span-[44]",
    "row-span-[32]",
    "col-span-1 sm:col-span-2 row-span-[28]",
    "row-span-[32]",
    "row-span-[44]",
  ];

  return (
    <div
      className="grid grid-cols-1 auto-rows-[0.5rem] grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Loading gallery"
    >
      {tiles.map((layout, index) => (
        <ShimmerBlock
          key={index}
          className={`min-h-40 ${layout}`}
        />
      ))}
    </div>
  );
}

export function PrintDetailShimmer() {
  return (
    <div role="status" aria-label="Loading print">
      <ShimmerBlock className="mb-6 h-4 w-48 max-w-full" />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ShimmerBlock className="aspect-[4/5] w-full rounded-2xl lg:min-h-[28rem]" />
        <div className="space-y-4">
          <ShimmerBlock className="h-3 w-24" />
          <ShimmerBlock className="h-10 w-3/4 max-w-sm" />
          <ShimmerBlock className="h-8 w-28" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-16 w-full" />
          <ShimmerBlock className="mt-4 h-12 w-36 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CartLinesShimmer({ count = 2 }) {
  return (
    <ul className="mt-8 space-y-4" role="status" aria-label="Loading cart">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="flex gap-4 rounded-xl border border-white/5 p-3 sm:p-4">
          <ShimmerBlock className="h-20 w-20 shrink-0 rounded-lg sm:h-24 sm:w-24" />
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <ShimmerBlock className="h-5 w-40" />
              <ShimmerBlock className="h-4 w-24" />
            </div>
            <ShimmerBlock className="h-8 w-28 rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function OrdersListShimmer({ count = 3 }) {
  return (
    <ul className="mt-8 space-y-3" role="status" aria-label="Loading orders">
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <ShimmerBlock className="h-[4.5rem] w-full rounded-xl" />
        </li>
      ))}
    </ul>
  );
}

export function OrderDetailShimmer() {
  return (
    <div className="space-y-4" role="status" aria-label="Loading order">
      <ShimmerBlock className="h-4 w-24" />
      <ShimmerBlock className="h-9 w-56 max-w-full" />
      <ShimmerBlock className="h-4 w-40" />
      <ul className="mt-8 space-y-4">
        {[0, 1].map((i) => (
          <li key={i} className="flex gap-4 rounded-xl border border-white/5 p-4">
            <ShimmerBlock className="h-20 w-20 rounded-lg" />
            <div className="flex-1 space-y-2">
              <ShimmerBlock className="h-5 w-36" />
              <ShimmerBlock className="h-4 w-48" />
            </div>
            <ShimmerBlock className="h-6 w-16" />
          </li>
        ))}
      </ul>
      <ShimmerBlock className="ml-auto h-8 w-32" />
    </div>
  );
}

export function PageHeaderShimmer() {
  return (
    <div className="space-y-2" aria-hidden="true">
      <ShimmerBlock className="h-9 w-48 max-w-full" />
      <ShimmerBlock className="h-4 w-64 max-w-full" />
    </div>
  );
}

export function CheckoutSuccessShimmer() {
  return (
    <div className="mx-auto max-w-md space-y-4 text-center" role="status">
      <ShimmerBlock className="mx-auto h-8 w-24 rounded-full" />
      <ShimmerBlock className="mx-auto h-10 w-72 max-w-full" />
      <ShimmerBlock className="mx-auto h-4 w-56 max-w-full" />
      <ShimmerBlock className="mx-auto h-8 w-32" />
    </div>
  );
}
