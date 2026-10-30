-- Gallery photos (seeded from client/src/data/galleryItems.js)
CREATE TABLE IF NOT EXISTS gallery_items (
  id TEXT PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  category TEXT NOT NULL,
  caption_label TEXT NOT NULL,
  caption_text TEXT NOT NULL,
  layout TEXT NOT NULL DEFAULT 'default',
  sort_order INTEGER NOT NULL DEFAULT 0,
  price_cents INTEGER NOT NULL DEFAULT 4500
);

-- Users (display name optional for accounts created before name was added)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Express session store (connect-pg-simple)
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL,
  CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

-- Saved favorites
CREATE TABLE IF NOT EXISTS favorites (
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  gallery_item_id TEXT NOT NULL REFERENCES gallery_items (id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, gallery_item_id)
);

-- Stripe checkout orders (paid only via webhook)
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  total_cents INTEGER NOT NULL,
  stripe_checkout_session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "IDX_orders_user_id" ON orders (user_id);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  gallery_item_id TEXT NOT NULL REFERENCES gallery_items (id),
  title TEXT NOT NULL,
  unit_price_cents INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0)
);

CREATE INDEX IF NOT EXISTS "IDX_order_items_order_id" ON order_items (order_id);
