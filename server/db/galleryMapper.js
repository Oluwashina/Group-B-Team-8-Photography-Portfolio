export function rowToGalleryItem(row) {
  return {
    id: row.id,
    src: row.src,
    alt: row.alt,
    category: row.category,
    captionLabel: row.caption_label,
    captionText: row.caption_text,
    layout: row.layout,
  };
}
