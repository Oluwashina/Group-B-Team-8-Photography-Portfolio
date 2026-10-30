import { useCallback, useMemo, useState } from "react";
import { useAuth } from "./useAuth.js";
import { CartContext } from "./cart-context.js";

function storageKey(userId) {
  return `ghs-cart-v1-user-${userId}`;
}

function readStoredCart(userId) {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredCart(userId, items) {
  localStorage.setItem(storageKey(userId), JSON.stringify(items));
}

export default function CartProvider({ children }) {
  const { user, isAuthenticated, openAuth } = useAuth();
  const [revision, setRevision] = useState(0);

  const items = useMemo(() => {
    if (!user?.id) return [];
    void revision;
    return readStoredCart(user.id);
  }, [user?.id, revision]);

  const bump = useCallback(() => {
    setRevision((value) => value + 1);
  }, []);

  const persist = useCallback(
    (nextItems) => {
      if (!user?.id) return;
      writeStoredCart(user.id, nextItems);
      bump();
    },
    [user, bump],
  );

  const addItem = useCallback(
    (product) => {
      if (!isAuthenticated || !user?.id) {
        openAuth("login");
        return false;
      }
      const line = {
        galleryItemId: product.id,
        quantity: 1,
        title: product.captionLabel,
        priceCents: product.priceCents,
        src: product.src,
      };
      const existing = readStoredCart(user.id);
      const index = existing.findIndex(
        (row) => row.galleryItemId === line.galleryItemId,
      );
      let next;
      if (index >= 0) {
        next = [...existing];
        next[index] = {
          ...next[index],
          quantity: Math.min(3, next[index].quantity + 1),
        };
      } else {
        next = [...existing, line];
      }
      persist(next);
      return true;
    },
    [isAuthenticated, openAuth, persist, user],
  );

  const removeItem = useCallback(
    (galleryItemId) => {
      if (!user?.id) return;
      const next = readStoredCart(user.id).filter(
        (row) => row.galleryItemId !== galleryItemId,
      );
      persist(next);
    },
    [persist, user],
  );

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  const updateQuantity = useCallback(
    (galleryItemId, delta) => {
      if (!user?.id) return;
      const existing = readStoredCart(user.id);
      const index = existing.findIndex(
        (row) => row.galleryItemId === galleryItemId,
      );
      if (index < 0) return;
      const next = [...existing];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        next.splice(index, 1);
      } else {
        next[index] = {
          ...next[index],
          quantity: Math.min(3, newQty),
        };
      }
      persist(next);
    },
    [persist, user],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, row) => sum + row.quantity, 0),
    [items],
  );

  const subtotalCents = useMemo(
    () => items.reduce((sum, row) => sum + row.priceCents * row.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotalCents,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, subtotalCents, addItem, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
