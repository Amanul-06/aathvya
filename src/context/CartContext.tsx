
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { ShopifyCart } from "@/types/shopify";

type CartContextValue = {
  cart: ShopifyCart | null;
  loading: boolean;
  error: string | null;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aathvya_shopify_cart_id";

function isMissingCartError(message: string) {
  return message.toLowerCase().includes("specified cart does not exist");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartId, setCartId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setCartId(saved);
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart(null);
    setCartId("");
    setError(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const request = useCallback(
    async (body: Record<string, unknown>) => {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        const message =
          result.error || "Unable to update your bag.";

        if (isMissingCartError(message)) {
          clearCart();

          // An expired cart during a normal page load
          // should simply be treated as an empty bag.
          if (body.action === "get") {
            return null;
          }
        }

        throw new Error(message);
      }

      if (result.cart) {
        setCart(result.cart);
        setCartId(result.cart.id);

        window.localStorage.setItem(
          STORAGE_KEY,
          result.cart.id
        );
      }

      return result.cart as ShopifyCart | null;
    },
    [clearCart]
  );

  const refreshCart = useCallback(async () => {
    if (!cartId) return;

    try {
      setLoading(true);
      setError(null);

      await request({
        action: "get",
        cartId,
      });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Unable to load your bag."
      );
    } finally {
      setLoading(false);
    }
  }, [cartId, request]);

  useEffect(() => {
    if (cartId) {
      void refreshCart();
    }
  }, [cartId, refreshCart]);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      try {
        setLoading(true);
        setError(null);

        await request({
          action: "add",
          cartId,
          variantId,
          quantity,
        });
      } catch (e) {
        const message =
          e instanceof Error
            ? e.message
            : "Unable to add this item.";

        setError(message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [cartId, request]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      try {
        setLoading(true);
        setError(null);

        await request({
          action: "update",
          cartId,
          lineId,
          quantity,
        });
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Unable to update this item."
        );
      } finally {
        setLoading(false);
      }
    },
    [cartId, request]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      try {
        setLoading(true);
        setError(null);

        await request({
          action: "remove",
          cartId,
          lineId,
        });
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Unable to remove this item."
        );
      } finally {
        setLoading(false);
      }
    },
    [cartId, request]
  );

  const value = useMemo(
    () => ({
      cart,
      loading,
      error,
      addItem,
      updateItem,
      removeItem,
      refreshCart,
    }),
    [
      cart,
      loading,
      error,
      addItem,
      updateItem,
      removeItem,
      refreshCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within CartProvider."
    );
  }

  return context;
}
