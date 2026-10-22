import "dotenv/config";
import { galleryItems } from "../client/src/data/galleryItems.js";
import pool from "./db/pool.js";

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error("Missing DATABASE_URL in server/.env");
    process.exit(1);
  }

  const insertText = `
    INSERT INTO gallery_items (
      id, src, alt, category, caption_label, caption_text, layout, sort_order
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (id) DO UPDATE SET
      src = EXCLUDED.src,
      alt = EXCLUDED.alt,
      category = EXCLUDED.category,
      caption_label = EXCLUDED.caption_label,
      caption_text = EXCLUDED.caption_text,
      layout = EXCLUDED.layout,
      sort_order = EXCLUDED.sort_order
  `;

  for (let i = 0; i < galleryItems.length; i++) {
    const item = galleryItems[i];
    await pool.query(insertText, [
      item.id,
      item.src,
      item.alt,
      item.category,
      item.captionLabel,
      item.captionText,
      item.layout,
      i,
    ]);
  }

  console.log(`Seeded ${galleryItems.length} gallery items.`);
  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
