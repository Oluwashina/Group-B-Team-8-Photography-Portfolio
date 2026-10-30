export function mapOrderRow(orderRow, itemRows) {
  return {
    id: orderRow.id,
    status: orderRow.status,
    totalCents: orderRow.total_cents,
    createdAt: orderRow.created_at,
    items: itemRows.map((row) => ({
      galleryItemId: row.gallery_item_id,
      title: row.title,
      unitPriceCents: row.unit_price_cents,
      quantity: row.quantity,
      src: row.src,
    })),
  };
}
