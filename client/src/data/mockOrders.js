/** Seed orders for UI demos. Live checkout appends to sessionStorage via mockOrdersStore. */
export const seedMockOrders = [
  {
    id: "ord-demo-paid",
    status: "paid",
    totalCents: 6500,
    createdAt: "2026-03-01T14:22:00.000Z",
    items: [
      {
        galleryItemId: "g01",
        title: "Landscape",
        unitPriceCents: 6500,
        quantity: 1,
        src: "/assets/images/gallery-01.jpg",
      },
    ],
  },
  {
    id: "ord-demo-pending",
    status: "pending",
    totalCents: 9700,
    createdAt: "2026-03-10T09:05:00.000Z",
    items: [
      {
        galleryItemId: "g02",
        title: "Portrait",
        unitPriceCents: 5500,
        quantity: 1,
        src: "/assets/images/gallery-02.jpg",
      },
      {
        galleryItemId: "g07",
        title: "Gear",
        unitPriceCents: 4200,
        quantity: 1,
        src: "/assets/images/gallery-07.jpg",
      },
    ],
  },
];
