-- Gallery photos (seeded from client/src/data/galleryItems.js)
CREATE TABLE IF NOT EXISTS gallery_items (
  id TEXT PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  category TEXT NOT NULL,
  caption_label TEXT NOT NULL,
  caption_text TEXT NOT NULL,
  layout TEXT NOT NULL DEFAULT 'default',
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Users (signup/login in a later step)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Saved favorites (used once auth is wired)
CREATE TABLE IF NOT EXISTS favorites (
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  gallery_item_id TEXT NOT NULL REFERENCES gallery_items (id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, gallery_item_id)
);
